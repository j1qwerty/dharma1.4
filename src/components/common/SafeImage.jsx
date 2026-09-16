import React, { useState } from "react";

export const PLACEHOLDER = "/images/placeholder.svg";

/* SafeImage - <img> with automatic fallback to the local placeholder
 * when the remote src 404s or fails offline. Keeps every section visual.
 *
 * referrerPolicy="no-referrer" — many image hosts (Shutterstock, Imgur,
 * Pixiv, Wikimedia) reject <img> requests that carry a foreign Referer
 * header (hotlink protection). Stripping the referrer makes the request
 * look like a direct browser visit, so external URLs render reliably. */
export default function SafeImage({ src, alt = "", className = "", ...rest }) {
  const [failed, setFailed] = useState(false);
  const finalSrc = !src || failed ? PLACEHOLDER : src;
  return (
    <img
      src={finalSrc}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      className={className}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}

/* picsumSeed - deterministic working placeholder photo (always 200).
 * Used to replace broken unsplash IDs in data. */
export function picsumSeed(seed, w = 1500, h = 1000) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}
