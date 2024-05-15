import React, { useState, useEffect } from "react";
import Sidebar from "../ui/sidebar";
import Lend from "../ui/lend";
import LendState from "../ui/lendState";
import BookCard from "../cards/bookCard";


const Main = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

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
      setBooks(result.uniqueBooks);
      console.log(result.uniqueBooks);
    } catch (error) {
      console.error("Error when handling the GET request:", error);
    }
  };

  const booksList = books.map((book) => {
    return(
        <BookCard
            key = {book.bookID}
            title = {book.bookInfo.name}
            author = {book.bookInfo.author}
            img = {book.bookInfo.imageLink}
            available = {book.lentAmount === 0 ? true : false}
        />
    );
  })  
  return (
    <div className=" overflow-auto md:pl-60 pl-16 bg-gray-100 h-screen">
        <Sidebar />
        <div className="">
          <LendState />
          <div className="flex flex-row flex-wrap sm:flex-nowrap justify-center sm:justify-normal">
            <Lend />
            <div className="flex flex-wrap justify-evenly">
              {booksList}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Main;
