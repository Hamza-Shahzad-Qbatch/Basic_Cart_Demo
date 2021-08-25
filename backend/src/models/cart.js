const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const cartSchema = new mongoose.Schema({
    prod_id: {
        type: ObjectId,
        // required: true,
        // unique: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const CartProduct = new mongoose.model('CartProduct', cartSchema);
module.exports = CartProduct;
