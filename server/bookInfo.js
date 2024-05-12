const {BookInstanceCollection, BookInfoCollection, UserCollection} = require("./database");
const bodyParser = require("body-parser");
const session = require("express-session");
module.exports = function(app) {

    app.put("/api/bookInfo/addBare", bodyParser.json(), async (req, res) => {
        try {
            const user = await UserCollection.findOne({ _id: req.session.userId });
            if (user === undefined || user == null) {
                console.error("User without session tried to add a book!");
                res.status(512).json({ error: "Could not get user info! Is session valid?" });
                return;
            }
            if (user.other.accessLevel == false) {
                console.error("User without permissions tried to add a book!");
                res.status(512).json({ error: "Not permitted to add a book!" });
                return;
            }

            const { name, author } = req.body;
            const book = new BookInfoCollection({"identification.name" : name, "identification.author" : author})
            await book.save();

            res.status(256).json( {"response": "Added a new book!"} );
        }
        catch (err) {
            console.error("Error when adding book:", err);
            res.status(512).json({ error: "Error when adding!" });
        }
    });

    app.put("/api/bookInfo/addFull", bodyParser.json(), async (req, res) => {
        try {
            const user = await UserCollection.findOne({_id : req.session.userId});
            if (user === undefined || user == null) {
                console.error("User without session tried to add a book!");
                res.status(512).json({error: "Could not get user info! Is session valid?"});
                return;
            }
            const { name, author,  isbn, imageLink, description, releaseDate, releasePlace, distributor, tag0, tag1, tag2} = req.body;
            console.log(req.body)
            const book = new BookInfoCollection(
                {"identification.name" : name,
                    "identification.author" : author,
                    "identification.isbn" : isbn,
                    "identification.imageLink" : imageLink,
                    "details.description" : description,
                    "details.releaseDate" : releaseDate,
                    "details.releasePlace" : releasePlace,
                    "details.distributor" : distributor,
                    "identification.tags.0" : tag0,
                    "identification.tags.1" : tag1,
                    "identification.tags.2" : tag2
                })
            await book.save();

            res.status(256).json( {"response": "Added a new book!"} );
        }
        catch (err) {
            console.error("Error when adding book:", err);
            res.status(512).json({ error: "Error when adding!" });
        }
    });

    app.patch("/api/bookInfo/edit", bodyParser.json(), async (req, res) => {
        try {
            const user = await UserCollection.findOne({_id : req.session.userId});
            if (user === undefined || user == null) {
                console.error("User without session tried to add a book!");
                res.status(512).json({error: "Could not get user info! Is session valid?"});
                return;
            }
            const { bookID, name, author,  isbn, imageLink, description, releaseDate, releasePlace, distributor, tag0, tag1, tag2} = req.body;
            const book = await BookInfoCollection.findOne({"_id" : bookID});
            if (book === undefined || book == null) {
                console.error("User tried to edit a non existing book!");
                res.status(512).json({ error: "Book _id not found in database!" });
                return;
            }
            if (user.other.accessLevel === false) {
                const bookCheck = await BookInstanceCollection.findOne({"ownerID" : user._id, "bookID" : bookID});
                if (bookCheck === undefined || bookCheck == null) {
                    console.error("User without permissions tried to edit a book!");
                    res.status(512).json({ error: "Not permitted to edit this book!" });
                    return;
                }
            }
            book.identification.name = name;
            book.identification.author = author;
            book.identification.isbn = isbn;
            book.identification.imageLink = imageLink;
            book.identification.tags[0] = tag0;
            book.identification.tags[1] = tag1;
            book.identification.tags[2] = tag2;
            book.details.description = description;
            book.details.releaseDate = releaseDate;
            book.details.releasePlace = releasePlace;
            book.details.distributor = distributor;

            await book.updateOne(book);

            res.status(256).json( {"response": "Edited book!"} );
        }
        catch (err) {
            console.error("Error when editing book:", err);
            res.status(512).json({ error: "Error when editing!" });
        }
    });

    app.delete("/api/bookInfo/delete", bodyParser.json(), async (req, res) => {
        try {
            const user = await UserCollection.findOne({_id : req.session.userId});
            if (user === undefined || user == null) {
                console.error("User without session tried to add a book!");
                res.status(512).json({error: "Could not get user info! Is session valid?"});
                return;
            }
            const { bookID} = req.body;
            const book = await BookInfoCollection.findOne({ "_id" : bookID });
            console.log(book);
            if (book == null || book === undefined) {
                console.error("Book with that id doesn't exist!");
                res.status(512).json({ error: "Book with that id does not exist!" });
                return;
            }
            if (user.other.accessLevel === false) {
                console.error("User without permissions tried to delete a book!");
                res.status(512).json({ error: "Not permitted to delete this book!" });
                return;
            }
            const bookCheck = await BookInstanceCollection.findOne({"bookID" : bookID});
            if (bookCheck !== undefined && bookCheck != null) {
                console.error("Cannot delete a book with instances!");
                res.status(512).json({ error: "Cannot delete a book with existing instances!" });
                return;
            }
            await book.deleteOne();

            res.status(256).json( {"response": "Deleted book!"} );
        }
        catch (err) {
            console.error("Error when editing book:", err);
            res.status(512).json({ error: "Error when editing!" });
        }
    });

    // gives back a list of book basic infos, for now all, limits will be added later
    app.get("/api/bookInfo/getBasics", bodyParser.json(), async (req, res) => {
        try {
            const books = await BookInfoCollection.find({});
            let infos = [];
            for (let n = 0; n < books.length; n++) {
                infos.push([books[n].identification, {"_id" : books[n]._id}]);
            }
            res.json(infos);
        }
        catch (err) {
            console.error("Error when returning book info list:", err);
            res.status(500).json({ error: "Error when returning book info list!" });
        }
    });

    // gives back a list of book basic infos, limited by page and filters
    app.post("/api/bookInfo/getBasicsFiltered", bodyParser.json(), async (req, res) => {
        try {
            let { page, pageSize,   //page details
                available, publishedAfter, author, title,   //filtering criteria
                sortBy, sortOrder    //sorting criteria and order
            } = req.body;   
            
            if (isNaN(page) || isNaN(pageSize)){
                res.status(500).json({ error: "Page number and size must be number value!" });
            }

            //Filters handling
            let availableFilter = {};
            let dateFilter = {};
            let authorFilter = {};
            let titleFilter = {};
            if (available) {
                availableFilter = {};
            }
            if (publishedAfter) {
                dateFilter = {"details.releaseDate": { $gte: new Date(publishedAfter) } };
            }
            if (author) {
                authorFilter = { "identification.author": { $regex: new RegExp(`.*${author}.*`, "i") } };  
            }
            if (title) {
                titleFilter = { "identification.name": { $regex: new RegExp(`.*${title}.*`, "i") } };  
            }
            //TODO: add more filters later
            let filters = {...availableFilter, ...dateFilter, ...authorFilter, ...titleFilter};    
            
            //sorting handling
            let sorting = {};
            if (sortBy){
                sortOrder = (!parseInt(sortOrder) || (sortOrder != 1 && sortOrder != -1) ? 1 : parseInt(sortOrder));    //default order: ASC
                sorting[sortBy] = sortOrder; 
            } else {
                sorting = { _id: 1} 
            }

            if (pageSize <= 0) {
                res.status(500).json({ error: "Page needs to have at least 1 space!" });
                return;
            }
            page = (parseInt(page) > 0 ? parseInt(page) : 1);     //default page: 1
            pageSize = parseInt(pageSize);

            const booksAmount = await BookInfoCollection.countDocuments(filters);
            const pagesAmount = Math.ceil(booksAmount / pageSize);
            
            if (page > pagesAmount) {
                res.status(500).json({ error: `Page ${page} not available` });
                return;
            }
            const skip = (page - 1) * pageSize;
            const limit = pageSize;

            const books = await BookInfoCollection.find(filters)
            .sort(sorting)
            .skip(skip)
            .limit(limit);

            let infos = [];
            for (let n = 0; n < books.length; n++) {
                infos.push([books[n].identification, {"_id" : books[n]._id}]);
            }

            res.json({
                pagesAmount,
                page,
                booksAmount,
                books: infos
            });

        }
        catch (err) {
            console.error("Error when returning book info list:", err);
            res.status(500).json({ error: "Error when returning book info list!" });
        }
    });

    app.post("/api/bookInfo/getDetailed", bodyParser.json(), async (req, res) => {
        try {
            const {_id} = req.body;
            const book = await BookInfoCollection.findOne({"_id" : _id});
            if (book === undefined || book == null) {
                res.status(500).json({ error: "Book _id not found in database!" });
                return;
            }
            res.json(book);
        }
        catch (err) {
            console.error("Error when returning book info list:", err);
            res.status(500).json({ error: "Error when returning book info list!" });
        }
    });
}