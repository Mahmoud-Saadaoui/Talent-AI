import { AuthFormCardProps } from '../types';

const AuthFormCard = ({ children }: AuthFormCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      {children}
    </div>
  );
};

export default AuthFormCard;
