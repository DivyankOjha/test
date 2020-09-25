const express = require('express');

const router = express.Router();
const hotelController = require('../controllers/propertyController/hotelController');
const authController = require('../controllers/authController');
router.post(
  '/post-hotel',
  authController.protect,
  authController.restrictTo('admin'),
  hotelController.addhotel
);
router.put(
  '/edit-hotel/:id',
  authController.protect,
  authController.restrictTo('admin'),
  hotelController.updateHotel
);
router.get(
  '/get-all-hotel',
  authController.protect,
  authController.restrictTo('admin'),
  hotelController.getAllHotel
);
router.post(
  '/hotel-filter-by-date',
  authController.protect,
  authController.restrictTo('admin'),
  hotelController.filterbydate
);
router.post('/search-property-by-name', hotelController.propertySearchByName);
router.post('/search-hotel-location', hotelController.ajaxSearch); //ajax location/ nearest place
router.post('/search-hotel-name', hotelController.ajaxSearchHotelName); //ajax hotel name
module.exports = router;
