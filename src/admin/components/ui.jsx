// Shared admin form primitives — same look as the site (panel-dt / btn-*).
export function Field({ label, hint, children }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span className="text-xs font-semibold">{label}</span>
      {children}
      {hint && <span className="text-[11px] muted-dt">{hint}</span>}
    </label>
  );
}

const inputCls =
  "h-11 rounded-xl border border-dt bg-transparent px-3 text-sm outline-none w-full";

export function TextInput(props) {
  return <input {...props} className={`${inputCls} ${props.className || ""}`} />;
}

export function NumberInput(props) {
  return <input type="number" {...props} className={`${inputCls} ${props.className || ""}`} />;
}

export function DateTimeInput(props) {
  return <input type="datetime-local" {...props} className={`${inputCls} ${props.className || ""}`} />;
}

export function TextArea({ rows = 3, ...props }) {
  return (
    <textarea
      rows={rows}
      {...props}
      className={`rounded-xl border border-dt bg-transparent px-3 py-2 text-sm outline-none w-full ${props.className || ""}`}
    />
  );
}

export function Select({ children, ...props }) {
  return (
    <select {...props} className={`${inputCls} ${props.className || ""}`}>
      {children}
    </select>
  );
}

export function Toggle({ label, desc, value, onChange }) {
  return (
    <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1"
        style={{ width: 18, height: 18 }}
      />
      <span>
        <span className="block text-sm font-semibold">{label}</span>
        {desc && <span className="block text-xs muted-dt mt-1">{desc}</span>}
      </span>
    </label>
  );
}

export function StatusBadge({ status }) {
  const color =
    status === "published" ? "#1e7e34" : status === "deleted" ? "#b3261e" : "#8a6d1b";
  return (
    <span
      className="text-[11px] font-semibold"
      style={{ color, border: `1px solid ${color}44`, borderRadius: 999, padding: "2px 10px" }}
    >
      {status || "—"}
    </span>
  );
}

export function FormRow({ children }) {
  return <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>{children}</div>;
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
