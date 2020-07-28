const catchAsync = require('../../utils/catchAsync');

const Land = require('../../models/landModel');

exports.land = catchAsync(async (req, res, next) => {
  const newLand = await Land.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      land: newLand,
    },
  });
});

exports.getAllland = catchAsync(async (req, res) => {
  const land = await Land.find();
  res.status(200).json({
    status: 'success',
    results: land.length,
    data: {
      land,
    },
  });
});
