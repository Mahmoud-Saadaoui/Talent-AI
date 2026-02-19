import { AuthLayoutProps } from '../types';

const AuthLayout = ({ children, maxWidth = 'md' }: AuthLayoutProps) => {
  const maxWidthClass = maxWidth === 'lg' ? 'max-w-lg' : 'max-w-md';

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className={`${maxWidthClass} w-full`}>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
