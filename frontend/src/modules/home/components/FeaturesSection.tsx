import { useTranslation } from 'react-i18next';
import { Brain, FileText, Sparkles, BarChart3 } from 'lucide-react';

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Brain,
      gradient: 'from-blue-500 to-blue-600',
      titleKey: 'home.features.matching.title',
      descKey: 'home.features.matching.description',
    },
    {
      icon: FileText,
      gradient: 'from-purple-500 to-purple-600',
      titleKey: 'home.features.cvAnalysis.title',
      descKey: 'home.features.cvAnalysis.description',
    },
    {
      icon: Sparkles,
      gradient: 'from-green-500 to-green-600',
      titleKey: 'home.features.recommendations.title',
      descKey: 'home.features.recommendations.description',
    },
    {
      icon: BarChart3,
      gradient: 'from-orange-500 to-orange-600',
      titleKey: 'home.features.analytics.title',
      descKey: 'home.features.analytics.description',
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('home.features.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('home.features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t(feature.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
