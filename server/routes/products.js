const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware'); 

const router = express.Router();

// Add product 
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, code, category, price, cost, brand, description, quantity } = req.body;

        const exists = await Product.findOne({ code, owner: req.user.id });
        if (exists) {
            return res.status(400).json({ msg: 'Product with this code already exists' });
        }

        const product = new Product({
            name, code, category, price, cost, brand, description, quantity, owner: req.user.id
        });

        await product.save();
        res.status(201).json(product);

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get all products for current user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const products = await Product.find({ owner: req.user.id }).sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
