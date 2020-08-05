const express = require('express');

const router = express.Router();
const hotelController = require('../controllers/propertyController/hotelController');

router.post('/post-hotel', hotelController.addhotel);
router.get('/get-hotel', hotelController.getAllHotel);
module.exports = router;
