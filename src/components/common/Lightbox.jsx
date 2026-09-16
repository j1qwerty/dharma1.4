import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowLeft, ArrowRight, MagnifyingGlassPlus } from "@phosphor-icons/react";

/* ------------------------------------------------------------------ *
 * Lightbox - a fullscreen image viewer with prev/next nav, Escape to
 * close, ArrowLeft/ArrowRight to navigate, click backdrop to dismiss.
 * Portal-rendered, reduced-motion safe, focus-trapped while open.
 * ------------------------------------------------------------------ */
export default function Lightbox({ images, index, onClose, onIndex }) {
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
      else if (e.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
    },
    [index, images.length, onClose, onIndex]
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleKey]);

  if (typeof document === "undefined") return null;
  const current = images[index];

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="lightbox-dt"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
      >
        <motion.div
          className="lightbox-inner-dt"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="lightbox-close-dt" onClick={onClose} aria-label="Close viewer">
            <X size={18} />
          </button>
          {images.length > 1 && (
            <>
              <button
                className="lightbox-nav-dt lightbox-prev-dt"
                onClick={() => onIndex((index - 1 + images.length) % images.length)}
                aria-label="Previous image"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                className="lightbox-nav-dt lightbox-next-dt"
                onClick={() => onIndex((index + 1) % images.length)}
                aria-label="Next image"
              >
                <ArrowRight size={18} />
              </button>
              <div className="lightbox-counter-dt">
                {index + 1} / {images.length}
              </div>
            </>
          )}
          <img src={current.src} alt={current.alt || ""} />
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

/* A clickable gallery tile wrapper that opens the lightbox. */
export function GalleryTile({ images, startIdx, children, className = "" }) {
  const [open, setOpen] = React.useState(false);
  const [idx, setIdx] = React.useState(startIdx || 0);
  return (
    <>
      <button
        type="button"
        className={`gallery-tile-dt ${className}`}
        onClick={() => {
          setIdx(startIdx || 0);
          setOpen(true);
        }}
        aria-label="Open image viewer"
      >
        {children}
        <span className="gallery-tile-zoom-dt">
          <MagnifyingGlassPlus size={16} />
        </span>
      </button>
      {open && (
        <Lightbox images={images} index={idx} onIndex={setIdx} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
