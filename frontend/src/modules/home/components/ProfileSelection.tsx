import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Briefcase, Users, CheckCircle, ArrowRight } from 'lucide-react';

const ProfileSelection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('home.profile.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('home.profile.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Candidate Card */}
          <Link
            to="/register?role=candidate"
            className="group relative p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl border-2 border-blue-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all hover:shadow-xl hover:shadow-blue-600/20"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                {t('home.profile.candidate.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('home.profile.candidate.description')}
              </p>
              <ul className="space-y-3 text-left w-full">
                {(t('home.profile.candidate.benefits', { returnObjects: true }) as string[]).map((benefit: string, index: number) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium group-hover:gap-4 transition-all">
                {t('home.profile.getStarted')}
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>

          {/* Recruiter Card */}
          <Link
            to="/register?role=recruiter"
            className="group relative p-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl border-2 border-purple-200 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 transition-all hover:shadow-xl hover:shadow-purple-600/20"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                {t('home.profile.recruiter.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t('home.profile.recruiter.description')}
              </p>
              <ul className="space-y-3 text-left w-full">
                {(t('home.profile.recruiter.benefits', { returnObjects: true }) as string[]).map((benefit: string, index: number) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium group-hover:gap-4 transition-all">
                {t('home.profile.getStarted')}
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProfileSelection;
