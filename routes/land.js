const express = require('express');

const router = express.Router();
const landController = require('../controllers/propertyController/landController');

router.post('/post-land', landController.land);
router.put(
  '/edit-land/:id',
  //authController.protect,
  //authController.restrictTo('admin'),
  landController.updateLand
);
router.get('/get-all-land', landController.getAllland);

router.post('/land-filter-by-date', landController.filterbydate);
router.post('/search-property-by-name', landController.propertySearchByName);

router.post('/search-land-location', landController.ajaxSearch);
module.exports = router;
