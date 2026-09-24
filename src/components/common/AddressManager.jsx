import React, { useState } from "react";
import { House, MapPin, PencilSimple, Trash, Crosshair } from "@phosphor-icons/react";
import { addAddress, deleteAddress, updateAddress, useAddresses, MAX_ADDRESSES, formatAddress } from "../../lib/addresses";
import { ux } from "../../lib/analytics";

const empty = { label: "Home", line1: "", line2: "", city: "", state: "", pincode: "", phone: "", notes: "", lat: null, lng: null, isDefault: false };

/* AddressManager — saved-addresses form + list, embedded in Dashboard. */
export default function AddressManager({ user }) {
  const { addresses, loading } = useAddresses(user);
  const [draft, setDraft] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [locating, setLocating] = useState(false);

  const onCaptureLocation = () => {
    if (!navigator?.geolocation) { setErr("Geolocation not supported by this browser."); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setDraft((d) => ({ ...d, lat: pos.coords.latitude, lng: pos.coords.longitude }));
        setLocating(false);
      },
      () => { setErr("Could not get your location. Check permissions."); setLocating(false); },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const submit = async (e) => {
    e?.preventDefault();
    setErr(null);
    if (!draft.line1 || !draft.city) { setErr("Address line 1 and city are required."); return; }
    setBusy(true);
    const fn = editingId ? updateAddress : addAddress;
    const userId = user?.uid;
    const res = editingId
      ? await fn(userId, editingId, draft)
      : await fn(userId, draft);
    setBusy(false);
    if (!res?.ok) {
      setErr(res?.error === "limit-reached" ? `You can save up to ${MAX_ADDRESSES} addresses.` : (res?.error || "Save failed."));
      return;
    }
    ux.addressAdded();
    setDraft(empty);
    setEditingId(null);
    window.location.reload();
  };

  const onEdit = (a) => {
    setEditingId(a.id);
    setDraft({ ...empty, ...a, id: undefined, createdAt: undefined, updatedAt: undefined });
    document.getElementById("address-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    await deleteAddress(user?.uid, id);
    window.location.reload();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_.8fr]">
      {/* Form */}
      <form id="address-form" onSubmit={submit} className="panel-dt p-6 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="display-dt text-2xl">{editingId ? "Edit address" : "Add address"}</h3>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setDraft(empty); }} className="text-xs muted-dt underline">
              Cancel
            </button>
          )}
        </div>
        <div className="mt-4 grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1 min-w-0">
              <span className="text-xs muted-dt">Label</span>
              <select
                value={draft.label}
                onChange={(e) => setDraft((d) => ({ ...d, label: e.target.value }))}
                className="h-10 w-full min-w-0 rounded-xl border border-dt bg-transparent px-3 text-sm"
              >
                {["Home", "Work", "Other"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <label className="grid gap-1 min-w-0">
              <span className="text-xs muted-dt">Phone</span>
              <input
                value={draft.phone}
                onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                placeholder="+91 98765 43210"
                className="h-10 w-full min-w-0 rounded-xl border border-dt bg-transparent px-3 text-sm"
              />
            </label>
          </div>
          <label className="grid gap-1 min-w-0">
            <span className="text-xs muted-dt">Address line 1 *</span>
            <input
              required
              value={draft.line1}
              onChange={(e) => setDraft((d) => ({ ...d, line1: e.target.value }))}
              placeholder="Flat / House no, Building"
              className="h-10 w-full min-w-0 rounded-xl border border-dt bg-transparent px-3 text-sm"
            />
          </label>
          <label className="grid gap-1 min-w-0">
            <span className="text-xs muted-dt">Address line 2</span>
            <input
              value={draft.line2}
              onChange={(e) => setDraft((d) => ({ ...d, line2: e.target.value }))}
              placeholder="Street, area"
              className="h-10 w-full min-w-0 rounded-xl border border-dt bg-transparent px-3 text-sm"
            />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="grid gap-1 min-w-0">
              <span className="text-xs muted-dt">City *</span>
              <input
                required
                value={draft.city}
                onChange={(e) => setDraft((d) => ({ ...d, city: e.target.value }))}
                className="h-10 w-full min-w-0 rounded-xl border border-dt bg-transparent px-3 text-sm"
              />
            </label>
            <label className="grid gap-1 min-w-0">
              <span className="text-xs muted-dt">State</span>
              <input
                value={draft.state}
                onChange={(e) => setDraft((d) => ({ ...d, state: e.target.value }))}
                className="h-10 w-full min-w-0 rounded-xl border border-dt bg-transparent px-3 text-sm"
              />
            </label>
            <label className="grid gap-1 min-w-0">
              <span className="text-xs muted-dt">Pincode</span>
              <input
                value={draft.pincode}
                onChange={(e) => setDraft((d) => ({ ...d, pincode: e.target.value }))}
                className="h-10 w-full min-w-0 rounded-xl border border-dt bg-transparent px-3 text-sm"
              />
            </label>
          </div>
          <label className="grid gap-1 min-w-0">
            <span className="text-xs muted-dt">Notes (optional)</span>
            <textarea
              rows={2}
              value={draft.notes}
              onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
              placeholder="Landmark, delivery instructions"
              className="w-full min-w-0 rounded-xl border border-dt bg-transparent px-3 py-2 text-sm"
            />
          </label>
          <div className="flex items-center gap-3 mt-1">
            <button
              type="button"
              onClick={onCaptureLocation}
              disabled={locating}
              className="btn-ghost-dt text-xs"
            >
              <Crosshair size={14} /> {locating ? "Locating…" : "Use current location"}
            </button>
            {draft.lat != null && draft.lng != null && (
              <span className="text-[11px] muted-dt">
                {draft.lat.toFixed(4)}, {draft.lng.toFixed(4)}
              </span>
            )}
          </div>
          {err && <p className="text-xs" style={{ color: "#b3261e" }}>{err}</p>}
          <button type="submit" disabled={busy} className="btn-gold-dt mt-2">
            {busy ? "Saving…" : editingId ? "Update address" : "Save address"}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="grid gap-3 self-start min-w-0">
        {loading && <p className="text-xs muted-dt">Loading…</p>}
        {!loading && addresses && addresses.length === 0 && (
          <div className="panel-dt p-6 text-center">
            <House size={28} className="mx-auto text-gold-600" />
            <p className="mt-3 text-sm muted-dt">No saved addresses yet.</p>
          </div>
        )}
        {addresses && addresses.map((a) => (
          <div key={a.id} className="panel-dt p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-[.14em] text-gold-600">{a.label}</div>
                <div className="mt-1 text-sm">{formatAddress(a)}</div>
                {a.phone && <div className="mt-1 text-xs muted-dt">{a.phone}</div>}
                {a.lat != null && (
                  <div className="mt-1 text-[11px] muted-dt">{a.lat.toFixed(4)}, {a.lng?.toFixed(4)}</div>
                )}
              </div>
              <div className="flex gap-1 flex-none">
                <button onClick={() => onEdit(a)} className="p-1.5 rounded hover:bg-black/5" aria-label="Edit address">
                  <PencilSimple size={14} />
                </button>
                <button onClick={() => onDelete(a.id)} className="p-1.5 rounded hover:bg-black/5" style={{ color: "#b3261e" }} aria-label="Delete address">
                  <Trash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {addresses && addresses.length >= MAX_ADDRESSES && (
          <p className="text-[11px] muted-dt">Limit of {MAX_ADDRESSES} reached. Delete one to add another.</p>
        )}
        {!user && (
          <p className="text-xs muted-dt inline-flex items-center gap-2">
            <MapPin size={14} /> Sign in to save addresses to your account.
          </p>
        )}
      </div>
    </div>
  );
}
