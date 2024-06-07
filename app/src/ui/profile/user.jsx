import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
let data = [];

const getUser = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/user/details", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Error in fetching user informations");
    }

    const result = await response.json();
    data = result;
    console.log(data);
  } catch (error) {
    console.error("Error when handling the GET request:", error);
  }
};

getUser();

export default function User() {
  return (
    <div className="flex flex-col justify-center items-center content-center text-2xl font-semibold py-24 px-20 rounded-xl bg-white drop-shadow-xl">
      <div className="flex flex-col justify-center items-center m-2">
        <FaUserCircle size={75} className=" text-purple-900" />
        <h1 className=" text-gray-400 ">@{data.nickname}</h1>
      </div>
      <div className="flex flex-col justify-center items-center m-2">
        <h2>Welcome,</h2>
        <h2>
          {data.personal.firstName} {data.personal.lastName}
        </h2>
      </div>
      <div className="flex flex-col justify-between items-center m-2">
        <h2>Currently borrowed: <span className="text-right">{data.other.borrowed}</span></h2>
        <h2>Currently lent: {data.other.lent}</h2>
      </div>
      
    </div>
  );
}
