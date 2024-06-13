import React, { useState, useEffect } from "react";
import LendForm from "../ui/lend/lendForm";
import LendState from "../ui/lend/lendState";
import Sidebar from "../ui/sidebar";
import BookCard from "../cards/bookCard";
import NoBooks from "../ui/noBooks";

const Lend = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    console.log(0);

    const getBooks = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/bookInstance/getAll",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Error in fetching book instances");
        }

        const result = await response.json();

        setBooks(result.uniqueBooks);
      } catch (error) {
        console.error("Error when handling the GET request:", error);
      }
    };

    getBooks();
    console.log(0);
  }, []);

  return (
    <div className="overflow-auto md:pl-60 pl-16 bg-gray-100 h-screen">
      <Sidebar />
      <div className="flex flex-col">
        <LendState />
        <div className=" flex flex-col md:flex-row items-center md:items-start">
          <div className=" md:min-w-[300px]">
            <LendForm />
          </div>
          <div className=" flex flex-row flex-wrap justify-center ">
            {books && books.length > 0 ? (
              books.map((book) => (
                <BookCard
                  key={book.bookID}
                  id={book.bookID}
                  title={book.bookInfo.name}
                  author={book.bookInfo.author}
                  img={book.bookInfo.imageLink}
                  available={book.lentAmount === 0}
                  borrow={false}
                />
              ))
            ) : (
              <div className=" mx-auto">
                <NoBooks />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lend;
