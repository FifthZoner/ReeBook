import React, { useState, useEffect } from "react";
import BookCard from "../../cards/bookCard";
import NoBooks from "../noBooks";

const BorrowBooks = () => {
  const [books, setBooks] = useState([]);
  const [booksAmount, setBooksAmount] = useState(0);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/bookInstance/getBorrowed",
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
      console.log(result);
      setBooks(result.instances);
      setBooksAmount(result.booksBorrowed);
    } catch (error) {
      console.error("Error when handling the GET request:", error);
    }
  };

  return (
    <div>
      {booksAmount === 0 ? (
        <div className="flex flex-wrap justify-evenly">
          <NoBooks />
        </div>
      ) : (
        <div className="flex flex-wrap justify-evenly">
          {books.map((book) => (
            <BookCard
              key={book.instanceID}
              id={book.instanceID}
              title={book.bookInfo.name}
              author={book.bookInfo.author}
              img={book.bookInfo.imageLink}
              borrow={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BorrowBooks;
