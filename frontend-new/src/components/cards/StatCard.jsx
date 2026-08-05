import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function StatCard({ title, value, icon, color, change }) {
  return (
    <div className="glass-card p-8 min-h-[18rem] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="flex justify-between items-start gap-4 mb-6">
        <div className={`w-14 h-14 rounded-3xl flex items-center justify-center ${color} shadow-xl`}>
          {icon}
        </div>
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <ArrowUpRight size={14} />
          <span>{change}</span>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400 mb-3">
          {title}
        </h3>
        <h1 className="text-4xl font-extrabold text-white tracking-tight leading-none">
          {value}
        </h1>
      </div>
    </div>
  );
}