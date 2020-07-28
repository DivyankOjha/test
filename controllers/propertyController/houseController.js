const catchAsync = require('../../utils/catchAsync');
const House = require('../../models/houseModel');

exports.house = catchAsync(async (req, res, next) => {
  const newHouse = await House.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      house: newHouse,
    },
  });
});

exports.getAllHouse = catchAsync(async (req, res) => {
  const house = await House.find();
  res.status(200).json({
    status: 'success',
    results: house.length,
    data: {
      house,
    },
  });
});
