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

const CartProduct = new mongoose.model("CartProduct", cartSchema);

const createDocument = async () => {
    try {
        const item = new CartProduct({
            prod_id: "6119fb60990c7b07c4658f97",
            quantity: 3
        });
        const res = await item.save();
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

//createDocument();

module.exports = CartProduct;
