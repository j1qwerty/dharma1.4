# Netlify skill

CLI-first workflow for static-site deploys (Vite/React SPA).

## Agent can do (CLI, non-interactive)

- `netlify status` — verify user + linked project (needs `NETLIFY_DISABLE_TELEMETRY=1` + `--telemetry-disable` in scripts).
- `netlify env:list` / `netlify env:set KEY value` — audit vs `.env.local`, fill gaps (e.g. `VITE_FIREBASE_MEASUREMENT_ID`). Mask values in output.
- `pnpm run build` then `netlify deploy --prod --dir=dist` — ship local build to the live base URL.
- Fix `public/_redirects`: comments must use `#` (a `/* */` line breaks parsing — CLI warns "Could not parse redirect").

## SPA requirements

- **Base URL**: production site serves at `https://<project>.netlify.app` (project URL in `netlify status`).
- **Redirects**: `public/_redirects` must contain `/* /index.html 200` or BrowserRouter deep links/refreshes 404 on the CDN.
- **Env changes need a redeploy** — setting a var alone does nothing until the next build/deploys.

## Manual steps (human in dashboard/CLI)

- `netlify login` + `netlify link` (first time per machine/repo).
- Connect repo for auto-deploys, or keep CLI deploys; set build command `pnpm run build` + publish dir `dist` if dashboard builds are used.
- Custom domain + HTTPS via dashboard; confirm env vars under Site settings → Environment.
