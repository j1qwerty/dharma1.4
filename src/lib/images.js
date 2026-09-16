// Image validation for admin uploads — soft limits + crop guidance.
// Recommended sizes come from src/lib/content.js IMAGE_RULES (measured from
// current render sizes + public/ assets). We never hard-block: oversize or
// wrong-aspect images show a warning + crop hint, admin decides.
import { imageRuleFor } from "./content";

export function formatMB(bytes) {
  return `${(bytes / 1048576).toFixed(2)} MB`;
}

function readDimensions(file) {
  return new Promise((resolve) => {
    try {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        const out = { width: img.naturalWidth, height: img.naturalHeight };
        URL.revokeObjectURL(url);
        resolve(out);
      };
      img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
      img.src = url;
    } catch { resolve(null); }
  });
}

function parseAspect(aspect) {
  if (!aspect || aspect === "free") return null;
  const m = String(aspect).match(/([\d.]+)\s*\/\s*([\d.]+)/);
  if (!m) return null;
  return Number(m[1]) / Number(m[2]);
}

/** Validate a File against the collection's rule. Returns {ok, warnings[], info}. */
export async function validateImageFile(file, collectionName) {
  const rule = imageRuleFor(collectionName);
  const warnings = [];
  const info = {
    name: file?.name || "",
    size: file ? formatMB(file.size) : "",
    rule: rule.recommended,
    aspect: rule.aspect,
  };
  if (!file) return { ok: false, warnings: ["No file selected."], info, rule };
  if (file.size > rule.maxMB * 1048576) {
    warnings.push(`Larger than recommended ${rule.maxMB} MB (got ${formatMB(file.size)}). Compress or resize before upload.`);
  }
  const dims = await readDimensions(file);
  if (dims) {
    info.dimensions = `${dims.width} × ${dims.height}`;
    const target = parseAspect(rule.aspect);
    if (target) {
      const actual = dims.width / Math.max(1, dims.height);
      const drift = Math.abs(actual - target) / target;
      if (drift > 0.12) warnings.push(`Aspect is ${actual.toFixed(2)}:1, recommended ${rule.aspect} (${rule.recommended}). Crop to ${rule.aspect} with subject centred.`);
    }
  } else {
    warnings.push("Could not read image dimensions — check the file is a valid image.");
  }
  return { ok: warnings.length === 0, warnings, info, rule, dims };
}

/** Human-readable "Recommended: ..." line for admin forms. */
export function recommendedLine(collectionName) {
  const r = imageRuleFor(collectionName);
  return `Recommended: ${r.recommended} (${r.aspect}) · max ${r.maxMB} MB · ${r.accept}. ${r.note}`;
}
