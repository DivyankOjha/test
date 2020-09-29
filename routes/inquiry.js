const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
const inquiryController = require('./../controllers/inquiryController');

router.post('/add-new', inquiryController.Inquiry);

router.get(
  '/admin/get-all-inquiries',
  authController.protect,
  // authController.restrictTo('admin'),
  inquiryController.getAllInquiry
);

router.get(
  '/admin/get-inquiry-by-id/:id',
  authController.protect,
  // authController.restrictTo('admin'),
  inquiryController.getInquirybyId
);

router.post(
  '/admin/search-contactus-inquiry',
  authController.protect,
  // authController.restrictTo('admin'),
  inquiryController.searchInquiry
);

router.post(
  '/admin/email',
  authController.protect,
  // authController.restrictTo('admin'),
  inquiryController.InquiryEmail
);
router.post(
  '/admin/contactus-inquiry-filter-by-date',
  authController.protect,
  // authController.restrictTo('admin'),
  inquiryController.filterbydate
);

//CUSTOMER INQUIRY
router.post('/post-customer-inquiry', inquiryController.customerInquiry);
router.get(
  '/admin/get-all-customer-inquiry',
  authController.protect,
  // authController.restrictTo('admin'),
  inquiryController.getAllCustomerInquiry
);

router.post(
  '/admin/search-customer-inquiry',
  authController.protect,
  // authController.restrictTo('admin'),
  inquiryController.searchInquiryCustomer
);
router.post(
  '/admin/customer-inquiry-filter-by-date',
  authController.protect,
  // authController.restrictTo('admin'),
  inquiryController.Customerfilterbydate
);
router.post(
  '/admin/customer-inquiry-email-reply',
  authController.protect,
  // authController.restrictTo('admin'),
  inquiryController.CustomerReplyEmail
);

module.exports = router;
