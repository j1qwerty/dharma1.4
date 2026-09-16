# Netlify — Push & Deploy Guide (`firebase` branch → `dharmatribecms`)

> ⛔ Manual deploys only on explicit request. Commands below are for when you say go.

Sites:
| Site | Branch | URL |
|---|---|---|
| `dharmatribe` (prod, untouched) | `main` | https://dharmatribe.netlify.app |
| `dharmatribecms` (test) | `firebase` | https://dharmatribecms.netlify.app |

Build settings (both sites): build `pnpm build`, publish `dist`, Node 22.

---

## 1. One-time setup (already done, kept for reference)

```powershell
# CLI lives in D:\cli (User PATH). This agent uses D:\cli\netlify.cmd absolute paths.
netlify login
netlify status            # logged in as a17tiwari@gmail.com
netlify sites:list        # dharmatribe + dharmatribecms

# site was created via CLI (blank, then linked):
netlify sites:create --name dharmatribecms   # use WITHOUT --account-slug (it 404s with it)
# local folder auto-linked → .netlify/state.json (gitignored, do not commit)
```

## 2. Push the branch to GitHub (so Netlify can see it)

```powershell
git status --short          # review what's changing
git add -A                  # or add specific files
git commit -m "describe the change"
git push origin firebase    # updates the firebase branch on GitHub
git log --oneline -5        # verify
```

## 3. Deploy to `dharmatribecms` (manual, explicit request only)

```powershell
pnpm build                              # must pass first; output in dist/
netlify deploy --prod --dir dist        # uses linked site (do NOT pass --site <name>, name lookup 404s)
```

After deploy, hard-refresh the site (Ctrl+Shift+R) — CDN + browser cache the old bundle.

## 4. Env vars (already set, verify/change)

```powershell
netlify env:list                        # keys only (values hidden)
netlify env:set VITE_FIREBASE_API_KEY "<value>"
# repeat for: VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID,
# VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, VITE_FIREBASE_APP_ID
```

Vite bakes env into the bundle at **build time** — after any env change you must
`pnpm build` + `netlify deploy --prod --dir dist` again. Same for local: restart `pnpm dev` after `.env.local` changes.

Or set them in UI: app.netlify.com/projects/dharmatribecms → Site settings → Environment variables.

## 5. Auto-deploys from GitHub (optional, not yet enabled)

Manual deploys are used so far. To get push-to-deploy:
1. app.netlify.com/projects/dharmatribecms → Site settings → Build & deploy → Link repository
2. Select `j1qwerty/dharma1.4`, branch `firebase`, build `pnpm build`, publish `dist`
3. Add the 6 `VITE_FIREBASE_*` env vars in the same UI (or they stay from CLI)
4. Every `git push origin firebase` then deploys automatically

Keep `dharmatribe` linked to `main` only — never change its branch.

## 6. SPA routing requirements (do not break)

Clean URLs (`/admin/login`, not `/#/…`) depend on all three — verify after any change:
1. `src/main.jsx` uses `BrowserRouter` (not `HashRouter`)
2. `public/_redirects` contains `/* /index.html 200` (copied to `dist/` on build)
3. `vite.config.js` keeps `base: '/'` (relative `'./'` breaks chunk loading under sub-paths → MIME `text/html` errors)

Check a deploy: `dist/_redirects` must exist; `dist/index.html` asset refs must start with `/assets/`.

## 7. Troubleshooting

| Symptom | Fix |
|---|---|
| `Site Not Found` on fresh site | zero deploys yet — run one manual deploy (§3) |
| `/admin/login` 404 | missing `_redirects` or still on `HashRouter` (correct URL then is `/#/admin/login`) |
| JS MIME `text/html` errors | `base` regressed to `'./'` — set back to `'/'`, rebuild, redeploy |
| Old content after deploy | hard-refresh; check deploy URL (unique) vs production URL |
| "Firebase not configured" banner | env vars missing at build time — set (§4), rebuild, redeploy |
| `--site dharmatribecms` → Not Found | drop `--site`, rely on linked `.netlify/state.json` |
| `sites:create --account-slug` 404 | omit the flag; default team is used |
