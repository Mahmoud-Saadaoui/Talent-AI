import { useTranslation } from 'react-i18next';

const StatsSection = () => {
  const { t } = useTranslation();

  const stats = [
    { value: '50K+', label: 'home.stats.candidates' },
    { value: '10K+', label: 'home.stats.companies' },
    { value: '95%', label: 'home.stats.satisfaction' },
    { value: '48h', label: 'home.stats.avgTime' },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl sm:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-100">{t(stat.label)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
