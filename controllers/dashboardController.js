const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const House = require('./../models/userModel');
const Land = require('./../models/userModel');
const Hotel = require('./../models/userModel');
const WareHouse = require('./../models/userModel');
const Inquiry = require('./../models/inquiryModel');

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
