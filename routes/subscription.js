const express = require('express');

const router = express.Router();
const subController = require('./../controllers/subscriptionController');
const authController = require('./../controllers/authController');

router.post(
  '/add-sub', //authController.protect,
  subController.Subscription
); //authController.protect,
router.get(
  '/get-sub', // authController.protect,
  // authController.protect,
  subController.getAllSubscription
);

module.exports = router;
