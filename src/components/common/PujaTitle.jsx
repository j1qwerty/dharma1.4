import React from "react";

export default function PujaTitle({ puja, lang }) {
  const title = lang === "hi" && puja.titleHi ? puja.titleHi : puja.title;
  const suffix = " (9 Nights of Shakti)";

  if (puja.id !== "navratri" || lang === "hi" || !title.endsWith(suffix)) {
    return title;
  }

  return (
    <>
      <span>{title.slice(0, -suffix.length)}</span>
      <span className="block whitespace-nowrap">(9 Nights of Shakti)</span>
    </>
  );
}
