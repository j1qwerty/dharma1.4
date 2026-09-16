# CMS Plan — Firebase + Google Login + Scheduled Sections (branch `firebase`)

Branch: `firebase` (test deploys to Netlify site `dharmatribecms`, production `dharmatribe` stays on `main`).
Stack: React + Vite (existing) + Firebase (Auth + Firestore + Storage). No own server.

## 0. CLI setup (done once, Windows)

CLIs live in `D:\cli\` so `firebase` / `netlify` work directly in any terminal.

```powershell
# 1. Create folder
New-Item -ItemType Directory -Path "D:\cli"

# 2. Point npm global prefix there, install
npm config set prefix "D:\cli"
npm install -g firebase-tools netlify-cli

# 3. Add to User PATH (permanent, new terminals)
[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path","User") + ";D:\cli", "User")

# 4. Current terminal only
$env:Path += ";D:\cli"

# 5. Verify
firebase --version   # 15.x
netlify --version    # 27.x
```

Login (you must do interactively):

```powershell
firebase login        # opens Google browser login
netlify login         # opens Netlify browser login
netlify sites:list    # should show dharmatribe
```

## 1. Branch workflow

```powershell
git checkout -b firebase
git push -u origin firebase
# work here only; merge to main only after CMS verified on dharmatribecms
```

Netlify test site:

```powershell
netlify init   # or `netlify link`
# Choose: create new site `dharmatribecms`, branch `firebase`, build `pnpm build`, publish `dist`
# Keep existing `dharmatribe` site linked to `main` untouched.
```

## 2. What Firebase provides

| Need | Firebase service | Notes |
|---|---|---|
| Google login | Auth (Google provider) | Popup, no password to manage |
| CMS data | Firestore (NoSQL) | Collections below |
| Images | Storage (`images/*`) | URL stored in Firestore |
| Local testing | Emulators | Auth + Firestore + Storage |
| (Skipped) | Hosting / Functions | Hosting stays Netlify; roles via `admins` collection, no functions in v1 |

## 3. Firestore data model (v1)

Common fields on every content doc: `status: draft|published|archived`, `startDate/endDate (Timestamp|null)` = visibility window, `priority/order (number)`, `updatedAt`, `updatedBy`.

- `admins/{uid}` — `{email, role:'super-admin'|'editor', createdAt}`
- `users/{uid}` — `{email, displayName, photoURL, role:'customer', savedPujas:[], createdAt}`
- `pujas/{slug}` — `{code,title,titleHi,deity,temple,time,price,tag,purpose,type,image,gallery[],desc,descHi,duration,packages[],addons[],faqs[{q,qHi,a,aHi}],festivalIds[],featured,status,startDate,endDate,priority}`
- `festivals/{slug}` — `{name,nameHi,eventDate,countdownTo,visibilityStart,visibilityEnd,note,noteHi,image,heroImage,linkedPujaIds[],homepageTakeover,status,priority}`
- `homepage_sections/{key}` — keys: `announcementBar,hero,countdown,upcomingPujas,festivalStrip,featuredPujas,intentions,acharyas,howItWorks,trustBand,stories,social,recurringSeva,temples,newsletter`. Value: `{enabled,order,title,titleHi,copy,copyHi,config:{mode:auto|manual,limit,pujaIds,festivalId},startDate,endDate}`
- `stories/{slug}` — `{category,title,titleHi,excerpt,excerptHi,body,bodyHi,image,author,featured,status,publishedAt}`
- `acharyas/{slug}` — same fields as `src/lib/data.js` + `status,order`
- `testimonials/{id}` — `{name,location,pujaId,rating,text,textHi,featured,status,order}`
- `site_settings/global` — `{whatsappNumber,socialLinks,trustStats,announcementDefault}`
- `bookings/{id}` (v1 read-only) — `{userId,pujaId,date,package,total,status,createdAt}`

See `firebase.md` for console creation + `scripts/seedFirestore.mjs` for migration from `src/lib/data.js`.

## 4. Scheduling / auto-trigger engine (core requirement)

`src/lib/schedule.js`:

```js
isLive(doc, now) = doc.status==='published'
  && (!doc.startDate || now >= doc.startDate)
  && (!doc.endDate || now <= doc.endDate)
```

- `getActiveFestival(festivals, now)` — live festivals sorted by `priority → eventDate`. Drives AnnouncementBar, Hero takeover, Countdown source, marquee, festival strip.
- Home resolver — fetch `homepage_sections` ordered by `order`, filter `enabled && isLive`, then per-section: `auto` pulls live pujas/festivals (limit), `manual` uses `config.pujaIds/festivalId`.
- Preview mode — CMS “Preview as of” date picker navigates to `/?cmsPreview=ISO` (and `/pujas/:id?cmsPreview=ISO`). A banner shows “Previewing as of X — Exit”. No data mutation.
- Puja Detail — `puja.festivalIds → festivals` → if a linked festival is live, show festival banner + badge + countdown CTA.

Missing sections added for this: `AnnouncementBar` (new, above header), hero festival-takeover variant, `FestivalBanner` slot on Puja Detail, CMS preview banner, section order/disable toggles.

## 5. Frontend integration

- `src/lib/firebase.js` — init from `VITE_FIREBASE_*` env, export `auth, db, storage`. Graceful `null` when env missing (site falls back to `data.js`).
- `src/lib/auth.jsx` — `AuthProvider`: `signInWithGoogle()` (popup), `logout()`, `onAuthStateChanged` + `admins/{uid}` role lookup → `{user, isAdmin, loading}`.
- `src/lib/cms.js` — `useCollection(path)`, `useDoc(path/id)` with loading/error; callers fall back to local `data.js` when Firestore empty.
- `.env.example` + `.env.local` (gitignored) for web-app config.
- `firestore.rules`, `storage.rules` — public read only published; writes admin-only.

## 6. CMS UI (`/admin/*`, admin-only)

- `/admin/login` — Google button + admin check + “request access” state.
- `/admin` layout — sidebar, `PreviewAsOf` picker, publish state badges.
- Pages: Dashboard (counts, next festival, pending), Pujas CRUD, Festivals CRUD (event + visibility + takeover + link pujas + Preview), Homepage (enable/order/schedule), Stories, Acharyas, Testimonials, Bookings (read), Users (read), Settings, Media (upload).
- All forms bilingual EN/HI, image URL or Storage upload, slug auto, validation.

## 7. Rules summary

```text
content (pujas/festivals/stories/...): read if status=='published'; write if caller in admins
users/{uid}: read/write owner or admin
bookings: read owner or admin; create owner; no client update (admin SDK later)
storage images/**: read public; write admin
```

## 8. Seed + verify

```powershell
# emulators
firebase init emulators   # Auth + Firestore + Storage
firebase emulators:start
pnpm dev                  # test Google login, admin/non-admin, past/future startDate
# seed (after .env.local set)
node scripts/seedFirestore.mjs
# deploy preview
netlify deploy --branch firebase --site dharmatribecms
```
