const express = require('express');

const router = express.Router();
const houseController = require('./../controllers/propertyController/houseController');
const authController = require('.././controllers/authController');

router.post(
  '/post-house',
  //authController.protect,
  //authController.restrictTo('admin'),
  houseController.house
);
router.put(
  '/edit-house/:id',
  //authController.protect,
  //authController.restrictTo('admin'),
  houseController.updateHouse
);
router.get(
  '/get-all-house',
  //authController.protect,
  //authController.restrictTo('admin'),
  houseController.getAllHouse
);

router.post('/house-filter-by-date', houseController.filterbydate);
router.post(
  '/search-property-by-name',
  //authController.protect,
  //authController.restrictTo('admin'),
  houseController.propertySearchByName
);

router.post('/search-house-location', houseController.ajaxSearch);

//router.delete('/delete-one-property/:id', houseController.deleteOneProperty);
module.exports = router;
