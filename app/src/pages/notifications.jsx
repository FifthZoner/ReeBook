import React, { useState, useEffect } from "react";
import Sidebar from "../ui/sidebar";
import NotifyCard from "../cards/notifyCard";
import NoNotifications from "../ui/noNotifications";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/bookRequest/getAll",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
  
        if (!response.ok) {
  
          throw new Error("Error in fetching book instances");
  
        }
        
        const result = await response.json();
        setNotifications(result)
      } catch (error) {
        console.error("Error when handling the GET request:", error);
  
      }
    };
    getNotifications(); 
    
  }, []);
  console.log(notifications)
  return (
    <div className="overflow-auto md:pl-60 pl-16 bg-gray-100 h-screen flex justify-center items-center">
      <Sidebar />

      {notifications.length === 0 ? (
        <div className="flex flex-wrap justify-evenly">
          <NoNotifications />
        </div>
      ) : (
        <div className="flex flex-col flex-wrap w-full p-8 text-xl">
          {notifications.map((notification) => (
            <NotifyCard
              key={notification.instanceID}
              id={notification.instanceID}
              requestID={notification.requestID}
              nick={notification.nick}
              title={notification.info.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
