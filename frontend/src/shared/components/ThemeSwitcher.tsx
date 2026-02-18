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
        className="flex items-center justify-center w-10 h-10 transition-all duration-200 shadow-sm"
      >
        {currentIcon}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className={`absolute mt-2 w-36 rounded-xl shadow-lg z-50
          ${isRTL ? "left-0" : "right-0"}`}
        >
          {Object.entries(themes).map(([key, { label, icon }]) => (
            <button
              key={key}
              onClick={() => {
                setTheme(key as ThemeMode);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-4 py-2 transition-all
                ${theme === key ? "font-semibold" : ""}`}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;