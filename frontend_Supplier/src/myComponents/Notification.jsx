import React, { useEffect, useState } from "react";
import { getNotifications } from "../api/notificationApi";

const Notification = ({ isVisible, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationData = await getNotifications();
        console.log(notificationData);
        setNotifications(notificationData.response);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  if (!isVisible) return null;

  return (
    <div className="notification-container fixed top-0 right-0 mt-4 mr-4 bg-white shadow-lg rounded-lg p-4 w-80 z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">System Messages</h3>
        <button onClick={onClose} className="text-red-500 font-bold">
          X
        </button>
      </div>
      <div className="notification-item mb-2">{notifications}</div>
    </div>
  );
};

export default Notification;
