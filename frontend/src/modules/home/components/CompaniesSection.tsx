import { useTranslation } from 'react-i18next';
import { Building2 } from 'lucide-react';

const CompaniesSection = () => {
  const { t } = useTranslation();

  const companies = t('home.companies.list', { returnObjects: true }) as string[];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            {t('home.companies.label')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
          {companies.map((company: string, index: number) => (
            <div key={index} className="flex items-center gap-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <Building2 className="w-8 h-8" />
              <span className="text-xl font-bold">{company}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;
