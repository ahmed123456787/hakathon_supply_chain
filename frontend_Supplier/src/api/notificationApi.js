import axios from "./init";

export const getNotifications = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/notification-system"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};
