import api from "./api";

export const getOverviewAnalytics = async () => {
  try {
    const response = await api.get("/analytics/overview");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPipelineAnalytics = async () => {
  try {
    const response = await api.get("/analytics/pipeline");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLeadSourceAnalytics = async () => {
  try {
    const response = await api.get("/analytics/sources");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMonthlyAnalytics = async () => {
  try {
    const response = await api.get("/analytics/monthly");
    return response.data;
  } catch (error) {
    throw error;
  }
};
