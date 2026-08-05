import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/layout/Layout";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { LeadModal } from "../components/leads/LeadModal";
import { useToast } from "../context/ToastContext";
import { getLeads, updateStage } from "../services/leadService";
import { Link } from "react-router-dom";
import {
  Plus,
  RotateCw,
  Eye,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const STAGES = [
  { id: "new", label: "New", color: "border-blue-500/30 bg-blue-500/10 text-blue-200" },
  { id: "contacted", label: "Contacted", color: "border-amber-500/30 bg-amber-500/10 text-amber-200" },
  { id: "tour-scheduled", label: "Tour Scheduled", color: "border-purple-500/30 bg-purple-500/10 text-purple-200" },
  { id: "negotiation", label: "Negotiation", color: "border-indigo-500/30 bg-indigo-500/10 text-indigo-200" },
  { id: "booked", label: "Booked", color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200" },
  { id: "dropped", label: "Dropped", color: "border-red-500/30 bg-red-500/10 text-red-200" },
];

export default function Pipeline() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { showToast } = useToast();

  const fetchPipelineLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getLeads({ limit: 100 });
      setLeads(res.leads || res.data || []);
    } catch (err) {
      showToast("Failed to fetch pipeline leads", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchPipelineLeads();
  }, [fetchPipelineLeads]);

  // Handle stage move (triggers immediate backend PATCH)
  const handleMoveStage = async (leadId, nextStage) => {
    try {
      await updateStage(leadId, nextStage);
      showToast(`Lead moved to "${nextStage}"`, "success");
      fetchPipelineLeads();
    } catch (err) {
      showToast(err.message || "Failed to update stage", "error");
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Pipeline Kanban Board
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Shift lead cards across stages to immediately update backend database
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchPipelineLeads}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 hover:bg-slate-900 text-slate-100 text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors"
            >
              <RotateCw size={16} />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold flex items-center gap-2 shadow-md transition-all"
            >
              <Plus size={18} />
              <span>New Lead</span>
            </button>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner label="Loading pipeline board..." />
        ) : (
          <div className="flex gap-8 overflow-x-auto pb-6 min-h-[70vh]">
            {STAGES.map((stageObj) => {
              const stageLeads = leads.filter(
                (l) => (l.stage || "new") === stageObj.id
              );

              return (
                <div
                  key={stageObj.id}
                  className="w-80 shrink-0 flex flex-col rounded-3xl bg-slate-950/95 border border-white/10 p-5 shadow-lg"
                >
                  {/* Column Header */}
                  <div className={`p-3.5 rounded-2xl border mb-4 flex items-center justify-between font-bold text-sm ${stageObj.color}`}>
                    <span>{stageObj.label}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-950/70 text-xs font-mono font-bold text-slate-100 shadow-sm">
                      {stageLeads.length}
                    </span>
                  </div>

                  {/* Cards List */}
                  <div className="flex-1 space-y-3 overflow-y-auto max-h-[65vh] pr-1">
                    {stageLeads.length === 0 ? (
                      <div className="p-6 text-center border border-dashed border-white/10 rounded-2xl text-slate-400 text-xs font-medium">
                        No leads in {stageObj.label}
                      </div>
                    ) : (
                      stageLeads.map((lead) => (
                        <div
                          key={lead._id}
                          className="bg-slate-950/70 hover:bg-slate-900/90 border border-white/10 p-4 rounded-2xl space-y-3 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <Link
                                to={`/leads/${lead._id}`}
                                className="font-bold text-sm text-white hover:text-blue-400 transition-colors"
                              >
                                {lead.name}
                              </Link>
                              <p className="text-xs font-mono text-slate-400 mt-0.5">{lead.phone}</p>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                lead.intent === "hot"
                                  ? "bg-red-100 text-red-700"
                                  : lead.intent === "cold"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {lead.intent ? lead.intent.toUpperCase() : "WARM"}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/10">
                            <span>{lead.preferredArea || "Area N/A"}</span>
                            <span className="font-bold text-green-600">₹{lead.budget?.toLocaleString() || 0}</span>
                          </div>

                          {/* Quick Stage Move Buttons */}
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-1">
                              {STAGES.findIndex((s) => s.id === stageObj.id) > 0 && (
                                <button
                                  onClick={() => {
                                    const currIdx = STAGES.findIndex((s) => s.id === stageObj.id);
                                    handleMoveStage(lead._id, STAGES[currIdx - 1].id);
                                  }}
                                  title="Move to previous stage"
                                  className="p-1.5 rounded-lg bg-slate-950/80 border border-white/10 hover:bg-slate-900 text-slate-100 text-xs"
                                >
                                  <ChevronLeft size={14} />
                                </button>
                              )}

                              {STAGES.findIndex((s) => s.id === stageObj.id) < STAGES.length - 1 && (
                                <button
                                  onClick={() => {
                                    const currIdx = STAGES.findIndex((s) => s.id === stageObj.id);
                                    handleMoveStage(lead._id, STAGES[currIdx + 1].id);
                                  }}
                                  title="Move to next stage"
                                  className="p-1.5 rounded-lg bg-slate-950/80 border border-white/10 hover:bg-slate-900 text-slate-100 text-xs"
                                >
                                  <ChevronRight size={14} />
                                </button>
                              )}
                            </div>

                            <Link
                              to={`/leads/${lead._id}`}
                              className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1"
                            >
                              <span>Details</span>
                              <Eye size={14} />
                            </Link>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <LeadModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={fetchPipelineLeads}
        />
      </div>
    </Layout>
  );
}