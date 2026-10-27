// Runs automatically after every verified Netlify Forms submission.
// Copies submissions of the "request" form into the HQ requests store.
// Email notifications are sent by Netlify Forms itself (see README).
import { connectLambda, getStore } from "@netlify/blobs";

const FIELDS = ["ref", "kind", "from", "to", "docs", "pages", "deadline", "delivery", "setting", "date", "time", "place", "duration", "caseno", "level", "group", "message", "name", "company", "email", "phone", "address", "lang"];
const s = (v, max = 4000) => (v == null ? "" : String(v).trim().slice(0, max));

export const handler = async (event) => {
  try {
    connectLambda(event);
    const { payload } = JSON.parse(event.body || "{}");
    if (!payload || payload.form_name !== "request") return { statusCode: 200, body: "ignored" };
    const d = payload.data || {};
    const r = { status: "new", createdAt: payload.created_at || new Date().toISOString(), history: [], files: [], submissionId: payload.id || "" };
    for (const k of FIELDS) r[k] = s(d[k]);
    if (!r.ref) r.ref = "PG-" + Date.now().toString(36).toUpperCase();
    for (const k of ["attachment1", "attachment2", "attachment3"]) {
      const f = d[k];
      if (f && typeof f === "object" && f.url) r.files.push({ name: s(f.filename || f.name || k, 300), url: f.url, size: f.size || 0, type: f.type || "" });
      else if (typeof f === "string" && /^https?:\/\//.test(f)) r.files.push({ name: k, url: f });
    }
    const st = getStore("pg-requests");
    await st.setJSON(r.ref, r, { onlyIfNew: true });
    return { statusCode: 200, body: "ok" };
  } catch (e) {
    console.error("submission-created failed", e);
    return { statusCode: 200, body: "error logged" }; // never block the form submission
  }
};
