import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { LeadModal } from "../components/leads/LeadModal";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import { useToast } from "../context/ToastContext";
import {
  getLeadById,
  deleteLead,
  updateStage,
  updateIntent,
} from "../services/leadService";
import { createActivity } from "../services/activityService";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Calendar,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // New Activity form
  const [activityNote, setActivityNote] = useState("");
  const [activityType, setActivityType] = useState("Call");
  const [activityLoading, setActivityLoading] = useState(false);

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getLeadById(id);
      setLead(res.lead || res.data || res);
    } catch (err) {
      showToast(err.message || "Failed to load lead details", "error");
    } finally {
      setLoading(false);
    }
  }, [id, showToast]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleStageChange = async (newStage) => {
    try {
      await updateStage(id, newStage);
      showToast("Stage updated successfully", "success");
      fetchDetails();
    } catch (err) {
      showToast(err.message || "Failed to update stage", "error");
    }
  };

  const handleIntentChange = async (newIntent) => {
    try {
      await updateIntent(id, newIntent);
      showToast("Intent level updated", "success");
      fetchDetails();
    } catch (err) {
      showToast(err.message || "Failed to update intent", "error");
    }
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    if (!activityNote.trim()) return;

    setActivityLoading(true);
    try {
      await createActivity({
        leadId: id,
        type: activityType,
        title: `${activityType} with ${lead?.name}`,
        description: activityNote,
      });
      showToast("Activity logged successfully!", "success");
      setActivityNote("");
      fetchDetails();
    } catch (err) {
      showToast(err.message || "Failed to add activity", "error");
    } finally {
      setActivityLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await deleteLead(id);
      showToast("Lead deleted successfully", "success");
      navigate("/leads");
    } catch (err) {
      showToast(err.message || "Failed to delete lead", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/leads"
              className="p-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-slate-100 hover:bg-slate-900 transition-colors shadow-sm"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{lead?.name || "Lead Details"}</h1>
                {lead?.intent && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      lead.intent === "hot"
                        ? "bg-red-100 text-red-700"
                        : lead.intent === "cold"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {lead.intent.toUpperCase()}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Lead ID: #{id}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-950/80 border border-white/10 hover:bg-slate-900 text-slate-100 text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors"
            >
              <Edit size={16} />
              <span>Edit Lead</span>
            </button>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner label="Fetching lead record..." />
        ) : !lead ? (
          <div className="text-center py-12 text-slate-300 bg-slate-950/70 rounded-3xl p-8 border border-white/10 shadow-lg">
            Lead record not found
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview Card */}
              <div className="glass-card p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white">Customer Overview</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-200 border border-blue-500/20 capitalize">
                    {lead.stage}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="text-blue-400" size={20} />
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase">Phone Number</p>
                        <p className="font-mono text-slate-100 font-bold">{lead.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="text-blue-600" size={20} />
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase">Email Address</p>
                        <p className="text-slate-200">{lead.email || "Not specified"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="text-blue-600" size={20} />
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase">Preferred Area</p>
                        <p className="text-slate-200 font-semibold">{lead.preferredArea || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="text-blue-400" size={20} />
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase">Monthly Budget</p>
                        <p className="text-slate-100 font-bold">₹{lead.budget?.toLocaleString() || 0}/month</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="text-blue-600" size={20} />
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase">Target Move-In Date</p>
                        <p className="text-slate-200">
                          {lead.moveInDate ? new Date(lead.moveInDate).toLocaleDateString("en-GB") : "Flexible"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <User className="text-blue-600" size={20} />
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase">Assigned Agent</p>
                        <p className="text-slate-200 font-semibold">{lead.assignedTcmId || lead.assignedTo || "Unassigned"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags & Notes */}
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-lg font-bold text-white">Tags & Notes</h3>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {lead.tags?.length === 0 ? (
                      <span className="text-xs text-slate-400">No tags assigned</span>
                    ) : (
                      lead.tags?.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-lg bg-slate-950/70 border border-white/10 text-slate-100 text-xs font-semibold">
                          #{t}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Notes</p>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                    {lead.notes || "No notes provided for this lead."}
                  </div>
                </div>
              </div>

              {/* Log Activity Form */}
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-lg font-bold text-white">Log Interaction / Note</h3>
                <form onSubmit={handleAddActivity} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Interaction Type</label>
                    <select
                      value={activityType}
                      onChange={(e) => setActivityType(e.target.value)}
                      className="w-full mt-1.5 h-11 px-4 rounded-xl bg-slate-950/70 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-100"
                    >
                      <option value="Call">Call</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Tour">Tour</option>
                      <option value="Note">Note</option>
                      <option value="Whatsapp">Whatsapp</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase">Activity Notes</label>
                    <textarea
                      rows="3"
                      placeholder="Log key details of call, tour feedback, or agreement..."
                      value={activityNote}
                      onChange={(e) => setActivityNote(e.target.value)}
                      className="w-full mt-1.5 p-3 rounded-xl bg-slate-950/70 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-100"
                      required
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={activityLoading}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all"
                    >
                      <Plus size={18} />
                      <span>Log Activity</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar Quick Pipeline Actions */}
            <div className="space-y-8">
              <div className="glass-card p-8 space-y-6">
                <h3 className="text-lg font-bold text-white">Quick Pipeline Actions</h3>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Update Stage</label>
                  <select
                    value={lead.stage || "new"}
                    onChange={(e) => handleStageChange(e.target.value)}
                    className="w-full mt-1.5 h-11 px-4 rounded-xl bg-slate-950/70 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-100 font-semibold"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="tour-scheduled">Tour Scheduled</option>
                    <option value="tour-done">Tour Done</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="booked">Booked</option>
                    <option value="dropped">Dropped</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Update Intent Level</label>
                  <select
                    value={lead.intent || "warm"}
                    onChange={(e) => handleIntentChange(e.target.value)}
                    className="w-full mt-1.5 h-11 px-4 rounded-xl bg-slate-950/70 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-100 font-semibold"
                  >
                    <option value="hot">Hot (High)</option>
                    <option value="warm">Warm (Medium)</option>
                    <option value="cold">Cold (Low)</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs font-bold text-slate-400 uppercase">Created At</p>
                  <p className="text-xs text-slate-300 mt-1">
                    {lead.createdAt ? new Date(lead.createdAt).toLocaleString() : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for editing */}
        <LeadModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          lead={lead}
          onSuccess={fetchDetails}
        />

        {/* Delete Dialog */}
        <ConfirmDialog
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Lead Record"
          message={`Are you sure you want to delete lead "${lead?.name}"?`}
          loading={deleteLoading}
        />
      </div>
    </Layout>
  );
}