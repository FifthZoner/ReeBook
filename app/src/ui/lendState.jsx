import React, { useEffect } from "react";
import { useState } from "react";

const LendState = () => {
  const [booksCount, setBooksCount] = useState({
    lent: 7,
    waiting: 12,
    all: 19,
  });

  //To do: update lent/waiting based on api calls
  // useEffect(() => {
  //   setBooksCount({ lent: 2, waiting: 3, all: 5 });
  // }, []);

  const lentWidth = (booksCount.lent / booksCount.all) * 100;
  const waitingWidth = (booksCount.waiting / booksCount.all) * 100;

  return (
    <div className="">
      <div className="bg-white mx-4 my-2 py-6  rounded-xl text-lg text-center drop-shadow-xl text-white font-semibold">
        <h1 className=" text-black">Your books status</h1>
        <div className="flex flex-row px-10">
          <div
            className={` bg-gradient-to-r from-red-600 to-red-500 h-10 border-r drop-shadow-xl flex justify-center items-center ${booksCount.waiting===0 ? 'rounded-full' : 'rounded-l-full'}`} 
            style={{ width: `${lentWidth}%` }}
          >
            <h1 className={`${booksCount.lent===0 ? 'hidden' : 'block'}`}>Lent: {booksCount.lent}</h1>
          </div>
          <div
            className={` bg-gradient-to-tr from-lime-600 to-lime-500 h-10 rounded-r-full border-l drop-shadow-xl flex justify-center items-center ${booksCount.lent===0 ? 'rounded-full' : 'rounded-r-full'}`}
            style={{ width: `${waitingWidth}%` }}
          >
            <h1 className={`${booksCount.waiting===0 ? 'hidden' : 'block'}`}>Waiting: {booksCount.waiting}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LendState;
