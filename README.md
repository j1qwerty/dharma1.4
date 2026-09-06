# DharmaTribe Phase 1 premium prototype

A React + Vite + Tailwind CSS v4 prototype for DharmaTribe. The visual direction follows the supplied DharmaTribe design board and the provided Taste Skill. The build uses cream/off-white surfaces, charcoal ritual scenes, yellow-gold as the single brand accent, serif display typography, asymmetric layouts, editorial masonry, and restrained motion.

## Included Phase 1 routes

- Home
- Puja Catalog / Explore Pujas
- Puja Detail
- Booking: Date / Slot
- Booking: Package & Add-ons
- Booking: Sankalp Details
- Booking: Delivery / Prasad
- Booking: Review & Payment
- Booking Confirmation
- Booking Tracking / Detail
- My Account / Dashboard
- My Bookings
- Stories Listing
- Story Detail
- About DharmaTribe
- Login
- Registration
- OTP / Verification
- Terms & Conditions
- Privacy Policy

## Stack

- React 19
- Vite
- Tailwind CSS v4 using `@tailwindcss/vite`
- Motion for scroll reveal, parallax and interaction states
- Phosphor Icons
- `@chenglou/pretext` for lightweight text measurement used by the Story Masonry surface
- React Router

## Design notes

The generated design boards in `public/` are kept as visual references. Production photography can replace the remote image URLs in `src/lib/data.js` without changing the page structure.

The homepage hero intentionally uses the same visual device shown in the reference board: a dark cinematic image, warm gold copy, and large cream circular cut-outs at the bottom corners. There is no Three.js or WebGL dependency.

The Story pages use a CSS masonry surface with Pretext-based text height estimation. The masonry collapses to a strict single column below 768px.

## Phase 1.4 redesign notes

A design pass improved the aesthetic, motion and detail layer on top of the existing Phase 1 structure. No information architecture, routes or content were changed.

- **Hero coins refined.** The flat yellow balls at the bottom corners of the home hero are now layered gold `SacredMedallion` discs: raised outer rim, beaded edge, radial sunburst rays, an engraved lotus in the centre and a soft glow. They hang from the curve with a faint thread and float gently (reduced-motion safe).
- **Transparent branch / sacred-motif decor.** A new `src/components/common/Decor.jsx` library renders low-opacity line-art `LeafBranch`, `LotusLine`, `MandalaRings`, `TempleArch`, `DiyaLamp` and `Kalash` motifs as section backgrounds across every page, tinted to the section (ink sections get gold-on-dark, light sections get soft brown).
- **One rounded curve per secondary page.** A reusable `SectionCurve` (`src/components/common/SectionCurve.jsx`) drops the home-hero curve device onto exactly one hero/section per secondary page (About, Catalog, PujaDetail, Stories, StoryDetail, Dashboard, MyBookings), with mini medallions on the two side corners and a centre drop.
- **Motion layer.** Added: hero ken-burns drift, a slow scroll-driven `SpinDecor` mandala, a 3D pointer-tracking `TiltCard` for festival and temple cards, a gold shimmer sweep on buttons, a single restrained festival marquee, stat-counter hover pop, temple-card gold-frame hover. All gated behind `prefers-reduced-motion`.
- **Tailwind v4** unchanged (`@tailwindcss/vite`). All new styles live in `src/index.css` under a clearly marked Phase 1.4 section.

## Run

```bash
pnpm install
pnpm dev      # http://localhost:5183
pnpm build    # outputs dist/
```

The `dist/` folder is included in the delivery zip so the production build can be previewed without re-running install. The build was executed and verified in this environment.

