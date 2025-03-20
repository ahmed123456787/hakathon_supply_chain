import api from "./init";

export const getAllProducts = async () => {
  try {
    const response = await api.get("/api/Product/GetAllProductsForSupplier/1");
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
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
