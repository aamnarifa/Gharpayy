import React from "react";

export const Card = ({ children, className = "", hover = true, ...props }) => {
  return (
    <div
      className={`rounded-2xl border border-slate-700/80 bg-slate-800 p-6 shadow-md ${
        hover
          ? "transition-all duration-200 hover:border-slate-600 hover:shadow-lg"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => (
  <div className={`flex items-center justify-between pb-4 border-b border-slate-700/60 mb-5 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-base font-bold text-slate-50 tracking-tight flex items-center gap-2 ${className}`}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);
