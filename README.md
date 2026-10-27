# Romans 8:28 – Polyglotis · Website + Polyglotis HQ

The public website (DE/EN, light/dark) and **Polyglotis HQ**, the internal dashboard, linked at the very bottom of the page.
It runs entirely on **Netlify** and is deployed from **GitHub**.

| Part | How it works |
|---|---|
| Website | Static `index.html` + `assets/app.js` |
| Request form | **Netlify Forms** (spam protection, email notification, up to 3 files / 8 MB) |
| Requests in HQ | `netlify/functions/submission-created.mjs` copies each form submission into HQ |
| HQ logins and data | `netlify/functions/api.mjs` (Netlify Functions) + **Netlify Blobs** (built-in storage) |

No other service is needed.

---

## Setup (about 15 minutes, one time)

### 1. Put the code on GitHub
1. On github.com, create a new **private** repository, e.g. `polyglotis`.
2. Upload the contents of this folder (everything except `node_modules`), either with **Add file → Upload files** or with GitHub Desktop. Commit to the `main` branch.

### 2. Connect Netlify
1. app.netlify.com → **Add new site → Import an existing project → GitHub** → choose the `polyglotis` repo.
2. Leave the build settings as they are (they come from `netlify.toml`): no build command, publish directory `.`.
3. Click **Deploy**. Netlify gives you an address like `https://polyglotis-xyz.netlify.app`.

### 3. Set the secret for HQ logins (required)
1. Netlify → your site → **Site configuration → Environment variables → Add a variable**.
2. Key: `SESSION_SECRET`. Value: a long random string of at least 32 characters, for example from a password generator. Never share it.
3. Then **Deploys → Trigger deploy → Deploy site** so the functions pick it up.

### 4. Turn on the form and email notifications
1. Netlify → **Forms** → enable form detection if asked, then redeploy once. The form **request** appears.
2. **Forms → Form notifications → Add notification → Email notification**.
   - Event: *New form submission*, Form: *request*
   - Email: `info.polyglotis@gmail.com`, plus any other address that should get a copy.
3. Send a test request on the website. It should arrive by email **and** in HQ.

### 5. Create the two owner accounts (do this first!)
1. Open the site → scroll to the bottom → **Polyglotis HQ** → **Konto erstellen**.
2. **David** creates his account first, then **Maureen** creates hers. The first two accounts automatically become **owners** with all rights.
3. Everyone after that is set to *Awaiting approval* until an owner approves them under **Team & Konten** as *Staff* or *Read only*.

### 6. Connect the domain (later)
Netlify → **Domain management → Add a domain** → `polyglotis.de`. Netlify shows the DNS records to set at your domain registrar. HTTPS is set up automatically.

---

## Roles in HQ
- **Owner** (first two accounts): everything, including deleting, managing accounts and resetting passwords.
- **Staff**: work on requests, appointments and documents. Can't delete or manage accounts.
- **Read only**: sees everything, changes nothing.
- **Awaiting approval**: no access until an owner approves.

Forgotten password: an owner clicks **Reset password** under *Team & Konten* and passes on the temporary password. Everyone can change their own password under *Team & Konten* / *Mein Konto*.

## Limits and notes
- Files uploaded in HQ: max **4 MB** per file (Netlify function limit). Larger files: compress or split the PDF.
- Files sent with the request form (max. 8 MB total) are stored by Netlify Forms. They are linked in HQ and in the notification email. Opening the link may require being logged in to Netlify.
- Replies to clients are written in HQ with templates and sent from your own mailbox (**Open in email** / **Copy text**). Each reply is logged in the request's history.
- Form submissions, function calls and storage count towards your Netlify plan. Check the current limits in your Netlify account.
- HQ data lives in Netlify Blobs on this site. Deleting the Netlify site deletes the data.

## Files
```
index.html                        website + HQ (one page, hash routes: #home #services #about #request #contact #imprint #privacy #hq)
assets/app.js                     all frontend logic (language, theme, form, HQ)
netlify/functions/api.mjs         HQ API: /api/signup /api/login /api/me /api/requests /api/appointments /api/documents /api/files /api/accounts
netlify/functions/submission-created.mjs   copies form submissions into HQ
netlify.toml                      Netlify settings + security headers
package.json                      dependency: @netlify/blobs
CLAUDE.md                         technical handover for future changes
```
