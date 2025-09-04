import React from "react";

export default function Button({
  children,
  type = "button",
  onClick,
  fullWidth = false,
  color = "blue",
  disabled = false,
}) {
  const baseClasses = "py-2 px-4 rounded-md font-semibold transition";
  const widthClass = fullWidth ? "w-full" : "inline-block";

  const colorClasses = {
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
    green: "bg-green-600 hover:bg-green-700 text-white",
    red: "bg-red-600 hover:bg-red-700 text-white",
    gray: "bg-gray-600 hover:bg-gray-700 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${widthClass} ${colorClasses[color]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}
