import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { User, Mail, Shield, Save } from "lucide-react";

export default function Profile() {
  const { user, updateUserProfile } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || "Aamna Rifa");
  const [email, setEmail] = useState(user?.email || "aamnarifa@gmail.com");
  const [role, setRole] = useState(user?.role || "TCM Manager");
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      updateUserProfile({ name, email, role });
      showToast("Profile updated successfully", "success");
      setSaving(false);
    }, 400);
  };

  return (
    <Layout>
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <User className="text-blue-400" size={30} />
            Agent Profile
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your account credentials and operational preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 glass-card p-6 sm:p-8 text-center flex flex-col items-center justify-center">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="profile avatar"
              className="w-24 h-24 rounded-full border-4 border-blue-500/20 shadow-md mb-4"
            />
            <h2 className="text-xl font-bold text-white">{name}</h2>
            <p className="text-xs text-blue-300 font-bold mt-1 uppercase tracking-wider">{role}</p>
            <span className="inline-block mt-6 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-200 border border-emerald-500/20 text-xs font-bold">
              ● Active Sales Agent
            </span>
          </div>

          <div className="md:col-span-2 glass-card p-8 space-y-8">
            <h3 className="text-lg font-bold text-white">Account Details</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Full Name</label>
                <div className="relative mt-1.5">
                  <User size={18} className="absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 pl-11 pr-4 rounded-xl bg-slate-950/70 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-100 font-semibold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Email Address</label>
                <div className="relative mt-1.5">
                  <Mail size={18} className="absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 pl-11 pr-4 rounded-xl bg-slate-950/70 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-100 font-semibold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Role / Designation</label>
                <div className="relative mt-1.5">
                  <Shield size={18} className="absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full h-11 pl-11 pr-4 rounded-xl bg-slate-950/70 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-slate-100 font-semibold"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all"
                >
                  <Save size={18} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}