import React from "react";
import { useState } from "react";

const LendForm = () => {
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
        "http://localhost:5000/api/bookInfo/addFullAndInstance",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookInfo),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Error in adding book info");
      }
      window.location.href = "/lend";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className=" bg-white my-2 py-6 px-8 mx-4 rounded-xl inline-block text-lg text-center font-semibold drop-shadow-xl">
        <form onSubmit={handleSubmit} className="m-1 [&>*]:p-1">
          <p>Name</p>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500 my-2 "
            type="text"
            name="name"
            value={bookInfo.name}
            onChange={handleChange}
          />
          <p>Author</p>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500 my-2 "
            type="text"
            name="author"
            value={bookInfo.author}
            onChange={handleChange}
          />
          <p>ISBN</p>
          <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500 my-2 "
            type="text"
            name="isbn"
            value={bookInfo.isbn}
            onChange={handleChange}
          />
          <p>Image Link</p>
          <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500 my-2 "
            type="text"
            name="imageLink"
            value={bookInfo.imageLink}
            onChange={handleChange}
          />
          <p>Description</p>
          <input
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500 my-2 "
            type="text"
            name="description"
            value={bookInfo.description}
            onChange={handleChange}
          />
          <hr />
          <button type="submit" className="w-full bg-purple-900 text-white py-2 rounded-md hover:bg-purple-950 my-2 transition duration-300">Add a Book</button>
        </form>
      </div>
    </div>
  );
};

export default LendForm;
