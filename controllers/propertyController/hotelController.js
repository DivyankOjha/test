const catchAsync = require('../../utils/catchAsync');

const Hotel = require('../../models/hotelModel');

exports.addhotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      hotel: hotel,
    },
  });
});

exports.getAllHotel = catchAsync(async (req, res) => {
  const hotel = await Hotel.find();
  res.status(200).json({
    status: 'success',
    results: hotel.length,
    data: {
      hotel,
    },
  });
});
