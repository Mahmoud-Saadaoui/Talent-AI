import { useTranslation } from 'react-i18next';
import { Upload, Brain, CheckCircle } from 'lucide-react';

const HowItWorksSection = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Upload,
      gradient: 'from-blue-500 to-blue-600',
      lineGradient: 'from-blue-600 to-purple-600',
      bgColor: 'bg-blue-600',
      titleKey: 'home.howItWorks.step1.title',
      descKey: 'home.howItWorks.step1.description',
    },
    {
      icon: Brain,
      gradient: 'from-purple-500 to-purple-600',
      lineGradient: 'from-purple-600 to-green-600',
      bgColor: 'bg-purple-600',
      titleKey: 'home.howItWorks.step2.title',
      descKey: 'home.howItWorks.step2.description',
    },
    {
      icon: CheckCircle,
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-green-600',
      titleKey: 'home.howItWorks.step3.title',
      descKey: 'home.howItWorks.step3.description',
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('home.howItWorks.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('home.howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isNotLast = index < steps.length - 1;

            return (
              <div key={index} className="relative text-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg ${step.bgColor}/30`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                {isNotLast && (
                  <>
                    <div className={`absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r ${step.lineGradient} hidden md:block`} />
                    <div className={`absolute top-6 left-[60%] w-8 h-8 ${step.bgColor} rounded-full flex items-center justify-center text-white font-bold text-sm hidden md:block`}>
                      →
                    </div>
                  </>
                )}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t(step.titleKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t(step.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
