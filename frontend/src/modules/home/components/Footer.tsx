import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Globe, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = {
    candidates: ['searchJobs', 'cvBuilder', 'recommendations', 'careerAdvice'],
    recruiters: ['postJob', 'searchTalents', 'pricing', 'enterprise'],
    company: ['about', 'contact', 'privacy', 'terms'],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">T</span>
              </div>
              <span className="text-xl font-bold text-white">TalentIA</span>
            </Link>
            <p className="text-gray-400 mb-6">
              {t('home.footer.description')}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* For Candidates */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('home.footer.forCandidates')}</h3>
            <ul className="space-y-3">
              {footerLinks.candidates.map((key) => (
                <li key={key}>
                  <Link to="#" className="hover:text-white transition-colors">
                    {t(`home.footer.links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Recruiters */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('home.footer.forRecruiters')}</h3>
            <ul className="space-y-3">
              {footerLinks.recruiters.map((key) => (
                <li key={key}>
                  <Link to="#" className="hover:text-white transition-colors">
                    {t(`home.footer.links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('home.footer.company')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((key) => (
                <li key={key}>
                  <Link to="#" className="hover:text-white transition-colors">
                    {t(`home.footer.links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500">
            © 2025 TalentIA. {t('home.footer.allRightsReserved')}
          </p>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{t('home.footer.location')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
