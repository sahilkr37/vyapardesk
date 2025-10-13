const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add product 
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, category, price, cost, brand, description, quantity } = req.body;

        const product = new Product({
            name, category, price, cost, brand, description, quantity, owner: req.user.id
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

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;  // Product ID from URL
        const { name, category, price, cost, brand, description, quantity } = req.body;

        const product = await Product.findOne({ _id: id, owner: req.user.id });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found or unauthorized' });
        }

        product.name = name || product.name;
        product.category = category || product.category;
        product.price = price ?? product.price;
        product.cost = cost ?? product.cost;
        product.brand = brand || product.brand;
        product.description = description || product.description;
        product.quantity = quantity ?? product.quantity;

        await product.save();

        res.json({ msg: 'Product updated successfully', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ _id: id, owner: req.user.id });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found or unauthorized' });
        }

        await product.deleteOne();

        res.json({ msg: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});
module.exports = router;
