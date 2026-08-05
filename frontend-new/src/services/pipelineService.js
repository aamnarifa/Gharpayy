import api from "./api";

export const getPipeline = async () => {
  try {
    const response = await api.get("/pipeline");
    return response.data;
  } catch (error) {
    throw error;
  }
};
