import { useTranslation } from 'react-i18next';
import { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import swal from 'sweetalert';
import AuthLayout from '../components/AuthLayout';
import AuthPageHeader from '../components/AuthPageHeader';
import AuthFormCard from '../components/AuthFormCard';
import AuthInput from '../components/AuthInput';
import AuthSubmitButton from '../components/AuthSubmitButton';
import AuthFooterLink from '../components/AuthFooterLink';
import GenderSelector from '../components/GenderSelector';
import RoleSelector from '../components/RoleSelector';
import PasswordRequirements from '../components/PasswordRequirements';
import { useRegister } from '../hooks/useRegister';
import { useRegisterValidation } from '../hooks/useRegisterValidation';

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    gender: null as 'MALE' | 'FEMALE' | null,
    role: null as 'CANDIDATE' | 'RECRUITER' | null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useRegister();
  const { validateAndPrepareData } = useRegisterValidation();

  // Submit handler
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate form using custom hook
    const { isValid, data } = validateAndPrepareData(
      form.name,
      form.email,
      form.password,
      form.gender,
      form.role
    );

    if (!isValid || !data) return;

    mutate(data, {
      onSuccess: () => {
        swal({
          title: "We've sent a verification link to your email address. Please Check it",
          icon: 'success',
        }).then((isOk) => isOk && navigate('/login'));
      },
      onError: (error) => {
        const message = axios.isAxiosError(error)
          ? error.response?.data?.message || 'Failed Register'
          : 'Failed Register';
        toast.error(message);
      },
    });
  };

  // Input change handler
  const handleInputChange = useCallback(
    (field: keyof Pick<typeof form, 'email' | 'password' | 'name'>) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
      },
    []
  );

  // Password toggle
  const togglePassword = useCallback(() => setShowPassword((prev) => !prev), []);

  // Password visibility icon
  const PasswordIcon = showPassword ? EyeOff : Eye;

  return (
    <AuthLayout maxWidth="lg">
      <AuthPageHeader
        type="register"
        title={t('auth.register.title')}
        subtitle={t('auth.register.subtitle')}
      />

      <AuthFormCard>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Basic Info */}
          <AuthInput
            type="text"
            label={t('auth.register.name')}
            placeholder={t('auth.register.namePlaceholder')}
            required
            value={form.name}
            onChange={handleInputChange('name')}
          />
          <AuthInput
            type="email"
            label={t('auth.register.email')}
            placeholder={t('auth.register.emailPlaceholder')}
            required
            value={form.email}
            onChange={handleInputChange('email')}
          />

          {/* Gender Selection */}
          <GenderSelector
            value={form.gender}
            onChange={(gender) => setForm((prev) => ({ ...prev, gender }))}
            maleLabel={t('auth.register.gender.male')}
            femaleLabel={t('auth.register.gender.female')}
          />

          {/* Role Selection */}
          <RoleSelector
            value={form.role}
            onChange={(role) => setForm((prev) => ({ ...prev, role }))}
            candidateLabel={t('auth.register.role.candidate')}
            candidateDesc={t('auth.register.role.candidateDesc')}
            recruiterLabel={t('auth.register.role.recruiter')}
            recruiterDesc={t('auth.register.role.recruiterDesc')}
          />

          {/* Password */}
          <div>
            <AuthInput
              type={showPassword ? 'text' : 'password'}
              label={t('auth.register.password')}
              placeholder={t('auth.register.passwordPlaceholder')}
              rightElement={
                <button
                  type="button"
                  onClick={togglePassword}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <PasswordIcon className="w-5 h-5" />
                </button>
              }
              required
              value={form.password}
              onChange={handleInputChange('password')}
            />
            <PasswordRequirements
              password={form.password}
              requirementsLabel={t('auth.validation.password.requirements')}
              lengthLabel={t('auth.validation.password.length')}
              uppercaseLabel={t('auth.validation.password.uppercase')}
              lowercaseLabel={t('auth.validation.password.lowercase')}
              numberLabel={t('auth.validation.password.number')}
              specialLabel={t('auth.validation.password.special')}
            />
          </div>

          {/* Submit */}
          <AuthSubmitButton isLoading={isPending}>
            {t('auth.register.submit')}
          </AuthSubmitButton>
        </form>

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
