import React from "react";

export default function BookCard(props) {
  return (
    <div>
        <div className="bg-white mx-4 my-2 py-6 px-8 rounded-xl inline-block text-lg text-center font-semibold drop-shadow-xl">
            <img className="w-32" src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg" alt="book img" />
            <h1 className="text-sm font-semibold">{props.title ? props.title : "Title"}</h1>
            <p className="text-sm">By: <span className="font-semibold">{props.author}</span></p>
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