const express = require('express');
const router = new express.Router();
const CartProduct = require('../models/cartProducts');

router.get("/cart_products", async (req, res) => {
    try {
        const cart_productsData = await CartProduct.find();
        res.send(cart_productsData);
    } catch (error) {
        res.send(error);
    }
});

router.delete("/del_cart_prod/:id", async (req, res) => {
    try {
        const delete_cart_product = await CartProduct.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(delete_cart_product);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/cart_products", async (req, res) => {
    try {
        const cart_prod = new CartProduct(req.body);
        const createCart_prod = await cart_prod.save();
        res.status(201).send(createCart_prod);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
