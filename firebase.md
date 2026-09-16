# Firebase Setup — Complete Instructions (`firebase` branch)

Goal: Firebase Auth (Google) + Firestore + Storage for the CMS. Hosting stays on Netlify.

## A. What you do in Firebase Console (cannot be done by CLI)

1. Go to https://console.firebase.google.com → **Add project** → name `dharmatribe-cms` → Continue (Analytics optional OFF is fine).
2. **Authentication → Sign-in method → Add provider → Google → Enable** → set support email → Save.
3. **Authentication → Sign-in method → Add provider → Email/Password → Enable** (required for `admin@dharmatribe.com` login) → Save.
3. **Authentication → Settings → Authorized domains → Add domain:**
   - `localhost`
   - `dharmatribe.netlify.app` (prod)
   - `dharmatribecms.netlify.app` (test)
4. **Firestore Database → Create database → Production mode → region `asia-south1` (Mumbai)** → Enable.
5. **Storage → Get started → Production mode → same region** → Done.
6. **Project Settings (gear) → General → Your apps → Web (`</>`)** → nickname `dharmatribe-web` → copy config:
   ```text
   apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId
   ```
7. Create `.env.local` in repo root (never commit):
   ```text
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```
8. **Admin access (all three):**
   - `admin@dharmatribe.com` (email/password) — run after `.env.local` is filled (password via env, never committed):
     ```powershell
     $env:ADMIN_EMAIL="admin@dharmatribe.com"; $env:ADMIN_PASSWORD="12345678"
     node scripts/createEmailAdmin.mjs
     ```
     Change this weak starter password later in Console → Authentication → Users.
   - `du18ck@gmail.com` (Google) — log in once at `/admin/login` (shows “not an admin” first time), then copy its UID from **Authentication → Users** and create Firestore doc `admins/{UID}`:
     ```text
     email: du18ck@gmail.com
     role: super-admin
     createdAt: now
     ```
   - Your own Google account — same UID flow as above.

## B. CLI — install, path, login (Windows, `D:\cli`)

```powershell
New-Item -ItemType Directory -Path "D:\cli"
npm config set prefix "D:\cli"
npm install -g firebase-tools netlify-cli
[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path","User") + ";D:\cli", "User")
$env:Path += ";D:\cli"
firebase --version
netlify --version
firebase login        # browser Google login — ASK USER to complete
netlify login         # browser Netlify login — ASK USER to complete
```

Verify login:

```powershell
firebase projects:list
netlify sites:list
```

## C. CLI — what I set up in the repo (already scaffolded)

```powershell
# from repo root on branch firebase
firebase init firestore     # creates firestore.rules, firestore.indexes.json (do NOT overwrite rules if asked — keep ours)
firebase init storage       # creates storage.rules
firebase init emulators     # select Auth + Firestore + Storage
```

Committed files: `firebase.json`, `.firebaserc` (project id placeholder — you run `firebase use --add` to link), `firestore.rules`, `storage.rules`, `.env.example`, `src/lib/firebase.js`, `src/lib/auth.jsx`, `src/lib/cms.js`, `src/lib/schedule.js`.

Link local repo to cloud project (you run once):

```powershell
firebase use --add   # select dharmatribe-cms, alias default
firebase deploy --only firestore:rules,storage
```

## D. Netlify test site `dharmatribecms`

```powershell
netlify link            # or `netlify init` → create new site `dharmatribecms`
# Build: pnpm build | Publish: dist | Branch: firebase
```

Netlify Dashboard → `dharmatribecms` → **Site settings → Environment variables** → add the same 6 `VITE_FIREBASE_*` vars (plus branch deploys). Redeploy.

## E. Seed initial content

```powershell
node scripts/seedFirestore.mjs   # pushes pujas/festivals/stories/acharyas from src/lib/data.js
```

Check in Console → Firestore Data that collections appeared.

## F. Troubleshooting

| Symptom | Fix |
|---|---|
| `auth/unauthorized-domain` | Add domain in Auth → Authorized domains (step A3) |
| `permission-denied` Firestore | You are not in `admins` collection, or `status` is not `published` for public read |
| Blank CMS / fallback data | `.env.local` missing or dev server not restarted after adding it |
| `firebase login` hangs | Run `firebase login --reauth`, check browser popup blocker |
| PATH lost in new terminal | Re-open terminal; User PATH now includes `D:\cli` permanently |
| setx truncation warning | Ignored — we set PATH via `[Environment]::SetEnvironmentVariable`, not setx |

## G. Status checklist for you

- [ ] `firebase` branch created, `firebase`/`netlify` work directly
- [ ] Firebase project `dharmatribe-cms` created, Google provider enabled, domains added
- [ ] `.env.local` filled, dev server restarted
- [ ] `firebase use --add` + rules deployed
- [ ] Your UID added to `admins` as super-admin (+ extra admin emails when you share them)
- [ ] `node scripts/seedFirestore.mjs` run
- [ ] Netlify `dharmatribecms` linked to `firebase` branch with env vars
