import { useLocation, useNavigate } from "react-router-dom";
import { getPreviewNow } from "../../lib/schedule";

/* PreviewBanner — shows when URL has ?cmsPreview=ISO (set from CMS “Preview as of”). */
export default function PreviewBanner() {
  const { search } = useLocation();
  const nav = useNavigate();
  const { preview } = getPreviewNow(search);
  if (!preview) return null;
  const exit = () => {
    const params = new URLSearchParams(search);
    params.delete("cmsPreview");
    nav({ search: params.toString() ? `?${params}` : "" }, { replace: true });
  };
  return (
    <div style={{ background: "#8a6d1b", color: "#fff", fontSize: 12, padding: "6px 12px", display: "flex", gap: 12, alignItems: "center", justifyContent: "center" }}>
      <span>Previewing site as of {preview.toLocaleString("en-IN")} (CMS schedule preview)</span>
      <button onClick={exit} style={{ textDecoration: "underline", fontWeight: 700 }}>Exit preview</button>
    </div>
  );
}
