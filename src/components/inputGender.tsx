// RadioButton.tsx

import React from "react";

interface RadioButtonProps {
  options: Array<{ label: string; value: string }>;
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
