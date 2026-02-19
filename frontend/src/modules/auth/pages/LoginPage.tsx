import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import AuthPageHeader from '../components/AuthPageHeader';
import AuthFormCard from '../components/AuthFormCard';
import AuthInput from '../components/AuthInput';
import AuthSubmitButton from '../components/AuthSubmitButton';
import AuthFooterLink from '../components/AuthFooterLink';
import { useLogin } from '../hooks/useLogin';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {mutate, isPending, error, isError} = useLogin()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log(data);
          navigate('/')
        },
      },
    );
    setEmail("");
    setPassword("");
  };

  return (
    <AuthLayout>
      {
        isError && toast.error((error as any)?.response?.data?.message || "Failed Login")
      }
      <AuthPageHeader
        type="login"
        title={t('auth.login.title')}
        subtitle={t('auth.login.subtitle')}
      />

      <AuthFormCard>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <AuthInput
            type="email"
            label={t('auth.login.email')}
            placeholder={t('auth.login.emailPlaceholder')}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <AuthInput
            type={showPassword ? 'text' : 'password'}
            label={t('auth.login.password')}
            placeholder={t('auth.login.passwordPlaceholder')}
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            }
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('auth.login.rememberMe')}</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {t('auth.login.forgotPassword')}
            </Link>
          </div>

          {/* Submit Button */}
          <AuthSubmitButton isLoading={isPending}>
            {t('auth.login.submit')}
          </AuthSubmitButton>
        </form>

        {/* Register Link */}
        <AuthFooterLink
          text={t('auth.login.noAccount')}
          linkText={t('auth.login.registerLink')}
          to="/register"
        />
      </AuthFormCard>
    </AuthLayout>
  );
};

export default LoginPage;
