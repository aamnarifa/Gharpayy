import React from "react";
import { FiLoader } from "react-icons/fi";

export const LoadingSpinner = ({ size = "md", label = "Loading data..." }) => {
  const sizes = {
    sm: "text-lg",
    md: "text-3xl",
    lg: "text-5xl",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3 text-slate-400">
      <FiLoader className={`animate-spin text-indigo-500 ${sizes[size]}`} />
      {label && <p className="text-sm font-medium text-slate-400">{label}</p>}
    </div>
  );
};
