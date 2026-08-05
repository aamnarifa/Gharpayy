import React from "react";

export const Input = React.forwardRef(
  (
    {
      label,
      error,
      icon: Icon,
      type = "text",
      className = "",
      containerClassName = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-2 ${containerClassName}`}>
        {label && (
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {Icon && (
            <div className="absolute left-4 flex items-center justify-center text-slate-400 text-lg pointer-events-none z-10">
              <Icon />
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={`w-full bg-[#0b0f19] border border-[#283447] rounded-xl py-3 text-sm text-slate-100 placeholder-slate-500 transition-all duration-150 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ${
              Icon ? "pl-12 pr-4" : "px-4"
            } ${
              error
                ? "border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                : "hover:border-slate-600"
            } ${className}`}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-rose-400 font-semibold">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export const Select = React.forwardRef(
  (
    {
      label,
      error,
      icon: Icon,
      options = [],
      className = "",
      containerClassName = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-2 ${containerClassName}`}>
        {label && (
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {Icon && (
            <div className="absolute left-4 flex items-center justify-center text-slate-400 text-lg pointer-events-none z-10">
              <Icon />
            </div>
          )}
          <select
            ref={ref}
            className={`w-full bg-[#0b0f19] border border-[#283447] rounded-xl py-3 text-sm text-slate-100 placeholder-slate-500 transition-all duration-150 focus:outline-none appearance-none cursor-pointer focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ${
              Icon ? "pl-12 pr-10" : "pl-4 pr-10"
            } ${
              error
                ? "border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                : "hover:border-slate-600"
            } ${className}`}
            {...props}
          >
            {children
              ? children
              : options.map((opt) => (
                  <option
                    key={opt.value ?? opt}
                    value={opt.value ?? opt}
                    className="bg-slate-900 text-slate-100"
                  >
                    {opt.label ?? opt}
                  </option>
                ))}
          </select>
          <div className="absolute right-4 pointer-events-none text-slate-400 text-xs z-10">
            ▼
          </div>
        </div>
        {error && <span className="text-xs text-rose-400 font-semibold">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";
