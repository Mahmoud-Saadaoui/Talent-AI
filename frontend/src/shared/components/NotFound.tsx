import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number with Animation */}
        <div className="relative mb-8">
          <div className="text-[180px] sm:text-[220px] font-bold bg-linear-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent leading-none select-none">
            404
          </div>
          {/* Floating elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
            <div className="absolute top-[20%] left-[10%] w-16 h-16 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="absolute top-[40%] right-[15%] w-12 h-12 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-[30%] left-[20%] w-20 h-20 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {t('notFound.title')}
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto">
          {t('notFound.description')}
        </p>

        {/* Illustration */}
        <div className="mb-10 flex justify-center">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
              <Search className="w-24 h-24 text-blue-400 dark:text-blue-500" />
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">🔍</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40"
          >
            <Home className="w-5 h-5" />
            {t('notFound.backHome')}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('notFound.goBack')}
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {t('notFound.helpfulLinks')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              {t('notFound.links.home')}
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              {t('notFound.links.login')}
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              {t('notFound.links.register')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
