interface GenderSelectorProps {
  value: 'MALE' | 'FEMALE' | null;
  // eslint-disable-next-line no-unused-vars
  onChange: (gender: 'MALE' | 'FEMALE') => void;
  maleLabel: string;
  femaleLabel: string;
}

const buttonStyles = {
  base: 'flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 transition-all',
  selected: 'border-blue-500 bg-blue-50 dark:bg-blue-900/30',
  unselected: 'border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30',
};

const GenderSelector = ({ value, onChange, maleLabel, femaleLabel }: GenderSelectorProps) => {
  const getButtonClass = (isSelected: boolean) =>
    `${buttonStyles.base} ${isSelected ? buttonStyles.selected : buttonStyles.unselected}`;

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Gender
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange('MALE')}
          className={getButtonClass(value === 'MALE')}
        >
          <span className="text-2xl">👨</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">{maleLabel}</span>
        </button>
        <button
          type="button"
          onClick={() => onChange('FEMALE')}
          className={getButtonClass(value === 'FEMALE')}
        >
          <span className="text-2xl">👩</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">{femaleLabel}</span>
        </button>
      </div>
    </div>
  );
};

export default GenderSelector;
