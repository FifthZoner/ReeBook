import React, { useState, useEffect } from "react";
import Notificate from "../ui/notifications/notificate";
import Sidebar from "../ui/sidebar";

const Notifications = () => {
  // useEffect(() => {
  //   const getNotifications = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:5000/api/bookRequest/getAll",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           credentials: "include",
  //         }
  //       );
  
  //       if (!response.ok) {
  
  //         throw new Error("Error in fetching book instances");
  
  //       }
  
  //       const result = await response.json();
  //       console.log(result)
  //     } catch (error) {
  //       console.error("Error when handling the GET request:", error);
  
  //     }
  //   };
  
  //   getNotifications();
  
  // }, []);

  return (
    <div className="overflow-auto md:pl-60 pl-16 bg-gray-100 h-screen flex justify-center items-center">
      <Sidebar />

        <Notificate />
    </div>
  );
};

export default Notifications;
