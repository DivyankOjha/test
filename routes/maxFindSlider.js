const express = require('express');

const router = express.Router();

const maxSliderController = require('../controllers/maxFindSliderController');

router.get('/get-max-cost-house', maxSliderController.findMaxCostHouse);
router.get('/get-max-cost-land', maxSliderController.findMaxCostLand);
router.get('/get-max-cost-hotel', maxSliderController.findMaxBedBreakfastCost);
router.get('/get-max-cost-warehouse', maxSliderController.findMaxCostWarehouse);

module.exports = router;
