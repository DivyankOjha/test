const express = require('express');

const router = express.Router();
const subController = require('./../controllers/subscriptionController');
const authController = require('./../controllers/authController');

router.post('/add-sub', authController.protect, subController.Subscription); //authController.protect,

router.get(
  '/get-all-subscriptions',
  authController.protect,
  authController.restrictTo('admin'),
  subController.getAllSubscription
);
router.get(
  '/get-user-subscription-details/:id',
  authController.protect,
  authController.restrictTo('admin'),
  subController.getUserSubscription
);
router.post(
  '/subscription-filter-by-type',
  authController.protect,
  authController.restrictTo('admin'),
  subController.SubscriptionfilterbyRentBuy
);

router.post(
  '/subscription-filter-by-date',
  authController.protect,
  authController.restrictTo('admin'),
  subController.Subscriptionfilterbydate
);
router.patch(
  '/subscription-update-points/:id',
  authController.protect,
  subController.updateUsedPoints
);
router.get(
  '/search-email-id',
  authController.protect,
  authController.restrictTo('admin'),
  subController.searchSubscription
);

router.delete(
  '/admin/delete-subscription-by-id',
  authController.protect,
  authController.restrictTo('admin'),
  subController.deleteSubscription
);
module.exports = router;
