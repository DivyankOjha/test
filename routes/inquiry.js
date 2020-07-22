const express = require('express');

const router = express.Router();
const inquiryController = require('./../controllers/inquiryController');

router.post('/', inquiryController.Inquiry);
router.get('/admin/getinquiries', inquiryController.getAllInquiry);

module.exports = router;
