import React from "react";
import { FiLoader } from "react-icons/fi";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon: Icon = null,
  className = "",
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]";

  const variants = {
    primary:
      "bg-[#6D5DFC] hover:bg-[#5b4be3] text-white shadow-sm border border-[#6D5DFC]/40 focus:ring-[#6D5DFC]",
    secondary:
      "bg-slate-700 hover:bg-slate-600 text-slate-100 border border-slate-600 focus:ring-slate-500",
    outline:
      "bg-slate-900/60 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 focus:ring-[#6D5DFC]",
    danger:
      "bg-rose-600 hover:bg-rose-500 text-white shadow-sm border border-rose-500/40 focus:ring-rose-500",
    ghost:
      "bg-transparent hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 focus:ring-slate-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-5 py-3 text-base gap-2.5",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <FiLoader className="animate-spin text-base" />
      ) : Icon ? (
        <Icon className="text-base shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};
