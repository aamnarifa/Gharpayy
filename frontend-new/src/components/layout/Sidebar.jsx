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
  { title: "Scheduled Tours", icon: CalendarDays, path: "/tours" },
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
        className={`fixed md:sticky top-0 z-40 h-screen max-h-screen w-72 shrink-0 glass-sidebar flex flex-col justify-between overflow-hidden transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Top Brand Logo Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white flex items-center justify-center text-base shrink-0 shadow-lg shadow-indigo-500/25">
              <Zap size={18} />
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight text-white font-heading leading-tight">
                Sales<span className="text-indigo-300">CRM</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Lead Operations
              </p>
            </div>
          </NavLink>

          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800/60"
          >
            <X size={18} />
          </button>
        </div>

        {/* Middle Navigation Section (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-4">
          <div>
            <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-400 font-heading">
              Main Menu
            </p>
            <nav className="space-y-1">
              {menu.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-indigo-600/20 text-white border border-indigo-500/30 shadow-sm"
                          : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                      }`
                    }
                  >
                    <span className="grid place-items-center w-7 h-7 rounded-lg bg-slate-950/80 text-slate-400 group-hover:bg-slate-900 group-hover:text-indigo-400 shrink-0 transition-colors">
                      <Icon size={15} />
                    </span>
                    <span className="font-heading text-xs font-semibold tracking-wide truncate">
                      {item.title}
                    </span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom User Profile & Logout Footer with Safe Area Clearance */}
        <div className="p-3.5 pb-8 border-t border-white/10 space-y-2 shrink-0 bg-slate-950/50">
          <NavLink
            to="/profile"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-white/10 hover:border-indigo-500/30 transition-all group"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-100 truncate group-hover:text-indigo-300 transition-colors">
                  {user?.name || "Admin Agent"}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {user?.role || "Sales Manager"}
                </p>
              </div>
            </div>
            <User size={15} className="text-slate-400 group-hover:text-indigo-300 shrink-0" />
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 text-rose-300 text-xs font-bold transition-all"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}