import React from "react";

interface SelectProps<T> {
  enumObj: T;
  label: string;
  selectedValue: string;
  onChange: (value: string) => void;
  includeEmpty?: boolean; // Option để bao gồm một option rỗng
  emptyLabel?: string; // Label cho option rỗng
}

// T là generic type cho Enum
function EnumSelect<T>({
  enumObj,
  label,
  selectedValue,
  onChange,
  includeEmpty = false, // Mặc định không bao gồm option rỗng
  emptyLabel = "", // Mặc định label rỗng là một chuỗi rỗng
}: SelectProps<T>) {
  // Chuyển đổi Enum thành một mảng các giá trị để render các options
  const options = Object.values(enumObj as object);

  return (
    <div className="">
      <label className="w-40 justify-start block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        className="w-full p-2 mb-3 focus:border-blue-400 border hover:border enabled:hover:border-black rounded-md"
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
      >
        {includeEmpty && <option value="">{emptyLabel}</option>}{" "}
        {/* Thêm option rỗng nếu được yêu cầu */}
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EnumSelect;
