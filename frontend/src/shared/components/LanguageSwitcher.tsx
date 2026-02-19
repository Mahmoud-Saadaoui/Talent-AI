import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const isRTL = i18n.language === 'ar';

  const languages = [
    { code: 'ar', name: 'العربية', short: 'AR', dir: 'rtl' },
    { code: 'fr', name: 'Français', short: 'FR', dir: 'ltr' },
    { code: 'en', name: 'English', short: 'EN', dir: 'ltr' },
  ];

  const currentLang = languages.find(l => l.code === i18n.language);

  const changeLanguage = (langCode: string, dir: string) => {
    i18n.changeLanguage(langCode);
    document.documentElement.dir = dir;
    document.documentElement.lang = langCode;
    setOpen(false);
  };

  // Auto-close when clicking outside
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

    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [open]);

  return (
    <div className="relative inline-block text-left select-none">
      {/* Button */}
      <button
        ref={btnRef}
        onClick={() => setOpen(prev => !prev)}
        aria-label="Select language"
        className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {currentLang?.short}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className={`absolute mt-2 w-36 rounded-lg shadow-lg z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
          ${isRTL ? 'right-0' : 'left-0'}`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code, lang.dir)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg
                ${i18n.language === lang.code
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
              <span className="font-semibold text-xs">{lang.short}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
