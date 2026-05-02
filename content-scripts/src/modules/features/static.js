/**
 * Static features are UI modifications that only need to be applied:
 * - Once when the extension loads
 * - When user changes related settings
 * These changes persist until the next settings update.
 */

import {
  KeyAccountSwitcherButton,
  KeyArticlesButton,
  KeyBookmarksButton,
  KeyCommunitiesButton,
  KeyCreatorStudioButton,
  KeyCustomCss,
  KeyBackgroundColor,
  KeyExploreButton,
  KeyFollowCount,
  KeyFollowingTimeline,
  KeyGrokButton,
  KeyHideGrokDrawer,
  KeyHideTimelineComposer,
  KeyHideViewCount,
  KeyHomeButton,
  KeyInterFont,
  KeyJobsButton,
  KeyLikeCount,
  KeyListsButton,
  KeyMessagesButton,
  KeyNavigationButtonsLabels,
  KeyNavigationCenter,
  KeyNavigationHorizontalOffset,
  KeyNotificationsButton,
  KeyProfileButton,
  KeyRecentMedia,
  KeyRemovePromotedPosts,
  KeyRemoveTimelineBorders,
  KeyRemoveTimelineTabs,
  KeyRemoveTopicsToFollow,
  KeyRemoveTweetBorders,
  KeyReplyCount,
  KeyRetweetCount,
  KeySearchBar,
  KeySidebarLogo,
  KeyStickyHeader,
  KeyTimelineWidth,
  KeyTitleNotifications,
  KeyTopicsButton,
  KeyTransparentSearch,
  KeyTrendsHomeTimeline,
  KeyTweetButton,
  KeyTypefullyEnhancementsButtons,
  KeyTypefullyGrowTab,
  KeyUnreadCountBadge,
  KeyVerifiedOrgsButton,
  KeyWriterMode,
  KeyXPremiumButton,
} from "../../../../storage-keys";
import { changeCustomCss } from "../options/customCss";
import { changeFollowingAndFollowersCounts, changeLikeCount, changeReplyCount, changeRetweetCount } from "../options/hideVanityCounts";
import changeHideViewCounts from "../options/hideViewCount";
import { changeBackgroundColor, changeHideSearchBar, changeInterFont, changeTitleNotifications, changeTransparentSearchBar, changeTweetButton } from "../options/interface";
import {
  changeAnalyticsButton,
  changeAccountSwitcherButton,
  changeArticlesButton,
  changeBookmarksButton,
  changeCommunitiesButton,
  changeCreatorStudioButton,
  changeExploreButton,
  changeGrokButton,
  changeHomeButton,
  changeJobsButton,
  changeListsButton,
  changeMessagesButton,
  changeNavigationButtonsLabels,
  changeNavigationCenter,
  changeNavigationHorizontalOffset,
  changeNotificationsButton,
  changeProfileButton,
  changeSidebarLogo,
  changeTopicsButton,
  changeUnreadCountBadge,
  changeVerifiedOrgsButton,
  changeXPremiumButton,
  hideGrokDrawer,
} from "../options/navigation";
import {
  changeFollowingTimeline,
  changeTimelineComposer,
  changePromotedPosts,
  changeRecentMedia,
  changeStickyHeader,
  changeTimelineBorders,
  changeTimelineTabs,
  changeTimelineWidth,
  changeTopicsToFollow,
  changeTrendsHomeTimeline,
  changeTweetBorders,
} from "../options/timeline";
import { changeTypefullyEnhancementsButtons } from "../options/typefully";
import { changeWriterMode } from "../options/writerMode";

export const staticFeatures = {
  timeline: (data) => {
    changeTimelineWidth(data[KeyTimelineWidth]);
    changeTimelineBorders(data[KeyRemoveTimelineBorders]);
    changeTweetBorders(data[KeyRemoveTweetBorders]);
    changeStickyHeader(data[KeyStickyHeader]);
    changeWriterMode(data[KeyWriterMode]);
    changeFollowingTimeline(data[KeyFollowingTimeline]);
    changeHideViewCounts(data[KeyHideViewCount]);
    changeRecentMedia(data[KeyRecentMedia]);
    changeTrendsHomeTimeline(data[KeyTrendsHomeTimeline], data[KeyWriterMode]);
    changeTimelineComposer(data[KeyHideTimelineComposer], data[KeyWriterMode]);
    changePromotedPosts(data[KeyRemovePromotedPosts]);
    changeTopicsToFollow(data[KeyRemoveTopicsToFollow]);
    changeTimelineTabs(data[KeyRemoveTimelineTabs], data[KeyWriterMode]);
    changeTypefullyEnhancementsButtons(data[KeyTypefullyEnhancementsButtons]);
    changeFollowingAndFollowersCounts(data[KeyFollowCount]);
    changeReplyCount(data[KeyReplyCount]);
    changeRetweetCount(data[KeyRetweetCount]);
    changeLikeCount(data[KeyLikeCount]);
  },
  navigation: (data) => {
    changeSidebarLogo(data[KeySidebarLogo]);
    changeNavigationButtonsLabels(data[KeyNavigationButtonsLabels]);
    changeNavigationCenter(data[KeyNavigationCenter]);
    changeNavigationHorizontalOffset(data[KeyNavigationHorizontalOffset]);
    changeUnreadCountBadge(data[KeyUnreadCountBadge]);
    hideGrokDrawer(data[KeyHideGrokDrawer]);
  },
  interface: (data) => {
    changeInterFont(data[KeyInterFont]);
    changeBackgroundColor(data[KeyBackgroundColor]);
    changeHideSearchBar(data[KeySearchBar]);
    changeTransparentSearchBar(data[KeyTransparentSearch]);
    changeTitleNotifications(data[KeyTitleNotifications]);
    changeTweetButton(data[KeyTweetButton]);
  },
  sidebar: (data) => {
    changeHomeButton(data[KeyHomeButton]);
    changeExploreButton(data[KeyExploreButton]);
    changeNotificationsButton(data[KeyNotificationsButton]);
    changeMessagesButton(data[KeyMessagesButton]);
    changeBookmarksButton(data[KeyBookmarksButton]);
    changeJobsButton(data[KeyJobsButton]);
    changeCreatorStudioButton(data[KeyCreatorStudioButton]);
    changeAccountSwitcherButton(data[KeyAccountSwitcherButton]);
    changeArticlesButton(data[KeyArticlesButton]);
    changeCommunitiesButton(data[KeyCommunitiesButton]);
    changeTopicsButton(data[KeyTopicsButton]);
    changeListsButton(data[KeyListsButton]);
    changeProfileButton(data[KeyProfileButton]);
    changeXPremiumButton(data[KeyXPremiumButton]);
    changeGrokButton(data[KeyGrokButton]);
    changeVerifiedOrgsButton(data[KeyVerifiedOrgsButton]);
    changeAnalyticsButton(data[KeyTypefullyGrowTab]);
  },
  advanced: (data) => {
    changeCustomCss(data[KeyCustomCss]);
  },
};

export const applyStaticFeatures = async (data) => {
  Object.values(staticFeatures).forEach((feature) => feature(data));
};
