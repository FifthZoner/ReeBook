import React, { useState, useEffect } from "react";
import BookCard from "../../cards/bookCard";
import NoBooks from "../noBooks";

export default function AllBooks() {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCriteria, setFilterCriteria] = useState({ author: '', available: true });
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);

    const getBooks = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/bookInfo/getBasics", {
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
            console.log(result);

            if (Array.isArray(result)) {
                setBooks(result);
            } else {
                console.error("Unexpected response structure:", result);
                setBooks([]);
            }
        } catch (error) {
            console.error("Error when handling the GET request:", error);
            setBooks([]);
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterCriteria({
            ...filterCriteria,
            [e.target.name]: e.target.value,
        });
    };

    const filteredBooks = books.filter((book) => {
        const matchesSearchQuery = book.identification.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAuthor = filterCriteria.author === '' || book.identification.author.toLowerCase().includes(filterCriteria.author.toLowerCase());
        const matchesAvailability = true; // TODO backend is sleeping

        return matchesSearchQuery && matchesAuthor && matchesAvailability;
    });
    
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col items-center justify-between min-h-screen">
            <div>
            <div className="flex flex-row flex-wrap justify-center gap-3 my-4">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border rounded px-4 py-2"
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Filter by author"
                    value={filterCriteria.author}
                    onChange={handleFilterChange}
                    className="border rounded px-4 py-2"
                />
                <select
                    name="available"
                    value={filterCriteria.available}
                    onChange={handleFilterChange}
                    className="border rounded px-4 py-2"
                >
                    <option value={true}>Available</option>
                    <option value={false}>Not Available</option>
                </select>
            </div>
            <div className="flex flex-wrap justify-evenly">
                {currentBooks.length > 0 ? (
                    currentBooks.map((book) => {
                        console.log(book);
                        return (
                            <BookCard
                                key={book.instanceID}
                                id={book.instanceID}
                                title={book.identification.name}
                                author={book.identification.author}
                                img={book.identification.imageLink}
                                available={true} // TODO backend is sleeping
                                get={true} // TODO backend is sleeping
                            />
                        );
                    })
                ) : (
                    <NoBooks />
                )}
            </div>
            </div>
            <div className="my-4">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`border rounded px-4 py-2 mx-1 ${currentPage === pageNumber ? 'bg-purple-900 text-white' : 'bg-white text-purple-900'}`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
}