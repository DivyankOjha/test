/*********Post Property Inquiry******** */
const express = require('express');

const router = express.Router();

const propertyController = require('./../controllers/postpropertyController');
const propertyDataController = require('./../controllers/propertyController/propertydataController');
//const propertyImage = require('./../controllers/propertyController/propertyImageController');

router.get(
  //get all property names
  '/admin/get-dropdown-all-property-name',
  propertyDataController.getdata
);

router.post('/post-property', propertyController.addProperty);
//router.post('/admin/addpropertyimage', propertyImage.upload);
router.get('/admin/get-all-property', propertyController.getAllproperty);
router.get('/admin/get-by-id/:id', propertyController.getPostPropertybyId);

router.patch(
  '/admin/set-property-status/:id',
  propertyDataController.ActiveInactive
);
router.get(
  '/admin/search-property-inquiry',
  propertyController.searchPostPropertyInquiry
);

router.post(
  '/admin/post-property-reply-email',
  propertyController.postPropertyEmail
);
router.post(
  '/admin/post-property-filter-by-date',
  propertyController.filterbydate
);
// router.get(
//   '/admin/search-property-by-name',
//   propertyDataController.propertySearchByName
// );

router.delete(
  '/admin/delete-one-property/:id',
  propertyDataController.deleteOneProperty
);

router.delete(
  '/admin/delete-multiple-property',
  propertyDataController.deleteProperty
);

module.exports = router;
