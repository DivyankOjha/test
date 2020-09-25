const express = require('express');

const router = express.Router();
const warehouseController = require('../controllers/propertyController/warehouseController');
const authController = require('../controllers/authController');
router.post(
  '/post-warehouse',
  authController.protect,
  authController.restrictTo('admin'),
  warehouseController.addWarehouse
);
router.put(
  '/edit-warehouse/:id',
  authController.protect,
  authController.restrictTo('admin'),
  warehouseController.updateWarehouse
);
router.get(
  '/get-all-warehouse',
  authController.protect,
  authController.restrictTo('admin'),
  warehouseController.getAllWarehouse
);

router.post(
  '/warehouse-filter-by-date',
  authController.protect,
  authController.restrictTo('admin'),
  warehouseController.filterbydate
);
router.post(
  '/search-property-by-name',
  authController.protect,
  authController.restrictTo('admin'),
  warehouseController.propertySearchByName
);
router.post('/search-warehouse-location', warehouseController.ajaxSearchArea); //ajax search
module.exports = router;
