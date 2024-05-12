import React from "react";

export default function BookCard(props) {
  return (
    <div>
        <div className="bg-white mx-2 md:mx-4 my-2 w-32 md:w-48 py-4 px-5 md:py-6 md:px-8 rounded-xl inline-block text-lg text-center font-semibold drop-shadow-xl">
            <img className="w-28 h-32 md:w-32 md:h-48" src={props.img != "" ? props.img : "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"} alt="book img" />
            <h1 className="text-sm font-bold overflow-hidden whitespace-nowrap">{props.title ? props.title : "Title"}</h1>
            <p className="text-sm overflow-hidden whitespace-nowrap"><span className="font-semibold">{props.author ? props.author : "Author"}</span></p>
            <div className="flex justify-center">
                <div className={props.available ? "bg-lime-600 rounded-full w-24 hidden" : "bg-lime-600 rounded-full w-24"}>
                    <p className="text-xs text-white font-semibold px-1">Available</p>
                </div>
                <div className={props.available ? "bg-amber-700 rounded-full w-24" : "bg-amber-700 rounded-full w-24 hidden" }>
                    <p className="text-xs text-white font-semibold px-2">Unavailable</p>
                </div>
            </div>
        </div>
    </div>
  );
}