import React from "react";
import Sidebar from "../ui/sidebar";
import Lend from "../ui/lend";

const Main = () => {
  return (
    <div>
        <Sidebar />
        <div className="md:pl-60 pl-16">
          <Lend />
        </div>
    </div>
  );
};

export default Main;
