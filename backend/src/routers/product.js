const express = require('express');
const router = new express.Router();

const Product = require('../models/products');

router.get('/products', async (req, res) => {
    try {
        const productsData = await Product.find();
        res.send(productsData);
    } catch (error) {
        res.send(-1);
    }
})

router.post('/products', async (req, res) => {
    try {
        const prod = new Product(req.body);
        const result = await prod.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send(-1);
    }
})

module.exports = router;
