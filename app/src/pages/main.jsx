import React, { useState, useEffect } from "react";
import Sidebar from "../ui/sidebar";
import Lend from "../ui/lend";
import LendState from "../ui/lendState";
import BookCard from "../cards/bookCard";
import axios from "axios";


const Main = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  function getBooks() {
    axios
    .get("http://localhost:5000/api/bookInstance/getAll", { withCredentials: true })
    .then(response => {
      setBooks(response.data.uniqueBooks);
      console.log(response.data.uniqueBooks);
    })
    .catch(error => {
      console.log("error", error);
    });
  }

  const booksList = books.map((book) => {
    return(
        <BookCard
            key = {book.bookID}
            title = {book.bookInfo.name}
            author = {book.bookInfo.author}
            available = {book.lentAmount === 0 ? true : false}
        />
    );
  })  
  return (
    <div className=" overflow-auto md:pl-60 pl-16 bg-gray-100 h-screen">
        <Sidebar />
        <div className="">
          <LendState />
          <div className="flex flex-row">
            <Lend />
            <div className="flex flex-wrap">
              {booksList}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Main;
