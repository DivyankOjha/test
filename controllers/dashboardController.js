const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const House = require('./../models/houseModel');
const Land = require('./../models/landModel');
const Hotel = require('./../models/hotelModel');
const WareHouse = require('./../models/warehouseModel');
const Inquiry = require('./../models/inquiryModel');
const Attributes = require('./../models/attributesSchema');

exports.getAllproperty = catchAsync(async (req, res) => {
  const users = await User.find();
  const totalMembers = users.length;
  // console.log('total members :' + totalMembers);
  const house = await House.find();
  const totalHouse = house.length;
  //console.log(house.length);
  const land = await Land.find();
  const totalland = land.length;
  //console.log(land.length);
  totalproperty = totalHouse + totalland;
  const inquiry = await Inquiry.find();
  const totalinquiry = inquiry.length;
  //console.log(inquiry.length);
  // const date = Date();
  // console.log(date);
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      totalMembers,
      totalHouse,
      totalland,
      totalproperty,
      totalinquiry,
    },
  });
});

exports.getpropertylist = catchAsync(async (req, res) => {
  const house = await House.find();

  const land = await Land.find();
  const hotel = await Hotel.find();
  const warehouse = await WareHouse.find();

  res.status(200).json({
    status: 'success',

    house,
    land,
    hotel,
    warehouse,
  });
});
exports.attributes = catchAsync(async (req, res) => {
  const attributes = await Attributes.find();
  res.status(200).json({
    status: 'success',
    data: { attributes },
  });
});
exports.addattributes = catchAsync(async (req, res) => {
  const attributes = await Attributes.create(req.body);
  res.status(200).json({
    status: 'success',
    data: { attributes },
  });
});

exports.addfield = catchAsync(async (req, res) => {
  // const attributes = await Attributes.aggregate([
  //   {
  //     $addFields: {
  //       Total_Loc: 'IT',
  //     },
  //   },
  // ]);
  const attributes = new Attributes({
    food: true,
    $set: { test: false },
    multi: true,
    upsert: true,
  });
  await attributes.save();
  // const attributes = await Attributes.updateOne(
  //   {
  //     food: true,
  //   },

  //   { $set: { test: false } },

  //   {
  //     multi: true,
  //   }
  // );
  res.status(200).json({
    status: 'success',
    data: { attributes },
  });
});
