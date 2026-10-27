# Polyglotis — technical handover

Website and HQ dashboard for **Romans 8:28 – Polyglotis** (Maureen Nonyelum Mpieri, ermächtigte Übersetzerin für Englisch, Igbo und Pidgin; also French). Maintained by David Mpieri.

## Rules
- Never push or deploy without David's explicit OK. Always send a preview and the repo zip first.
- Change only what is asked. Keep the design: "official document" look (seal red `--seal`, ink blue `--sig`, Zilla Slab / Instrument Sans / IBM Plex Mono), light + dark tokens on `:root`.
- Every visible text is bilingual: `<span class="de">…</span><span class="en">…</span>` in HTML, `T(de,en)` / `B(de,en)` in JS.
- Certified translations are only for English, Igbo and Pidgin (the languages on her stamp). French is offered as translation and interpreting, not certified.

## Architecture
- `index.html`: all markup and CSS. Views are `<section class="view" id="v-…">`, routed by `location.hash`. `#hq` swaps the site for `#hqRoot`.
- `assets/app.js`: content arrays (SERVICES, BLOCKS, FAQ, LANGS…), language and theme switching, request form, HQ (rendered from JS template strings; `renderHQ()` re-renders the current tab).
- Request form → `fetch("/", multipart)` to Netlify Forms (form name `request`; a hidden static copy is at the bottom of `index.html` so Netlify detects all fields. Any new field must be added there too). Netlify fires `submission-created.mjs`, which stores the request in Blobs store `pg-requests` (key = ref).
- `api.mjs` (Functions v2, `path: /api/*`):
  - Auth: scrypt password hashes, HMAC-signed `pg_session` cookie (HttpOnly, 14 days), env `SESSION_SECRET` (≥ 24 chars) required.
  - Owners: the first two sign-ups claim `owner-slot:1` / `owner-slot:2` via conditional writes (`onlyIfNew`). Later sign-ups are `pending`.
  - Stores: `pg-accounts` (`acc:<id>`, `email:<email>` index, owner slots), `pg-requests`, `pg-appointments`, `pg-documents` (meta), `pg-files` (binary).
  - Roles: owner > staff > viewer > pending. Writes need staff; deletes and accounts need owner. The role is reloaded from the store on every request.
  - Same-origin check on non-GET requests.
- HQ polls every 30 s while open.

## Local testing
A local Blobs server (`@netlify/blobs/server`) and the handlers can be called directly with `Request` objects. Or use `netlify dev` with `SESSION_SECRET` set in `.env`.
