const express = require('express');
const router = express.Router();
const Order = require('../Models/models.js');

// @route   POST /orders
// @desc    Create a new order
// @access  Public
router.post('/ord', async (req, res) => {
  const { name, luggageType, orderStatus, stationName, date, time,email } = req.body;
  try {
    const newOrder = new Order({
      name,
      luggageType,
      orderStatus,
      stationName,
      date,
      time,
      email
    });
    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /orders
// @desc    Get all orders
// @access  Public
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
