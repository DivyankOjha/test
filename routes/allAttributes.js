const express = require('express');

const router = express.Router();
const attributesController = require('./../controllers/allAttributesController');
const authController = require('../controllers/authController');
router.post(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  attributesController.postAttributes
);
router.get(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  attributesController.getAllAttributes
);
router.patch(
  '/update-attributes-status',
  authController.protect,
  authController.restrictTo('admin'),
  attributesController.setActiveInactiveAttributes
);

module.exports = router;
