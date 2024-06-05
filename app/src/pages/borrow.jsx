import React, { useState, useEffect } from "react";
import BorrowBooks from "../ui/borrow/borrowBooks";
import Sidebar from "../ui/sidebar";

const Lend = () => {
  return (
    <div className="overflow-auto md:pl-60 pl-16 bg-gray-100 h-screen">
      <Sidebar />
      <div className="flex flex-row flex-wrap sm:flex-nowrap justify-center">
        <div className="flex flex-wrap justify-evenly">
          <BorrowBooks />
        </div>
      </div>
    </div>
  );
};

export default Lend;
