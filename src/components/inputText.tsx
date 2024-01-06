import React, { ChangeEvent } from "react";

interface TextInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  isRequired: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  isRequired,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md"
        required={isRequired}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
