import React, { useState, useEffect } from "react";
import LendForm from "../ui/lend/lendForm";
import LendBooks from "../ui/lend/lendBooks";
import LendState from "../ui/lend/lendState";

const Lend = () => {
  return (
    <div className="">
      <LendState />
      <div className="flex flex-row flex-wrap sm:flex-nowrap justify-center sm:justify-between">
        <div className="flex flex-wrap">
          <LendBooks />
        </div>
        <LendForm />
      </div>
    </div>
  );
};

export default Lend;
