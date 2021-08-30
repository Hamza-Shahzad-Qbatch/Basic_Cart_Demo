const express = require('express');
const router = new express.Router();

const Product = require('../models/products');

router.get('/products', async (req, res) => {
    try {
        const productsData = await Product.find();
        res.send(productsData);
    } catch (error) {
        res.status(404).send(error);
    }
})

router.get('/product/:id', async (req, res) => {
    try {
        const productData = await Product.findById(req.params.id);
        res.send(productData);
    } catch (error) {
        res.status(404).send(error);
    }
})

router.post('/products', async (req, res) => {
    try {
        const prod = new Product(req.body);
        const result = await prod.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;
