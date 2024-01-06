import React, { ChangeEvent } from "react";

interface RadioButtonProps {
  labelName: string;
  name: string;
  value: string;
  options: Array<{ label: string; value: string }>;
  selectedValue: string;
  onChange: (value: string) => void; // Corrected the type here
  colorClass: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  labelName,
  name,
  value,
  options,
  selectedValue,
  onChange,
  colorClass,
}) => {
  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   onChange(event.target.value);
  // };

  return (
    <label className="inline-flex items-center mr-4">
      {labelName}
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={option.label}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className={`form-radio ${colorClass}`}
          />
          {option.label}
        </label>
      ))}
      {/* <input
        type="radio"
        name={name}
        value={option.value}
        checked={selectedValue === option.value}
        onChange={handleChange}
        className={`form-radio ${colorClass}`}
      />
      <span className="ml-2">{label}</span> */}
    </label>
  );
};

export default RadioButton;
