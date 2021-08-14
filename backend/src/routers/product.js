const express = require('express');
const router = new express.Router();
const Product = require('../models/products');

router.get("/products", async (req, res) => {
    try {
        const productsData = await Product.find();
        res.send(productsData);
    } catch (error) {
        res.send(error);
    }
})

module.exports = router;
