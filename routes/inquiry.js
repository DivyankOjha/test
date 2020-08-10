const express = require('express');

const router = express.Router();
const inquiryController = require('./../controllers/inquiryController');

router.post('/add-new', inquiryController.Inquiry);
router.get('/admin/get-all-inquiries', inquiryController.getAllInquiry);

module.exports = router;
