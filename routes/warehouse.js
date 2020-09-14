const express = require('express');

const router = express.Router();
const warehouseController = require('../controllers/propertyController/warehouseController');

router.post('/post-warehouse', warehouseController.addWarehouse);
router.put(
  '/edit-warehouse/:id',
  //authController.protect,
  //authController.restrictTo('admin'),
  warehouseController.updateWarehouse
);
router.get('/get-all-warehouse', warehouseController.getAllWarehouse);

router.post('/warehouse-filter-by-date', warehouseController.filterbydate);
router.post(
  '/search-property-by-name',
  warehouseController.propertySearchByName
);
module.exports = router;
