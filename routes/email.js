const express = require('express');
const router = express.Router();
const protect = require('../controllers/authController');
const emailController = require('../controllers/admin/emailController');

router.post('/email-settings', protect.protect, emailController.email);
router.get(
  '/email-settings',
  protect.protect,
  emailController.getStoredEmailSettings
);

module.exports = router;
