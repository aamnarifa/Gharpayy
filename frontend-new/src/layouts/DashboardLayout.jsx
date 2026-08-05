import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid,
  FiUsers,
  FiTrello,
  FiBookmark,
  FiActivity,
  FiPieChart,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiBell,
  FiSearch,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
  FiZap,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export const DashboardLayout = ({ children, onOpenAddLeadModal }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const { showToast } = useToast();

  const navigation = [
    { name: "Dashboard Overview", href: "/dashboard", icon: FiGrid },
    { name: "Leads Directory", href: "/leads", icon: FiUsers },
    { name: "Pipeline Kanban", href: "/pipeline", icon: FiTrello },
    { name: "PG Room Bookings", href: "/bookings", icon: FiBookmark },
    { name: "Activities & Calls", href: "/activities", icon: FiActivity },
    { name: "Reports & Analytics", href: "/analytics", icon: FiPieChart },
    { name: "Agent Account", href: "/profile", icon: FiUser },
  ];

  const handleLogout = () => {
    logoutUser();
    showToast("Logged out successfully", "info");
    navigate("/login");
  };

  const isActive = (path) => {
    if (path === "/dashboard" && (location.pathname === "/" || location.pathname === "/dashboard")) {
      return true;
    }
    return location.pathname.startsWith(path) && path !== "/dashboard";
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-[#f8fafc] flex flex-col md:flex-row">
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Spacious 320px Wide Side Panel */}
      <aside
        className={`fixed md:sticky top-0 z-50 h-screen bg-[#0f172a] border-r border-[#1e293b] flex flex-col transition-all duration-300 ${
          collapsed ? "w-24" : "w-80"
        } ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Brand Header */}
        <div className="p-6 sm:p-7 flex items-center justify-between border-b border-[#1e293b]">
          <Link to="/dashboard" className="flex items-center gap-4 overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl shrink-0 font-bold shadow-lg shadow-indigo-600/35">
              <FiZap />
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <h1 className="font-extrabold text-xl tracking-tight text-white font-heading">
                  PGBooking<span className="text-indigo-400">CRM</span>
                </h1>
                <p className="text-xs text-slate-400 font-medium">Enterprise Management</p>
              </div>
            )}
          </Link>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-2.5 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <FiChevronRight className="text-xl" /> : <FiChevronLeft className="text-xl" />}
          </button>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white p-2.5 rounded-2xl bg-slate-800"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Navigation Items with Airy Padding */}
        <nav className="flex-1 p-5 space-y-3 overflow-y-auto">
          {navigation.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-base font-bold transition-all duration-200 ${
                  active
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/80"
                }`}
                title={collapsed ? item.name : undefined}
              >
                <Icon className={`text-2xl shrink-0 ${active ? "text-white" : "text-slate-400"}`} />
                {!collapsed && <span className="font-heading tracking-wide">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & User Profile Footer */}
        <div className="p-6 border-t border-[#1e293b] space-y-4">
          {onOpenAddLeadModal && (
            <button
              onClick={() => {
                setSidebarOpen(false);
                onOpenAddLeadModal();
              }}
              className="w-full py-4 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-base font-extrabold flex items-center justify-center gap-2.5 shadow-xl shadow-indigo-600/35 transition-all font-heading"
            >
              <FiPlus className="text-2xl shrink-0" />
              {!collapsed && <span>Add New Lead</span>}
            </button>
          )}

          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#090d16] border border-[#1e293b]">
            <div className="flex items-center gap-3.5 overflow-hidden">
              <div className="w-11 h-11 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-extrabold text-base flex items-center justify-center shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
              </div>
              {!collapsed && (
                <div className="overflow-hidden">
                  <p className="text-sm font-extrabold text-slate-100 truncate">
                    {user?.name || "Admin Manager"}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {user?.role || "TCM Agent"}
                  </p>
                </div>
              )}
            </div>
            {!collapsed && (
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-2xl transition-colors shrink-0"
              >
                <FiLogOut className="text-xl" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#0f172a]/95 backdrop-blur-xl border-b border-[#1e293b] px-6 sm:px-10 py-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-slate-400 hover:text-white p-3 rounded-2xl bg-slate-800"
            >
              <FiMenu className="text-2xl" />
            </button>

            {/* Search Bar */}
            <div className="hidden sm:flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-[#090d16] border border-[#1e293b] text-sm text-slate-400 w-80 lg:w-96 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
              <FiSearch className="text-slate-400 text-lg" />
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
            {onOpenAddLeadModal && (
              <button
                onClick={onOpenAddLeadModal}
                className="hidden sm:flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-extrabold shadow-xl shadow-indigo-600/30 transition-all font-heading"
              >
                <FiPlus className="text-lg" />
                <span>Create Lead</span>
              </button>
            )}

            <button
              onClick={() => showToast("No new notifications", "info")}
              className="p-3.5 rounded-2xl bg-[#1e293b]/70 hover:bg-slate-800 border border-[#1e293b] text-slate-300 hover:text-white transition-colors"
            >
              <FiBell className="text-xl" />
            </button>

            <Link
              to="/profile"
              className="flex items-center gap-3.5 p-2 pr-5 rounded-2xl bg-[#1e293b]/70 hover:bg-slate-800 border border-[#1e293b] transition-colors"
            >
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center">
                {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
              </div>
              <span className="text-sm font-extrabold text-slate-100 hidden lg:inline">
                {user?.name || "Admin Manager"}
              </span>
            </Link>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 spacious-container max-w-7xl w-full mx-auto space-y-10">
          {children}
        </main>
      </div>
    </div>
  );
};
