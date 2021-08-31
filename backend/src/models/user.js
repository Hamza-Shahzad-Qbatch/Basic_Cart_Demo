const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

const User = new mongoose.model('User', userSchema);
module.exports = User;
