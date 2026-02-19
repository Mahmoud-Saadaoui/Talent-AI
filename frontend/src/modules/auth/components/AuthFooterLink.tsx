import { Link } from 'react-router-dom';
import { AuthFooterLinkProps } from '../types';

const AuthFooterLink = ({ text, linkText, to }: AuthFooterLinkProps) => {
  return (
    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
      {text}{' '}
      <Link to={to} className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
        {linkText}
      </Link>
    </p>
  );
};

export default AuthFooterLink;
