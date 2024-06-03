import React, { useState, useEffect } from "react";
import BorrowBooks from "../ui/borrow/borrowBooks"

const Lend = () => {

  return (
    <div className="">
    <div className="flex flex-row flex-wrap sm:flex-nowrap justify-center sm:justify-normal">
      <div className="flex flex-wrap justify-evenly">
      <BorrowBooks />
      </div>
    </div>
  </div>
  );
};

export default Lend;
