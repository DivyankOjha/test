const catchAsync = require('./../utils/catchAsync');

const House = require('./../models/houseModel');
const Land = require('./../models/landModel');
const Hotel = require('./../models/hotelModel');
const WareHouse = require('./../models/warehouseModel');

exports.searchHouse = catchAsync(async (req, res) => {
  // const { classs, city } = req.params;
  //const clss = req.params.classs;
  //console.log(classs, city, clss);

  // var search = [];

  //query = { name: { $regex: /^divyank/i } };
  //query = { class: { $regex: /^worldclass/i } };
  //   var search = await Hotel.find({
  //     'attributes.class.worldclass': 'false',
  //   });.
  var location = 'address 2';
  // var search = await Hotel.find({
  //   'attributes.class': { $exists: true },
  console.log(req.query);
  if (req.query.class === 'worldclass' && req.query.locality === 'city') {
    console.log('Hello');
  }
  // });
  // if (clss === true) {
  // }
  // var c = 'worldclass';
  // var cl = `attributes.class.${c}`;
  // console.log('cl' + cl);

  var search = await Hotel.aggregate([
    {
      $match: {
        'attributes.class.worldclass': { $exists: true },
      },
      $match: { 'attributes.locality': { $exists: true } },
      //$group: { 'propertyDetails.propertyName': 'ABC' },
    },
  ]);
  // var search = await Hotel.find({
  //   $or: [
  //     //$or
  //     {
  //       'attributes.class.worldclass': { $exists: true },
  //     },
  //     // {
  //     //   'attributes.class.midrange': true,
  //     // },
  //     // {
  //     //   'attributes.class.budget': true,
  //     // },
  //     { 'attributes.locality.city': true },
  //     // {
  //     //   'attributes.locality.airport': true,
  //     // },
  //     // {
  //     //   'attributes.locality.outskirts': true,
  //     // },
  //     // {
  //     //   'attributes.locality.gamehotel': true,
  //     // },
  //   ],
  // });
  // { 'sellerDetails.location': `${location}` },
  // console.log(search);

  //   const users = await User.find(req.user._id);
  //   console.log(users);

  res.status(200).json({
    status: 'success',
    results: search.length,
    search,
  });
});
