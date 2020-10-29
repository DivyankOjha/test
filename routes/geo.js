const express = require('express');

const router = express.Router();
const geoController = require('../controllers/geoController');

router.get('/get-geo', geoController.geoTestHouse);

module.exports = router;
