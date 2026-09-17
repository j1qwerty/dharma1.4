// Manual starter for the Alibaba PageAgent floating assistant.
// The demo bundle (pinned 1.12.4, loaded with ?autoInit=false in index.html)
// exposes window.PageAgent but creates nothing by itself. Calling start()
// constructs the agent with the free testing-LLM demo config baked into the
// bundle (verified against dist/iife/page-agent.demo.js) and opens its panel.
//
// Supported bot languages: "en-US" and "zh-CN" ONLY (bundle-checked). The
// site language maps hi -> en-US (closest supported); en -> en-US.

const DEMO_MODEL = "qwen3.5-plus";
const DEMO_BASE_URL = "https://page-ag-testing-ohftxirgbn.cn-shanghai.fcapp.run";
const DEMO_API_KEY = "NA";

export function pageAgentLanguage(siteLang) {
  // PageAgent only understands en-US / zh-CN — everything else falls back
  // to English, which is also this site's default language.
  return siteLang === "zh" ? "zh-CN" : "en-US";
}

export function isPageAgentReady() {
  try {
    return typeof window !== "undefined" && typeof window.PageAgent === "function";
  } catch {
    return false;
  }
}

/** Create (or re-show) the agent panel. Throws a friendly error when blocked. */
export function startPageAgent(siteLang = "en") {
  if (!isPageAgentReady()) {
    throw new Error(
      "Assistant script is blocked or still loading. Allow cdn.jsdelivr.net in your content blocker, reload, and try again."
    );
  }
  try {
    if (!window.pageAgent) {
      window.pageAgent = new window.PageAgent({
        model: DEMO_MODEL,
        baseURL: DEMO_BASE_URL,
        apiKey: DEMO_API_KEY,
        language: pageAgentLanguage(siteLang),
      });
    }
    window.pageAgent.panel?.show?.();
    return window.pageAgent;
  } catch (e) {
    throw new Error(`Could not start the assistant: ${e?.message || e}`);
  }
}

/** Tear down the agent instance (panel + listeners). Safe to call anytime. */
export function stopPageAgent() {
  try {
    window.pageAgent?.dispose?.();
  } catch { /* ignore */ }
  try {
    window.pageAgent = null;
  } catch { /* ignore */ }
}
