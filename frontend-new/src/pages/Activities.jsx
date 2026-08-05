import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { EmptyState } from "../components/common/EmptyState";
import { useToast } from "../context/ToastContext";
import { getActivities, createActivity } from "../services/activityService";
import { Activity, Phone, Calendar, MessageSquare, FileText, Plus, Clock } from "lucide-react";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("");
  
  // New activity state
  const [type, setType] = useState("Call");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { showToast } = useToast();

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const params = typeFilter ? { type: typeFilter } : {};
      const res = await getActivities(params);
      setActivities(res.activities || res.data || []);
    } catch (err) {
      showToast("Failed to fetch activities", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [typeFilter]);

  const handleCreateActivity = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      await createActivity({ type, title, description });
      showToast("Activity logged successfully!", "success");
      setTitle("");
      setDescription("");
      fetchActivities();
    } catch (err) {
      showToast(err.message || "Failed to log activity", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const getIcon = (actType) => {
    switch (actType?.toLowerCase()) {
      case "call": return <Phone size={18} className="text-amber-500" />;
      case "tour": case "meeting": return <Calendar size={18} className="text-purple-500" />;
      case "whatsapp": return <MessageSquare size={18} className="text-green-500" />;
      default: return <FileText size={18} className="text-blue-500" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Activity className="text-blue-400" size={30} />
              Activities & Interactions
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Timeline log of calls, property tours, meetings, and follow-up notes
            </p>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-52 h-11 px-4 rounded-xl bg-slate-950/70 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-100 font-semibold shadow-sm"
          >
            <option value="">All Interaction Types</option>
            <option value="Call">Calls</option>
            <option value="Tour">Property Tours</option>
            <option value="Meeting">Meetings</option>
            <option value="Note">Notes</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Timeline View */}
          <div className="lg:col-span-2 glass-card p-8 space-y-8">
            <h3 className="font-bold text-lg text-white">Activity Timeline</h3>

            {loading ? (
              <LoadingSpinner label="Loading timeline logs..." />
            ) : activities.length === 0 ? (
              <EmptyState title="No Activities Logged" description="Log a call or meeting interaction to see history here." />
            ) : (
              <div className="relative pl-6 space-y-6 border-l-2 border-white/10">
                {activities.map((act) => (
                  <div key={act._id || act.id} className="relative group">
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-blue-600" />
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 group-hover:bg-slate-900/90 transition-colors space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-bold text-sm text-white">
                          {getIcon(act.type)}
                          <span>{act.title || act.type}</span>
                        </div>
                        <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                          <Clock size={14} />
                          {act.createdAt ? new Date(act.createdAt).toLocaleString() : "Just now"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {act.description || act.notes || "No additional detail provided."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Log Form */}
<div className="glass-card p-8 space-y-6">
            <h3 className="font-bold text-lg text-white mb-4">Log New Activity</h3>

            <form onSubmit={handleCreateActivity} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Interaction Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full mt-1.5 h-11 px-4 rounded-xl bg-slate-950/70 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-100 font-semibold"
                >
                  <option value="Call">Call</option>
                  <option value="Tour">Property Tour</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Note">Note</option>
                  <option value="Whatsapp">Whatsapp</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Activity Summary *</label>
                <input
                  type="text"
                  placeholder="e.g. Discussed Double Sharing Room PG"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-1.5 h-11 px-4 rounded-xl bg-slate-950/70 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-100"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Notes & Follow-up</label>
                <textarea
                  rows="4"
                  placeholder="Enter customer feedback, budget expectations..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1.5 p-3 rounded-xl bg-slate-950/70 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-100"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Plus size={18} />
                <span>Save Activity Log</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}