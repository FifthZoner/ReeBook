import React, { useState, useEffect } from "react";
import Notificate from "../ui/notifications/notificate";
import Sidebar from "../ui/sidebar";
Sidebar

const Notifications = () => {
  return (
    <div className="overflow-auto md:pl-60 pl-16 bg-gray-100 h-screen flex justify-center items-center">
      <Sidebar />

        <Notificate />
    </div>
  );
};

export default Notifications;
