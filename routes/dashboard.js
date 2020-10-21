const express = require('express');

const router = express.Router();
const dashboardController = require('./../controllers/dashboardController');
const authController = require('../controllers/authController');
router.get(
  '/summary',
  //authController.protect,
  //authController.restrictTo('admin'),
  dashboardController.getAllproperty
);
router.get(
  '/get-all-property-details',
  authController.protect,
  authController.restrictTo('admin'),
  dashboardController.getpropertylist
); //all 4 property details for admin

router.get(
  '/popertyattributes',
  authController.protect,
  authController.restrictTo('admin'),
  dashboardController.attributes
);
router.post(
  '/popertyattributes',
  authController.protect,
  authController.restrictTo('admin'),
  dashboardController.addattributes
);
router.post(
  '/addfield',
  authController.protect,
  authController.restrictTo('admin'),
  dashboardController.addfield
);
router.post(
  '/delfield',
  authController.protect,
  authController.restrictTo('admin'),
  dashboardController.deletefield
);

module.exports = router;
