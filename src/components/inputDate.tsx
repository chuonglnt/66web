import React, { ChangeEvent } from "react";
import { format } from "date-fns";

interface DateInputProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange }) => {
  const formattedDate = value ? format(value, "dd/MM/yyyy") : "";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputDate = event.target.value;
    const parsedDate = new Date(inputDate);

    if (!isNaN(parsedDate.getTime())) {
      // Ngày hợp lệ, gọi hàm onChange với giá trị Date mới
      onChange(parsedDate);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="date"
        value={formattedDate}
        onChange={handleChange}
        className="px-4 py-2 border rounded w-full focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default DateInput;
