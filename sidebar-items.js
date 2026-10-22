import * as keys from "./storage-keys.js";

export const sidebarSettingKeys = {
  home: keys.KeyHomeButton,
  explore: keys.KeyExploreButton,
  notifications: keys.KeyNotificationsButton,
  messages: keys.KeyMessagesButton,
  grok: keys.KeyGrokButton,
  xPremium: keys.KeyXPremiumButton,
  lists: keys.KeyListsButton,
  bookmarks: keys.KeyBookmarksButton,
  jobs: keys.KeyJobsButton,
  creatorStudio: keys.KeyCreatorStudioButton,
  communities: keys.KeyCommunitiesButton,
  articles: keys.KeyArticlesButton,
  topics: keys.KeyTopicsButton,
  verifiedOrgs: keys.KeyVerifiedOrgsButton,
  analytics: keys.KeyTypefullyGrowTab,
  profile: keys.KeyProfileButton,
  more: keys.KeyMoreButton,
};

// Routes survive localization, active icon changes and unread count changes.
export const sidebarItemId = ({ href, testId, label }) => {
  if (href) {
    try {
      const url = new URL(href, "https://x.com");
      const host = ["x.com", "twitter.com", "mobile.twitter.com"].includes(url.hostname) ? "" : url.origin;
      return `route:${host}${url.pathname.replace(/\/$/, "") || "/"}`;
    } catch (_) {
      return null;
    }
  }
  return testId ? `button:${testId}` : label ? `button-label:${label}` : null;
};

export const sidebarItemEnabled = (item, settings) => {
  const key = sidebarSettingKeys[item.id];
  if (key) return (settings[key] ?? keys.defaultPreferences[key]) === "on";
  const extra = settings[keys.KeySidebarExtraButtons];
  return Array.isArray(extra) && extra.includes(item.id);
};
