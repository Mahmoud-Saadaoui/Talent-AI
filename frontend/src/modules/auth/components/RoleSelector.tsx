interface RoleSelectorProps {
  value: 'CANDIDATE' | 'RECRUITER' | null;
  onChange: (role: 'CANDIDATE' | 'RECRUITER') => void;
  candidateLabel: string;
  candidateDesc: string;
  recruiterLabel: string;
  recruiterDesc: string;
}

const buttonStyles = {
  base: 'flex flex-col items-center gap-2 px-4 py-4 rounded-xl border-2 transition-all',
  candidate: {
    selected: 'border-blue-500 bg-blue-50 dark:bg-blue-900/30',
    unselected: 'border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30',
  },
  recruiter: {
    selected: 'border-purple-500 bg-purple-50 dark:bg-purple-900/30',
    unselected: 'border-gray-200 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/30',
  },
};

const RoleSelector = ({
  value,
  onChange,
  candidateLabel,
  candidateDesc,
  recruiterLabel,
  recruiterDesc,
}: RoleSelectorProps) => {
  const getCandidateClass = () =>
    `${buttonStyles.base} ${value === 'CANDIDATE' ? buttonStyles.candidate.selected : buttonStyles.candidate.unselected}`;

  const getRecruiterClass = () =>
    `${buttonStyles.base} ${value === 'RECRUITER' ? buttonStyles.recruiter.selected : buttonStyles.recruiter.unselected}`;

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Role
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange('CANDIDATE')}
          className={getCandidateClass()}
        >
          <span className="text-3xl">👤</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{candidateLabel}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{candidateDesc}</span>
        </button>
        <button
          type="button"
          onClick={() => onChange('RECRUITER')}
          className={getRecruiterClass()}
        >
          <span className="text-3xl">🏢</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{recruiterLabel}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{recruiterDesc}</span>
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
