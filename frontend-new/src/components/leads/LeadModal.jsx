import React, { useState, useEffect } from "react";
import { Modal } from "../common/Modal";
import { Input, Select } from "../common/Input";
import { Button } from "../common/Button";
import { useToast } from "../../context/ToastContext";
import { createLead, updateLead } from "../../services/leadService";
import {
  FiUser,
  FiPhone,
  FiMail,
  FiDollarSign,
  FiMapPin,
  FiCalendar,
  FiTag,
  FiCheck,
} from "react-icons/fi";

const INITIAL_FORM = {
  name: "",
  phone: "",
  email: "",
  source: "Manual",
  budget: 10000,
  preferredArea: "",
  moveInDate: "",
  stage: "new",
  intent: "warm",
  confidence: 50,
  assignedTcmId: "TCM Agent 1",
  tags: [],
  nextFollowUpAt: "",
  visitDate: "",
  notes: "",
};

export const LeadModal = ({ isOpen, onClose, lead = null, onSuccess }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { showToast } = useToast();

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name || "",
        phone: lead.phone || "",
        email: lead.email || "",
        source: lead.source || "Manual",
        budget: lead.budget || 0,
        preferredArea: lead.preferredArea || "",
        moveInDate: lead.moveInDate ? lead.moveInDate.split("T")[0] : "",
        stage: lead.stage || "new",
        intent: lead.intent || "warm",
        confidence: lead.confidence ?? 50,
        assignedTcmId: lead.assignedTcmId || lead.assignedTo || "Unassigned",
        tags: Array.isArray(lead.tags) ? lead.tags : [],
        nextFollowUpAt: lead.nextFollowUpAt ? lead.nextFollowUpAt.split("T")[0] : "",
        visitDate: lead.visitDate ? lead.visitDate.split("T")[0] : "",
        notes: lead.notes || "",
      });
    } else {
      setFormData(INITIAL_FORM);
    }
    setErrors({});
  }, [lead, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (formData.tags.includes(tagInput.trim())) return;
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Must be a valid 10-digit Indian mobile number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        budget: Number(formData.budget) || 0,
        confidence: Number(formData.confidence) || 50,
      };

      if (lead?._id) {
        await updateLead(lead._id, payload);
        showToast("Lead updated successfully!", "success");
      } else {
        await createLead(payload);
        showToast("New lead created successfully!", "success");
      }

      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      showToast(err.message || "Failed to save lead", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={lead ? "Edit Lead" : "Add New Lead"}
      subtitle={lead ? `Modifying lead ID #${lead._id.slice(-6)}` : "Create a new lead record in the backend"}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name *"
            name="name"
            placeholder="John Doe"
            icon={FiUser}
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <Input
            label="Phone Number *"
            name="phone"
            placeholder="9876543210"
            icon={FiPhone}
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="john@example.com"
            icon={FiMail}
            value={formData.email}
            onChange={handleChange}
          />

          <Select
            label="Lead Source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            options={[
              "Manual",
              "Website",
              "Instagram",
              "Facebook",
              "Referral",
              "Google",
              "Justdial",
              "Walk-In",
            ]}
          />

          <Input
            label="Budget (₹/month)"
            type="number"
            name="budget"
            icon={FiDollarSign}
            value={formData.budget}
            onChange={handleChange}
          />

          <Input
            label="Preferred Area"
            name="preferredArea"
            placeholder="Koramangala, HSR Layout..."
            icon={FiMapPin}
            value={formData.preferredArea}
            onChange={handleChange}
          />

          <Select
            label="Pipeline Stage"
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            options={[
              { label: "New", value: "new" },
              { label: "Contacted", value: "contacted" },
              { label: "Tour Scheduled", value: "tour-scheduled" },
              { label: "Tour Done", value: "tour-done" },
              { label: "Negotiation", value: "negotiation" },
              { label: "Booked", value: "booked" },
              { label: "Dropped", value: "dropped" },
            ]}
          />

          <Select
            label="Intent Level"
            name="intent"
            value={formData.intent}
            onChange={handleChange}
            options={[
              { label: "Hot (High)", value: "hot" },
              { label: "Warm (Medium)", value: "warm" },
              { label: "Cold (Low)", value: "cold" },
            ]}
          />

          <Input
            label="Move-In Date"
            type="date"
            name="moveInDate"
            icon={FiCalendar}
            value={formData.moveInDate}
            onChange={handleChange}
          />

          <Input
            label="Next Follow-Up Date"
            type="date"
            name="nextFollowUpAt"
            icon={FiCalendar}
            value={formData.nextFollowUpAt}
            onChange={handleChange}
          />

          <Select
            label="Assigned TCM Agent"
            name="assignedTcmId"
            value={formData.assignedTcmId}
            onChange={handleChange}
            options={[
              "Unassigned",
              "TCM Agent 1",
              "TCM Agent 2",
              "TCM Agent 3",
              "Senior Sales Manager",
            ]}
          />

          <Input
            label="Visit Date (Tour)"
            type="date"
            name="visitDate"
            icon={FiCalendar}
            value={formData.visitDate}
            onChange={handleChange}
          />
        </div>

        {/* Tags Section */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Lead Tags
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="Add tag (e.g. Single Room, AC)"
              icon={FiTag}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              containerClassName="flex-1"
            />
            <Button type="button" variant="secondary" onClick={handleAddTag}>
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-medium"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-rose-400 font-bold ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Notes & Remarks
          </label>
          <textarea
            name="notes"
            rows="3"
            placeholder="Add initial conversation notes..."
            value={formData.notes}
            onChange={handleChange}
            className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="gradient" loading={loading} icon={FiCheck}>
            {lead ? "Save Changes" : "Create Lead"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
