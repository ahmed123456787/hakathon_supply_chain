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
export const updateOrderStatus = async (id, status) => {
  try {
    const response = await api.put(
      `/api/Order/${id}`,

      {
        orderID: 0,
        totalAmount: 0,
        orderStatus: 3,
        quantity: 0,
        orderDate: "2025-03-20T16:25:56.247Z",
        receiveDate: "2025-03-20T16:25:56.247Z",
        address: "string",
        feedback: "string",
        customerID: 0,
        productID: 0,
        driverID: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};
