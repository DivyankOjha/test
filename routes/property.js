const express = require('express');

const router = express.Router();

const propertyController = require('./../controllers/postpropertyController');
const propertyDataController = require('./../controllers/propertyController/propertydataController');
const propertyImage = require('./../controllers/propertyController/propertyImageController');

router.get(
  '/admin/get-dropdown-all-property-name',
  propertyDataController.getdata
);
router.post('/post-property', propertyController.addProperty);
//router.post('/admin/addpropertyimage', propertyImage.upload);
router.get('/admin/get-all-property', propertyController.getAllproperty);

module.exports = router;
