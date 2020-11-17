const catchAsync = require('./../utils/catchAsync');
const AllAttributes = require('../models/allAttributes.model');

exports.postAttributes = catchAsync(async (req, res, next) => {
  const attributes = await AllAttributes.create({});
  res.status(200).json({
    status: 'success',
    attributes,
  });
});

exports.getAllAttributes = catchAsync(async (req, res, next) => {
  const attributes = await AllAttributes.find({});
  res.status(200).json({
    status: 'success',
    attributes,
  });
});

exports.setActiveInactiveAttributes = catchAsync(async (req, res, next) => {
  _id = '5f49e39eb4aee24128a09a1c';
  const attributes = await AllAttributes.findByIdAndUpdate(_id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    attributes,
  });
});
