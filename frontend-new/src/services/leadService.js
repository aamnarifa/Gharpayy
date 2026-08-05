import api from "./api";

/**
 * Lead Service - Backend REST API Layer
 */

// GET /api/leads - Fetch all leads with optional filter/search/pagination params
export const getLeads = async (params = {}) => {
  try {
    const response = await api.get("/leads", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// GET /api/leads/:id - Fetch single lead details
export const getLeadById = async (id) => {
  try {
    const response = await api.get(`/leads/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// POST /api/leads (or /api/leads/create) - Create a new lead
export const createLead = async (data) => {
  try {
    // Backend leadRoutes maps router.post("/create", createLead)
    try {
      const response = await api.post("/leads/create", data);
      return response.data;
    } catch (err) {
      // Fallback if endpoint is /leads directly
      const response = await api.post("/leads", data);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

// PATCH /api/leads/:id - Update lead generic fields
export const updateLead = async (id, data) => {
  try {
    const response = await api.patch(`/leads/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE /api/leads/:id - Delete a lead
export const deleteLead = async (id) => {
  try {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Specialized PATCH endpoints supported by backend
export const updateStage = async (id, stage) => {
  try {
    const response = await api.patch(`/leads/${id}/stage`, { stage });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const assignLead = async (id, assignedTcmId) => {
  try {
    const response = await api.patch(`/leads/${id}/assign`, { assignedTcmId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateIntent = async (id, intent) => {
  try {
    const response = await api.patch(`/leads/${id}/intent`, { intent });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFollowUp = async (id, nextFollowUpAt) => {
  try {
    const response = await api.patch(`/leads/${id}/followup`, { nextFollowUpAt });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTags = async (id, tags) => {
  try {
    const response = await api.patch(`/leads/${id}/tags`, { tags });
    return response.data;
  } catch (error) {
    throw error;
  }
};
