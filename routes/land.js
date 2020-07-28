const express = require('express');

const router = express.Router();
const landController = require('../controllers/propertyController/landController');

router.post('/', landController.land);
router.get('/', landController.getAllland);
module.exports = router;
