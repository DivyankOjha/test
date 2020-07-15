const express = require('express');

const router = express.Router();
const subController = require('./../controllers/subscriptionController');
const authController = require('./../controllers/authController');

router.post('/addsub', authController.protect, subController.Subscription);
router.get('/getsub', authController.protect, subController.getAllSubscription);

module.exports = router;
