// ImageField v2 — clear separation of external URL vs local /public path.
// Auto-detects mode based on the value:
//   - "https://..." / "http://" → external URL mode (file picker hidden)
//   - "/something" or relative → local path mode (file checker shown)
// Picking a file only CHECKS dimensions/aspect — never auto-uploads.
import { useRef, useState } from "react";
import { imageRuleFor } from "../../lib/content";
import { validateImageFile, recommendedLine } from "../../lib/images";
import { Field, TextInput } from "./ui";

function detectMode(v) {
  if (!v) return "url";
  if (/^https?:\/\//i.test(v)) return "url";
  if (/^data:image\//i.test(v)) return "url";
  return "local";
}

// Heuristic: does this URL point to an actual image file?
// Returns { ok, reason } so we can show a helpful message instead of
// the misleading "did not load / CORS" error when the user pastes a
// webpage URL like https://www.shutterstock.com/discover/free-nature-images
function classifyImageUrl(v) {
  if (!v) return { ok: true };
  // data: URLs are always images (we already restricted to data:image/)
  if (/^data:image\//i.test(v)) return { ok: true };
  // Relative /public paths — skip the check
  if (!/^https?:\/\//i.test(v)) return { ok: true };

  // Look at the path (ignore query/hash) for an image extension.
  let path = "";
  try {
    const u = new URL(v);
    path = u.pathname.toLowerCase();
  } catch {
    path = v.toLowerCase();
  }
  // Strip trailing slash
  path = path.replace(/\/+$/, "");
  const hasImgExt = /\.(jpe?g|png|webp|gif|svg|avif|bmp|ico)(\/|$)/.test(path);
  // Common image CDNs that use query-string transforms (no extension on path)
  const cdnHosts = [
    "images.unsplash.com",
    "cdn.jsdelivr.net",
    "res.cloudinary.com",
    "firebasestorage.googleapis.com",
    "storage.googleapis.com",
    "picsum.photos",
    "images.pexels.com",
    "media.istockphoto.com",
    "stockphoto.com",
  ];
  let isCdn = false;
  try {
    const host = new URL(v).hostname.toLowerCase();
    isCdn = cdnHosts.some((h) => host === h || host.endsWith("." + h));
  } catch { /* ignore */ }

  if (hasImgExt) return { ok: true };
  if (isCdn) return { ok: true };

  // Looks like a webpage — give the real reason.
  return {
    ok: false,
    reason: "not-image",
    message: "This looks like a webpage URL, not a direct image link. Open the image on the source page, right-click → “Copy image address”, and paste that here (it should end in .jpg / .png / .webp).",
  };
}

export default function ImageField({ label = "Image", collection, value, onChange }) {
  const rule = imageRuleFor(collection);
  const [warnings, setWarnings] = useState([]);
  const [info, setInfo] = useState(null);
  const [fileName, setFileName] = useState("");
  const [checking, setChecking] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [loadErrorMsg, setLoadErrorMsg] = useState(null);
  const [dismissed, setDismissed] = useState(false);
  // Force mode only when user clicks the toggle; otherwise auto-detect.
  const [overrideMode, setOverrideMode] = useState(null);
  const fileRef = useRef(null);

  const mode = overrideMode || detectMode(value);
  const urlClassification = mode === "url" ? classifyImageUrl(value) : { ok: true };

  const checkFile = async (f) => {
    if (!f) return;
    setFileName(f.name);
    setChecking(true);
    try {
      const res = await validateImageFile(f, collection);
      setWarnings(res.warnings);
      setInfo(
        res.info?.dimensions
          ? `${res.info.dimensions} · ${res.info.size}`
          : res.info?.size || null
      );
    } finally {
      setChecking(false);
    }
  };

  const onFile = (e) => {
    checkFile(e.target.files?.[0]);
    e.target.value = "";
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    checkFile(e.dataTransfer.files?.[0]);
  };

  const onUrlChange = (e) => {
    onChange(e.target.value);
    setUrlError(false);
    setLoadErrorMsg(null);
    setDismissed(false);
    setOverrideMode(null);
  };

  return (
    <Field label={label} hint={recommendedLine(collection)}>
      {/* Mode segmented control */}
      <div className="ad-img-mode-row" role="tablist" aria-label="Image source">
        <button
          type="button"
          className={`ad-img-mode-btn ${mode === "url" ? "active" : ""}`}
          onClick={() => setOverrideMode("url")}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
          </svg>
          External URL
        </button>
        <button
          type="button"
          className={`ad-img-mode-btn ${mode === "local" ? "active" : ""}`}
          onClick={() => setOverrideMode("local")}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          Local /public path
        </button>
      </div>

      {/* Preview */}
      {value ? (
        <span className="ad-img-preview">
          <img
            src={value}
            alt=""
            // Match the public site's referrer policy so the admin
            // preview accurately reflects what visitors will see.
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              // Only show a load error if we actually expected this URL
              // to be an image (classification said ok). Otherwise the
              // synchronous "not-image" hint below already explains it.
              if (urlClassification.ok) {
                setLoadErrorMsg("This image URL failed to load. The host may be down, the file may have moved, or hotlinking may be blocked by the source site.");
              }
              setUrlError(true);
            }}
            onLoad={() => { setUrlError(false); setLoadErrorMsg(null); }}
          />
          <span className="ad-img-preview-tag">
            {mode === "url" ? "External" : "Local"}
          </span>
          <span className="ad-img-bar">
            <span className="ad-img-url-chip" title={value}>{value}</span>
            <button
              type="button"
              className="ad-btn ad-btn-ghost ad-btn-sm"
              onClick={() => {
                onChange("");
                setFileName("");
                setWarnings([]);
                setInfo(null);
                setUrlError(false);
                setLoadErrorMsg(null);
                setDismissed(false);
                setOverrideMode(null);
              }}
            >
              Remove
            </button>
          </span>
        </span>
      ) : (
        <span className="ad-img-empty">
          <span className="ad-img-empty-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </span>
          <span>
            {mode === "url"
              ? "Paste a full https:// URL on the right — preview appears here."
              : "Paste a /public path on the right, or check a local file below."}
          </span>
        </span>
      )}

      {/* URL hint / error — accurate, dismissible, never scary */}
      {value && !dismissed && !urlClassification.ok && urlClassification.message && (
        <div className="ad-msg ad-msg-warn" style={{ marginTop: 8, display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px" }}>
          <span style={{ flex: 1, lineHeight: 1.5 }}>{urlClassification.message}</span>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setDismissed(true)}
            style={{
              background: "transparent",
              border: 0,
              color: "var(--adm-muted)",
              cursor: "pointer",
              fontSize: 14,
              lineHeight: 1,
              padding: 0,
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>
      )}
      {value && !dismissed && loadErrorMsg && (
        <div className="ad-msg ad-msg-error" style={{ marginTop: 8, display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px" }}>
          <span style={{ flex: 1, lineHeight: 1.5 }}>{loadErrorMsg}</span>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setDismissed(true)}
            style={{
              background: "transparent",
              border: 0,
              color: "var(--adm-muted)",
              cursor: "pointer",
              fontSize: 14,
              lineHeight: 1,
              padding: 0,
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* URL input */}
      <div style={{ display: "flex", gap: 8, alignItems: "stretch", marginTop: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <TextInput
            value={value || ""}
            placeholder={
              mode === "url"
                ? "https://images.unsplash.com/photo-… (full URL)"
                : "/puja/maha-rudra.jpg  (path inside /public)"
            }
            onChange={onUrlChange}
            aria-label={`${label} ${mode === "url" ? "URL" : "path"}`}
          />
        </div>
      </div>

      {/* File picker — only relevant for local-path mode */}
      {mode === "local" && (
        <>
          <span
            role="button"
            tabIndex={0}
            aria-label="Check an image file against the recommended size"
            onClick={() => fileRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") fileRef.current?.click();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={`ad-img-drop ${dragOver ? "drag" : ""}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>
              {checking
                ? "Checking image…"
                : fileName
                  ? `Checked: ${fileName} — pick another?`
                  : "Drop a local file to check size / aspect"}
            </span>
          </span>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onFile}
            className="sr-only"
            style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
            tabIndex={-1}
            aria-hidden="true"
          />
        </>
      )}

      <p className="ad-img-info">
        {mode === "url"
          ? <>External URLs are used as-is on the live site. The site sends <code className="ad-code">referrerPolicy="no-referrer"</code> so hosts with hotlink protection (Shutterstock, Imgur, Pixiv, Wikimedia) render reliably. Use a direct image link (ends in <code className="ad-code">.jpg</code> / <code className="ad-code">.png</code> / <code className="ad-code">.webp</code>) or a known CDN (Unsplash, Cloudinary, Firebase Storage).</>
          : <>Local paths must point to a file inside <code className="ad-code">/public</code>. Picking a file only checks its dimensions — it does NOT upload it; you still need to add the file to <code className="ad-code">/public</code> yourself.</>
        }
        {info && <span> Last checked: <strong>{info}</strong>.</span>}
      </p>

      {warnings.length > 0 && (
        <div style={{ display: "grid", gap: 4, marginTop: 6 }}>
          {warnings.map((w, i) => (
            <p key={i} className="ad-msg ad-msg-warn" style={{ padding: "6px 10px" }}>⚠ {w}</p>
          ))}
        </div>
      )}
      {fileName && warnings.length === 0 && !checking && (
        <p className="ad-msg ad-msg-success" style={{ marginTop: 6, padding: "6px 10px" }}>
          ✓ {fileName} looks good for {rule.label} ({rule.recommended}).
        </p>
      )}
    </Field>
  );
}
