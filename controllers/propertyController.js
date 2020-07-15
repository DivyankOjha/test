const catchAsync = require('./../utils/catchAsync');
const Property = require('../models/subscriptionModel');

exports.addProperty = catchAsync(async (req, res, next) => {
  const newproperty = await Property.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      Property: newproperty,
    },
  });
});

exports.getAllproperty = catchAsync(async (req, res) => {
  const property = await Property.find();
  res.status(200).json({
    status: 'success',
    results: property.length,
    data: {
      Property,
    },
  });
});
