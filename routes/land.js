const express = require('express');

const router = express.Router();
const landController = require('../controllers/propertyController/landController');
const authController = require('../controllers/authController');
router.post(
  '/post-land',
  authController.protect,
  authController.restrictTo('admin'),
  landController.land
);
router.put(
  '/edit-land/:id',
  authController.protect,
  authController.restrictTo('admin'),
  landController.updateLand
);
router.get(
  '/get-all-land',
  authController.protect,
  authController.restrictTo('admin'),
  landController.getAllland
);

router.post(
  '/land-filter-by-date',
  authController.protect,
  authController.restrictTo('admin'),
  landController.filterbydate
);
router.post('/search-property-by-name', landController.propertySearchByName);

router.post('/search-land-location', landController.ajaxSearch);
module.exports = router;
