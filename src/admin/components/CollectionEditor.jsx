// Generic CMS editor v2 — split-view with tabbed form.
// Left: searchable item list. Right: panel with header (title + meta),
// tabbed form sections (Overview / Content / Schedule / Image / Settings),
// and a sticky save bar at the bottom.
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

// Group fields into tabs.
function buildTabs(fields) {
  const tabs = [
    { key: "overview", label: "Overview", fields: [] },
    { key: "content", label: "Content", fields: [] },
    { key: "schedule", label: "Schedule", fields: [] },
    { key: "image", label: "Image", fields: [] },
    { key: "other", label: "More", fields: [] },
  ];
  for (const f of fields) {
    if (f.type === "image") tabs[3].fields.push(f);
    else if (f.type === "datetime") tabs[2].fields.push(f);
    else if (f.type === "textarea") tabs[1].fields.push(f);
    else if (["title", "titleHi", "name", "nameHi", "code", "deity", "tag", "type", "category", "read", "date", "eventDate", "countdownTo", "linkedPujaIds", "homepageTakeover", "key", "enabled", "place", "placeHi", "phone", "email", "price", "temple", "purpose"].includes(f.key)) tabs[0].fields.push(f);
    else tabs[4].fields.push(f);
  }
  // Remove empty tabs.
  return tabs.filter((t) => t.fields.length > 0);
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
  const [msgKind, setMsgKind] = useState("info");
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");

  const tabs = useMemo(() => buildTabs(fields), [fields]);

  const list = useMemo(() => {
    const live = remote ? (rows || []) : fallbackRows;
    let sorted = [...live];
    if (orderField) sorted.sort((a, b) => (a[orderField] ?? 999) - (b[orderField] ?? 999));
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      sorted = sorted.filter((d) =>
        String(d.title || d.name || d.key || d.id || "").toLowerCase().includes(q) ||
        String(d.id || "").toLowerCase().includes(q)
      );
    }
    return sorted;
  }, [rows, remote, fallbackRows, orderField, search]);

  const selected = useMemo(
    () => list.find((d) => (d[idField] || d.id) === selectedId) || null,
    [list, selectedId, idField]
  );

  useEffect(() => {
    if (selected) {
      setForm(docToForm(selected, fields));
      setIsNew(false);
      setMsg(null);
      getVersions(collection, selected.id).then(setVersions).catch(() => setVersions([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  // Reset to first tab when selection changes.
  useEffect(() => {
    if (tabs[0]) setActiveTab(tabs[0].key);
  }, [selectedId, isNew, tabs[0]?.key]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const startNew = () => {
    setIsNew(true);
    setSelectedId(null);
    setNewId("");
    setForm({ ...emptyFromFields(fields), _status: "draft", _order: list.length });
    setVersions([]);
    setMsg(null);
    if (tabs[0]) setActiveTab(tabs[0].key);
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
        setMsgKind("success");
        setSelectedId(created);
        setIsNew(false);
      } else {
        await saveContent(collection, selected.id, data, user, { status: form._status });
        setMsg(`Saved "${selected.id}" (${form._status}). Previous state kept in versions.`);
        setMsgKind("success");
        getVersions(collection, selected.id).then(setVersions).catch(() => {});
      }
    } catch (e) {
      setMsg(`Save failed: ${e.message}`);
      setMsgKind("error");
    }
    setSaving(false);
  };

  const onDelete = async () => {
    if (!selected || !window.confirm(`Soft-delete "${selected.id}"? Kept in Trash for 30 days.`)) return;
    try {
      await softDeleteContent(collection, selected.id, user);
      setMsg(`"${selected.id}" moved to Trash (30 days).`);
      setMsgKind("warn");
      setSelectedId(null);
    } catch (e) {
      setMsg(`Delete failed: ${e.message}`);
      setMsgKind("error");
    }
  };

  const onRestoreVersion = (data) => {
    setForm(docToForm({ ...selected, ...data }, fields));
    setMsg("Version loaded into the form — press Save to apply (restore is versioned).");
    setMsgKind("info");
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

  const msgCls = msgKind === "success" ? "ad-msg-success"
    : msgKind === "error" ? "ad-msg-error"
    : msgKind === "warn" ? "ad-msg-warn" : "ad-msg-info";

  const headTitle = isNew ? "New item" : (selected?.title || selected?.name || selected?.key || selected?.id || "Select an item");
  const headMeta = isNew ? (newId ? `id · ${newId}` : "id · auto from title") : (selected ? `id · ${selected.id}` : "");

  return (
    <div className="admin-root">
      <header className="ad-page-head">
        <div className="ad-page-head-text">
          <div className="ad-eyebrow">CMS · {collection}</div>
          <h1 className="ad-page-title">{title}</h1>
          {subtitle && <p className="ad-page-sub">{subtitle}</p>}
          {sharedNote && (
            <p className="ad-msg ad-msg-warn" style={{ marginTop: 12, maxWidth: 720 }}>
              <span aria-hidden="true">🔗</span>&nbsp;{sharedNote}
            </p>
          )}
          {!remote && (
            <p className="ad-msg ad-msg-warn" style={{ marginTop: 12, maxWidth: 720 }}>
              Firebase not configured — showing local fallback values (read-only preview).
            </p>
          )}
        </div>
        <div className="ad-page-actions">
          <button className="ad-btn ad-btn-gold ad-btn-sm" onClick={startNew} disabled={!remote}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New item
          </button>
        </div>
      </header>

      <div className="ad-ed">
        {/* Left column: item list */}
        <div className="ad-ed-col-list">
          <div className="ad-card ad-card-tight">
            <div className="ad-item-list-head">
              <span className="ad-item-list-title">Items · {list.length}</span>
            </div>
            <input
              className="ad-input ad-input-sm ad-item-search"
              type="search"
              placeholder="Search items…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="ad-item-list">
              {loading && <p className="ad-stat-foot">Loading…</p>}
              {list.map((d) => {
                const id = d[idField] || d.id;
                const active = id === selectedId;
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedId(id)}
                    className={`ad-item ${active ? "active" : ""}`}
                    title={d.title || d.name || d.key || id}
                  >
                    <span className="ad-item-title">
                      {d.title || d.name || d.key || id}
                    </span>
                    <span className="ad-item-meta">
                      <span className="ad-item-id">{id}</span>
                      <StatusBadge status={d.status} />
                    </span>
                  </button>
                );
              })}
              {!loading && list.length === 0 && (
                <p className="ad-stat-foot">
                  {search ? "No matches." : <>Empty — run <code className="ad-code">node scripts/seedFirestore.mjs</code>.</>}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Centre column: editor panel */}
        <div className="ad-ed-panel">
          <div className="ad-ed-head">
            <div style={{ minWidth: 0 }}>
              <div className="ad-ed-head-title">{headTitle}</div>
              {headMeta && <div className="ad-ed-head-meta">{headMeta}</div>}
            </div>
            {(selected || isNew) && <StatusBadge status={form._status} />}
          </div>

          {!selected && !isNew && (
            <div className="ad-ed-empty">
              <div className="ad-ed-empty-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </div>
              <p className="ad-ed-empty-text">
                Select an item from the list to edit its values, or use <strong>New item</strong> in the top right to create one.
              </p>
            </div>
          )}

          {(selected || isNew) && (
            <>
              {/* Tabs */}
              <div className="ad-tabs">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    className={`ad-tab ${activeTab === t.key ? "active" : ""}`}
                    onClick={() => setActiveTab(t.key)}
                    type="button"
                  >
                    {t.label}
                    <span className="ad-tab-count">{t.fields.length}</span>
                  </button>
                ))}
              </div>

              {/* Tab panel */}
              <div className="ad-tab-panel">
                {isNew && (
                  <div className="ad-tab-panel-section">
                    <div className="ad-tab-panel-section-title">Identity</div>
                    <Field label="Document ID" hint="Lowercase slug, e.g. maha-rudra-special. Auto from title if empty.">
                      <TextInput value={newId} onChange={(e) => setNewId(e.target.value)} placeholder="auto-from-title" />
                    </Field>
                  </div>
                )}

                {/* Status + order always visible */}
                <div className="ad-tab-panel-section">
                  <div className="ad-tab-panel-section-title">Status & ordering</div>
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
                </div>

                {/* Active tab fields */}
                {tabs.filter((t) => t.key === activeTab).map((t) => (
                  <div key={t.key} className="ad-tab-panel-section">
                    <div className="ad-tab-panel-section-title">{t.label}</div>
                    <div style={{ display: "grid", gap: 14 }}>
                      {t.fields.map((f) => (
                        f.type === "checkbox"
                          ? <div key={f.key}>{renderInput(f)}</div>
                          : <Field key={f.key} label={f.label} hint={f.type === "list" ? "Comma-separated" : undefined}>{renderInput(f)}</Field>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Sticky save bar */}
              <div className="ad-ed-foot">
                <div className="ad-ed-foot-msg">
                  {msg ? (
                    <span className={`ad-msg ${msgCls}`} style={{ display: "inline-block", padding: "6px 10px" }}>
                      {msg}
                    </span>
                  ) : (
                    <span>Changes are versioned. Soft-deletes go to Trash for 30 days.</span>
                  )}
                </div>
                <div className="ad-ed-foot-actions">
                  {!isNew && (
                    <button className="ad-btn ad-btn-danger ad-btn-sm" onClick={onDelete} disabled={!remote}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" />
                      </svg>
                      Soft-delete
                    </button>
                  )}
                  <button className="ad-btn ad-btn-primary" onClick={onSave} disabled={saving || !remote}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    {saving ? "Saving…" : isNew ? "Create" : "Save changes"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right column: version history */}
        <div className="ad-ed-col-versions">
          <div className="ad-card ad-card-tight">
            <VersionPanel
              collection={collection}
              docId={selected?.id}
              versions={versions}
              fullHistory={fullHistory}
              onRestore={onRestoreVersion}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
