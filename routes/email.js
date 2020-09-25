const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const emailController = require('../controllers/admin/emailController');

router.post(
  '/email-settings',
  authController.protect,
  authController.restrictTo('admin'),
  emailController.email
);
router.get(
  '/email-settings',
  authController.protect,
  authController.restrictTo('admin'),
  emailController.getStoredEmailSettings
);

module.exports = router;
