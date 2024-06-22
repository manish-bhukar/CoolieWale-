const express = require('express');
const router = express.Router();
const { getBanarasCoordinates } = require('../Controller/LocationController.js');

// Endpoint to fetch coordinates of Banaras Railway Station
router.get('/banaras-coordinates', getBanarasCoordinates);

module.exports = router;
