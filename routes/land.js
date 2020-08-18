const express = require('express');

const router = express.Router();
const landController = require('../controllers/propertyController/landController');

router.post('/post-land', landController.land);
router.get('/get-all-land', landController.getAllland);
router.get('/search-property-by-name', landController.propertySearchByName);
module.exports = router;
