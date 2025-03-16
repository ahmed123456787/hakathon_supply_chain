import api from "./init";

export const getRevenues = async () => {
  try {
    const response = await api.get("/api/Order/GetTotalRevenuesAsync");
    return response.data;
  } catch (error) {
    console.error("Error fetching total revenues:", error);
    throw error;
  }
};
export const getMonthsOverview=async()=>{
  try{
    const response =await api.get("http://localhost:5298/api/Order/GetProductsForAllMonthsAsync")
    return response.data
  } catch (error) {
    console.error("Error fetching months overview:", error);
    throw error;
  }
}