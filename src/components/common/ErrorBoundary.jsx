// Root error boundary — guarantees the app never goes fully blank.
// If any render crash occurs (blocked third-party script, bad CMS data,
// unexpected null), users get a friendly fallback with reload instead of
// a white page. Analytics failures can never trigger this: every analytics
// call is guarded (see src/lib/analytics.js).
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    try {
      // Best-effort report; never throws back into render.
      import("../../lib/analytics").then((m) => {
        m.logError?.(`render: ${error?.message || error}`, true);
      }).catch(() => {});
    } catch { /* ignore */ }
    if (typeof console !== "undefined" && console.error) {
      console.error("App crash caught by ErrorBoundary:", error, info?.componentStack);
    }
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: 24 }}>
        <div className="panel-dt p-8" style={{ maxWidth: 520, textAlign: "center" }}>
          <div className="eyebrow">Something interrupted this page</div>
          <h1 className="display-dt mt-3" style={{ fontSize: 32 }}>Please reload to continue</h1>
          <p className="text-sm muted-dt mt-3">
            If this keeps happening, try disabling your content blocker (e.g. uBlock Origin)
            for this site, or open it in Chrome without extensions.
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
            <button className="btn-gold-dt" onClick={() => window.location.reload()}>
              Reload page
            </button>
            <a className="btn-ghost-dt" href="/">Back to home</a>
          </div>
        </div>
      </div>
    );
  }
}
