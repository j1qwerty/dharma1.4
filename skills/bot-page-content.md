# Page-agent bot skill (bot-page-content)

Floating in-page AI assistant via Alibaba `page-agent`, with our own launcher UI.

## Facts (bundle-verified, v1.12.4)

- Package is `page-agent` (NOT `@alibaba/page-agent` — that 404s on npm/unpkg).
- CDN: `https://cdn.jsdelivr.net/npm/page-agent@1.12.4/dist/iife/page-agent.demo.js` (pin version, verify HTTP 200, load `async`).
- `?autoInit=false` stops the default auto panel (which is Chinese-first).
- Auto-init reads script URL params: `lang` (default `zh-CN`!), `showPanel` (default `true`), `model`/`baseURL`/`apiKey`.
- Manual start: `window.pageAgent = new window.PageAgent({ model, baseURL, apiKey, language })` + `window.pageAgent.panel.show()` / `.dispose()`. Demo LLM baked in: `qwen3.5-plus` + free testing endpoint, `apiKey: "NA"` — evaluation only (their terms apply).
- Bot UI language supports **only `en-US` / `zh-CN`** — map everything else to `en-US`.

## Our launcher pattern (reuse as-is)

- Dark pill button, fixed upper-right: violet-glow pulse + float animation, bot SVG + bold **AI** text.
- Click → card with 2-line description (EN + HI) → Start boots bot in site language, Stop disposes. Click-outside closes; flex-column `align-items: flex-end` so the button never shifts when the card opens.
- Admin control: launcher mounts in both site + admin shells; popup shows **Hide** next to Start/Stop on `/admin/*` only (persisted per-browser flag, admin-pages-only); unhide via Admin → Settings toggle synced by a window event. Public pages always show the launcher.

## Manual steps (human)

- Accept demo-LLM terms for evaluation; for production, instantiate with your own model key instead of the demo endpoint.
- If the bot never appears: allow `cdn.jsdelivr.net` in the content blocker and reload.
