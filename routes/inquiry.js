const express = require('express');

const router = express.Router();
const inquiryController = require('./../controllers/inquiryController');

router.post('/add-new', inquiryController.Inquiry);

router.get('/admin/get-all-inquiries', inquiryController.getAllInquiry);

router.get('/admin/get-inquiry-by-id/:id', inquiryController.getInquirybyId);

router.get('/admin/search-contactus-inquiry', inquiryController.searchInquiry);

router.post('/admin/email', inquiryController.InquiryEmail);

module.exports = router;
