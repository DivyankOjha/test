const express = require('express');

const router = express.Router();
const subController = require('./../controllers/subscriptionController');
const authController = require('./../controllers/authController');

router.post('/add-sub', subController.Subscription); //authController.protect,
router.patch(
  '/renew-subscription',
  //authController.protect,
  subController.renewSubscription
); //authController.protect,

router.patch(
  '/subscription-page-new-renew',
  //authController.protect,
  subController.NewRenewSubscriptionAPi
); //authController.protect,

router.get(
  '/get-all-subscriptions',
  // authController.protect,
  subController.getAllSubscription
);
router.get(
  '/get-user-subscription-details/:id',
  authController.protect,
  subController.getUserSubscription
);
router.post(
  '/subscription-filter-by-type',
  authController.protect,
  subController.SubscriptionfilterbyRentBuy
);

router.post(
  '/subscription-filter-by-date',
  authController.protect,
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
  subController.searchSubscription
);

router.delete(
  '/admin/delete-subscription-by-id',
  authController.protect,
  subController.deleteSubscription
);
module.exports = router;
