import { Check, X } from 'lucide-react';

export interface PasswordRequirement {
  label: string;
  isValid: boolean;
}

interface PasswordRequirementsProps {
  password: string;
  requirementsLabel: string;
  lengthLabel: string;
  uppercaseLabel: string;
  lowercaseLabel: string;
  numberLabel: string;
  specialLabel: string;
}

const MIN_LENGTH = 8;

const PasswordRequirements = ({
  password,
  requirementsLabel,
  lengthLabel,
  uppercaseLabel,
  lowercaseLabel,
  numberLabel,
  specialLabel,
}: PasswordRequirementsProps) => {
  // Validation rules
  const requirements: PasswordRequirement[] = [
    {
      label: lengthLabel,
      isValid: password.length >= MIN_LENGTH,
    },
    {
      label: uppercaseLabel,
      isValid: /[A-Z]/.test(password),
    },
    {
      label: lowercaseLabel,
      isValid: /[a-z]/.test(password),
    },
    {
      label: numberLabel,
      isValid: /[0-9]/.test(password),
    },
    {
      label: specialLabel,
      isValid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  // Calculate progress
  const validCount = requirements.filter((r) => r.isValid).length;
  const progress = (validCount / requirements.length) * 100;

  // Styles
  const getIconClass = (isValid: boolean) =>
    `w-4 h-4 ${isValid ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'}`;

  const getTextClass = (isValid: boolean) =>
    `text-xs ${isValid ? 'text-green-600 dark:text-green-400 font-medium' : 'text-gray-500 dark:text-gray-400'}`;

  return (
    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      {/* Header with progress bar */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {requirementsLabel}
          </p>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {validCount}/{requirements.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              validCount === requirements.length
                ? 'bg-green-500'
                : validCount >= 3
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Requirements list */}
      <ul className="space-y-1.5">
        {requirements.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.isValid ? (
              <Check className={getIconClass(true)} />
            ) : (
              <X className={getIconClass(false)} />
            )}
            <span className={getTextClass(req.isValid)}>{req.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordRequirements;
