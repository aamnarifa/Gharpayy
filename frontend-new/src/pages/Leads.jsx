import React, { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { EmptyState } from "../components/common/EmptyState";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import { LeadModal } from "../components/leads/LeadModal";
import { useToast } from "../context/ToastContext";
import {
  getLeads,
  deleteLead,
  updateStage,
  updateIntent,
} from "../services/leadService";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Users,
} from "lucide-react";

export default function Leads() {
  const [searchParams] = useSearchParams();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filters State
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [stage, setStage] = useState(searchParams.get("stage") || "");
  const [intent, setIntent] = useState(searchParams.get("intent") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const limit = 10;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [deletingLead, setDeletingLead] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { showToast } = useToast();

  const fetchLeadsData = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit };
      if (search.trim()) params.search = search.trim();
      if (stage) params.stage = stage;
      if (intent) params.intent = intent;

      const res = await getLeads(params);
      setLeads(res.leads || res.data || []);
      setTotalLeads(res.total || res.leads?.length || 0);
      setTotalPages(res.pages || Math.ceil((res.total || 1) / limit) || 1);
    } catch (err) {
      showToast(err.message || "Failed to fetch leads", "error");
    } finally {
      setLoading(false);
    }
  }, [page, search, stage, intent, showToast]);

  useEffect(() => {
    fetchLeadsData();
  }, [fetchLeadsData]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchLeadsData();
  };

  const handleStageChange = async (leadId, newStage) => {
    try {
      await updateStage(leadId, newStage);
      showToast("Stage updated", "success");
      fetchLeadsData();
    } catch (err) {
      showToast(err.message || "Failed to update stage", "error");
    }
  };

  const handleIntentChange = async (leadId, newIntent) => {
    try {
      await updateIntent(leadId, newIntent);
      showToast("Intent level updated", "success");
      fetchLeadsData();
    } catch (err) {
      showToast(err.message || "Failed to update intent", "error");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingLead) return;
    setDeleteLoading(true);
    try {
      await deleteLead(deletingLead._id);
      showToast("Lead record deleted", "success");
      setDeletingLead(null);
      fetchLeadsData();
    } catch (err) {
      showToast(err.message || "Failed to delete lead", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading flex items-center gap-3">
              <Users className="text-indigo-400" size={32} />
              Lead Management Directory
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Search, filter, assign, and update lead pipeline stages in real time
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeadsData}
              disabled={loading}
              className="px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-2 transition-all font-heading"
            >
              <RotateCw size={16} />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => { setEditingLead(null); setIsModalOpen(true); }}
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all font-heading"
            >
              <Plus size={18} />
              <span>Create Lead</span>
            </button>
          </div>
        </div>

        {/* Glass Filter Card */}
        <div className="glass-card p-6">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, phone, area..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-slate-950/70 border border-white/10 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <select
              value={stage}
              onChange={(e) => { setStage(e.target.value); setPage(1); }}
              className="w-full h-11 px-4 rounded-xl bg-slate-950/70 border border-white/10 text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 font-medium cursor-pointer"
            >
              <option value="" className="bg-slate-900">All Pipeline Stages</option>
              <option value="new" className="bg-slate-900">New</option>
              <option value="contacted" className="bg-slate-900">Contacted</option>
              <option value="tour-scheduled" className="bg-slate-900">Tour Scheduled</option>
              <option value="tour-done" className="bg-slate-900">Tour Done</option>
              <option value="negotiation" className="bg-slate-900">Negotiation</option>
              <option value="booked" className="bg-slate-900">Booked</option>
              <option value="dropped" className="bg-slate-900">Dropped</option>
            </select>

            <select
              value={intent}
              onChange={(e) => { setIntent(e.target.value); setPage(1); }}
              className="w-full h-11 px-4 rounded-xl bg-slate-950/70 border border-white/10 text-sm text-slate-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 font-medium cursor-pointer"
            >
              <option value="" className="bg-slate-900">All Intent Levels</option>
              <option value="hot" className="bg-slate-900">Hot Priority</option>
              <option value="warm" className="bg-slate-900">Warm</option>
              <option value="cold" className="bg-slate-900">Cold</option>
            </select>

            <div className="flex gap-2">
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 font-heading transition-all"
              >
                <Filter size={16} />
                <span>Apply Filters</span>
              </button>
              {(search || stage || intent) && (
                <button
                  type="button"
                  onClick={() => { setSearch(""); setStage(""); setIntent(""); setPage(1); }}
                  className="px-4 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Reset
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Glass Leads Directory Table */}
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-white font-heading">All Lead Records ({totalLeads})</h3>
            <span className="text-xs text-slate-400 font-mono">Page {page} of {totalPages}</span>
          </div>

          {loading ? (
            <LoadingSpinner label="Fetching lead records..." />
          ) : leads.length === 0 ? (
            <EmptyState
              title="No Leads Found"
              description="Try resetting search filters or add a new lead record."
              actionLabel="Create Lead"
              onAction={() => { setEditingLead(null); setIsModalOpen(true); }}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase bg-slate-950/80 text-slate-400 font-bold border-b border-white/10 font-heading">
                  <tr>
                    <th className="py-4 px-6">Customer Details</th>
                    <th className="py-4 px-6">Contact</th>
                    <th className="py-4 px-6">Area & Budget</th>
                    <th className="py-4 px-6">Pipeline Stage</th>
                    <th className="py-4 px-6">Intent Level</th>
                    <th className="py-4 px-6">Assigned Agent</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-slate-800/40 transition-colors">
                      {/* Customer */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-extrabold flex items-center justify-center text-xs shrink-0">
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <Link
                              to={`/leads/${lead._id}`}
                              className="font-bold text-base text-white hover:text-indigo-400 transition-colors font-heading"
                            >
                              {lead.name}
                            </Link>
                            <p className="text-xs text-slate-400">{lead.source || "Manual"}</p>
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="py-5 px-6 font-mono font-semibold text-slate-200">
                        {lead.phone}
                      </td>

                      {/* Area & Budget */}
                      <td className="py-5 px-6">
                        <p className="font-bold text-slate-100">{lead.preferredArea || "N/A"}</p>
                        <p className="text-slate-400 text-xs">₹{lead.budget?.toLocaleString() || 0}/mo</p>
                      </td>

                      {/* Stage Dropdown */}
                      <td className="py-5 px-6">
                        <select
                          value={lead.stage || "new"}
                          onChange={(e) => handleStageChange(lead._id, e.target.value)}
                          className="bg-slate-950/80 border border-white/10 text-xs font-bold rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
                        >
                          <option value="new" className="bg-slate-900">New</option>
                          <option value="contacted" className="bg-slate-900">Contacted</option>
                          <option value="tour-scheduled" className="bg-slate-900">Tour Scheduled</option>
                          <option value="tour-done" className="bg-slate-900">Tour Done</option>
                          <option value="negotiation" className="bg-slate-900">Negotiation</option>
                          <option value="booked" className="bg-slate-900">Booked</option>
                          <option value="dropped" className="bg-slate-900">Dropped</option>
                        </select>
                      </td>

                      {/* Intent */}
                      <td className="py-5 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                            lead.intent === "hot"
                              ? "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                              : lead.intent === "cold"
                              ? "bg-sky-500/15 text-sky-300 border border-sky-500/30"
                              : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                          }`}
                        >
                          ● {lead.intent ? lead.intent.toUpperCase() : "WARM"}
                        </span>
                      </td>

                      {/* Assigned */}
                      <td className="py-5 px-6 font-bold text-slate-300">
                        {lead.assignedTcmId || lead.assignedTo || "Unassigned"}
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            to={`/leads/${lead._id}`}
                            title="View Details"
                            className="p-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-xl transition-colors"
                          >
                            <Eye size={18} />
                          </Link>

                          <button
                            onClick={() => { setEditingLead(lead); setIsModalOpen(true); }}
                            title="Edit Lead"
                            className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-xl transition-colors"
                          >
                            <Edit size={18} />
                          </button>

                          <button
                            onClick={() => setDeletingLead(lead)}
                            title="Delete Lead"
                            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
              <span className="text-xs text-slate-400 font-mono">
                Page {page} of {totalPages} ({totalLeads} records)
              </span>
              <div className="flex items-center gap-3">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs font-bold text-slate-300 disabled:opacity-40 hover:bg-slate-800 flex items-center gap-1 font-heading"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs font-bold text-slate-300 disabled:opacity-40 hover:bg-slate-800 flex items-center gap-1 font-heading"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Lead Modal */}
        <LeadModal
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEditingLead(null); }}
          lead={editingLead}
          onSuccess={fetchLeadsData}
        />

        {/* Delete Confirmation */}
        <ConfirmDialog
          isOpen={!!deletingLead}
          onClose={() => setDeletingLead(null)}
          onConfirm={handleDeleteConfirm}
          title="Delete Lead Record"
          message={`Are you sure you want to delete lead "${deletingLead?.name}"?`}
          loading={deleteLoading}
        />
      </div>
    </Layout>
  );
}