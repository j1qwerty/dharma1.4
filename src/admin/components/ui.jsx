// Shared admin form primitives. Uses ad-* classnames from admin.css v2.
export function Field({ label, hint, children }) {
  return (
    <label className="ad-field">
      <span className="ad-field-label">{label}</span>
      {children}
      {hint && <span className="ad-field-hint">{hint}</span>}
    </label>
  );
}

export function TextInput(props) {
  const { className = "", ...rest } = props;
  return <input {...rest} className={`ad-input ${className}`} />;
}

export function NumberInput(props) {
  const { className = "", ...rest } = props;
  return <input type="number" {...rest} className={`ad-input ${className}`} />;
}

export function DateTimeInput(props) {
  const { className = "", ...rest } = props;
  return <input type="datetime-local" {...rest} className={`ad-input ${className}`} />;
}

export function TextArea({ rows = 3, ...props }) {
  const { className = "", ...rest } = props;
  return <textarea rows={rows} {...rest} className={`ad-textarea ${className}`} />;
}

export function Select({ children, ...props }) {
  const { className = "", ...rest } = props;
  return (
    <select {...rest} className={`ad-select ${className}`}>
      {children}
    </select>
  );
}

export function Toggle({ label, desc, value, onChange }) {
  return (
    <label className="ad-toggle">
      <input
        type="checkbox"
        className="ad-toggle-input"
        checked={Boolean(value)}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="ad-toggle-switch" aria-hidden="true" />
      <span>
        <span className="ad-toggle-label">{label}</span>
        {desc && <span className="ad-toggle-desc">{desc}</span>}
      </span>
    </label>
  );
}

export function StatusBadge({ status }) {
  const cls = status === "published" ? "published" : status === "deleted" ? "deleted" : "draft";
  return (
    <span className={`ad-badge ${cls}`}>
      <span className="ad-badge-dot" aria-hidden="true" />
      {status || "—"}
    </span>
  );
}

export function FormRow({ children }) {
  return <div className="ad-form-row">{children}</div>;
}

// Firestore Timestamp | ISO string | Date | datetime-local string → datetime-local value.
export function toDateTimeLocal(v) {
  try {
    const d = v?.toDate?.() || (v ? new Date(v) : null);
    if (!d || Number.isNaN(d.getTime())) return "";
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
  } catch {
    return "";
  }
}

export function fromDateTimeLocal(v) {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}
