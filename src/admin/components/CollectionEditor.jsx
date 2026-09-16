// Generic CMS editor: ordered list (left) + form prefilled with current
// values (centre) + last-5 versions on the right (click refills the form).
// Used by every content section (pujas, festivals, homepage, stories,
// acharyas, testimonials). Festivals pass fullHistory to expose full audit.
import { useEffect, useMemo, useState } from "react";
import {
  createContent, getVersions, saveContent, softDeleteContent,
  useAdminCollection,
} from "../../lib/cmsAdmin";
import { useAuth } from "../../lib/auth";
import ImageField from "./ImageField";
import VersionPanel from "./VersionPanel";
import {
  DateTimeInput, Field, FormRow, NumberInput, Select, StatusBadge,
  TextArea, TextInput, Toggle, fromDateTimeLocal, toDateTimeLocal,
} from "./ui";

function emptyFromFields(fields) {
  const o = {};
  for (const f of fields) {
    if (f.type === "checkbox") o[f.key] = false;
    else if (f.type === "number") o[f.key] = "";
    else o[f.key] = "";
  }
  return o;
}

function docToForm(doc, fields) {
  const o = {};
  for (const f of fields) {
    let v = doc?.[f.key];
    if (f.type === "datetime") o[f.key] = toDateTimeLocal(v);
    else if (f.type === "list") o[f.key] = Array.isArray(v) ? v.join(", ") : (v || "");
    else if (f.type === "checkbox") o[f.key] = Boolean(v);
    else if (v == null) o[f.key] = "";
    else o[f.key] = v;
  }
  o._status = doc?.status || "draft";
  o._order = doc?.priority ?? doc?.order ?? "";
  return o;
}

function formToDoc(form, fields) {
  const o = {};
  for (const f of fields) {
    let v = form[f.key];
    if (f.type === "number") o[f.key] = v === "" ? null : Number(v);
    else if (f.type === "datetime") o[f.key] = fromDateTimeLocal(v);
    else if (f.type === "list") o[f.key] = String(v || "").split(",").map((s) => s.trim()).filter(Boolean);
    else if (f.type === "checkbox") o[f.key] = Boolean(v);
    else o[f.key] = v === "" ? null : v;
  }
  return o;
}

export default function CollectionEditor({
  collection, title, subtitle, sharedNote,
  fields, orderField, fullHistory = false,
  fallbackRows = [], idField = "id",
}) {
  const { user } = useAuth();
  const { rows, loading, remote } = useAdminCollection(collection);
  const [selectedId, setSelectedId] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [newId, setNewId] = useState("");
  const [form, setForm] = useState(() => ({ ...emptyFromFields(fields), _status: "draft", _order: "" }));
  const [versions, setVersions] = useState([]);
  const [msg, setMsg] = useState(null);
  const [saving, setSaving] = useState(false);

  const list = useMemo(() => {
    const live = remote ? (rows || []) : fallbackRows;
    const sorted = [...live];
    if (orderField) sorted.sort((a, b) => (a[orderField] ?? 999) - (b[orderField] ?? 999));
    return sorted;
  }, [rows, remote, fallbackRows, orderField]);

  const selected = useMemo(
    () => list.find((d) => (d[idField] || d.id) === selectedId) || null,
    [list, selectedId, idField]
  );

  // Prefill form with CURRENT values whenever selection changes.
  useEffect(() => {
    if (selected) {
      setForm(docToForm(selected, fields));
      setIsNew(false);
      setMsg(null);
      getVersions(collection, selected.id).then(setVersions).catch(() => setVersions([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const startNew = () => {
    setIsNew(true);
    setSelectedId(null);
    setNewId("");
    setForm({ ...emptyFromFields(fields), _status: "draft", _order: list.length });
    setVersions([]);
    setMsg(null);
  };

  const onSave = async () => {
    setSaving(true);
    setMsg(null);
    try {
      const data = formToDoc(form, fields);
      if (orderField) data[orderField] = form._order === "" ? null : Number(form._order);
      if (isNew) {
        const id = (newId || data.title || data.name || data.key || "").trim();
        const created = await createContent(collection, { ...data, ...(id ? { id } : {}) }, user, { status: form._status });
        setMsg(`Created "${created}" as ${form._status}.`);
        setSelectedId(created);
        setIsNew(false);
      } else {
        await saveContent(collection, selected.id, data, user, { status: form._status });
        setMsg(`Saved "${selected.id}" (${form._status}). Previous state kept in versions.`);
        getVersions(collection, selected.id).then(setVersions).catch(() => {});
      }
    } catch (e) {
      setMsg(`Save failed: ${e.message}`);
    }
    setSaving(false);
  };

  const onDelete = async () => {
    if (!selected || !window.confirm(`Soft-delete "${selected.id}"? Kept in Trash for 30 days.`)) return;
    try {
      await softDeleteContent(collection, selected.id, user);
      setMsg(`"${selected.id}" moved to Trash (30 days).`);
      setSelectedId(null);
    } catch (e) {
      setMsg(`Delete failed: ${e.message}`);
    }
  };

  const onRestoreVersion = (data) => {
    setForm(docToForm({ ...selected, ...data }, fields));
    setMsg("Version loaded into the form — press Save to apply (restore is versioned).");
  };

  const renderInput = (f) => {
    const v = form[f.key] ?? "";
    if (f.type === "textarea") return <TextArea value={v} onChange={(e) => set(f.key, e.target.value)} placeholder={f.hint} />;
    if (f.type === "number") return <NumberInput value={v} onChange={(e) => set(f.key, e.target.value)} placeholder={f.hint} />;
    if (f.type === "datetime") return <DateTimeInput value={v} onChange={(e) => set(f.key, e.target.value)} />;
    if (f.type === "checkbox") return <Toggle label={f.label} desc={f.hint} value={v} onChange={(val) => set(f.key, val)} />;
    if (f.type === "select") return (
      <Select value={v || ""} onChange={(e) => set(f.key, e.target.value)}>
        <option value="">—</option>
        {(f.options || []).map((o) => <option key={o} value={o}>{o}</option>)}
      </Select>
    );
    if (f.type === "image") return <ImageField label={f.label} collection={collection} value={v} onChange={(val) => set(f.key, val)} />;
    return <TextInput value={v} onChange={(e) => set(f.key, e.target.value)} placeholder={f.hint} />;
  };

  return (
    <section>
      <div className="eyebrow">CMS · {collection}</div>
      <h1 className="display-dt" style={{ fontSize: 38, marginTop: 8 }}>{title}</h1>
      {subtitle && <p className="text-sm muted-dt mt-2">{subtitle}</p>}
      {sharedNote && <p className="text-xs muted-dt mt-2 panel-dt p-3">🔗 {sharedNote}</p>}
      {!remote && <p className="text-xs mt-3" style={{ color: "#8a6d1b" }}>Firebase not configured — showing local fallback values (read-only preview).</p>}

      <style>{`.admin-ed-grid{display:grid;gap:16px;grid-template-columns:250px minmax(0,1fr) 250px;margin-top:18px}.admin-ed-grid>*,.admin-ed-grid .panel-dt{min-width:0;overflow-wrap:anywhere}@media(max-width:1100px){.admin-ed-grid{grid-template-columns:1fr}}`}</style>
      <div className="admin-ed-grid">
        <div className="panel-dt p-4" style={{ alignSelf: "start", minWidth: 0, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
            <h3 className="text-sm font-semibold" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Items ({list.length})</h3>
            <button className="btn-ghost-dt text-xs" style={{ flexShrink: 0 }} onClick={startNew} disabled={!remote}>+ New</button>
          </div>
          <div style={{ display: "grid", gap: 6, marginTop: 12, minWidth: 0 }}>
            {loading && <p className="text-xs muted-dt">Loading…</p>}
            {list.map((d) => {
              const id = d[idField] || d.id;
              const active = id === selectedId;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedId(id)}
                  className="text-left"
                  title={d.title || d.name || d.key || id}
                  style={{
                    width: "100%", minWidth: 0, overflow: "hidden",
                    padding: "8px 10px", borderRadius: 10, fontSize: 13,
                    background: active ? "rgba(231,182,49,.16)" : "transparent",
                    border: "1px solid var(--border-dt,#e8e0cf)", fontWeight: active ? 700 : 500,
                  }}
                >
                  <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>
                    {d.title || d.name || d.key || id}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0, marginTop: 2 }}>
                    <span className="text-[11px] muted-dt" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0 }}>{id}</span>
                    <span style={{ flexShrink: 0 }}><StatusBadge status={d.status} /></span>
                  </span>
                </button>
              );
            })}
            {!loading && list.length === 0 && <p className="text-xs muted-dt">Empty — run <code>node scripts/seedFirestore.mjs</code>.</p>}
          </div>
        </div>

        <div className="panel-dt p-5">
          {!selected && !isNew && <p className="text-sm muted-dt">Select an item on the left to edit its current values, or create new.</p>}
          {(selected || isNew) && (
            <div style={{ display: "grid", gap: 14 }}>
              {isNew && (
                <Field label="Document ID" hint="Lowercase slug, e.g. maha-rudra-special. Auto from title if empty.">
                  <TextInput value={newId} onChange={(e) => setNewId(e.target.value)} placeholder="auto-from-title" />
                </Field>
              )}
              <FormRow>
                <Field label="Status">
                  <Select value={form._status} onChange={(e) => set("._status", e.target.value)}>
                    <option value="published">published (live)</option>
                    <option value="draft">draft (hidden)</option>
                  </Select>
                </Field>
                {orderField && (
                  <Field label={orderField === "priority" ? "Priority (order)" : "Order"} hint="Lower shows first on site.">
                    <NumberInput value={form._order} onChange={(e) => set("._order", e.target.value)} />
                  </Field>
                )}
              </FormRow>
              {fields.map((f) => (
                f.type === "checkbox"
                  ? <div key={f.key}>{renderInput(f)}</div>
                  : <Field key={f.key} label={f.label} hint={f.type === "list" ? "Comma-separated" : undefined}>{renderInput(f)}</Field>
              ))}
              {msg && <p className="text-xs muted-dt">{msg}</p>}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button className="btn-gold-dt" onClick={onSave} disabled={saving || !remote}>
                  {saving ? "Saving…" : isNew ? "Create" : "Save changes"}
                </button>
                {!isNew && (
                  <button className="btn-ghost-dt" onClick={onDelete} disabled={!remote}>
                    Soft-delete (30-day trash)
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="panel-dt p-4" style={{ alignSelf: "start" }}>
          <VersionPanel
            collection={collection}
            docId={selected?.id}
            versions={versions}
            fullHistory={fullHistory}
            onRestore={onRestoreVersion}
          />
        </div>
      </div>
    </section>
  );
}
