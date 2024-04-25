import React from "react";

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/api/bookInfo/addFull', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookInfo),
        });

        if (!response.ok) {
            throw new Error('Error in adding book info');
        }

        const result = await response.json();
        console.log(result);
        }catch (error) {
            console.error(error);
        }
    };

  
  const bookInfo = {
    name: 'test',
    author: 'test',
    isbn: 'test',
    imageLink: 'test',
    description: 'test',
    releaseDate: 'test',
    releasePlace: 'test',
    distributor: 'test',
    tag0: 'test',
    tag1: 'test',
    tag2: 'test',
  };
  

const Lend = () => {
  return (
   <div>
        <div>
            <form onSubmit={handleSubmit}>
            <p>Name</p><input type="text" name="name" id="name" />
            <p>author</p><input type="text" name="author" id="author" />
            <p>isbn</p><input type="text" name="isbn" id="isbn" />
            <p>imageLink</p><input type="text" name="imageLink" id="imageLink" />
            <p>description</p><input type="text" name="description" id="description" />
            <p>releaseDate</p><input type="text" name="releaseDate" id="releaseDate" />
            <p>releasePlace</p><input type="text" name="releasePlace" id="releasePlace" />
            <p>distributor</p><input type="text" name="distributor" id="distributor" />
            <p>tag0</p><input type="text" name="tag1" id="tag1" />
            <p>tag1</p><input type="text" name="tag2" id="tag2" />
            <p>tag2</p><input type="text" name="tag3" id="tag3" />
            <button type="submit">Lend a book</button>
            </form>
        </div>
   </div> 
  );
};

export default Lend;
