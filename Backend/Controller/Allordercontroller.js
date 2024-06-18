const express = require('express');
const router = express.Router();
const Order = require('../Models/models.js');

router.get('/', async (req, res) => {
  const { email } = req.query;
console.log(email)
  try {
    // Find orders where the email field matches the provided email
    const orders = await Order.find({ email })
     

    const count = await Order.countDocuments({ email });

    res.json({
      orders
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
