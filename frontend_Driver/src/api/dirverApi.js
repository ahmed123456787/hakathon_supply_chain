import api from "./init";

export const getAllOrders = async () => {
  try {
    const response = await api.get("/api/DriverAPI/GetDriverOrders/1");
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const getOptimalRoutes = async () => {
  try {
    const response = await api.post("/api/OrderOptimization/optimize");
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};
