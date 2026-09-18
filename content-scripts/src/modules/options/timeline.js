import { KeyHideGrokDrawer, KeyRecentMedia } from "../../../../storage-keys";
import selectors from "../../selectors";
import addStyles, { removeStyles, stylesExist } from "../utilities/addStyles";
import { getStorage } from "../utilities/storage";

const isHomeTimelinePath = () => window.location.pathname === "/" || window.location.pathname.startsWith("/home");

export const changeTimelineWidth = (timelineWidth) => {
  const width = Number(timelineWidth);
  if (width < 600 || width > 1000) return;

  addStyles(
    "timelineWidth",
    `
    :root {
      --mt-timeline-width: ${width}px;
    }
    @media only screen and (min-width: 988px) {
      ${selectors.mainColumn} {
        width: ${width}px;
        max-width: ${width}px;
      }
    }
    `
  );
};

export const changeTimelineBorders = (timelineBorders) => {
  switch (timelineBorders) {
    case "off":
      removeStyles("timelineBorders");
      break;

    case "on":
      addStyles(
        "timelineBorders",
        `
        @media only screen and (min-width: 988px) {
          div${selectors.mainColumn} {
            border-style: hidden;
          }
        }
        `.trim()
      );
      break;
  }
};

export const changeTweetBorders = (tweetBorders) => {
  switch (tweetBorders) {
    case "off":
      removeStyles("tweetBorders");
      break;

    case "on":
      addStyles(
        "tweetBorders",
        `
        ${selectors.mainWrapper} section > div > div > div > div[role="separator"] {
          display: none;
        }
        ${selectors.mainColumn} > div > div:empty {
          background: transparent;
        }
        `.trim()
      );
      break;
  }
};

export const changeStickyHeader = (stickyHeader) => {
  switch (stickyHeader) {
    case "on":
      removeStyles("stickyHeader");
      break;

    case "off":
      addStyles(
        "stickyHeader",
        `
        ${selectors.mainColumn} > div > div {
          position: unset;
        }
        `
      );
      break;
  }
};

export const changePromotedPosts = (removePromotedPosts) => {
  switch (removePromotedPosts) {
    case "off":
      addStyles(
        "removePromotedPosts",
        `
        [data-testid="placementTracking"] article {
          display: flex;
        }
        `
      );
      break;

    case "on":
      removeStyles("removePromotedPosts");
      break;
  }
};

export const changeTopicsToFollow = (removeTopicsToFollow) => {
  switch (removeTopicsToFollow) {
    case "off":
      removeStyles("removeTopicsToFollow");
      break;

    case "on":
      addStyles(
        "removeTopicsToFollow",
        `
        ${selectors.mainColumn} section[aria-labelledby^="accessible-list-"] > div[aria-label$="Carousel"],
        ${selectors.mainColumn} a[href*="/i/flow/topics_selector"],
        ${selectors.mainColumn} a[href*="/i/topics/picker/home"] {
          display: none;
        }
        [aria-label="Lists timeline"] section[aria-labelledby^="accessible-list-"] > div[aria-label$="Carousel"] {
          display: flex;
        }
        `
      );
      break;
  }
};

export const changeTimelineTabs = (removeTimelineTabs, writerMode) => {
  if (writerMode === "on" || window.location.pathname.includes("compose/tweet") || !isHomeTimelinePath()) {
    removeStyles("removeTimelineTabs");
    return;
  }

  switch (removeTimelineTabs) {
    case "off":
      removeStyles("removeTimelineTabs");
      break;

    case "on":
      if (stylesExist("removeTimelineTabs")) return;

      addStyles(
        "removeTimelineTabs",
        `
        ${selectors.timelineTabs},
        ${selectors.mainColumn} nav[role="navigation"]:has(${selectors.timelineTablist}) {
          display: none !important;
        }
        `
      );
      break;
  }
};

const hiddenTimelineComposerSelector =
  ".mt-hidden-timeline-composer, .mt-hidden-timeline-composer-wrapper, .mt-hidden-timeline-composer-spacer";

const removeTimelineComposerClasses = () => {
  document
    .querySelectorAll(hiddenTimelineComposerSelector)
    .forEach((element) => {
      element.classList.remove(
        "mt-hidden-timeline-composer",
        "mt-hidden-timeline-composer-wrapper",
        "mt-hidden-timeline-composer-spacer"
      );
    });
};

const findTimelineComposerElement = () => {
  const textarea = document.querySelector(`${selectors.mainColumn} [data-testid^="tweetTextarea_"]`);
  const inlineTweetButton = document.querySelector(`${selectors.mainColumn} [data-testid="tweetButtonInline"]`);

  if (!textarea || !inlineTweetButton) return null;

  const textareaCell = textarea.closest('[data-testid="cellInnerDiv"]');
  const buttonCell = inlineTweetButton.closest('[data-testid="cellInnerDiv"]');

  if (textareaCell?.contains(inlineTweetButton)) return textareaCell;
  if (buttonCell?.contains(textarea)) return buttonCell;
  if (textareaCell) return textareaCell;

  const avatarSelector = '[data-testid^="UserAvatar-Container"]';
  let ancestor = textarea.parentElement;

  while (ancestor && ancestor !== document.body && !ancestor.matches(selectors.mainColumn)) {
    if (ancestor.contains(inlineTweetButton) && ancestor.querySelector(avatarSelector)) {
      return ancestor;
    }

    ancestor = ancestor.parentElement;
  }

  ancestor = textarea.parentElement;

  while (ancestor && ancestor !== document.body && !ancestor.matches(selectors.mainColumn)) {
    if (ancestor.contains(inlineTweetButton)) {
      let candidate = ancestor;

      while (candidate.parentElement && !candidate.parentElement.matches(selectors.mainColumn)) {
        const parent = candidate.parentElement;

        if (parent.querySelector(selectors.timelineTablist) || parent.querySelector(selectors.tweet)) break;
        const parentTextarea = parent.querySelector('[data-testid^="tweetTextarea_"]');
        if (parentTextarea && parentTextarea !== textarea) break;
        if (!parent.contains(inlineTweetButton)) break;

        candidate = parent;
      }

      return candidate;
    }

    ancestor = ancestor.parentElement;
  }

  return null;
};

const markTimelineComposerElement = () => {
  const markedComposer = document.querySelector(".mt-hidden-timeline-composer");
  if (
    markedComposer?.querySelector('[data-testid^="tweetTextarea_"]') ||
    markedComposer?.querySelector('[data-testid="tweetButtonInline"]')
  ) {
    return;
  }

  const composer = findTimelineComposerElement();
  if (!composer) return;

  const composerCell = composer.closest('[data-testid="cellInnerDiv"]') || composer;
  composerCell.classList.add("mt-hidden-timeline-composer");

  const markAdjacentSpacers = (anchor) => {
    let sibling = anchor.nextElementSibling;

    for (let i = 0; sibling && i < 3; i += 1) {
      const isSeparator = sibling.getAttribute("role") === "separator";
      const isEmptyElement = sibling.childElementCount === 0;
      const isEmptyTimelineCell =
        sibling.matches?.('[data-testid="cellInnerDiv"]') &&
        !sibling.querySelector(selectors.tweet) &&
        !sibling.querySelector(selectors.timelineTablist) &&
        !sibling.querySelector('[data-testid^="tweetTextarea_"]');

      if (!isSeparator && !isEmptyElement && !isEmptyTimelineCell) break;

      sibling.classList.add("mt-hidden-timeline-composer-spacer");
      sibling = sibling.nextElementSibling;
    }
  };

  markAdjacentSpacers(composerCell);

  let wrapper = composerCell.parentElement;
  while (wrapper && wrapper !== document.body && !wrapper.matches(selectors.mainColumn)) {
    if (wrapper.querySelector(selectors.tweet) || wrapper.querySelector(selectors.timelineTablist)) break;

    if (wrapper.querySelector('[data-testid^="tweetTextarea_"]') || wrapper.querySelector('[data-testid="tweetButtonInline"]')) {
      wrapper.classList.add("mt-hidden-timeline-composer-wrapper");
    }

    markAdjacentSpacers(wrapper);
    wrapper = wrapper.parentElement;
  }
};

export const changeTimelineComposer = (hideTimelineComposer, writerMode) => {
  const resetTimelineComposer = () => {
    if (!stylesExist("hideTimelineComposer")) return;

    removeTimelineComposerClasses();
    removeStyles("hideTimelineComposer");
  };

  if (writerMode === "on" || window.location.pathname.includes("compose/tweet") || !isHomeTimelinePath()) {
    resetTimelineComposer();
    return;
  }

  switch (hideTimelineComposer) {
    case "off":
      resetTimelineComposer();
      break;

    case "on": {
      if (!stylesExist("hideTimelineComposer")) {
        addStyles(
          "hideTimelineComposer",
          `
          .mt-hidden-timeline-composer,
          .mt-hidden-timeline-composer-wrapper,
          .mt-hidden-timeline-composer-spacer {
            display: none !important;
            height: 0 !important;
            min-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            border: 0 !important;
            overflow: hidden !important;
          }
          `
        );
      }

      markTimelineComposerElement();
      break;
    }
  }
};

export const changeRecentMedia = async (recentMedia) => {
  const userProfile = document.querySelector('meta[content*="twitter://user?screen_name="]');

  if (!userProfile) {
    removeStyles("recentMedia");
    return;
  }

  const sidebarPhotoGrid = document
    .querySelector(selectors.rightSidebar)
    ?.querySelector('[aria-label][tabindex="0"]')
    ?.querySelector('[style="padding-bottom: 56.25%;"]')?.parentElement;

  if (!sidebarPhotoGrid) return;

  const run = (rm) => {
    switch (rm) {
      case "off":
        removeStyles("recentMedia");
        sidebarPhotoGrid.classList.remove("mt-recentMedia-photoGrid");
        break;

      case "on":
        addStyles(
          "recentMedia",
          `
            @media only screen and (min-width: 1265px) {
              .mt-recentMedia-photoGrid {
                visibility: visible;
                position: fixed;
                right: 16px;
                top: 70px;
                width: 300px;
                pointer-events: auto;
              }
              
              [data-testid="primaryColumn"] {
                transform: translateX(-64px);
              }
            }
            `
        );
        sidebarPhotoGrid.classList.add("mt-recentMedia-photoGrid");

        break;
    }
  };

  if (recentMedia) {
    run(recentMedia);
  } else {
    const setting = await getStorage(KeyRecentMedia);
    run(setting);
  }
};

export const changeTrendsHomeTimeline = (trendsHomeTimeline, writerMode) => {
  if (writerMode === "on" || window.location.pathname.includes("compose/tweet") || !window.location.pathname.includes("/home") || !window.location.pathname === "/") {
    removeStyles("trendsHomeTimeline");
    return;
  }

  switch (trendsHomeTimeline) {
    case "off":
      removeStyles("trendsHomeTimeline");
      break;

    case "on":
      if (stylesExist("trendsHomeTimeline")) return;

      addStyles(
        "trendsHomeTimeline",
        `
          @keyframes render {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
              transform: none;
            }
          }
          @media only screen and (min-width: 1265px) {
            ${selectors.rightSidebar} section[aria-labelledby^="accessible-list-"] {
              visibility: visible;
              position: fixed;
              right: 16px;
              top: 66px;
              max-height: 78vh;
              overflow: auto;
              width: 300px;
              border-radius: 16px;
              border-color: var(--border-color);
              border-width: 1px;
              background-color: var(--body-bg-color);
              opacity: 0;
              will-change: opacity;
              animation-name: render;
              animation-duration: 0s;
              animation-fill-mode: forwards;
              animation-delay: 500ms;
              margin-top: 4px;
              pointer-events: auto;
            }

            [data-testid="primaryColumn"] {
              transform: translateX(-64px);
            }
          }
          `
      );
      break;
  }
};

export const changeFollowingTimeline = (followingTimeline) => {
  if (followingTimeline !== "on") return;

  const tablist = document.querySelector(selectors.timelineTablist);
  const selectedTab = document.querySelector(`${selectors.timelineTablist} ${selectors.timelineTabSelected}`);

  if (!tablist || !selectedTab) return;

  // Get localized "Following" text (it's the second tab)
  const followingTabSpan = tablist.querySelector(`${selectors.timelineTabPresentation}:nth-of-type(2) span`);
  if (!followingTabSpan) return;

  const followingTabText = followingTabSpan.textContent.toLowerCase();
  const selectedTabSpan = selectedTab.querySelector(selectors.timelineTabText);
  if (!selectedTabSpan) return;

  const selectedTabText = selectedTabSpan.textContent.toLowerCase();

  if (selectedTabText === followingTabText) return; // Already on the "Following" tab

  const secondTab = tablist.querySelector(`${selectors.timelineTabPresentation}:nth-child(2) ${selectors.timelineTab}`);
  if (!secondTab) return;

  secondTab.click();
};

let lt1; // Latest Tweets timeout 1
let lt2; // Latest Tweets timeout 2
export const changeLatestTweets = (latestTweets) => {
  if (latestTweets !== "on") return;

  const showLatestTweets = () => {
    // Check if the "Latest Tweets" options is already selected to avoid unnecessary clicks
    const latestSelected = !!document.querySelector(`${selectors.timelineTablist} > div:last-child > a[aria-selected='true']`);
    // Check if there's a menu button
    const menuitem = document.querySelector(selectors.menuItem);

    if (latestSelected || !menuitem) return;

    const run = () => {
      // Check if the nav bar with "Home" and "Latest Tweets" exists
      const optionBarExists = !!document.querySelector(selectors.timelineTablist);

      if (!optionBarExists) {
        /*
            If it doesn't, we have to get it to display
            1. Click the Timeline Options button
            2. Click the first option in the popup
          */
        const timelineOptions = document.querySelector(selectors.timelineOptions);
        const topTweetsOn = document.querySelector(selectors.topTweetsOn);

        const clickMenuButton = (isTimelineOptions) => {
          clearTimeout(lt1);
          lt1 = setTimeout(() => {
            menuitem && menuitem.click();

            if (isTimelineOptions) {
              // Click the "Latest Tweets" nav bar option
              const latestTweetsNavBarOption = document.querySelector(`${selectors.timelineTablist} > div:last-child > a`);
              latestTweetsNavBarOption && latestTweetsNavBarOption.click();
            }
          }, 100);
          return lt1;
        };

        if (timelineOptions) {
          timelineOptions.click();
          clickMenuButton(true);
        } else if (topTweetsOn) {
          topTweetsOn.click();
          clickMenuButton(false);
        }
      }
    };

    clearTimeout(lt2);
    lt2 = setTimeout(run, 500);
    return lt2;
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showLatestTweets);
  } else {
    showLatestTweets();
  }
};

export const enableGrokDrawerOnGrokButtonClick = (hideGrokDrawer) => {
  const grokClickListener = () => {
    const grokDrawer = document.querySelector(selectors.grokDrawer);
    grokDrawer.classList.add("typefully-grok-drawer-enabled");
  };

  if (hideGrokDrawer === "off") {
    // remove event click listener from all grok buttons, when hideGrokDrawer is off
    const grokSvgs = document.querySelectorAll(selectors.grokSvg);
    grokSvgs.forEach((svg) => {
      const grokButton = svg.closest("button");
      if (grokButton) {
        grokButton.removeEventListener("click", grokClickListener);
      }
    });

    return;
  }

  let grokSvgs = document.querySelectorAll(selectors.grokSvg);
  grokSvgs = Array.from(grokSvgs).filter((svg) => svg.closest("button"));

  grokSvgs.forEach((svg) => {
    const grokButton = svg.closest("button");

    if (!grokButton) return;

    grokButton.addEventListener("click", grokClickListener);
  });

  const grokDrawer = document.querySelector(selectors.grokDrawer);
  if (!grokDrawer) return;

  const grokDrawerHeader = document.querySelector(selectors.grokDrawerHeader);
  if (!grokDrawerHeader) return;

  const observer = new ResizeObserver(async (entries) => {
    const entry = entries[0];

    // if entry has one child and it is a button, it means the drawer is closed.
    // Remove the drawer if hideGrokDrawer is on.
    if (entry.target.children.length === 1 && entry.target.children[0].tagName === "BUTTON") {
      grokDrawer.classList.remove("typefully-grok-drawer-enabled");
      let hideGrokDrawer = await getStorage(KeyHideGrokDrawer);

      if (hideGrokDrawer === "on") {
        addStyles(
          "grokDrawer",
          `${selectors.grokDrawer} {
          display: none !important;
        }`
        );
      }
      observer.disconnect();
    }
  });

  // observe the grok drawer header to determine if the drawer has to be hidden or not.
  if (grokDrawerHeader) {
    observer.observe(grokDrawerHeader);
  }
};
