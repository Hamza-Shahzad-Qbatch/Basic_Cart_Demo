const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    }
});

const Product = new mongoose.model("Product", productSchema);

const createDocument = async () => {
    try {
        const item = new Product({
            name: "Glasses",
            price: 150
        });
        const res = await item.save();
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}

//createDocument();

module.exports = Product;
