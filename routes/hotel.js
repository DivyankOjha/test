const express = require('express');

const router = express.Router();
const hotelController = require('../controllers/propertyController/hotelController');

router.post('/post-hotel', hotelController.addhotel);
router.put(
  '/edit-hotel/:id',
  //authController.protect,
  //authController.restrictTo('admin'),
  hotelController.updateHotel
);
router.get('/get-all-hotel', hotelController.getAllHotel);
router.get('/search-property-by-name', hotelController.propertySearchByName);
router.post('/search-hotel-location', hotelController.ajaxSearch);

module.exports = router;
