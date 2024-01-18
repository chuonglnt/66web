import React, { ChangeEvent } from "react";

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange }) => {
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); // Truyền giá trị ngày tháng trực tiếp
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
        <input
          type="date"
          value={value}
          onChange={handleDateChange}
          className="w-full p-2 focus:border-blue-400 border hover:border enabled:hover:border-black rounded-md"
        />
      </label>
    </div>
  );
};

export default DateInput;
