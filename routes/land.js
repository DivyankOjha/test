const express = require('express');

const router = express.Router();
const landController = require('../controllers/propertyController/landController');

router.post('/post-land', landController.land);
router.get('/get-all-land', landController.getAllland);
module.exports = router;
