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
  // var location = 'address 2';
  // var search = await Hotel.find({
  //   'attributes.class': { $exists: true },
  console.log('Query ' + req.query.search);
  if (req.query.class === 'worldclass' && req.query.locality === 'city') {
    console.log('Hello');
  }
  // });
  // if (clss === true) {
  // }
  // var c = 'worldclass';
  // var cl = `attributes.class.${c}`;
  // console.log('cl' + cl);
  let conferenceroom = req.body.conferenceroom; //conferenceroom number
  let Cnomin = 3;
  let kmfromtarmac = req.body.kmfromtarmac;
  let area = req.body.area;
  let cls = req.body.class;
  let locality = req.body.locality;
  let location = req.body.location;
  let bedbreakfastcost = req.body.bedbreakfastcost;

  let aircon = req.body.aircon;
  let att1 = req.query.attributes1;
  console.log('att1' + att1);
  console.log(cls, locality, location, bedbreakfastcost, kmfromtarmac, aircon);

  let myschema = {
    required: [
      `attributes.${cls}`,
      `attributes.${locality}`,
      'attributes.aircon',
      // `attributes.${aircon}`,
      // 'attributes.carpark',
      // 'attributes.spa',
      // 'attributes.freshoutdoors',
      // // 'attributes.indoorpool',
      // 'attributes.disabilityaccess',
      // 'attributes.barlounge',
      // 'attributes.hairsalon',
      // // 'attributes.petsallowed',
      // // `sellerDetails.${location}`,
    ],
  };
  console.log(myschema);
  var search = await Hotel.aggregate([
    // {
    //   $unwind: { path: '$attributes', preserveNullAndEmptyArrays: true },
    // },
    {
      $match: { $jsonSchema: myschema },
    },

    {
      $match: {
        'attributes.area': { $lte: area },
        'attributes.kmfromtarmac': { $lte: kmfromtarmac, $gte: 0 },
        'attributes.conferenceroom': { $gte: conferenceroom },
        'attributes.bedbreakfastcost': { $lte: bedbreakfastcost, $gte: 0 },
        'sellerDetails.location': `${location}`,
      },
    },
    {
      $match: {
        'attributes.aircon': `${aircon}`,
        'attributes.spa': true,
        'attributes.freshoutdoors': true,
        'attributes.indoorpool': true,
        'attributes.disabilityaccess': true,
        'attributes.barlounge': true,
        'attributes.hairsalon': true,
        // 'attributes.petsallowed': true,\
      },
    },

    //$gte: [<expression1>, <expression2> ] }
    //$match: { $expr: { < aggregation expression> } } }
    // {
    //   $match: {
    //     attributes: { $exists: true },
    //     //'attributes.midrange': { $exists: true },
    //   },
    // },

    //  $group: { _id: null, count: { $sum: 1 } },
  ]).project({ attributes: 1, _id: 0 });
  res.status(200).json({
    status: 'success',
    results: search.length,
    search,
  });
});

// var search = await Hotel.find(
//   {},
//   {
//     'attributes.worldclass': true,
//   }

//   // $match: { 'attributes.locality': { $exists: true } },
//   //$group: { 'propertyDetails.propertyName': 'ABC' },
// )
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
