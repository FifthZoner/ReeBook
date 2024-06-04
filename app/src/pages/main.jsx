import React, { useState, useEffect } from "react";
import Sidebar from "../ui/sidebar";
import Lend from "./lend";
import Borrow from "./borrow"
import AllBooks from "../ui/books/allBooks";

const Main = () => {
  return (
    <div className=" overflow-auto md:pl-60 pl-16 bg-gray-100 h-screen">
      <Sidebar />
      <AllBooks />
      {/* <Borrow  /> */}
    </div>
  );
};

export default Main;
