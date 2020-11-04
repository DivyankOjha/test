const express = require('express');
const HouseQuery = require('../../models/queryModels/houseModel');
const catchAsync = require('../../utils/catchAsync');
const queryHouseController = require('../../controllers/QueryController/queryHouseController');
const router = express.Router();

router.get('/get-query-by-id/:id', queryHouseController.getQueryById);
router.post(
  '/get-properties-in-neighbourhood',
  queryHouseController.getGeoLocation
);

module.exports = router;
