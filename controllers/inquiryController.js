const catchAsync = require('./../utils/catchAsync');
const Inquiry = require('../models/inquiryModel');

exports.Inquiry = catchAsync(async (req, res, next) => {
  const newInquiry = await Inquiry.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      inquiry: newInquiry,
    },
  });
});

exports.getAllInquiry = catchAsync(async (req, res) => {
  const inquiry = await Inquiry.find();
  res.status(200).json({
    status: 'success',
    results: inquiry.length,
    data: {
      inquiry,
    },
  });
});
exports.deleteInquiry = catchAsync(async (req, res) => {
  const inquiry = await Inquiry.find();
  res.status(200).json({
    status: 'success',
    results: inquiry.length,
    data: {
      inquiry,
    },
  });
});
