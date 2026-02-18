import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../shared/components/LanguageSwitcher';
import ThemeSwitcher from '../shared/components/ThemeSwitcher';

const App = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        {/* Language & Theme Switchers */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>

        {/* Welcome Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center transition-colors duration-200">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {t('common.welcome')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('common.appName')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
