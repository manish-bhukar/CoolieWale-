// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../Models/models.js');

// Get a single order by ID
router.get('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  
  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an order partially
router.patch('/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { stationName, date, time } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (stationName) order.stationName = stationName;
    if (date) order.date = date;
    if (time) order.time = time;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
