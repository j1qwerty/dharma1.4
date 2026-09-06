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

## Run

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

The sandbox used for this delivery could not complete npm dependency installation because package-network access timed out, so a local production build could not be honestly reported as executed in this environment.
