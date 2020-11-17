const express = require('express');
//const Hotel = require('./../models/hotelModel');
const router = express.Router();
const searchHouse = require('../controllers/userSearchController');
const authController = require('../controllers/authController');

router.post('/house-search', searchHouse.searchHouse);

router.post('/land-search', searchHouse.searchLandPage3);

router.post('/hotel-search', searchHouse.searchHotelPage2);

router.post('/warehouse-search', searchHouse.searchWarehousePage3);

module.exports = router;
