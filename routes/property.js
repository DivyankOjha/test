const express = require('express');

const router = express.Router();

const propertyController = require('./../controllers/postpropertyController');
const propertyDataController = require('./../controllers/propertyController/propertydataController');
const propertyImage = require('./../controllers/propertyController/propertyImageController');

router.get('/admin/propertydata', propertyDataController.getdata);
router.post('/addproperty', propertyController.addProperty);
router.post('/admin/addpropertyimage', propertyImage.upload);
router.get('/admin/getproperty', propertyController.getAllproperty);

module.exports = router;
