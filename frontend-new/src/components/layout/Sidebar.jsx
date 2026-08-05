import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Kanban,
  CalendarDays,
  Activity,
  Wallet,
  BarChart3,
  User,
  LogOut,
  X,
  Zap,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const menu = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Leads Directory", icon: Users, path: "/leads" },
  { title: "Pipeline Kanban", icon: Kanban, path: "/pipeline" },
  { title: "PG Bookings", icon: Wallet, path: "/bookings" },
  { title: "Activities Log", icon: Activity, path: "/activities" },
  { title: "Analytics", icon: BarChart3, path: "/analytics" },
];

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  const { user, logoutUser } = useAuth();
  const { showToast } = useToast();

  const handleLogout = () => {
    logoutUser();
    showToast("Logged out successfully", "info");
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 z-50 h-screen w-80 max-w-[20rem] glass-sidebar flex flex-col justify-between transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Brand Logo Header */}
          <div className="p-7 flex items-center justify-between border-b border-white/10">
            <NavLink to="/" className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white flex items-center justify-center text-xl shrink-0 shadow-[0_18px_40px_rgba(99,102,241,0.25)]">
                <Zap size={22} />
              </div>
              <div>
                <h1 className="font-extrabold text-2xl tracking-tight text-white font-heading">
                  Sales<span className="text-indigo-300">CRM</span>
                </h1>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.35em] mt-1">
                  Lead Operations
                </p>
              </div>
            </NavLink>

            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-6 space-y-4">
            <div className="px-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500 mb-2 font-heading">
              Main Menu
            </div>
            {menu.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.title}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center gap-4 px-5 py-3.5 rounded-3xl transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-500/15 text-white border border-indigo-400/20 shadow-[0_20px_50px_rgba(15,23,42,0.35)]"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                    }`
                  }
                >
                  <span className="grid place-items-center w-12 h-12 rounded-3xl bg-slate-950/80 text-slate-400 group-hover:bg-slate-900/85">
                    <Icon size={20} />
                  </span>
                  <span className="font-heading text-sm font-semibold tracking-wide truncate">{item.title}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Footer */}
        <div className="p-5 border-t border-white/10 space-y-4">
          <NavLink
            to="/profile"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between p-4 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-indigo-500/20 transition-all group"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-11 h-11 rounded-2xl bg-indigo-600/15 border border-indigo-500/20 text-indigo-300 font-extrabold text-base flex items-center justify-center shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-slate-100 truncate group-hover:text-indigo-300 transition-colors">
                  {user?.name || "Admin Agent"}
                </p>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {user?.role || "TCM Manager"}
                </p>
              </div>
            </div>
            <User size={18} className="text-slate-400 group-hover:text-indigo-300 shrink-0" />
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-3xl bg-slate-950/70 hover:bg-rose-500/15 border border-rose-500/20 text-rose-300 text-sm font-semibold transition-all"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}