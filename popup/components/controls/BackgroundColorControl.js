import { useEffect, useMemo, useState } from "react";

import { KeyBackgroundColor } from "../../../storage-keys";
import { getStorage, setStorageImmediately } from "../../utilities/chromeStorage";

const presetColors = [
  { label: "默认", value: "" },
  { label: "白", value: "#ffffff" },
  { label: "灰", value: "#f7f9f9" },
  { label: "暖", value: "#f7f4ed" },
  { label: "蓝", value: "#f1f8ff" },
  { label: "暗", value: "#101418" },
];

const normalizeHexColor = (color) => {
  if (typeof color !== "string") return "";

  const trimmedColor = color.trim();
  if (!trimmedColor) return "";

  const colorWithHash = trimmedColor.startsWith("#") ? trimmedColor : `#${trimmedColor}`;
  if (!/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(colorWithHash)) return "";

  return colorWithHash.toLowerCase();
};

const BackgroundColorControl = () => {
  const [draftColor, setDraftColor] = useState("");
  const [savedColor, setSavedColor] = useState("");

  const normalizedDraftColor = useMemo(() => normalizeHexColor(draftColor), [draftColor]);
  const isInvalid = draftColor.trim() !== "" && !normalizedDraftColor;
  const colorPickerValue = normalizedDraftColor || savedColor || "#ffffff";

  useEffect(() => {
    const getInitialColor = async () => {
      try {
        const storedColor = normalizeHexColor(await getStorage(KeyBackgroundColor));
        setDraftColor(storedColor);
        setSavedColor(storedColor);
      } catch (error) {
        console.warn(error);
      }
    };

    getInitialColor();
  }, []);

  const saveNormalizedColor = async (normalizedColor) => {
    try {
      await setStorageImmediately({ [KeyBackgroundColor]: normalizedColor });
      setDraftColor(normalizedColor);
      setSavedColor(normalizedColor);
    } catch (error) {
      console.warn(error);
    }
  };

  const saveColor = async (color) => {
    const normalizedColor = normalizeHexColor(color);
    setDraftColor(color);

    if (color.trim() !== "" && !normalizedColor) return;

    await saveNormalizedColor(normalizedColor);
  };

  const saveDraftColor = async () => {
    if (isInvalid) return;

    await saveNormalizedColor(normalizedDraftColor);
  };

  return (
    <div className="flex flex-col gap-y-3 w-full">
      <div className="flex items-center justify-between w-full">
        <label htmlFor={KeyBackgroundColor} className="text-[15px] font-medium">
          背景颜色
        </label>
        <span className="text-xs font-semibold dark:text-x-accent1Dark text-x-accent1">{savedColor || "默认"}</span>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {presetColors.map(({ label, value }) => {
          const isSelected = savedColor === value;

          return (
            <button
              key={label}
              type="button"
              aria-pressed={isSelected}
              onClick={() => saveColor(value)}
              className="h-9 rounded-full border text-xs font-bold transition"
              style={{
                backgroundColor: value || "#ffffff",
                borderColor: isSelected ? "#1d9bf0" : "#cfd9de",
                boxShadow: isSelected ? "0 0 0 2px rgba(29, 155, 240, 0.18)" : "none",
                color: value === "#101418" ? "#ffffff" : "#0f1419",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-x-2">
        <input
          type="color"
          aria-label="选择背景颜色"
          value={colorPickerValue}
          onChange={(event) => saveColor(event.target.value)}
          className="h-9 w-11 rounded-lg border border-x-accent2 bg-transparent"
        />
        <input
          id={KeyBackgroundColor}
          type="text"
          inputMode="text"
          spellCheck="false"
          value={draftColor}
          onChange={(event) => setDraftColor(event.target.value)}
          onBlur={saveDraftColor}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              saveDraftColor();
            }
          }}
          placeholder="#f7f9f9"
          className={`min-w-0 flex-1 rounded-lg border bg-white px-3 py-2 text-sm font-semibold text-black outline-none dark:bg-black dark:text-white ${
            isInvalid ? "border-red-500" : "border-x-accent2 focus:border-x-premium"
          }`}
        />
      </div>
    </div>
  );
};

export default BackgroundColorControl;
