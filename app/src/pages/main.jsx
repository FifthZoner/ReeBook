import React, { useState, useEffect } from "react";
import Sidebar from "../ui/sidebar";
import AllBooks from "../ui/books/allBooks";

const Main = () => {
  return (
    <div className=" overflow-auto md:pl-60 pl-16 bg-gray-100 h-screen">
      <Sidebar />
      <AllBooks />
    </div>
  );
};

export default Main;
