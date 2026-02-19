import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      gradient: 'from-blue-500 to-blue-600',
      quoteKey: 'home.testimonials.item1.quote',
      authorKey: 'home.testimonials.item1.author',
      roleKey: 'home.testimonials.item1.role',
    },
    {
      gradient: 'from-purple-500 to-purple-600',
      quoteKey: 'home.testimonials.item2.quote',
      authorKey: 'home.testimonials.item2.author',
      roleKey: 'home.testimonials.item2.role',
    },
    {
      gradient: 'from-green-500 to-green-600',
      quoteKey: 'home.testimonials.item3.quote',
      authorKey: 'home.testimonials.item3.author',
      roleKey: 'home.testimonials.item3.role',
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('home.testimonials.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('home.testimonials.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div key={index} className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                "{t(item.quoteKey)}"
              </p>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center text-white font-bold`}>
                  {t(item.authorKey).charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {t(item.authorKey)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {t(item.roleKey)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
