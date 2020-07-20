const catchAsync = require('./../utils/catchAsync');
const postProperty = require('../models/postPropertyModel');

exports.addProperty = catchAsync(async (req, res, next) => {
  const newproperty = await postProperty.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      Property: newproperty,
    },
  });
});

exports.getAllproperty = catchAsync(async (req, res) => {
  const property = await postProperty.find();
  res.status(200).json({
    status: 'success',
    results: property.length,
    data: {
      property,
    },
  });
});
