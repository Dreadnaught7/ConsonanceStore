const ENDPOINT = "https://gvpbolcmawwjufuvjmqa.supabase.co/functions/v1/site-attribution";

function uuid() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function safeHost(value) {
  if (!value) return null;
  try { return new URL(value).hostname || null; } catch { return null; }
}

function siteArea(path) {
  if (path.startsWith("/store")) return "store";
  if (path.startsWith("/investigations") || path === "/the-broken-chain/" || path.startsWith("/the-broken-chain")) return "investigation";
  if (location.hostname.startsWith("observatory.") || path.startsWith("/observatory")) return "observatory";
  return "main";
}

function params() {
  const q = new URLSearchParams(location.search);
  const ref = document.referrer;
  const refHost = safeHost(ref);
  let source = q.get("utm_source");
  let medium = q.get("utm_medium");
  if (!source && refHost) {
    source = refHost.includes("facebook") ? "facebook" :
      refHost.includes("tiktok") ? "tiktok" :
      refHost.includes("google") ? "google" :
      refHost.includes("bing") ? "bing" : refHost;
    medium = medium || "referral";
  }
  if (!source) { source = "direct"; medium = medium || "none"; }
  return {
    referrer_host: refHost,
    source,
    medium,
    campaign: q.get("utm_campaign"),
    content: q.get("utm_content"),
    term: q.get("utm_term")
  };
}

function getSession() {
  try {
    let id = sessionStorage.getItem("consonance_session_id");
    if (!id) {
      id = uuid();
      sessionStorage.setItem("consonance_session_id", id);
      sessionStorage.setItem("consonance_landing_path", location.pathname + location.search);
    }
    return {
      id,
      landing: sessionStorage.getItem("consonance_landing_path") || (location.pathname + location.search)
    };
  } catch {
    return { id: uuid(), landing: location.pathname + location.search };
  }
}

const session = getSession();
let lastPath = "";
let pageViewId = uuid();

function send(event_name, metadata = {}) {
  const current = location.pathname + location.search;
  const payload = {
    event_name,
    site_area: siteArea(location.pathname),
    landing_path: session.landing,
    current_path: current,
    session_id: session.id,
    page_view_id: pageViewId,
    ...params(),
    metadata
  };
  try {
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
      credentials: "omit"
    }).catch(() => {});
  } catch {}
}

function trackPage() {
  const current = location.pathname + location.search;
  if (current === lastPath) return;
  lastPath = current;
  pageViewId = uuid();
  send("page_view", { title: document.title });
}

trackPage();

const originalPush = history.pushState;
history.pushState = function(...args) {
  const result = originalPush.apply(this, args);
  queueMicrotask(trackPage);
  return result;
};
const originalReplace = history.replaceState;
history.replaceState = function(...args) {
  const result = originalReplace.apply(this, args);
  queueMicrotask(trackPage);
  return result;
};
addEventListener("popstate", () => queueMicrotask(trackPage));

document.addEventListener("click", event => {
  const target = event.target instanceof Element ? event.target.closest("a") : null;
  if (!target) return;
  const href = target.getAttribute("href") || "";
  let url;
  try { url = new URL(target.href, location.href); } catch { return; }
  const sameSite = url.hostname === location.hostname ||
    (url.hostname.endsWith("consonanceintelligence.com") && location.hostname.endsWith("consonanceintelligence.com"));
  const isBuy = /lulu|checkout|square|buy|svc\.lulu/i.test(url.href) || /buy|purchase/i.test(target.textContent || "");
  const eventName = isBuy ? "purchase_click" : (sameSite ? "internal_click" : "outbound_click");
  send(eventName, {
    href: url.pathname + url.search,
    host: url.hostname,
    label: (target.textContent || "").trim().slice(0, 160)
  });
}, { capture: true });
