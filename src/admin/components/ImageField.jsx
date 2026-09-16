// Image field: current value preview + URL edit + optional file check.
// Shows the recommended size from IMAGE_RULES, validates picked files
// (size + dimensions + aspect) and suggests a crop — never hard-blocks.
import { useState } from "react";
import { imageRuleFor } from "../../lib/content";
import { validateImageFile, recommendedLine } from "../../lib/images";
import { Field, TextInput } from "./ui";

export default function ImageField({ label = "Image", collection, value, onChange }) {
  const rule = imageRuleFor(collection);
  const [warnings, setWarnings] = useState([]);
  const [info, setInfo] = useState(null);
  const [checking, setChecking] = useState(false);

  const onFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setChecking(true);
    const res = await validateImageFile(f, collection);
    setChecking(false);
    setWarnings(res.warnings);
    setInfo(res.info?.dimensions ? `${res.info.dimensions} · ${res.info.size}` : res.info?.size || null);
  };

  return (
    <Field label={label} hint={recommendedLine(collection)}>
      {value && (
        <span style={{ display: "block", marginBottom: 8 }}>
          <img
            src={value}
            alt=""
            style={{ width: "100%", maxHeight: 180, objectFit: "cover", borderRadius: 12, border: "1px solid var(--border-dt,#e8e0cf)" }}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <span className="text-[11px] muted-dt" style={{ wordBreak: "break-all" }}>{value}</span>
        </span>
      )}
      <TextInput
        value={value || ""}
        placeholder={`/puja/… or https://… (${rule.recommended})`}
        onChange={(e) => onChange(e.target.value)}
      />
      <span style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8, flexWrap: "wrap" }}>
        <input type="file" accept="image/*" onChange={onFile} className="text-xs" />
        {checking && <span className="text-xs muted-dt">Checking…</span>}
        {info && <span className="text-[11px] muted-dt">Picked: {info}</span>}
      </span>
      {warnings.length > 0 && (
        <span style={{ display: "grid", gap: 4, marginTop: 6 }}>
          {warnings.map((w, i) => (
            <span key={i} className="text-[11px]" style={{ color: "#8a6d1b" }}>⚠ {w}</span>
          ))}
        </span>
      )}
    </Field>
  );
}
