import React, { useState, useEffect } from "react";
import LendForm from "../ui/lend/lendForm";
import LendBooks from "../ui/lend/lendBooks";
import LendState from "../ui/lend/lendState";
import Sidebar from "../ui/sidebar";

const Lend = () => {
  return (
    <div className="overflow-auto md:pl-60 pl-16 bg-gray-100 h-screen">
      <Sidebar />
      <LendState />
      <div className="flex flex-row flex-wrap">
        <LendForm />
        <LendBooks />
      </div>
    </div>
  );
};

export default Lend;
