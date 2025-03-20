import api from "./init";

export const getCustomerOrder = async (id) => {
  try {
    const response = await api.get(`api/Order/GetCustomerOrders/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order of the user :" + id, error);
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const response = await api.get(`/api/Product/${id}`);
    return response; // Return the full response instead of response.data
  } catch (error) {
    console.error("Error fetching product with id :" + id, error);
    throw error;
  }
};
