const express = require('express');
const getOrders=require('../Controller/Allordercontroller.js')
const router = express.Router();

router.get("/",getOrders)
module.exports = router;
