import React from "react";
import { useState } from "react";

const Lend = () => {
  const [bookInfo, setBookInfo] = useState({
    name: "",
    author: "",
    isbn: "",
    imageLink: "",
    description: "",
    releaseDate: "",
    releasePlace: "",
    distributor: "",
    tag0: "",
    tag1: "",
    tag2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(bookInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/bookInfo/addFull",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookInfo),
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error("Error in adding book info");
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <p>Name</p>
          <input
            type="text"
            name="name"
            value={bookInfo.name}
            onChange={handleChange}
          />
          <p>Author</p>
          <input
            type="text"
            name="author"
            value={bookInfo.author}
            onChange={handleChange}
          />
          <p>ISBN</p>
          <input
            type="text"
            name="isbn"
            value={bookInfo.isbn}
            onChange={handleChange}
          />
          <p>Image Link</p>
          <input
            type="text"
            name="imageLink"
            value={bookInfo.imageLink}
            onChange={handleChange}
          />
          <p>Description</p>
          <input
            type="text"
            name="description"
            value={bookInfo.description}
            onChange={handleChange}
          />
          <p>Release Date</p>
          <input
            type="date"
            name="releaseDate"
            value={bookInfo.releaseDate}
            onChange={handleChange}
          />
          <p>Release Place</p>
          <input
            type="text"
            name="releasePlace"
            value={bookInfo.releasePlace}
            onChange={handleChange}
          />
          <p>Distributor</p>
          <input
            type="text"
            name="distributor"
            value={bookInfo.distributor}
            onChange={handleChange}
          />
          <p>Tag0</p>
          <input
            type="text"
            name="tag0"
            value={bookInfo.tag0}
            onChange={handleChange}
          />
          <p>Tag1</p>
          <input
            type="text"
            name="tag1"
            value={bookInfo.tag1}
            onChange={handleChange}
          />
          <p>Tag2</p>
          <input
            type="text"
            name="tag2"
            value={bookInfo.tag2}
            onChange={handleChange}
          />
          <button type="submit">Lend a Book</button>
        </form>
      </div>
    </div>
  );
};

export default Lend;
