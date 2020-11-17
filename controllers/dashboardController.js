const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const House = require('./../models/houseModel');
const Land = require('./../models/landModel');
const Hotel = require('./../models/hotelModel');
const WareHouse = require('./../models/warehouseModel');
const Inquiry = require('./../models/inquiryModel');

const PostProperty = require('../models/postPropertyModel');
const Subscription = require('./../models/subscriptionModel');

exports.getAllproperty = catchAsync(async (req, res) => {
  const users = await User.aggregate([{ $match: { role: 'user' } }]);
  const totalMembers = users.length;

  const house = await House.find();
  const totalHouse = house.length;

  const land = await Land.find();
  const totalland = land.length;

  const hotel = await Hotel.find();
  const totalhotel = hotel.length;
  const warehouse = await WareHouse.find();
  const totalwarehouse = warehouse.length;
  totalproperty = totalHouse + totalland + totalwarehouse + totalhotel;

  const inquiry = await Inquiry.find();
  const totalcontactusinquiry = inquiry.length;

  const postproperty = await PostProperty.find();
  const totalPropertyInquiries = postproperty.length;

  const subscription = await Subscription.find();
  const totalSubsription = subscription.length;

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      totalMembers,
      totalSubsription,
      totalproperty,
      totalcontactusinquiry,
      totalPropertyInquiries,
    },
  });
});

exports.getpropertylist = catchAsync(async (req, res) => {
  const house = await House.find().sort({ _id: -1 });
  const land = await Land.find().sort({ _id: -1 });
  const hotel = await Hotel.find().sort({ _id: -1 });
  const warehouse = await WareHouse.find().sort({ _id: -1 });

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
  const newfield = req.body.pool;
  const newfield1 = req.body;

  const attributes = await Attributes.updateOne(
    { _id: '5f1bba106200eb41bc2635e7' },
    [
      {
        $addFields: newfield1,
      },
    ],
    {
      $out: 'newattributes',
    }
  );

  res.status(200).json({
    status: 'success',
    attributes,
  });
});

exports.deletefield = catchAsync(async (req, res) => {
  const newfield = req.body;
  const newfield1 = req.body;
  console.log(newfield);
  console.log(newfield1);
  const attributes = await Attributes.updateOne(
    { _id: '5f1ac1be132d6e04b40bbbd9' },

    {
      $unset: 'newfield',
    }
  );

  res.status(200).json({
    status: 'success',
    attributes,
  });
});
