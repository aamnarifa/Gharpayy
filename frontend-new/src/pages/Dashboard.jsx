import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import StatCard from "../components/cards/StatCard";
import { useToast } from "../context/ToastContext";
import { getDashboardStats, getRecentLeads, getHotLeads } from "../services/dashboardService";
import {
  Users,
  Flame,
  CalendarDays,
  Wallet,
  ArrowUpRight,
  Plus,
  Eye,
  Zap,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const STAGE_COLORS = {
  new: "#38bdf8",
  contacted: "#f59e0b",
  "tour-scheduled": "#c084fc",
  "tour-done": "#a855f7",
  negotiation: "#6366f1",
  booked: "#10b981",
  dropped: "#f43f5e",
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [hotLeads, setHotLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const { showToast } = useToast();

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, recentData, hotData] = await Promise.allSettled([
        getDashboardStats(),
        getRecentLeads(),
        getHotLeads(),
      ]);

      if (statsData.status === "fulfilled") {
        const statsValue = statsData.value?.dashboard ? statsData.value.dashboard : statsData.value;
        setStats(statsValue);
      }
      if (recentData.status === "fulfilled") {
        const recentValue = recentData.value?.leads ? recentData.value.leads : recentData.value;
        setRecentLeads(Array.isArray(recentValue) ? recentValue : []);
      }
      if (hotData.status === "fulfilled") {
        const hotValue = hotData.value?.leads ? hotData.value.leads : hotData.value;
        setHotLeads(Array.isArray(hotValue) ? hotValue : []);
      }
    } catch (err) {
      showToast("Failed to load live dashboard metrics", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalLeads = stats?.totalLeads || recentLeads.length || 0;
  const hotCount = hotLeads.length || stats?.hotLeads || 0;
  const tourCount = stats?.tourScheduled || stats?.stageBreakdown?.["tour-scheduled"] || 0;
  const bookedCount = stats?.booked || stats?.stageBreakdown?.booked || 0;

  const stageChartData = [
    { name: "New", count: stats?.newLeads || stats?.stageBreakdown?.new || 0, color: STAGE_COLORS.new },
    { name: "Contacted", count: stats?.contacted || stats?.stageBreakdown?.contacted || 0, color: STAGE_COLORS.contacted },
    { name: "Tours", count: tourCount, color: STAGE_COLORS["tour-scheduled"] },
    { name: "Booked", count: bookedCount, color: STAGE_COLORS.booked },
    { name: "Dropped", count: stats?.dropped || stats?.stageBreakdown?.dropped || 0, color: STAGE_COLORS.dropped },
  ];

  return (
    <Layout>
      {/* Hero Welcome Banner */}
      <div className="glass-card p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider font-heading">
            <Zap size={14} />
            Live Operations Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
            Real-time insights on room inquiries, tenant visits, conversion pipelines, and TCM operations.
          </p>
        </div>

        <Link
          to="/leads"
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/30 transition-all shrink-0 font-heading"
        >
          <Plus size={18} />
          <span>Add New Lead</span>
        </Link>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Leads"
          value={totalLeads.toString()}
          change="+12% this month"
          color="bg-indigo-500/20 border border-indigo-500/30 text-indigo-300"
          icon={<Users size={24} />}
        />

        <StatCard
          title="Hot Leads"
          value={hotCount.toString()}
          change="+6% this week"
          color="bg-rose-500/20 border border-rose-500/30 text-rose-300"
          icon={<Flame size={24} />}
        />

        <StatCard
          title="Scheduled Tours"
          value={tourCount.toString()}
          change="+3 visits"
          color="bg-amber-500/20 border border-amber-500/30 text-amber-300"
          icon={<CalendarDays size={24} />}
        />

        <StatCard
          title="Bookings"
          value={bookedCount.toString()}
          change="+2 today"
          color="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300"
          icon={<Wallet size={24} />}
        />
      </div>

      {/* Charts & Priority Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pipeline Distribution Chart */}
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-100 font-heading">Lead Pipeline Distribution</h3>
              <p className="text-xs text-slate-400 mt-0.5">Real-time database status breakdown</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "16px",
                    color: "#f8fafc",
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {stageChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Hot Leads */}
        <div className="glass-card p-8 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Flame className="text-rose-400" size={22} />
                <h3 className="text-lg font-bold text-slate-100 font-heading">Hot Priority Leads</h3>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
                Priority
              </span>
            </div>
            <div className="space-y-4">
              {hotLeads.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">No hot priority leads right now</p>
              ) : (
                hotLeads.slice(0, 4).map((lead) => (
                  <div
                    key={lead._id}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-slate-700 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-slate-100 font-heading">{lead.name}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{lead.phone} • ₹{lead.budget?.toLocaleString()}</p>
                    </div>
                    <Link
                      to={`/leads/${lead._id}`}
                      className="p-2 text-slate-400 hover:text-indigo-400 rounded-xl transition-colors"
                    >
                      <Eye size={18} />
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Leads Directory Table */}
      <div className="glass-card p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-100 font-heading">Recent Leads Directory</h3>
          <Link to="/leads" className="text-xs font-bold text-indigo-400 hover:underline flex items-center gap-1 font-heading">
            <span>View All</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <p className="text-slate-400 text-center py-8 text-xs">No lead records found in database.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase bg-slate-950/80 text-slate-400 font-bold border-b border-white/10 font-heading">
                <tr>
                  <th className="py-4 px-6">Customer Name</th>
                  <th className="py-4 px-6">Phone Number</th>
                  <th className="py-4 px-6">Stage</th>
                  <th className="py-4 px-6">Budget</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentLeads.slice(0, 5).map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-5 px-6 font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-extrabold flex items-center justify-center text-xs shrink-0">
                        {lead.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-heading tracking-wide">{lead.name}</span>
                    </td>
                    <td className="py-5 px-6 font-mono text-slate-300">{lead.phone}</td>
                    <td className="py-5 px-6">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 capitalize">
                        {lead.stage || "New"}
                      </span>
                    </td>
                    <td className="py-5 px-6 font-bold text-slate-100">₹{lead.budget?.toLocaleString() || 0}</td>
                    <td className="py-5 px-6 text-right">
                      <Link
                        to={`/leads/${lead._id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all text-xs font-bold font-heading"
                      >
                        <span>View Details</span>
                        <Eye size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}