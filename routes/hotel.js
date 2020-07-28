const express = require('express');

const router = express.Router();
const hotelController = require('../controllers/propertyController/hotelController');

router.post('/', hotelController.addhotel);
router.get('/', hotelController.getAllHotel);
module.exports = router;
