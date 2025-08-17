const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Add product
router.post('/', async (req, res) => {
    try {
        const { name, code, category, price, cost, brand, description, quantity } = req.body;

        // check if product already exists with same code
        const exists = await Product.findOne({ code });
        if (exists) {
            return res.status(400).json({ msg: 'Product with this code already exists' });
        }

        const product = new Product({ name, code, category, price, cost, brand, description, quantity });
        await product.save();

        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
