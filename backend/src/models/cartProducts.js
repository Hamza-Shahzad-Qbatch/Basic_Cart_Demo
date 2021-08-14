const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

const cartSchema = new mongoose.Schema({
    _id: {
        type: ObjectId,
        // required: true,
        // unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const CartProduct = new mongoose.model("CartProduct", cartSchema);

module.exports = CartProduct;
