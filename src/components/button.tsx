import React, { MouseEvent } from "react";

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  label: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "success" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  type = "button",
  variant = "primary",
}) => {
  // Define Tailwind CSS classes based on the variant
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-500 hover:bg-blue-700 text-white";
      case "secondary":
        return "bg-gray-300 hover:bg-gray-400 text-gray-800";
      case "success":
        return "bg-green-600 hover:bg-green-700 text-white";
      case "danger":
        return "bg-red-500 hover:bg-red-700 text-white";
      default:
        return "bg-green-500 hover:bg-green-700 text-white";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition-colors focus:outline-none ${getVariantClasses()}`}
    >
      {label}
    </button>
  );
};

export default Button;
