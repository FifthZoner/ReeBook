import React, { useState, useEffect } from "react";
import BookCard from "../../cards/bookCard"

const lendBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, [books]);

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

  const booksList = books.map((book) => {
    return (
      <BookCard
        key={book.bookID}
        title={book.bookInfo.name}
        author={book.bookInfo.author}
        img={book.bookInfo.imageLink}
        available={book.lentAmount === 0 ? true : false}
        borrow={false}
      />
    );
  });
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center">{booksList}</div>
    </div>
  );
};

export default lendBooks;
