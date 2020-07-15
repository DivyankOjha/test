const express = require('express');

const router = express.Router();

const propertyController = require('./../controllers/propertyController');

router.post('/addproperty', propertyController.addProperty);
router.get('/getproperty', propertyController.getAllproperty);

module.exports = router;
