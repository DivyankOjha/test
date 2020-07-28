const express = require('express');

const router = express.Router();
const houseController = require('./../controllers/propertyController/houseController');

router.post('/house', houseController.house);
router.get('/housedata', houseController.getAllHouse);

module.exports = router;
