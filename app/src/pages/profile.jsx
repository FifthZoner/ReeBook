import React, { useState, useEffect } from "react";
import User from "../ui/profile/user";
import Sidebar from "../ui/sidebar";

const Profile = () => {
  return (
    <div className="overflow-auto md:pl-60 pl-16 bg-gray-100 h-screen flex justify-center items-center">
      <Sidebar />
      <User />
    </div>
  );
};

export default Profile;
