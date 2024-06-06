import React from "react";

const handleReturnRequest = async (instanceID) => {
    try {
        const response = await fetch("http://localhost:5000/api/returnBook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                instanceID,
            }),
            credentials: 'include',
        });
        console.log(1)
        if (!response.ok) {
            console.log(2)
            console.log(instanceID)
            console.error("Return request failed");
            throw new Error("Return request failed");
        } else {
        console.log(3)
            window.location.href = "/main";
        }
    } catch (err) {
        console.log(4)
        
        console.error("Error:", err);
        setError("Error");
    }
};

const handleGetRequest = async (instanceID, days) => {
    try {
        const response = await fetch("http://localhost:5000/api/bookRequest/add", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                instanceID,
                days
            }),
            credentials: 'include',
        });
        console.log(1)
        if (!response.ok) {
            console.log(2)
            console.error("Book request failed");
            throw new Error("Book request failed with status: " + response.status);
        } else {
            const responseData = await response.json();
            console.log(3)
            console.log(responseData);
        }
    } catch (err) {
        console.log(4)
        console.error("Error:", err);
    }
};

export default function BookCard(props) {
  return (
    <div>
        <div className="bg-white mx-2 md:mx-4 my-2 w-36 md:w-[200px] py-4 px-5 md:py-6 md:px-8 rounded-xl inline-block text-lg text-center font-semibold drop-shadow-xl">
            <img className="w-28 h-32 md:w-32 md:h-48" src={props.img != "" ? props.img : "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"} alt="book img" />
            <h1 className="text-sm font-bold overflow-hidden whitespace-nowrap">{props.title ? props.title : "Title"}</h1>
            <p className="text-sm overflow-hidden whitespace-nowrap"><span className="font-semibold">{props.author ? props.author : "Author"}</span></p>
            <div className="flex flex-col justify-center items-center">
                {!props.borrow && <div>
                    <div className={props.available ? "bg-lime-600 rounded-full w-24" : "bg-lime-600 rounded-full w-24 hidden"}>
                        <p className="text-xs text-white font-semibold px-1">Available</p>
                    </div>
                    <div className={props.available ? "bg-red-700 rounded-full w-24 hidden" : "bg-amber-700 rounded-full w-24" }>
                        <p className="text-xs text-white font-semibold px-2">Unavailable</p>
                    </div>
                </div>}
                {props.borrow && <button className=" text-sm w-32 py-1 my-1 bg-purple-900 rounded-full border border-purple-950 font-semibold text-white" onClick={() => handleReturnRequest(props.id)}>
                    RETURN 
                </button>}
                {props.get && <button className=" text-sm w-32 py-1 my-1 bg-purple-900 rounded-full border border-purple-950 font-semibold text-white" onClick={() => handleGetRequest(props.id, 5)}>
                    GET ✅
                </button>}
            </div>
        </div>
    </div>
  );
}