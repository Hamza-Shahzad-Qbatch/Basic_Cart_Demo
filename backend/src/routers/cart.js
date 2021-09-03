const express = require('express');
const router = new express.Router();

const CartProduct = require('../models/cart');
const Product = require('../models/products');
const auth = require('../middleware/auth');

router.get('/cart_products', async (req, res) => {
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
        res.send(-1);
    }
});

router.get('/user_cart', auth, async (req, res) => {
    const { user_email, randomString } = req;
    const u_id = user_email ? user_email : randomString;
    try {
        const cart_productsData = await CartProduct.find({ userId: u_id }, { prod_id: 1, quantity: 1, userId: 1 });
        let data = await Promise.all(cart_productsData.map(async (element) => {
            const productsData = await Product.find({ _id: element.prod_id }, { name: 1, price: 1, _id: 0 });
            return {
                prod_id: element.prod_id,
                quantity: element.quantity,
                name: productsData[0].name,
                price: productsData[0].price,
                cart_id: element._id,
                user_id: element.userId
            };
        }));
        // db.products.find({ _id: ObjectId("6119fb60990c7b07c4658f97") }, {name: 1, price: 1, _id: 0}).pretty()
        res.send(data);
    } catch (error) {
        res.send(error);
    }
});

router.delete('/del_cart_prod/:id', async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).send(-1);
        }
        const delete_cart_product = await CartProduct.findByIdAndDelete(id);
        res.send(delete_cart_product);
    } catch (error) {
        res.status(500).send(-1);
    }
});

router.patch('/update_cart_prod_quantity', async (req, res) => {
    try {
        const { cart_id, quantity } = req.body;
        const updated_cart_product = await CartProduct.updateOne({ _id: cart_id }, { quantity: quantity });
        res.send(updated_cart_product);
    } catch (error) {
        res.status(500).send(-1);
    }
});

router.post('/cart_product', auth, async (req, res) => {
    const { prod_id } = req.body;
    const { user_email, randomString } = req;
    const userId = user_email ? user_email : randomString;
    try {
        const found = await Product.find({ _id: prod_id }).countDocuments() === 1 ? true : false;
        if (found) {
            const isExist = await CartProduct.find({ prod_id, userId });
            if (isExist.length === 0) {
                const cart_prod = new CartProduct({ prod_id, userId });
                const result = await cart_prod.save();
                res.status(201).send(result);
            }
            else {
                const result = await CartProduct.findOneAndUpdate({ prod_id, userId }, { quantity: isExist[0].quantity + 1 });
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
