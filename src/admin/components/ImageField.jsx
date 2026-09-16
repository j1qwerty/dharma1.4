// Image field: current value preview + URL edit + styled file checker.
// Shows the recommended size from IMAGE_RULES, validates picked files
// (size + dimensions + aspect) and suggests a crop — never hard-blocks.
// Picking a file only CHECKS it (no auto-upload): paste the final URL or
// /public path into the URL box afterwards.
import { useRef, useState } from "react";
import { imageRuleFor } from "../../lib/content";
import { validateImageFile, recommendedLine } from "../../lib/images";
import { Field, TextInput } from "./ui";

export default function ImageField({ label = "Image", collection, value, onChange }) {
  const rule = imageRuleFor(collection);
  const [warnings, setWarnings] = useState([]);
  const [info, setInfo] = useState(null);
  const [fileName, setFileName] = useState("");
  const [checking, setChecking] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const fileRef = useRef(null);

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
    // Reset so picking the same file twice still fires onChange.
    e.target.value = "";
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    checkFile(e.dataTransfer.files?.[0]);
  };

  return (
    <Field label={label} hint={recommendedLine(collection)}>
      {value ? (
        <span
          style={{
            display: "block",
            border: "1px solid var(--border-dt,#e8e0cf)",
            borderRadius: 14,
            overflow: "hidden",
            background: "var(--surface-2,#efe7d9)",
          }}
        >
          <img
            src={value}
            alt=""
            style={{ width: "100%", maxHeight: 200, objectFit: "cover", display: "block" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              setUrlError(true);
            }}
            onLoad={() => setUrlError(false)}
          />
          <span
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 10px",
            }}
          >
            <span
              className="text-[11px] muted-dt"
              style={{
                wordBreak: "break-all",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                minWidth: 0,
                flex: 1,
              }}
              title={value}
            >
              {value}
            </span>
            <button
              type="button"
              className="underline text-xs"
              style={{ flexShrink: 0, cursor: "pointer" }}
              onClick={() => onChange("")}
            >
              Remove
            </button>
          </span>
        </span>
      ) : (
        <span
          style={{
            display: "grid",
            placeItems: "center",
            height: 120,
            borderRadius: 14,
            border: "1px dashed var(--line,rgba(24,22,17,.12))",
            background: "var(--surface-2,#efe7d9)",
            color: "var(--muted,#6a6458)",
            fontSize: 12,
          }}
        >
          No image set — paste a URL below or check a file.
        </span>
      )}
      {urlError && value && (
        <span className="text-[11px]" style={{ color: "#b3261e" }}>
          ⚠ This URL did not load as an image — check the path.
        </span>
      )}

      <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span style={{ flex: 1 }}>
          <TextInput
            value={value || ""}
            placeholder={`/puja/… or https://… (${rule.recommended})`}
            onChange={(e) => onChange(e.target.value)}
            aria-label={`${label} URL`}
          />
        </span>
        {value && (
          <button
            type="button"
            className="btn-ghost-dt text-xs"
            style={{ flexShrink: 0, cursor: "pointer" }}
            onClick={() => onChange("")}
          >
            Clear
          </button>
        )}
      </span>

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
        className="btn-ghost-dt text-xs"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          width: "100%",
          marginTop: 8,
          padding: "14px 16px",
          borderStyle: "dashed",
          cursor: "pointer",
          ...(dragOver
            ? { borderColor: "rgba(231,182,49,.7)", background: "rgba(231,182,49,.12)" }
            : null),
        }}
      >
        <span aria-hidden="true" style={{ fontSize: 15 }}>📁</span>
        <span>
          {checking
            ? "Checking image…"
            : fileName
              ? `Checked: ${fileName} — pick another?`
              : "Choose a file to check size / crop… or drop it here"}
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
      <span className="text-[11px] muted-dt">
        Picking a file only checks it against the recommended size — then paste the final URL or
        /public path above. {info && <span>Last checked: {info}.</span>}
      </span>

      {warnings.length > 0 && (
        <span style={{ display: "grid", gap: 4, marginTop: 6 }}>
          {warnings.map((w, i) => (
            <span key={i} className="text-[11px]" style={{ color: "#8a6d1b" }}>
              ⚠ {w}
            </span>
          ))}
        </span>
      )}
      {fileName && warnings.length === 0 && !checking && (
        <span className="text-[11px]" style={{ color: "#1e7e34" }}>
          ✓ {fileName} looks good for {rule.label} ({rule.recommended}).
        </span>
      )}
    </Field>
  );
}
