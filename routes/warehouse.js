const express = require('express');

const router = express.Router();
const warehouseController = require('../controllers/propertyController/warehouseController');

router.post('/', warehouseController.addWarehouse);
router.get('/', warehouseController.getAllWarehouse);

module.exports = router;
