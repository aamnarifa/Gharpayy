import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import StatCard from "../components/cards/StatCard";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { useToast } from "../context/ToastContext";
import {
  getOverviewAnalytics,
  getPipelineAnalytics,
  getLeadSourceAnalytics,
  getMonthlyAnalytics,
} from "../services/analyticsService";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { BarChart3, TrendingUp, DollarSign, Users, Target } from "lucide-react";

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b", "#06b6d4", "#ef4444"];

export default function Analytics() {
  const [overview, setOverview] = useState(null);
  const [sources, setSources] = useState([]);
  const [pipelineData, setPipelineData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const [ovRes, srcRes, pipeRes, monRes] = await Promise.allSettled([
          getOverviewAnalytics(),
          getLeadSourceAnalytics(),
          getPipelineAnalytics(),
          getMonthlyAnalytics(),
        ]);

        if (ovRes.status === "fulfilled") setOverview(ovRes.value);
        if (srcRes.status === "fulfilled") {
          setSources(srcRes.value.sources || srcRes.value.data || []);
        }
        if (pipeRes.status === "fulfilled") {
          setPipelineData(pipeRes.value.pipeline || pipeRes.value.data || []);
        }
        if (monRes.status === "fulfilled") {
          setMonthlyData(monRes.value.monthly || monRes.value.data || []);
        }
      } catch (err) {
        showToast("Failed to fetch analytics from backend", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [showToast]);

  const defaultSources = sources.length > 0 ? sources : [
    { name: "Website", count: 24 },
    { name: "Instagram", count: 18 },
    { name: "Manual", count: 15 },
    { name: "Google", count: 12 },
    { name: "Walk-In", count: 9 },
  ];

  const defaultMonthly = monthlyData.length > 0 ? monthlyData : [];

  return (
    <Layout>
      <div className="space-y-12">
        <div className="grid gap-8 xl:grid-cols-[1.3fr_0.9fr] items-start">
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-slate-950/80 border border-white/10 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.35)]">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-300 font-semibold">SalesCRM Insights</p>
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Analytics & Reports</h1>
                  <p className="max-w-2xl text-base text-slate-400 leading-7">
                    Premium analytics for lead performance, revenue efficiency, source attribution, and conversion trends.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <button className="inline-flex items-center justify-center rounded-3xl bg-slate-900/85 border border-white/10 px-6 py-3 text-sm font-semibold text-slate-100 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-900">
                    Export Summary
                  </button>
                  <select className="h-12 rounded-3xl bg-slate-950/90 border border-white/10 px-4 text-sm text-slate-100 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition">
                    <option>Last 30 days</option>
                    <option>Last 7 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={`₹${overview?.totalRevenue?.toLocaleString() || "1,85,000"}`}
                change="+14% this month"
                color="bg-slate-900/80 text-blue-400"
                icon={<DollarSign size={28} />}
              />

              <StatCard
                title="Conversion Rate"
                value={`${overview?.conversionRate || "24.5"}%`}
                change="+4.2% optimized"
                color="bg-slate-900/80 text-emerald-400"
                icon={<TrendingUp size={28} />}
              />

              <StatCard
                title="Avg Response Time"
                value={`${overview?.avgResponseMins || "14"} mins`}
                change="-3 mins faster"
                color="bg-slate-900/80 text-amber-400"
                icon={<Target size={28} />}
              />

              <StatCard
                title="Active PG Bookings"
                value={(overview?.totalBookings || 28).toString()}
                change="+5 this week"
                color="bg-slate-900/80 text-purple-400"
                icon={<Users size={28} />}
              />
            </div>
          </div>

          <div className="glass-card p-8 space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-slate-400 font-semibold">KPI snapshot</p>
                <h2 className="mt-3 text-2xl font-bold text-white">Performance details</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                <button className="rounded-3xl bg-slate-950/85 border border-white/10 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-900">
                  Monthly
                </button>
                <button className="rounded-3xl bg-slate-950/85 border border-white/10 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-900">
                  Quarterly
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[1.75rem] bg-slate-950/65 border border-white/10 p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">New leads</p>
                    <p className="mt-2 text-3xl font-bold text-white">{overview?.newLeads || 128}</p>
                  </div>
                  <span className="rounded-2xl bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-300 border border-emerald-500/20">
                    +18% wk avg
                  </span>
                </div>
              </div>
              <div className="rounded-[1.75rem] bg-slate-950/65 border border-white/10 p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Qualified leads</p>
                    <p className="mt-2 text-3xl font-bold text-white">{overview?.qualifiedLeads || 86}</p>
                  </div>
                  <span className="rounded-2xl bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-300 border border-blue-500/20">
                    +9% m/m
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner label="Generating analytics graphics..." />
        ) : (
          <div className="space-y-6">
            <div className="glass-card p-8 space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Lead Sources Distribution</h3>
                    <p className="text-sm text-slate-400 mt-2">Breakdown of lead origin and share.</p>
                  </div>
                  <div className="rounded-3xl bg-slate-950/85 px-4 py-2 text-sm font-semibold text-slate-100 border border-white/10">
                    Top source: Website
                  </div>
                </div>
                <div className="h-[22rem] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={defaultSources}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        innerRadius={48}
                        paddingAngle={4}
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {defaultSources.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 16, color: '#f8fafc' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass-card p-8 space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-bold text-white">Top Lead Channels</h3>
                  <span className="text-sm text-slate-400">Ranked by volume</span>
                </div>
                <div className="space-y-3">
                  {defaultSources.map((source) => (
                    <div key={source.name} className="flex items-center justify-between rounded-3xl bg-slate-950/80 border border-white/10 px-4 py-4 transition hover:bg-slate-900/95">
                      <span className="text-sm font-semibold text-slate-100">{source.name}</span>
                      <span className="text-sm text-slate-400">{source.count} leads</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          
        )}
      </div>
    </Layout>
  );
}