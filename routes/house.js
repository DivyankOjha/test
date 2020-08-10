const express = require('express');

const router = express.Router();
const houseController = require('./../controllers/propertyController/houseController');

router.post('/post-house', houseController.house);
router.get('/get-all-house', houseController.getAllHouse);

module.exports = router;
