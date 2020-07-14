const express = require('express');

const router = express.Router();
const houseController = require('./../controllers/houseController');

router.post('/house', houseController.house);
router.get('/housedata', houseController.getAllHouse);

router.post('/land', houseController.land);
router.get('/land', houseController.getAllland);
module.exports = router;
