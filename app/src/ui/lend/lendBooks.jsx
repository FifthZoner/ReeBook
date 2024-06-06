import React, { useState, useEffect } from "react";
import BookCard from "../../cards/bookCard"

const lendBooks = () => {
  const [books, setBooks] = useState([]);
  const [booksAmount, setBooksAmount] = useState(0);

  useEffect(() => {
    getBooks();
  }, []);

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
      setBooksAmount(books.length);
    } catch (error) {
      console.error("Error when handling the GET request:", error);
    }
  };

  const booksList = books.map((book) => {
    return (
      <BookCard
        id={book.bookID}
        title={book.bookInfo.name}
        author={book.bookInfo.author}
        img={book.bookInfo.imageLink}
        available={book.lentAmount === 0 ? true : false}
        borrow={false}
      />
    );
  });
  return (
      <div className="flex flex-wrap justify-center">{booksList}</div>
  );
};

export default lendBooks;
