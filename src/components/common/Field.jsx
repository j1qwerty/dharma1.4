import React from "react";
export default function Field({ label, helper, ...props }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input {...props} />
      {helper && <small className="text-muted">{helper}</small>}
    </div>
  );
}
