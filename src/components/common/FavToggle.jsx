import React from "react";
import { Heart } from "@phosphor-icons/react";
import { useFavorites } from "../../lib/favorites";
import { useToast } from "./Toast";

/* ------------------------------------------------------------------ *
 * FavToggle - a heart button that toggles a puja in the wishlist.
 * `variant` = "photo" (over images, dark glass) | "light" (on light
 * surfaces). Fires a toast on toggle. Reduced-motion safe via CSS.
 * ------------------------------------------------------------------ */
export default function FavToggle({ id, title, variant = "photo", className = "", size = 17 }) {
  const { has, toggle } = useFavorites();
  const toast = useToast();
  const active = has(id);

  function onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    toggle(id);
    toast.push({
      type: "favorite",
      title: active ? "Removed from saved" : "Saved to your list",
      desc: active
        ? `${title} left your saved pujas.`
        : `${title} is in your saved pujas. Find it under My account.`,
    });
  }

  const cls =
    (variant === "light" ? "fav-toggle-light-dt" : "fav-toggle-dt") +
    (active ? " is-active" : "") +
    (className ? ` ${className}` : "");

  return (
    <button
      type="button"
      className={cls}
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? `Remove ${title} from saved` : `Save ${title}`}
      title={active ? "Saved" : "Save"}
    >
      <Heart size={size} weight={active ? "fill" : "regular"} />
    </button>
  );
}
