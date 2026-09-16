import { Link } from "react-router-dom";
import { useCollection, useDoc } from "../../lib/cms";
import { getActiveFestival, getPreviewNow } from "../../lib/schedule";
import { festivals as localFestivals } from "../../lib/data";

/* AnnouncementBar — missing section, now CMS-driven.
 * Source: live festival (visibility window) or site_settings/global.announcement.
 * Renders nothing when Firebase is unconfigured and no local fallback applies,
 * so existing Header notice-bar stays untouched. */
export default function AnnouncementBar() {
  const { data: remoteFestivals } = useCollection("festivals");
  const { data: settings } = useDoc("site_settings", "global");
  const { now } = getPreviewNow();

  const list = remoteFestivals?.length ? remoteFestivals : localFestivals;
  const active = getActiveFestival(list, now);
  const custom = settings?.announcement;

  const text = custom?.text || (active ? `${active.name} · ${active.date || ""}` : null);
  const link = custom?.link || (active ? "/pujas" : null);
  if (!text) return null;

  return (
    <div className="notice-bar" role="status" data-cms="announcementBar">
      <span>{text}</span>
      {link && (
        <>
          <span className="notice-dot" />
          <Link to={link} className="underline">Book now</Link>
        </>
      )}
    </div>
  );
}
