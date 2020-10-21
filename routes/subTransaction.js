const express = require('express');

const router = express.Router();
const subTransactionController = require('./../controllers/subTransactionController');
const authController = require('./../controllers/authController');

router.get(
  '/subscriptions/transactions/get-all-transaction-records',
  subTransactionController.getAllsubTransactionRecord
);
router.post(
  '/subscriptions/transactions/subscription-filter-by-type',
  //authController.protect,
  subTransactionController.SubscriptionfilterbyRentBuy
);

router.post(
  '/subscriptions/transactions/subscription-filter-by-date',
  //authController.protect,
  subTransactionController.Subscriptionfilterbydate
);

module.exports = router;
