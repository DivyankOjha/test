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
  const newfield = req.body.pool;
  const newfield1 = req.body;
  console.log(newfield);
  console.log(newfield1);
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

  // const attributes = new Attributes({
  //   _id: '5f1ac1be132d6e04b40bbbd9',
  //   $set: { test: false },

  //   multi: true,
  //   upsert: true,
  // });
  // await attributes.save();
  // const attributes = await Attributes.insertMany(
  //   {
  //     $setOnInsert: { defaultQty: 100 },
  //   },
  //   { upsert: true }
  // );
  //console.log(attributes);
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

  // const attributes = new Attributes({
  //   _id: '5f1ac1be132d6e04b40bbbd9',
  //   $set: { test: false },

  //   multi: true,
  //   upsert: true,
  // });
  // await attributes.save();
  // const attributes = await Attributes.insertMany(
  //   {
  //     $setOnInsert: { defaultQty: 100 },
  //   },
  //   { upsert: true }
  // );
  //console.log(attributes);
  res.status(200).json({
    status: 'success',
    attributes,
  });
});
