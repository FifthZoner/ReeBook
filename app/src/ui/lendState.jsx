import React, { useEffect } from "react";
import { useState } from "react";

const LendState = () => {
  const [booksCount, setBooksCount] = useState({
    lent: 2,
    waiting: 4,
    all: 5,
  });

  //To do: update lent/waiting based on api calls
  // useEffect(() => {
  //   setBooksCount({ lent: 2, waiting: 3, all: 5 });
  // }, []);

  const lentWidth = (booksCount.lent / booksCount.all) * 100;
  const waitingWidth = (booksCount.waiting / booksCount.all) * 100;

  return (
    <div className="">
      <div className="bg-white m-4 py-6  rounded-xl text-lg text-center drop-shadow-xl text-white font-semibold">
        <h1 className=" text-black">Your books status</h1>
        <div className="flex flex-row px-10">
          <div
            className=" bg-gradient-to-r from-red-600 to-red-500 h-10 rounded-l-full border-r drop-shadow-xl flex justify-center items-center"
            style={{ width: `${lentWidth}%` }}
          >
            <h1>Lent: {booksCount.lent}</h1>
          </div>
          <div
            className=" bg-gradient-to-tr from-lime-600 to-lime-500 h-10 rounded-r-full border-l drop-shadow-xl flex justify-center items-center"
            style={{ width: `${waitingWidth}%` }}
          >
            <h1>Waiting: {booksCount.waiting}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LendState;
