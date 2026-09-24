# Firebase skill

CLI-first workflow for Firebase projects (Firestore, Auth, web apps).

## Agent can do (CLI, non-interactive)

- `firebase projects:list` — verify login + project.
- `firebase apps:list` / `firebase apps:sdkconfig web <APP_ID>` — fetch web SDK config incl. `measurementId` (GA).
- `firebase deploy --only firestore:rules,firestore:indexes` — always deploy after editing `firestore.rules`. Verify "released rules" + "compiled successfully" in output.
- `firebase emulators:start` — local Auth/Firestore/Storage (see `firebase.json`).
- Probe writes with a temp Node script using the client SDK (create/update paths, then delete the file; remove probe docs from console).

## Rules patterns that matter

- Put `isAdmin()` **first** in `allow read` (`isAdmin() || isPublished()`): rules short-circuit, so admin reads of not-yet-existing docs succeed instead of erroring on null `resource.data`.
- Parent matches do **not** cover subcollections — every `users/{uid}/addresses`-style path needs its own nested `match`.
- Guest-friendly writes: `allow create: if true` + owner/ownerless updates, e.g. `allow update: if isAdmin() || (isSignedIn() && resource.data.userId == request.auth.uid) || resource.data.userId == null`. Deletes stay admin-only.
- Single-field `where`/`orderBy` need no custom index; composite queries do (`firestore.indexes.json`).

## Manual steps (human in console)

- Create project + web app, enable Auth providers, enable Firestore (create database), link GA for measurement ID.
- Storage requires Blaze billing ("Get Started" in Storage console) — skip `storage` deploys until then.
- Grant admins: `admins/{uid}` doc (scripts like `grantAdmin.mjs`), then sign out/in.
- Env: copy `.env.example` → `.env.local`; production values go to hosting env, never git.
- Allow ~1 min for rules propagation after deploy.
