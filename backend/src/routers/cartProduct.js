const express = require('express');
const router = new express.Router();
const CartProduct = require('../models/cartProducts');
const Product = require('../models/products');

router.get("/cart_products", async (req, res) => {
    // const data = await CartProduct.find();
    // res.send(data);
    try {
        const cart_productsData = await CartProduct.find({}, { prod_id: 1, quantity: 1 });
        let data = await Promise.all(cart_productsData.map(async (element) => {
            const productsData = await Product.find({ _id: element.prod_id }, { name: 1, price: 1, _id: 0 });
            return {
                prod_id: element.prod_id,
                quantity: element.quantity,
                name: productsData[0].name,
                price: productsData[0].price,
                cart_id: element._id
            };
        }));
        // db.products.find({ _id: ObjectId("6119fb60990c7b07c4658f97") }, {name: 1, price: 1, _id: 0}).pretty()
        res.send(data);
    } catch (error) {
        res.send(error);
    }
});

router.delete("/del_cart_prod/:id", async (req, res) => {
    try {
        const delete_cart_product = await CartProduct.findByIdAndDelete(req.params.id);
        // if (!req.params.id) {
        //     return res.status(400).send();
        // }
        res.send(delete_cart_product);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch("/update_cart_prod_quantity", async (req, res) => {
    try {
        const { cart_id, quantity } = req.body;
        const updated_cart_product = await CartProduct.update({ _id: cart_id }, { quantity: quantity });
        res.send(updated_cart_product);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/cart_product/:id", async (req, res) => { //This ID is of product, to add in cart
    try {
        const { id } = req.params;
        const found = await Product.find({ _id: id }).countDocuments() === 1 ? true : false;
        if (found) {
            const isExist = await CartProduct.find({ prod_id: id });

            if (isExist.length === 0) {
                const cart_prod = new CartProduct({ prod_id: id });
                const result = await cart_prod.save();
                res.status(201).send(result);
            }
            else {
                isExist[0].quantity += 1;
                const result = await CartProduct.findOneAndUpdate({ prod_id: id }, { quantity: isExist[0].quantity });
                res.status(201).send(result);
            }
        }
        else {
            res.send("Invalid ID");
        }

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
