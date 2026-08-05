import api from "./api";

export const getDashboardStats = async () => {
  try {
    const response = await api.get("/dashboard");
    return response.data.dashboard || response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecentLeads = async () => {
  try {
    const response = await api.get("/dashboard/recent");
    return response.data.leads || response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecentActivities = async () => {
  try {
    const response = await api.get("/dashboard/activity");
    return response.data.activities || response.data;
  } catch (error) {
    throw error;
  }
};

export const getHotLeads = async () => {
  try {
    const response = await api.get("/dashboard/hot");
    return response.data.leads || response.data;
  } catch (error) {
    throw error;
  }
};
