const express = require('express');

const router = express.Router();
const subController = require('./../controllers/subscriptionController');
const authController = require('./../controllers/authController');

router.post(
  '/add-sub', //authController.protect,
  subController.Subscription
); //authController.protect,
router.get(
  '/get-all-subscriptions', // authController.protect,
  // authController.protect,
  subController.getAllSubscription
);
router.get(
  '/get-user-subscription-details/:id',
  subController.getUserSubscription
);
router.post(
  '/subscription-filter-by-type',
  subController.SubscriptionfilterbyRentBuy
);

router.post(
  '/subscription-filter-by-date',
  subController.Subscriptionfilterbydate
);
router.patch('/subscription-update-points/:id', subController.updateUsedPoints);
router.get('/search-email-id', subController.searchSubscription);

module.exports = router;
