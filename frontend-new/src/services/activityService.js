import api from "./api";

export const getActivities = async (params = {}) => {
  try {
    const response = await api.get("/activities", { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getActivityById = async (id) => {
  try {
    const response = await api.get(`/activities/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createActivity = async (data) => {
  try {
    const response = await api.post("/activities", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteActivity = async (id) => {
  try {
    const response = await api.delete(`/activities/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
