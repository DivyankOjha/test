/*********Post Property Inquiry******** */
const express = require('express');

const router = express.Router();

const propertyController = require('./../controllers/postpropertyController');
const propertyDataController = require('./../controllers/propertyController/propertydataController');
//const propertyImage = require('./../controllers/propertyController/propertyImageController');
const authController = require('../controllers/authController');
router.get(
  //get all property names
  '/admin/get-dropdown-all-property-name',
  authController.protect,

  propertyDataController.getdata
);
router.get(
  //get all property names
  '/admin/get-all-similar-property-name',
  // authController.protect,
  // authController.restrictTo('admin'),
  propertyDataController.getdataEx
);

router.post(
  '/post-property',
  // authController.protect,

  propertyController.addProperty
);
//router.post('/admin/addpropertyimage', propertyImage.upload);
router.get(
  '/admin/get-all-property',
  authController.protect,

  propertyController.getAllproperty
);
router.get(
  '/admin/get-by-id/:id',
  authController.protect,

  propertyController.getPostPropertybyId
);

router.patch(
  '/admin/set-property-status/:id',
  authController.protect,

  propertyDataController.ActiveInactive
);
router.get(
  '/admin/get-property-neighbourhood/:id',
  propertyDataController.getPropertyInNeighbourhood
);
router.post(
  '/admin/search-property-inquiry',
  authController.protect,

  propertyController.searchPostPropertyInquiry
);

router.post(
  '/admin/post-property-reply-email',
  //authController.protect,

  propertyController.postPropertyEmail
);
router.post(
  '/admin/post-property-filter-by-date',
  authController.protect,

  propertyController.filterbydate
);
// router.get(
//   '/admin/search-property-by-name',
//   propertyDataController.propertySearchByName
// );

router.delete(
  '/admin/delete-one-property/:id',
  authController.protect,

  propertyDataController.deleteOneProperty
);

router.delete(
  '/admin/delete-multiple-property',
  authController.protect,

  propertyDataController.deleteProperty
);

module.exports = router;
