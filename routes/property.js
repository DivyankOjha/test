const express = require('express');

const router = express.Router();

const propertyController = require('./../controllers/postpropertyController');

router.post('/addproperty', propertyController.addProperty);
router.get('/admin/getproperty', propertyController.getAllproperty);

module.exports = router;
