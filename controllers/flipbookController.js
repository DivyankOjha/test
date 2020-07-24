const catchAsync = require('./../utils/catchAsync');
const Flipbook = require('../models/flipbookModel');

exports.addFlipbook = catchAsync(async (req, res, next) => {
  const newFlipbook = await Flipbook.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      flipbook: newFlipbook,
    },
  });
});

exports.getFlipbook = catchAsync(async (req, res) => {
  const flipbook = await Flipbook.find();
  res.status(200).json({
    status: 'success',
    results: flipbook.length,
    data: {
      flipbook,
    },
  });
});
