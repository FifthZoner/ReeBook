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
            type: Boolean,
            // 0 - normal user, 1 - admin
            default: false
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
        },
        tags: {
            0: {
                type: String,
                default: ""
            },
            1: {
                type: String,
                default: ""
            },
            2: {
                type: String,
                default: ""
            }
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
    ownerID: {
        type: String,
        required: [true, "Book must have an owner"]
    },
    borrowDate: {
        type: Date,
        default: 0
    },
    dueDate: {
        type: Date,
        default: 0
    },
    // this would represent how destroyed a book is, probably judged somehow with higher meaning more destroyed
    physicalState: {
        type: Number,
        default: 0
    }
});

const bookRequestSchema = new mongoose.Schema({
    askerID: {
        type: String,
        required: [true, "Asker ID must be provided"]
    },
    targetID: {
        type: String,
        required: [true, "Target ID must be provided"]
    },
    instanceID: {
        type: String,
        required: [true, "Instance ID must be provided"]
    },
    requestDate: {
        type: Date,
        required: [true, "Request have be a date"]
    },
    state: {
        type: Number,
        default: 0 // 0 is new, 1 is accepted, 2 is transfered
    },
    days: {
        type: Number,
        required: [true, "Borrow time must be provided"]
    }
});

module.exports = {userSchema, bookInfoSchema, bookInstanceSchema, bookRequestSchema};