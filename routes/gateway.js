const express = require('express');

const router = express.Router();
const gatway = require('../controllers/gateway');
const authController = require('../controllers/authController');

router.get('/gateway-test', gatway.gatway);
router.post(
  '/get-url-of-payment-gateway',
  authController.protect,
  gatway.paymentgateway
);
router.post(
  '/get-payment-status',
  authController.protect,
  gatway.paymentStatus
);

module.exports = router;
