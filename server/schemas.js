const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    credentials: {
        email: {
            type: String,
            required: [true, 'Email must be provided'],
            unique: true
        },
        nickname: {
            type: String,
            required: [true, 'Nickname must be provided'],
            unique: true
        },
        passwordHash: {
            type: String,
            required: [true, 'Password hash must be provided']
        }
    },
    personal: {
        firstName: {
            type: String,
            default: 'N/A'
        },
        lastName: {
            type: String,
            default: 'N/A'
        }
    },
    other: {
        accessLevel: {
            type: Number,
            // 0 - normal user, 1 - book handler, 2 - admin
            default: 0
        }
    }
});

const bookInfoSchema = new mongoose.Schema({
    // to be sent for tiles
    identification: {
        name: {
            type: String,
            required: [true, "Name must be provided"],
        },
        author: {
            type: String,
            required: [true, "Author/s must be provided"],
        },
        isbn: {
            type: String,
            default: "Not provided"
        },
        imageLink: {
            type: String,
            default: ""
        }
    },
    // to be sent when requesting details
    details: {
        description: {
            type: String,
            default: "Not provided"
        },
        releaseDate: {
            type: Date,
            default: 0
        },
        releasePlace: {
            type: String,
            default: "Not provided"
        },
        distributor: {
            type: String,
            default: "Not provided"
        }
    }
});

const bookInstanceSchema = new mongoose.Schema({
    bookID: {
        type: String,
        required: [true, "Book ID must be provided"]
    },
    // "" when no one holds the book
    holderID: {
        type: String,
        default: ""
    },
    borrowDate: {
        type: Date,
        default: 0
    },
    // this would represent how destroyed a book is, probably judged somehow with higher meaning more destroyed
    physicalState: {
        type: Number,
        default: 0
    }
});

module.exports = {userSchema, bookInfoSchema, bookInstanceSchema};