import { useState, useRef, useEffect } from "react";
import useTheme, { ThemeMode } from "../hooks/useTheme";
import { useTranslation } from "react-i18next";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const isRTL = i18n.language === "ar";

  const themes: Record<ThemeMode, { label: string; icon: string }> = {
    light: { label: "Light", icon: "☀️" },
    dark: { label: "Dark", icon: "🌙" },
    system: { label: "System", icon: "💻" },
  };

  const currentIcon = themes[theme]?.icon;

  // === AUTO-CLOSE when clicking outside ===
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        open &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  return (
    <div className="relative inline-block text-left select-none">

      {/* Button */}
      <button
        ref={btnRef}
        onClick={() => setOpen(prev => !prev)}
        aria-label="Select theme"
        className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="text-xl">{currentIcon}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className={`absolute mt-2 w-32 rounded-lg shadow-lg z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
          ${isRTL ? "right-0" : "left-0"}`}
        >
          {Object.entries(themes).map(([key, { label, icon }]) => (
            <button
              key={key}
              onClick={() => {
                setTheme(key as ThemeMode);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg
                ${theme === key
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
            >
              <span className="text-base">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;