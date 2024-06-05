import React, { useEffect } from "react";
import { useState } from "react";

const LendState = () => {

  const [booksCount, setBooksCount] = useState({
    lent: 0,
    waiting: 0,
    all: 0,
  });

  const getBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bookInstance/getAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Error in fetching book instances");
      }
  
      const result = await response.json();
      setBooksCount({
        lent: result.lentAmount,
        waiting: result.instancesAmount,
        all: result.lentAmount+result.instancesAmount,
      });
    } catch (error) {
      console.error("Error when handling the GET request:", error);
    }
  };

  useEffect(() => {
     getBooks()
   }, [booksCount]);

  const lentWidth = (booksCount.lent / booksCount.all) * 100;
  const waitingWidth = (booksCount.waiting / booksCount.all) * 100;
  let oneSided = false;
  if(booksCount.waiting===0 || booksCount.lent===0){
    oneSided = true;
  }

  return (
    <div className="">
      <div className="bg-white mx-4 my-2 py-6  rounded-xl text-lg text-center drop-shadow-xl text-white font-semibold">
        <h1 className=" text-black">Your books status</h1>
        <div className={`flex flex-row px-10 ${booksCount.all!==0 ? 'flex' : 'hidden'}`}>
          <div
            className={` bg-gradient-to-r from-lime-600 to-lime-500 h-10 border-r drop-shadow-xl flex justify-center items-center ${oneSided ? 'rounded-full' : 'rounded-l-full'}`} 
            style={{ width: `${waitingWidth}%` }}
          >
            <h1 className={`${booksCount.waiting===0 ? 'hidden' : 'block'}`}>Available: {booksCount.waiting}</h1>
          </div>
          <div
            className={` bg-gradient-to-tr from-red-500 to-red-600 h-10 rounded-r-full border-l drop-shadow-xl flex justify-center items-center ${oneSided ? 'rounded-full' : 'rounded-r-full'}`}
            style={{ width: `${lentWidth}%` }}
          >
            <h1 className={`${booksCount.lent===0 ? 'hidden' : 'block'}`}>Lent:: {booksCount.lent}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LendState;
