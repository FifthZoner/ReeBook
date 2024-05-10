import React from "react";
import Sidebar from "../ui/sidebar";
import Lend from "../ui/lend";
import LendState from "../ui/lendState";

const Main = () => {
  return (
    <div className=" overflow-auto md:pl-60 pl-16 bg-gray-100 h-screen">
        <Sidebar />
        <div className="">
          <LendState />
          <Lend />
        </div>
    </div>
  );
};

export default Main;
