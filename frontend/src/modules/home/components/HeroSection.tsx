import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, Briefcase, Users, Sparkles, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'job' | 'talent'>('job');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery, 'type:', searchType);
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[90vh] flex items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>{t('home.hero.badge')}</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            {t('home.hero.title')}
            <span className="block bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('home.hero.titleHighlight')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            {t('home.hero.subtitle')}
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            {/* Search type toggle */}
            <div className="flex justify-center gap-2 mb-4">
              <button
                onClick={() => setSearchType('job')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  searchType === 'job'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                {t('home.search.jobButton')}
              </button>
              <button
                onClick={() => setSearchType('talent')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  searchType === 'talent'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Users className="w-4 h-4" />
                {t('home.search.talentButton')}
              </button>
            </div>

            {/* Search form */}
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="flex-1 flex items-center">
                  <Search className="w-5 h-5 text-gray-400 ml-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={searchType === 'job' ? t('home.search.jobPlaceholder') : t('home.search.talentPlaceholder')}
                    className="w-full px-4 py-4 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-semibold rounded-r-2xl transition-all flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  {t('home.search.searchButton')}
                </button>
              </div>

              {/* Quick filters */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {(t('home.search.quickFilters', { returnObjects: true }) as string[]).map((filter: string, index: number) => (
                  <button
                    key={index}
                    className="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40"
            >
              {t('home.hero.getStarted')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
            >
              {t('home.hero.signIn')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
