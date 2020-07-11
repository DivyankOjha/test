const express = require('express');

const router = express.Router();
const houseController = require('./../controllers/houseController');

router.post('/house', houseController.house);
router.get('/housedata', houseController.getAllHouse);

module.exports = router;
