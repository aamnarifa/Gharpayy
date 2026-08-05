import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, Menu, Plus, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export default function Navbar({ onMobileMenuToggle }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 glass-header px-6 sm:px-8 lg:px-10 py-5 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2.5 rounded-2xl bg-slate-800/80 text-slate-300 hover:text-white"
        >
          <Menu size={20} />
        </button>

        {/* Global Search Bar */}
        <div className="hidden sm:flex items-center gap-3 px-4 py-3 rounded-3xl bg-slate-950/60 border border-white/10 text-sm text-slate-400 w-full max-w-xl lg:max-w-2xl focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <Search size={18} className="text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search leads, phone, area..."
            className="bg-transparent border-none outline-none text-slate-100 placeholder-slate-500 w-full text-sm font-medium"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) {
                navigate(`/leads?search=${encodeURIComponent(e.target.value)}`);
              }
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden lg:inline text-xs font-semibold text-slate-400 font-mono">
          {todayStr}
        </span>

        <button
          onClick={() => showToast("No pending alerts", "info")}
          className="p-3 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white transition-colors relative"
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-500" />
        </button>

        <Link
          to="/profile"
          className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-white/10 transition-colors"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center">
            {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
          </div>
          <span className="text-xs font-bold text-slate-100 hidden sm:inline font-heading">
            {user?.name || "Admin Agent"}
          </span>
        </Link>
      </div>
    </header>
  );
}