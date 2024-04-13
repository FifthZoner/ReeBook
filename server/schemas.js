const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    credentials: {
        email: {
            type: String,
            required: [true, 'User must have an email']
        },
        nickname: {
            type: String,
            required: [true, 'User must have a name'],
            unique: true
        },
        passwordHash: {
            type: String,
            required: [true, 'User must have a password']
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
});

module.exports = {userSchema};