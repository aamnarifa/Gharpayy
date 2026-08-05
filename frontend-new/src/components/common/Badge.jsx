import React from "react";

export const Badge = ({ children, variant = "default", size = "md", className = "" }) => {
  const baseStyles = "inline-flex items-center font-semibold rounded-full tracking-wide";

  const variants = {
    default: "bg-slate-700/60 text-slate-300 border border-slate-600/60",
    primary: "bg-[#6D5DFC]/15 text-[#a79cfd] border border-[#6D5DFC]/30",
    secondary: "bg-[#8B5CF6]/15 text-[#c4b5fd] border border-[#8B5CF6]/30",
    success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    danger: "bg-rose-500/15 text-rose-400 border border-rose-500/30",

    // Stage specific mapping
    "new": "bg-sky-500/15 text-sky-400 border border-sky-500/30",
    "New": "bg-sky-500/15 text-sky-400 border border-sky-500/30",
    "contacted": "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    "Contacted": "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    "tour-scheduled": "bg-purple-500/15 text-purple-400 border border-purple-500/30",
    "Tour Scheduled": "bg-purple-500/15 text-purple-400 border border-purple-500/30",
    "tour-done": "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30",
    "negotiation": "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30",
    "booked": "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    "Booked": "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    "dropped": "bg-rose-500/15 text-rose-400 border border-rose-500/30",
    "Dropped": "bg-rose-500/15 text-rose-400 border border-rose-500/30",

    // Intent specific mapping
    "hot": "bg-rose-500/15 text-rose-400 border border-rose-500/30",
    "High": "bg-rose-500/15 text-rose-400 border border-rose-500/30",
    "warm": "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    "Medium": "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    "cold": "bg-slate-700/60 text-slate-400 border border-slate-600/60",
    "Low": "bg-slate-700/60 text-slate-400 border border-slate-600/60",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3.5 py-1.5 text-sm",
  };

  const selectedVariant = variants[variant] || variants[children] || variants.default;

  return (
    <span className={`${baseStyles} ${selectedVariant} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
