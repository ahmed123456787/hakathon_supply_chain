import { data } from "autoprefixer";
import axios from "./init";

export const sendMessage = async (message) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/chat", {
      message,
    });
    print(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching total revenues:", error);
    throw error;
  }
};
