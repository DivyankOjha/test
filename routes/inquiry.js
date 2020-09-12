const express = require('express');

const router = express.Router();
const inquiryController = require('./../controllers/inquiryController');

router.post('/add-new', inquiryController.Inquiry);

router.get('/admin/get-all-inquiries', inquiryController.getAllInquiry);

router.get('/admin/get-inquiry-by-id/:id', inquiryController.getInquirybyId);

router.get('/admin/search-contactus-inquiry', inquiryController.searchInquiry);

router.post('/admin/email', inquiryController.InquiryEmail);
router.post(
  '/admin/contactus-inquiry-filter-by-date',
  inquiryController.filterbydate
);

//CUSTOMER INQUIRY
router.post('/post-customer-inquiry', inquiryController.customerInquiry);
router.get(
  '/admin/get-all-customer-inquiry',
  inquiryController.getAllCustomerInquiry
);
router.post(
  '/admin/customer-inquiry-filter-by-date',
  inquiryController.Customerfilterbydate
);
router.post(
  '/admin/customer-inquiry-email-reply',
  inquiryController.CustomerReplyEmail
);

module.exports = router;
