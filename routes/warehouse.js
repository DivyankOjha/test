const express = require('express');

const router = express.Router();
const warehouseController = require('../controllers/propertyController/warehouseController');

router.post('/post-warehouse', warehouseController.addWarehouse);
router.get('/get-warehouse', warehouseController.getAllWarehouse);

module.exports = router;
