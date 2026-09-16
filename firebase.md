# Firebase + Netlify Runbook (`firebase` branch) — everything done so far

> ⛔ Do NOT build or deploy to Netlify unless explicitly asked.
> Build/deploy commands are documented in §H for manual use only.

Goal: Firebase Auth (Google + Email/Password + Phone) + Firestore + Storage for the CMS.
Hosting stays on Netlify. Prod site `dharmatribe` (branch `main`) untouched;
test site `dharmatribecms` (branch `firebase`).

---

## A. What YOU did (browser / console — no CLI exists for these)

1. `firebase login` + `netlify login` in your own terminal (browser OAuth).
2. console.firebase.google.com → added Firebase to the `dharmatribe-cms` GCP project
   (CLI `projects:create`/`addfirebase` failed with 403, console grant fixed it).
3. Enabled Auth providers: **Google**, **Email/Password**, **Phone**
   (Phone + authorized-domains + SMS regions below were finished via API, §F).
4. Created Firestore Database + clicked **Storage → Get Started** (if not yet, 1 click).

## B. What was done VIA CLI (assistant, reproducible below)

1. Branch: `git checkout -b firebase` + pushed to origin.
2. Installed `firebase-tools` 15.30.1 + `netlify-cli` 27.8.0 into `D:\cli\`,
   added to User PATH (works directly in new terminals).
3. Created Netlify site `dharmatribecms` → https://dharmatribecms.netlify.app,
   linked local folder (`.netlify/state.json`, gitignored).
4. Created Firebase project resources via CLI:
   `apps:create WEB dharmatribe-web` → `apps:sdkconfig` → wrote `.env.local`.
5. `netlify env:set` all 6 `VITE_FIREBASE_*` vars on `dharmatribecms`.
6. Firestore: CLI auto-created DB in `nam5`, deleted it, recreated in
   `asia-south1` (location is immutable — decided before any data), deployed
   strict `firestore.rules`.
7. Seeded via `node scripts/seedFirestore.mjs`: 9 pujas, 4 festivals,
   8 stories, 3 acharyas, 15 homepage sections (seed ran under temporary
   open rules, strict rules restored + redeployed immediately after).
8. Created `admin@dharmatribe.com` via `scripts/createEmailAdmin.mjs`,
   granted super-admin; granted `du18ck@gmail.com` via
   `scripts/grantAdminByEmail.mjs` after its first Google login.
9. Fixed Auth via Identity Platform API (no console needed):
   authorized domains += `dharmatribecms.netlify.app`, `dharmatribe.netlify.app`;
   SMS region allowlist = IN, US, GB, CA, AU, AE, SG.
10. Router fixes for clean URLs: `HashRouter` → `BrowserRouter`,
    `public/_redirects` (`/* /index.html 200`), legacy `#/...` redirect shim
    in `index.html`, `vite.config.js` `base: './'` → `'/'`
    (relative base broke chunk loading under `/admin/*` — MIME text/html errors).

## C. App code added (all on `firebase` branch, deployed)

- `src/lib/firebase.js` — env init, `null` when unconfigured (site falls back to `data.js`).
- `src/lib/auth.jsx` — Google + email/password + role lookup (`admins/{uid}`).
  Post-login routing: `postLoginPath()` sends staff → `/admin`, customers → `/dashboard`.
- `src/lib/cms.js` + `src/lib/schedule.js` — Firestore hooks, `isLive` windows, `?cmsPreview=`.
- `src/components/common/PhoneLogin.jsx` — phone OTP (invisible reCAPTCHA), used in
  `/auth/*` and `/admin/login`. Needs `+91xxxxxxxxxx` format; test numbers go in
  Console → Auth → Sign-in method → Phone.
- `src/components/common/GoogleIcon.jsx` — shared G mark on both login pages.
- `src/components/common/AnnouncementBar.jsx` — custom announcements only
  (festival promo removed from top bar; promos live in home countdown section).
- `src/pages/Home.jsx` + `FestivalCountdown.jsx` — two timer cards
  (next festival gold, following festival crimson `.fc-alt-dt`).
- `/admin/login` + `/admin` (RequireAdmin guard) — dashboard, collection counts,
  "Preview as of" scheduling tester.
- Scripts: `seedFirestore.mjs`, `createEmailAdmin.mjs`, `grantAdmin.mjs`,
  `grantAdminByEmail.mjs` (passwords/config via env only — never committed).
- `firebase.json`, `.firebaserc`, `firestore.rules`, `storage.rules`,
  `firestore.indexes.json`, `.env.example`, `cms-plan.md`.

## D. Secrets & access — who can do what

| Action | Who | How |
|---|---|---|
| Edit local `.env.local` | assistant ✅ | file write (gitignored, untracked) |
| `netlify env:set/list` | assistant ✅ | CLI, logged in as a17tiwari@gmail.com |
| Firestore rules deploy, seed, admin grants | assistant ✅ | CLI + key in `.env.local` |
| Auth providers on/off, test numbers, Storage Get Started | mostly console ❌ | no CLI; some patched via API (§F) |
| Rotate `admin@dharmatribe.com` password | needs new password from you | `updatePassword` script, then confirm |

Security posture: no secret is committed (`.env.local` ignored; scripts read env;
live password scrubbed from docs). The `apiKey` in the browser bundle is public
by design — real security = authorized domains + strict Firestore rules (both live).
`12345678` is weak and passed through chat/shell history → rotate it.

## E. First-time setup from scratch (if reproducing)

```powershell
# 1. Branch
git checkout -b firebase
git push -u origin firebase
# 2. CLIs
New-Item -ItemType Directory -Path "D:\cli"
npm config set prefix "D:\cli"
npm install -g firebase-tools netlify-cli
[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path","User") + ";D:\cli", "User")
$env:Path += ";D:\cli"
firebase login
netlify login
# 3. Console: add Firebase to GCP project, enable Google/Email/Phone providers,
#    create Firestore DB (asia-south1), Storage Get Started, authorized domains
# 4. Link + web app + env
firebase use --add
firebase apps:create WEB dharmatribe-web --project dharmatribe-cms
firebase apps:sdkconfig WEB <appId> --project dharmatribe-cms  # → fill .env.local
# 5. Rules, seed, admins
firebase deploy --only firestore --project dharmatribe-cms
$env:VITE_FIREBASE_API_KEY="<...>" # + other 5 vars, or source .env.local
node scripts/seedFirestore.mjs
$env:ADMIN_EMAIL="admin@dharmatribe.com"; $env:ADMIN_PASSWORD="<strong-password>"
node scripts/createEmailAdmin.mjs
# 6. Netlify site + env (site create is one-time)
netlify sites:create --name dharmatribecms
netlify env:set VITE_FIREBASE_API_KEY "<...>" # ×6
```

## F. API workarounds used (no console needed)

With the `firebase login` token (`$XDG_CONFIG_HOME/configstore/firebase-tools.json`),
PATCH `https://identitytoolkit.googleapis.com/admin/v2/projects/dharmatribe-cms/config`:
- `?updateMask=authorizedDomains` → merge `dharmatribecms/dharmatribe.netlify.app`.
- `?updateMask=signIn.phoneNumber` → `{ enabled: true }`.
- `?updateMask=smsRegionConfig` → `{ allowlistOnly: { allowedRegions: [IN,US,GB,CA,AU,AE,SG] } }`.
One-off scripts were run from `D:\temp\opencode` and deleted afterwards.

## G. Admin bootstrapping
```powershell
# email admin (needs providers enabled + .env.local filled)
$env:ADMIN_EMAIL="admin@dharmatribe.com"; $env:ADMIN_PASSWORD="<strong-password>"
node scripts/createEmailAdmin.mjs
# google user: they sign in once at /admin/login, then by email (no UID needed)
$env:ADMIN_EMAIL="admin@dharmatribe.com"; $env:ADMIN_PASSWORD="<strong-password>"
$env:TARGET_EMAIL="someone@gmail.com"
node scripts/grantAdminByEmail.mjs
# ...or by UID:
$env:TARGET_UID="<uid>"; $env:TARGET_EMAIL="someone@gmail.com"
node scripts/grantAdmin.mjs
```
First admin needed temporary open rules (strict rules block self-grant);
procedure: backup `firestore.rules`, deploy open-all, run scripts, restore, redeploy.

## G2. Roles (`src/lib/roles.js`)

| Where | Values | Meaning |
|---|---|---|
| `admins/{uid}.role` | `super-admin` | full CMS access (current: admin@dharmatribe.com, du18ck@gmail.com) |
| `admins/{uid}.role` | `editor` | future restricted staff (recognized by `canAccessAdmin`, per-action limits later) |
| `users/{uid}.role` | `customer` (default) | normal devotee; auto-backfilled on login + `scripts/backfillRoles.mjs` |
| `users/{uid}.role` | `staff` | legacy marker, treated as non-customer, never overwritten |

`useAuth()` exposes `{ user, role, adminRole, isAdmin }`. `/admin` guard =
any `admins/{uid}` doc. Audit anytime: `node scripts/listRoles.mjs`
(with `ADMIN_EMAIL`/`ADMIN_PASSWORD` set) — prints every admins/users email+role.

## G3. Customer cloud sync (background, offline-first)

- **Wishlist** (`src/lib/favorites.jsx`): localStorage stays instant source of truth;
  on sign-in, `users/{uid}.savedPujas` is union-merged in; every toggle pushes
  the merged list via fire-and-forget `setDoc` (failures keep local). Exposes `cloud: off|pending|on|error`.
- **Orders** (`src/lib/orders.js`): `BookingConfirmation` calls `saveBooking()`
  when signed in — deterministic doc id `{uid}_{puja}_{date}_{time}`, idempotent
  on re-render/refresh; WhatsApp flow unaffected. `MyBookings` shows the
  Firestore history for signed-in users (sorted newest first, no composite index —
  sorted client-side), demo list otherwise with a sync hint.
- Rules cover both: users own their doc, bookings owner-create/read. No deploy needed.

## H. Build & deploy commands (MANUAL — only on explicit request ⛔)

```powershell
# local dev (http://localhost:5183)
pnpm dev
# production build + manual deploy to dharmatribecms
pnpm build
netlify deploy --prod --dir dist
# nicer: link repo in Netlify UI (Site settings → Build & deploy → Link repository
# → j1qwerty/dharma1.4, branch firebase, build `pnpm build`, publish `dist`)
# + set the 6 VITE_FIREBASE_* env vars there for auto-deploys
# firebase rules only
firebase deploy --only firestore --project dharmatribe-cms
firebase deploy --only storage --project dharmatribe-cms   # after Storage Get Started
```

## I. Troubleshooting

| Symptom | Fix |
|---|---|
| `auth/unauthorized-domain` | hostname not in Auth → Authorized domains (or API patch, §F). Branch/preview URLs are different hostnames — allowlist each |
| SMS `auth/operation-not-allowed` / region error | SMS region policy (§F); test numbers bypass SMS/quota |
| Module MIME `text/html` on `/admin/*` | `vite.config.js` must keep `base: '/'` + `public/_redirects` present |
| `permission-denied` Firestore | not in `admins`, or doc `status` ≠ `published` |
| "Firebase not configured" banner | `.env.local` missing locally / Netlify env vars missing + rebuild |
| `firebase login` hangs | `firebase login --reauth`, popup blocker |
| CLI not found in terminal | new terminal (User PATH has `D:\cli`); this agent uses `D:\cli\*.cmd` absolute paths |
| `projects:addfirebase` 403 | console-only grant, then continue via CLI |

## J. Status checklist

- [x] `firebase` branch, CLIs in `D:\cli`, both logins
- [x] Firebase project + web app + `.env.local` + Netlify env
- [x] Firestore `asia-south1` + strict rules + seed (9/4/8/3/15)
- [x] `admin@dharmatribe.com` + `du18ck@gmail.com` super-admins
- [x] Google/Email/Phone providers, domains, SMS regions
- [x] Clean URLs (BrowserRouter + `_redirects` + base `/`)
- [ ] Storage → Get Started (1 console click) + `storage.rules` deploy
- [ ] Rotate `admin@dharmatribe.com` password
- [ ] Link repo in Netlify UI for auto-deploys (manual deploys used so far)
- [ ] Full CMS CRUD editors (Pujas → Festivals → Homepage) — next phase
