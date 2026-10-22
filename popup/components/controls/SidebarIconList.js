import { useEffect, useState } from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { styled } from "@stitches/react";
import { allSettingsKeys, defaultPreferences, KeySidebarCatalog, KeySidebarExtraButtons } from "../../../storage-keys";
import { sidebarItemEnabled, sidebarSettingKeys } from "../../../sidebar-items";
import { setStorageImmediately } from "../../utilities/chromeStorage";

const StyledToggle = styled(TogglePrimitive.Root, {
  "&[data-state=off]": { borderColor: "transparent", opacity: "50%" },
  "&[data-state=off]:hover": { borderColor: "rgba(255, 255, 255, 0.5)" },
});

export default function SidebarIconList({ fallback }) {
  const [catalog, setCatalog] = useState([]);
  const [settings, setSettings] = useState(defaultPreferences);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (typeof chrome === "undefined" || !chrome.storage) return;
    let cancelled = false;
    let hasLiveCatalog = false;
    const readStorage = () => {
      chrome.storage.local.get([...allSettingsKeys, KeySidebarCatalog], (saved) => {
        if (cancelled) return;
        setSettings({ ...defaultPreferences, ...saved });
        if (!hasLiveCatalog) setCatalog(saved[KeySidebarCatalog] || []);
      });
    };
    const onChanged = (changes, area) => {
      if (area === "local" && (KeySidebarCatalog in changes || allSettingsKeys.some((key) => key in changes))) readStorage();
    };
    const refresh = () => {
      // IDs are available without permission to read other tabs' URLs/history.
      chrome.tabs.query({}, (tabs) => {
        if (cancelled || chrome.runtime.lastError) return;
        // Prefer the active page when multiple accounts have X open.
        tabs.sort((a, b) => Number(b.active) - Number(a.active));
        Promise.all(tabs.map((tab) => new Promise((resolve) => {
          chrome.tabs.sendMessage(tab.id, { type: "mt-refresh-sidebar" }, (items) => {
            resolve(chrome.runtime.lastError ? null : items);
          });
        }))).then((responses) => {
          if (cancelled) return;
          const items = responses.find((response) => response?.length);
          hasLiveCatalog = Boolean(items);
          setLive(hasLiveCatalog);
          if (items) setCatalog(items);
        });
      });
    };
    chrome.storage.onChanged.addListener(onChanged);
    readStorage();
    refresh();
    const interval = setInterval(refresh, 3000);
    return () => {
      cancelled = true;
      clearInterval(interval);
      chrome.storage.onChanged.removeListener(onChanged);
    };
  }, []);

  const toggle = async (item, enabled) => {
    const key = sidebarSettingKeys[item.id];
    if (key) {
      await setStorageImmediately({ [key]: enabled ? "on" : "off" });
    } else {
      // Read at click time so opening a second settings window can't erase choices.
      chrome.storage.local.get(KeySidebarExtraButtons, (saved) => {
        const selected = new Set(saved[KeySidebarExtraButtons] || []);
        if (enabled) selected.add(item.id);
        else selected.delete(item.id);
        setStorageImmediately({ [KeySidebarExtraButtons]: [...selected] });
      });
    }
  };

  return (
    <>
      <p className="text-xs text-gray-500 mb-3" role="status">
        仅显示勾选项，X 新增入口默认隐藏。
        {live ? "列表已与打开的 X 页面同步。" : "打开或刷新 X 页面后会自动同步最新图标；当前显示缓存或预设列表。"}
      </p>
      <div className="grid grid-cols-5 pb-4 gap-y-2 gap-x-4 mx-auto flex-wrap">
        {catalog.length ? catalog.map((item) => {
          const pressed = sidebarItemEnabled(item, settings);
          return (
            <div key={item.id} className="flex flex-col items-center gap-0.5 min-w-0">
              <StyledToggle
                onPressedChange={(enabled) => toggle(item, enabled)}
                pressed={pressed}
                title={`切换${item.label}`}
                aria-label={`切换${item.label}`}
                className="dark:bg-x-bgTwoDark bg-x-bgTwo p-3 w-fit rounded-full border-[3px] border-x-premium dark:text-white text-black"
              >
                <svg width={25} height={25} aria-hidden="true" viewBox={item.viewBox} fill="currentColor">
                  {item.paths.map((path, index) => <path key={index} d={path.d} fillRule={path.fillRule} clipRule={path.clipRule} />)}
                </svg>
              </StyledToggle>
              <span className={"text-xs text-center tracking-tight break-words w-full " + (pressed ? "text-gray-800 font-semibold" : "text-gray-500")}>{item.label}</span>
            </div>
          );
        }) : fallback}
      </div>
    </>
  );
}
