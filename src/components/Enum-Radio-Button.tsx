import React, { ChangeEvent } from "react";

interface RadioButtonProps<T> {
  enumObj: T;
  labelName: string;
  name: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

function EnumRadioButton<T>({
  enumObj,
  labelName,
  name,
  selectedValue,
  onChange,
}: RadioButtonProps<T>) {
  const options = Object.values(enumObj as object);

  return (
    <>
      <label className="inline-flex items-center mr-4">
        {labelName}
        {options.map((value) => (
          <label key={value}>
            <input
              type="radio"
              name={name}
              value={value}
              checked={selectedValue === value}
              onChange={(e) => onChange(e.target.value)}
            />
            {value}
          </label>
        ))}
      </label>
    </>
  );
}
export default EnumRadioButton;
