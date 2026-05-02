export const KeyExtensionStatus = "extensionStatus";
export const KeyListsButton = "listsButton";
export const KeyCommunitiesButton = "communitiesButton";
export const KeyTopicsButton = "topicsButton";
export const KeyXPremiumButton = "xPremiumButton";
export const KeyVerifiedOrgsButton = "verifiedOrgsButton";
export const KeyTypefullyGrowTab = "typefullyGrowTab";
export const KeyGrokButton = "grokButton";
export const KeyFollowingTimeline = "followingTimeline";
export const KeyTrendsHomeTimeline = "trendsHomeTimeline";
export const KeyRemoveTimelineTabs = "removeTimelineTabs";
export const KeyWriterMode = "writerMode";
export const KeyTimelineWidth = "timelineWidth";
export const KeyRemoveTimelineBorders = "timelineBorders";
export const KeyRemoveTweetBorders = "tweetBorders";
export const KeyStickyHeader = "stickyHeader";
export const KeySidebarLogo = "sidebarLogo";
export const KeyHomeButton = "homeButton";
export const KeyExploreButton = "exploreButton";
export const KeyNotificationsButton = "notificationsButton";
export const KeyMessagesButton = "messagesButton";
export const KeyBookmarksButton = "bookmarksButton";
export const KeyJobsButton = "jobsButton";
export const KeyCreatorStudioButton = "creatorStudioButton";
export const KeyAccountSwitcherButton = "accountSwitcherButton";
export const KeyArticlesButton = "articles";
export const KeyProfileButton = "profileButton";
export const KeyNavigationButtonsLabels = "navigationButtonsLabels";
export const KeyNavigationCenter = "navigationCenter";
export const KeyNavigationHorizontalOffset = "navigationHorizontalOffset";
export const KeyUnreadCountBadge = "unreadCountBadge";
export const KeyAllVanity = "allVanity";
export const KeyReplyCount = "replyCount";
export const KeyRetweetCount = "retweetCount";
export const KeyLikeCount = "likeCount";
export const KeyFollowCount = "followCount";
export const KeyTweetButton = "tweetButton";
export const KeySearchBar = "searchBar";
export const KeyTransparentSearch = "transparentSearch";
export const KeyRemovePromotedPosts = "removePromotedPosts";
export const KeyRemoveTopicsToFollow = "removeTopicsToFollow";
export const KeyHideTimelineComposer = "hideTimelineComposer";
export const KeyRecentMedia = "recentMedia";
export const KeyTypefullyEnhancementsButtons = "typefullyEnhancementsButtons";
export const KeyInterFont = "interFont";
export const KeyBackgroundColor = "backgroundColor";
export const KeyTitleNotifications = "titleNotifications";
export const KeyCustomCss = "customCss";
export const KeyHideViewCount = "hideViewCount";
export const KeyHideGrokDrawer = "hideGrokDrawer";

export const allSettingsKeys = [
  // Extension Status
  KeyExtensionStatus,

  // Timeline Features
  KeyTimelineWidth,
  KeyRemoveTimelineBorders,
  KeyRemoveTweetBorders,
  KeyStickyHeader,
  KeyWriterMode,
  KeyFollowingTimeline,
  KeyHideViewCount,
  KeyRecentMedia,
  KeyTrendsHomeTimeline,
  KeyRemovePromotedPosts,
  KeyRemoveTopicsToFollow,
  KeyHideTimelineComposer,
  KeyRemoveTimelineTabs,
  KeyTypefullyEnhancementsButtons,
  KeyFollowCount,
  KeyReplyCount,
  KeyRetweetCount,
  KeyLikeCount,

  // Navigation Features
  KeySidebarLogo,
  KeyNavigationButtonsLabels,
  KeyNavigationCenter,
  KeyNavigationHorizontalOffset,
  KeyUnreadCountBadge,
  KeyHideGrokDrawer,

  // Interface Features
  KeyInterFont,
  KeyBackgroundColor,
  KeySearchBar,
  KeyTransparentSearch,
  KeyTitleNotifications,
  KeyTweetButton,

  // Sidebar Features
  KeyHomeButton,
  KeyExploreButton,
  KeyNotificationsButton,
  KeyMessagesButton,
  KeyGrokButton,
  KeyXPremiumButton,
  KeyListsButton,
  KeyBookmarksButton,
  KeyJobsButton,
  KeyCreatorStudioButton,
  KeyAccountSwitcherButton,
  KeyCommunitiesButton,
  KeyArticlesButton,
  KeyTopicsButton,
  KeyVerifiedOrgsButton,
  KeyTypefullyGrowTab,
  KeyProfileButton,

  // Advanced Features
  KeyCustomCss,

  // Legacy/Unused
  KeyAllVanity,
];

export const defaultPreferences = {
  // Extension Status
  [KeyExtensionStatus]: "on",

  // Timeline Features
  [KeyTimelineWidth]: 800,
  [KeyRemoveTimelineBorders]: "off",
  [KeyRemoveTweetBorders]: "off",
  [KeyStickyHeader]: "on",
  [KeyWriterMode]: "off",
  [KeyFollowingTimeline]: "off",
  [KeyHideViewCount]: "off",
  [KeyRecentMedia]: "off",
  [KeyTrendsHomeTimeline]: "off",
  [KeyRemovePromotedPosts]: "on",
  [KeyRemoveTopicsToFollow]: "on",
  [KeyHideTimelineComposer]: "off",
  [KeyRemoveTimelineTabs]: "off",
  [KeyTypefullyEnhancementsButtons]: "on",
  [KeyFollowCount]: "on",
  [KeyReplyCount]: "on",
  [KeyRetweetCount]: "on",
  [KeyLikeCount]: "on",

  // Navigation Features
  [KeySidebarLogo]: "off",
  [KeyNavigationButtonsLabels]: "never",
  [KeyNavigationCenter]: "off",
  [KeyNavigationHorizontalOffset]: 0,
  [KeyUnreadCountBadge]: "off",
  [KeyHideGrokDrawer]: "on",

  // Interface Features
  [KeyInterFont]: "off",
  [KeyBackgroundColor]: "",
  [KeySearchBar]: "on",
  [KeyTransparentSearch]: "off",
  [KeyTitleNotifications]: "on",
  [KeyTweetButton]: "on",

  // Sidebar Features
  [KeyHomeButton]: "on",
  [KeyExploreButton]: "on",
  [KeyNotificationsButton]: "on",
  [KeyMessagesButton]: "on",
  [KeyGrokButton]: "on",
  [KeyXPremiumButton]: "off",
  [KeyListsButton]: "on",
  [KeyBookmarksButton]: "on",
  [KeyJobsButton]: "off",
  [KeyCreatorStudioButton]: "off",
  [KeyAccountSwitcherButton]: "off",
  [KeyCommunitiesButton]: "on",
  [KeyArticlesButton]: "off",
  [KeyTopicsButton]: "off",
  [KeyVerifiedOrgsButton]: "off",
  [KeyTypefullyGrowTab]: "on",
  [KeyProfileButton]: "on",

  // Advanced Features
  [KeyCustomCss]: "",
};
