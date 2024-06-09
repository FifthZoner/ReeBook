import React from "react";

export default function NotifyCard(props) {
  const handleAccept = async (instanceID) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/bookRequest/accept",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            instanceID,
          }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        console.error("Book accept failed");
        throw new Error("Book accept failed with status: " + response.status);
      } else {
        const responseData = await response.json();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDecline = async (instanceID) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/bookRequest/decline",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            instanceID,
          }),
          credentials: "include",
        }
      );
      if (!response.ok) {
        console.error("Book decline failed");
        throw new Error("Book accept decline with status: " + response.status);
      } else {
        const responseData = await response.json();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex justify-between m-2 bg-white rounded-xl p-4 drop-shadow-xl">
      <div className="flex flex-col justify-center">
        <h1><span className=" font-semibold">{props.nick}</span> wants to borrow your book "<span className="font-semibold">{props.title}</span>".</h1>

      </div>
      <div className="flex flex-col md:flex-row text-white">
        <button className="px-4 py-2 my-2 max-h-24 bg-gradient-to-tr from-lime-600 to-lime-500 mx-4 rounded-xl drop-shadow-xl border" onClick={()=>handleAccept(props.requestID)}>Accept</button>
        <button className="px-4 py-2 my-2 bg-gradient-to-tr from-red-500 to-red-600 mx-4 rounded-xl drop-shadow-xl border"onClick={()=>handleDecline(props.requestID)}>Decline</button>
      </div>
    </div>
  );
}
