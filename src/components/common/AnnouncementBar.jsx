import { Link } from "react-router-dom";
import { useDoc } from "../../lib/cms";

/* AnnouncementBar — CMS-driven custom announcements only.
 * Festival promos were removed from the top bar; they now live in the
 * home page countdown section. Renders nothing unless a custom
 * site_settings/global.announcement is set, so the bar stays hidden. */
export default function AnnouncementBar() {
  const { data: settings } = useDoc("site_settings", "global");

  const custom = settings?.announcement;
  const text = custom?.text || null;
  const link = custom?.link || null;
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
