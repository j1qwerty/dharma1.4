import React, { useMemo } from "react";
import { prepare, layout } from "@chenglou/pretext";
import { Reveal, ParallaxImage } from "./Motion";

function measureExcerpt(text) {
  try {
    const handle = prepare(text, "12px Arial");
    return layout(handle, 360, 20).height;
  } catch {
    return 80;
  }
}

function MasonryItem({ item, index, render }) {
  const minHeight = useMemo(
    () => Math.max(52, measureExcerpt(item.excerpt || item.title || "")),
    [item.excerpt, item.title]
  );
  return (
    <Reveal delay={index * 0.04} className="masonry-item-dt">
      {render(item, { minHeight })}
    </Reveal>
  );
}

export function StoryMasonry({ items, render }) {
  return (
    <div className="masonry-dt">
      {items.map((item, i) => (
        <MasonryItem key={item.id || i} item={item} index={i} render={render} />
      ))}
    </div>
  );
}

export function ImageMasonry({ items }) {
  return (
    <div className="gallery-masonry-dt">
      {items.map((src, i) => (
        <Reveal key={src} delay={i * 0.04}>
          <ParallaxImage
            src={src}
            alt="DharmaTribe ritual"
            className={`w-full ${i % 4 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"}`}
            strength={10}
          />
        </Reveal>
      ))}
    </div>
  );
}
