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
    },
    password: {
        type: String,
        required: true,
    }
});

const UserProduct = new mongoose.model('UserProduct', userSchema);
module.exports = UserProduct;
