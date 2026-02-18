import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'ar', name: 'العربية', dir: 'rtl' },
    { code: 'fr', name: 'Français', dir: 'ltr' },
    { code: 'en', name: 'English', dir: 'ltr' },
  ];

  const changeLanguage = (langCode: string, dir: string) => {
    i18n.changeLanguage(langCode);
    document.documentElement.dir = dir;
    document.documentElement.lang = langCode;
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {i18n.t('language.select')}:
      </span>
      <div className="flex gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code, lang.dir)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              i18n.language === lang.code
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
