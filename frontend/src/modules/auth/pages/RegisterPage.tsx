import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import AuthPageHeader from '../components/AuthPageHeader';
import AuthFormCard from '../components/AuthFormCard';
import AuthInput from '../components/AuthInput';
import AuthSubmitButton from '../components/AuthSubmitButton';
import AuthFooterLink from '../components/AuthFooterLink';
import { toast } from 'react-toastify';
import { useRegister } from '../hooks/useRegister';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | null>(null);
  const [role, setRole] = useState<'CANDIDATE' | 'RECRUITER' | null>(null);

  const { mutate, isPending, error, isError } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    if(email.trim() === "" || password.trim() === "" || name.trim() === "") {
      return toast.error("Name, Email and Password are required")
    }
    if(!gender) {
      return toast.error("Please select a gender")
    }
    if(!role) {
      return toast.error("Please select a role")
    }

     mutate(
      { email, password, name, gender, role },
      {
        onSuccess: () => {
          swal({
            title:
              "We've sent a verification link to your email address. Please Check it",
            icon: "success",
          }).then((isOk) => {
            if (isOk) {
              navigate("/login");
            }
          });
        },
      }
    );
  };

  return (
    <AuthLayout maxWidth="lg">
      {
          isError && toast.error((error as any)?.response?.data?.message || "Failed Register")
      }
      <AuthPageHeader
        type="register"
        title={t('auth.register.title')}
        subtitle={t('auth.register.subtitle')}
      />

      <AuthFormCard>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <AuthInput
            type="text"
            label={t('auth.register.name')}
            placeholder={t('auth.register.namePlaceholder')}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email */}
          <AuthInput
            type="email"
            label={t('auth.register.email')}
            placeholder={t('auth.register.emailPlaceholder')}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {t('auth.register.gender.label')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('MALE')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                  gender === 'MALE'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                }`}
              >
                <span className="text-2xl">👨</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">{t('auth.register.gender.male')}</span>
              </button>
              <button
                type="button"
                onClick={() => setGender('FEMALE')}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                  gender === 'FEMALE'
                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30'
                    : 'border-gray-200 dark:border-gray-600 hover:border-pink-500 dark:hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/30'
                }`}
              >
                <span className="text-2xl">👩</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">{t('auth.register.gender.female')}</span>
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {t('auth.register.role.label')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('CANDIDATE')}
                className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all ${
                  role === 'CANDIDATE'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                }`}
              >
                <span className="text-3xl">👤</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{t('auth.register.role.candidate')}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{t('auth.register.role.candidateDesc')}</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('RECRUITER')}
                className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all ${
                  role === 'RECRUITER'
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                    : 'border-gray-200 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/30'
                }`}
              >
                <span className="text-3xl">🏢</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{t('auth.register.role.recruiter')}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{t('auth.register.role.recruiterDesc')}</span>
              </button>
            </div>
          </div>

          {/* Password */}
          <div>
            <AuthInput
              type={showPassword ? 'text' : 'password'}
              label={t('auth.register.password')}
              placeholder={t('auth.register.passwordPlaceholder')}
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
            {/* Password Requirements */}
            <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                {t('auth.validation.password.requirements')}
              </p>
              <ul className="space-y-1">
                <li className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  {t('auth.validation.password.length')}
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  {t('auth.validation.password.uppercase')} / {t('auth.validation.password.lowercase')}
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  {t('auth.validation.password.number')} / {t('auth.validation.password.special')}
                </li>
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <AuthSubmitButton isLoading={isPending}>
            {t('auth.register.submit')}
          </AuthSubmitButton>
        </form>

        {/* Login Link */}
        <AuthFooterLink
          text={t('auth.register.hasAccount')}
          linkText={t('auth.register.loginLink')}
          to="/login"
        />
      </AuthFormCard>
    </AuthLayout>
  );
};

export default RegisterPage;
