const express = require('express');
const HouseQuery = require('../../models/queryModels/houseModel');
const catchAsync = require('../../utils/catchAsync');
const queryHouseController = require('../../controllers/QueryController/queryHouseController');
const router = express.Router();

router.get('/get-query-by-id/:id', queryHouseController.getQueryById);
//router.get('/get-land-query-by-id/:id', queryHouseController.getQueryById);

module.exports = router;
