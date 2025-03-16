import api from "./init";

export const getRevenues = async () => {
  try {
    const response = await api.get("/api/Order/GetTotalRevenuesAsync");
    return response.json();
  } catch (error) {
    console.error("Error fetching total revenues:", error);
    throw error;
  }
};
