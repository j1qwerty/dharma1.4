# Social hub — links, implementation notes and automation

## 1. Submitted links (all)

### Facebook (3)
1. https://www.facebook.com/share/v/18fi9CYUWS/
2. https://www.facebook.com/share/v/1JCerr7oW1/
3. https://www.facebook.com/share/v/1FFXkQkc8W/

Facebook share URLs are login-walled, so no oEmbed title is available.
They are grouped on `/social` as the Navratri devotional series and open
externally in the Facebook app or browser.

### YouTube (4 submitted, 3 unique)
1. https://youtu.be/oi-YKp_Vclo?si=TJnN5E0s395JxMdq
   - oEmbed title: `www.dharmaatribe.com #Octobervibe #nostalgia #spirituality #navratri #durgapooja #onlinepooja`
   - Channel: Dharmaa Tribe — https://www.youtube.com/@DharmaaTribe
   - Thumbnail: https://i.ytimg.com/vi/oi-YKp_Vclo/hqdefault.jpg
2. https://youtu.be/w73HPy0k3nc?si=8ttoROawcjD2Wfz1
   - oEmbed title: `www.dharmaatribe.com #dharmaatribe #navratri #spirituality #durgapooja`
   - Same video submitted twice (second share param `si=S-XDDKL42MS8iMlF`).
     Deduplicated to one `yt-w73HPy0k3nc` entry.
3. https://youtu.be/L3hPIzHpUgg?si=QcGU_70SUsANuWG6
   - oEmbed title: `#dharmaatribe #spirituality #traditionsofindia #durga #navratri`

YouTube cards on `/social` play inline via `youtube.com/embed/<id>`.

### Instagram (1)
1. https://www.instagram.com/reel/DeILBQ_jQ37/?stkn=MXBzcnlibXAzZmY0dw==
   - Canonicalised to https://www.instagram.com/reel/DeILBQ_jQ37/
   - Opens externally in Instagram. No public oEmbed without a token.

### Channel and profile links used in footer
- YouTube channel (verified via oEmbed `author_url`): https://www.youtube.com/@DharmaaTribe
- Facebook (verified presence, first submitted video): https://www.facebook.com/share/v/18fi9CYUWS/
  Replace with the exact `facebook.com/<page>` URL when available.
- Instagram (verified presence, submitted reel): https://www.instagram.com/reel/DeILBQ_jQ37/
  Replace with the exact `instagram.com/<handle>` URL when available.

## 2. What was built

- `src/lib/social.js` — central registry (`SOCIAL_POSTS`, channel URLs,
  SEO title, description and keywords). One source for page, slider,
  header and footer.
- `src/pages/Social.jsx` — `/social` route with three bands:
  YouTube Shorts (inline iframes, separate section), Facebook videos
  (external cards) and Instagram reel (feature plus booking CTA).
  Includes page-level meta description, keywords and VideoObject JSON-LD.
- Top menu — `nav.social` strings in `src/lib/i18n.js` plus a
  `["nav.social", "/social"]` entry in `src/components/common/Header.jsx`.
  Renders on desktop nav and the mobile menu automatically.
- Homepage — two additions in `src/pages/Home.jsx`:
  1. Social slider under the wider feed: horizontal `snap-x` scroll row
     of all `SOCIAL_POSTS`, fully responsive (`min-w` cards, touch scroll).
  2. Navratri Special band above the Shraadh band with a clickable
     Navratri countdown linking to `/pujas/navratri`.
- Footer — icons in `src/components/common/Footer.jsx` now point at the
  real YouTube channel plus the verified Facebook and Instagram links,
  with proper `aria-label` text and `target=_blank`.
- Navratri puja — first entry in `src/lib/data.js` (`id: navratri`,
  image `/puja/navratra.jpg`), so `/pujas` lists it first and
  `/pujas/navratri` resolves. `NavratriContent` adds 9 forms, vidhi,
  benefits and FAQ below the standard detail hero.
- SEO — `index.html` gained meta description, keywords, canonical,
  Open Graph, Twitter and Organization JSON-LD. Added
  `public/robots.txt` and `public/sitemap.xml` (fixes the two
  crawl findings in `docs/seo/`). `/social` injects its own
  description plus an ItemList of VideoObjects.

## 3. SEO notes per video

| Post | Primary keyword | Secondary |
|---|---|---|
| fb-1 | navratri facebook video | dharmaatribe facebook, sharad navratri 2026 |
| fb-2 | devi darshan | navratri puja video |
| fb-3 | sharad navratri | durga bhakti video, online puja india |
| yt oi-YKp_Vclo | navratri youtube short | durga puja online, october navratri shorts |
| yt w73HPy0k3nc | navratri short | durga puja short, dharmaatribe navratri |
| yt L3hPIzHpUgg | traditions of india | durga navratri, navratri 2026 puja |
| ig reel | navratri reel | durga puja instagram, dharmaatribe instagram |

Page target: `Dharmaa Tribe on Social — Navratri videos, Durga Puja
Shorts and reels`. Check Search Console after deploy for
`navratri videos` and `navratri youtube shorts` impressions.

## 4. Automating new uploads (free tools and custom scripts)

Goal: when the team posts on YouTube, Facebook or Instagram, the new
item appears on `/social` and the homepage slider without a code edit.

### Option A — YouTube RSS, no API key (easiest, free forever)
Every channel has a public feed:

```
https://www.youtube.com/feeds/videos.xml?channel_id=<CHANNEL_ID>
```

Find `<CHANNEL_ID>` once from the channel page source (`channel_id=`).
Then either:
- A 20-line Node script (`scripts/fetch-social.mjs`) fetches the feed
  every hour via cron or GitHub Actions, parses `<entry>` items and
  writes `src/lib/social-generated.json` or a Firestore `social_posts`
  collection. The Social page merges generated items above the hardcoded
  ones.
- Or no code at all: use the free tier of **n8n**, **Make** or **Zapier**
  with trigger `RSS → new item` and action `Firestore → create document`.

### Option B — YouTube Data API v3 (free quota)
- Create a Google Cloud project, enable YouTube Data API v3, issue an
  API key (10,000 units a day free; `playlistItems.list` costs 1 unit).
- Poll `playlistItems` for the Uploads playlist every 30 minutes.
- Store `videoId`, `title`, `publishedAt`, `thumbnail` in Firestore.
- Same frontend merge as Option A. Quota is plenty for one channel.

### Option C — Facebook and Instagram via Meta Graph API (free, needs setup)
- Convert the Instagram account to Business or Creator and link it to
  the Facebook Page. Create a Meta app, add a long-lived Page token.
- Poll `GET /{page-id}/posts` for Facebook videos and
  `GET /{ig-user-id}/media?fields=id,caption,media_url,permalink,timestamp`
  for reels. Runs in the same cron or GitHub Action.
- Free, but tokens expire every 60 days, so store the token in a secret
  and add a refresh step. If that maintenance is too much, keep FB and IG
  manual and automate YouTube only (it carries most SEO value).

### Option D — No-code embed widgets (zero maintenance)
- **Juicer**, **Curator** or **Taggbox** free tiers aggregate YT, FB and
  IG by handle and render an embed. Paste one script tag on `/social`.
  Trade-off: third-party branding and weaker SEO than native cards.

### Recommended setup for this repo
1. Add a Firestore collection `social_posts` with fields
   `platform, url, videoId, title, desc, thumbnail, publishedAt, status`.
2. Add `scripts/fetch-social.mjs` implementing Option A for YouTube now
   and Option C later. Run it from GitHub Actions on a schedule and on
   demand (`workflow_dispatch` for the social media manager).
3. Change `Social.jsx` and the homepage slider to read
   `useLiveCollection("social_posts", SOCIAL_POSTS)` so new published
   docs appear automatically, with the hardcoded list as fallback.
4. Keep this file updated with the channel ID and the Meta app ID once
   the team confirms them.

### Sample sketch (RSS to Firestore)
```js
// scripts/fetch-social.mjs
import { fetch } from "undici";
const CHANNEL_ID = "PASTE_CHANNEL_ID";
const res = await fetch(
  `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
);
const xml = await res.text();
// parse <entry> <yt:videoId> <title> <published> with a tiny regex
// or feed parser, then upsert each videoId into social_posts.
console.log("entries found, upsert to Firestore here");
```
