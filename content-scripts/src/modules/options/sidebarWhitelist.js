import { sidebarItemEnabled, sidebarItemId, sidebarSettingKeys } from "../../../../sidebar-items";
import { KeySidebarCatalog } from "../../../../storage-keys";
import selectors from "../../selectors";
import addStyles from "../utilities/addStyles";

let settings = {};
let observer;
let saveTimer;
let lastCatalog = "";

const readItem = (element) => {
  const svg = element.querySelector("svg");
  if (!svg) return null;
  const knownId = Object.keys(sidebarSettingKeys).find((id) => element.matches(selectors.sidebarLinks[id]));
  const id = knownId || sidebarItemId({ href: element.getAttribute("href"), testId: element.getAttribute("data-testid"), label: element.getAttribute("aria-label") });
  if (!id) return null;
  return {
    id,
    label: (element.getAttribute("aria-label") || element.textContent || id).trim().slice(0, 100),
    viewBox: svg.getAttribute("viewBox") || "0 0 24 24",
    // Store geometry only; never inject page HTML into the settings UI.
    paths: Array.from(svg.querySelectorAll("path")).slice(0, 32).map((path) => ({
      d: (path.getAttribute("d") || "").slice(0, 16000),
      fillRule: path.getAttribute("fill-rule") || "nonzero",
      clipRule: path.getAttribute("clip-rule") || "nonzero",
    })),
  };
};

export const refreshSidebarCatalog = () => {
  const nav = document.querySelector(selectors.leftSidebarLinks);
  if (!nav) return [];

  const items = [];
  for (const element of nav.children) {
    const item = readItem(element);
    element.toggleAttribute("data-mt-sidebar-allowed", Boolean(item && sidebarItemEnabled(item, settings)));
    if (item && !items.some((existing) => existing.id === item.id)) items.push(item);
  }

  // Don't replace a useful cached list with a transient empty loading state.
  const serialized = JSON.stringify(items);
  if (items.length && serialized !== lastCatalog) {
    lastCatalog = serialized;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      chrome.storage.local.set({ [KeySidebarCatalog]: items });
    }, 300);
  }
  return items;
};

export const applySidebarWhitelist = (data) => {
  settings = data;
  if (!observer) {
    // New server-provided children stay hidden even before the observer runs.
    addStyles("sidebarWhitelist", `${selectors.leftSidebarLinks} > :not([data-mt-sidebar-allowed]) { display: none !important; }`);
    observer = new MutationObserver((mutations) => {
      if (mutations.some(({ target, addedNodes, removedNodes }) =>
        target.parentElement?.closest(selectors.leftSidebar) ||
        target.matches?.(selectors.leftSidebar) ||
        [...addedNodes, ...removedNodes].some((node) => node.matches?.(selectors.leftSidebar) || node.querySelector?.(selectors.leftSidebarLinks))
      )) refreshSidebarCatalog();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href", "aria-label", "data-testid", "d", "viewBox"],
    });
    chrome.runtime.onMessage.addListener((message, _sender, respond) => {
      if (message?.type === "mt-refresh-sidebar") respond(refreshSidebarCatalog());
    });
  }
  refreshSidebarCatalog();
};
