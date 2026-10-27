// Polyglotis HQ API — Netlify Functions (v2) + Netlify Blobs.
// All routes live under /api/*. Auth: email + password, signed session cookie.
import { getStore } from "@netlify/blobs";
import crypto from "node:crypto";

export const config = { path: "/api/*" };

const COOKIE = "pg_session";
const SESSION_DAYS = 14;
const ROLES = ["owner", "staff", "viewer", "pending"];
const STATUSES = ["new", "quoted", "accepted", "progress", "done", "declined"];
const MAX_UPLOAD = 4 * 1024 * 1024; // function request bodies are capped at ~6 MB

const store = (name) => getStore({ name, consistency: "strong" });
const S = {
  accounts: () => store("pg-accounts"),
  requests: () => store("pg-requests"),
  appts: () => store("pg-appointments"),
  docs: () => store("pg-documents"),
  files: () => store("pg-files"),
};

/* ---------- helpers ---------- */
const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers } });
const fail = (status, error) => json({ error }, status);
const now = () => new Date().toISOString();
const rid = (p = "") => p + crypto.randomBytes(9).toString("base64url");
const clean = (v, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : v == null ? "" : String(v).slice(0, max));
const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 24) throw Object.assign(new Error("SESSION_SECRET is missing or too short (min. 24 characters). Set it in Netlify → Site configuration → Environment variables."), { status: 500 });
  return s;
}
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
function sign(payload) {
  const body = b64(payload);
  const mac = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  return `${body}.${mac}`;
}
function verify(token) {
  if (!token || !token.includes(".")) return null;
  const [body, mac] = token.split(".");
  const want = crypto.createHmac("sha256", secret()).update(body).digest("base64url");
  if (mac.length !== want.length || !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(want))) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString());
    return p.exp > Date.now() ? p : null;
  } catch { return null; }
}
function cookie(req, name) {
  const c = req.headers.get("cookie") || "";
  const m = c.split(/;\s*/).find((x) => x.startsWith(name + "="));
  return m ? decodeURIComponent(m.slice(name.length + 1)) : null;
}
function sessionCookie(uid) {
  const exp = Date.now() + SESSION_DAYS * 864e5;
  return `${COOKIE}=${encodeURIComponent(sign({ uid, exp }))}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_DAYS * 86400}`;
}
const clearCookie = `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;

const scrypt = (pw, salt) => new Promise((res, rej) => crypto.scrypt(pw, salt, 64, { N: 16384, r: 8, p: 1 }, (e, k) => (e ? rej(e) : res(k.toString("hex")))));
async function hashPw(pw) { const salt = crypto.randomBytes(16).toString("hex"); return { salt, hash: await scrypt(pw, salt) }; }
async function checkPw(pw, acc) {
  const h = await scrypt(pw, acc.salt);
  return crypto.timingSafeEqual(Buffer.from(h, "hex"), Buffer.from(acc.hash, "hex"));
}
const publicAcc = (a) => ({ id: a.id, name: a.name, email: a.email, phone: a.phone || "", role: a.role, createdAt: a.createdAt, ownerSlot: a.ownerSlot || null });

async function listAll(st, prefix) {
  const { blobs } = await st.list(prefix ? { prefix } : {});
  const out = [];
  for (const b of blobs) { const v = await st.get(b.key, { type: "json" }); if (v) out.push(v); }
  return out;
}
async function currentUser(req) {
  const p = verify(cookie(req, COOKIE));
  if (!p) return null;
  const a = await S.accounts().get(`acc:${p.uid}`, { type: "json" });
  return a || null;
}
const can = {
  read: (u) => u && ["owner", "staff", "viewer"].includes(u.role),
  write: (u) => u && ["owner", "staff"].includes(u.role),
  owner: (u) => u && u.role === "owner",
};
async function body(req) { try { return await req.json(); } catch { return {}; } }

/* ---------- routes ---------- */
async function signup(req) {
  const b = await body(req);
  const name = clean(b.name, 120), email = clean(b.email, 200).toLowerCase(), phone = clean(b.phone, 60), password = typeof b.password === "string" ? b.password : "";
  if (!name || !emailOk(email)) return fail(400, "name_email");
  if (password.length < 8) return fail(400, "password_short");
  const st = S.accounts();
  const id = rid("u_");
  // reserve the email address (unique)
  const claim = await st.setJSON(`email:${email}`, { id }, { onlyIfNew: true });
  if (!claim.modified) return fail(409, "email_taken");
  // the first two accounts take the two owner slots; conditional writes make this race-safe
  let role = "pending", ownerSlot = null;
  for (const slot of [1, 2]) {
    await st.setJSON(`owner-slot:${slot}`, { id, at: now() }, { onlyIfNew: true });
    const holder = await st.get(`owner-slot:${slot}`, { type: "json" }); // confirm we really hold the slot
    if (holder && holder.id === id) { role = "owner"; ownerSlot = slot; break; }
  }
  const { salt, hash } = await hashPw(password);
  const acc = { id, name, email, phone, role, ownerSlot, salt, hash, createdAt: now() };
  await st.setJSON(`acc:${id}`, acc);
  return json({ user: publicAcc(acc) }, 201, { "set-cookie": sessionCookie(id) });
}
async function login(req) {
  const b = await body(req);
  const email = clean(b.email, 200).toLowerCase(), password = typeof b.password === "string" ? b.password : "";
  const st = S.accounts();
  const idx = await st.get(`email:${email}`, { type: "json" });
  const acc = idx && (await st.get(`acc:${idx.id}`, { type: "json" }));
  if (!acc || !(await checkPw(password, acc))) { await new Promise((r) => setTimeout(r, 600)); return fail(401, "bad_login"); }
  return json({ user: publicAcc(acc) }, 200, { "set-cookie": sessionCookie(acc.id) });
}
async function changePassword(req, u) {
  const b = await body(req);
  if (!(await checkPw(String(b.current || ""), u))) return fail(401, "bad_login");
  if (String(b.next || "").length < 8) return fail(400, "password_short");
  const { salt, hash } = await hashPw(String(b.next));
  await S.accounts().setJSON(`acc:${u.id}`, { ...u, salt, hash });
  return json({ ok: true });
}

async function requestsRoute(req, u, parts) {
  const st = S.requests();
  const ref = parts[1];
  if (req.method === "GET" && !ref) { if (!can.read(u)) return fail(403, "forbidden"); return json({ items: await listAll(st) }); }
  if (!ref) return fail(405, "method");
  const cur = await st.get(ref, { type: "json" });
  if (!cur) return fail(404, "not_found");
  if (req.method === "PATCH") {
    if (!can.write(u)) return fail(403, "forbidden");
    const b = await body(req), next = { ...cur };
    if (b.status !== undefined) { if (!STATUSES.includes(b.status)) return fail(400, "status"); next.status = b.status; }
    for (const k of ["quote", "dueDate", "note"]) if (b[k] !== undefined) next[k] = clean(b[k], 4000);
    if (b.log) next.history = [...(cur.history || []), { at: now(), by: u.name, title: clean(b.log.title, 300), text: clean(b.log.text, 8000) }];
    next.updatedAt = now();
    await st.setJSON(ref, next);
    return json({ item: next });
  }
  if (req.method === "DELETE") { if (!can.owner(u)) return fail(403, "forbidden"); await st.delete(ref); return json({ ok: true }); }
  return fail(405, "method");
}

const APPT_FIELDS = ["title", "type", "status", "date", "start", "end", "location", "client", "ref", "notes"];
async function apptsRoute(req, u, parts) {
  const st = S.appts(), id = parts[1];
  if (req.method === "GET") { if (!can.read(u)) return fail(403, "forbidden"); return json({ items: await listAll(st) }); }
  if (req.method === "POST" || req.method === "PUT") {
    if (!can.write(u)) return fail(403, "forbidden");
    const b = await body(req);
    const key = id || rid("a_");
    const prev = id ? await st.get(key, { type: "json" }) : null;
    const item = { id: key, createdAt: prev?.createdAt || now(), updatedAt: now(), by: u.name };
    for (const k of APPT_FIELDS) item[k] = clean(b[k], 4000);
    if (!item.title || !/^\d{4}-\d{2}-\d{2}$/.test(item.date)) return fail(400, "title_date");
    await st.setJSON(key, item);
    return json({ item });
  }
  if (req.method === "DELETE" && id) { if (!can.owner(u)) return fail(403, "forbidden"); await st.delete(id); return json({ ok: true }); }
  return fail(405, "method");
}

async function docsRoute(req, u, parts) {
  const st = S.docs(), id = parts[1];
  if (req.method === "GET") { if (!can.read(u)) return fail(403, "forbidden"); return json({ items: await listAll(st) }); }
  if (req.method === "POST") {
    if (!can.write(u)) return fail(403, "forbidden");
    const fd = await req.formData();
    const file = fd.get("file");
    if (!file || typeof file === "string") return fail(400, "file");
    if (file.size > MAX_UPLOAD) return fail(413, "too_large");
    const key = rid("d_");
    await S.files().set(key, await file.arrayBuffer(), { metadata: { name: file.name, type: file.type || "application/octet-stream" } });
    const meta = { id: key, name: clean(file.name, 300), size: file.size, type: file.type, category: clean(fd.get("category"), 40), client: clean(fd.get("client"), 200), ref: clean(fd.get("ref"), 100), uploadedAt: now(), by: u.name };
    await st.setJSON(key, meta);
    return json({ item: meta }, 201);
  }
  if (req.method === "DELETE" && id) { if (!can.owner(u)) return fail(403, "forbidden"); await st.delete(id); await S.files().delete(id); return json({ ok: true }); }
  return fail(405, "method");
}
async function fileRoute(req, u, parts) {
  if (!can.read(u)) return fail(403, "forbidden");
  const r = await S.files().getWithMetadata(parts[1], { type: "arrayBuffer" });
  if (!r) return fail(404, "not_found");
  const name = String(r.metadata?.name || "document").replace(/[^\w.\- ]/g, "_");
  return new Response(r.data, { headers: { "content-type": String(r.metadata?.type || "application/octet-stream"), "content-disposition": `inline; filename="${name}"`, "cache-control": "private, no-store", "x-content-type-options": "nosniff" } });
}

async function accountsRoute(req, u, parts) {
  if (!can.owner(u)) return fail(403, "forbidden");
  const st = S.accounts(), id = parts[1];
  if (req.method === "GET") return json({ items: (await listAll(st, "acc:")).map(publicAcc) });
  const acc = id && (await st.get(`acc:${id}`, { type: "json" }));
  if (!acc) return fail(404, "not_found");
  if (acc.role === "owner") return fail(403, "owner_locked");
  if (req.method === "PATCH") {
    const b = await body(req);
    if (!["staff", "viewer", "pending"].includes(b.role)) return fail(400, "role");
    await st.setJSON(`acc:${id}`, { ...acc, role: b.role, approvedBy: u.name, updatedAt: now() });
    return json({ ok: true });
  }
  if (req.method === "POST" && parts[2] === "reset") {
    // owner sets a temporary password for a staff member who forgot theirs
    const temp = crypto.randomBytes(6).toString("base64url");
    const { salt, hash } = await hashPw(temp);
    await st.setJSON(`acc:${id}`, { ...acc, salt, hash });
    return json({ tempPassword: temp });
  }
  if (req.method === "DELETE") { await st.delete(`acc:${id}`); await st.delete(`email:${acc.email}`); return json({ ok: true }); }
  return fail(405, "method");
}

export default async (req) => {
  try {
    const url = new URL(req.url);
    const parts = url.pathname.replace(/^\/api\/?/, "").split("/").filter(Boolean);
    const head = parts[0];
    if (req.method !== "GET" && req.method !== "HEAD") {
      // basic CSRF guard: only accept same-origin writes
      const origin = req.headers.get("origin");
      if (origin && new URL(origin).host !== url.host) return fail(403, "origin");
    }
    if (head === "signup" && req.method === "POST") return await signup(req);
    if (head === "login" && req.method === "POST") return await login(req);
    if (head === "logout") return json({ ok: true }, 200, { "set-cookie": clearCookie });
    if (head === "status" && req.method === "GET") {
      const st = S.accounts();
      const [a, b] = await Promise.all([st.get("owner-slot:1"), st.get("owner-slot:2")]);
      return json({ ownerSlotsLeft: 2 - [a, b].filter(Boolean).length });
    }
    const u = await currentUser(req);
    if (!u) return fail(401, "unauthorized");
    if (head === "me") return req.method === "GET" ? json({ user: publicAcc(u) }) : fail(405, "method");
    if (head === "password" && req.method === "POST") return await changePassword(req, u);
    if (u.role === "pending") return fail(403, "pending");
    if (head === "requests") return await requestsRoute(req, u, parts);
    if (head === "appointments") return await apptsRoute(req, u, parts);
    if (head === "documents") return await docsRoute(req, u, parts);
    if (head === "files") return await fileRoute(req, u, parts);
    if (head === "accounts") return await accountsRoute(req, u, parts);
    return fail(404, "not_found");
  } catch (e) {
    console.error(e);
    return fail(e.status || 500, e.status ? e.message : "server_error");
  }
};
