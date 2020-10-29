const catchAsync = require('./../utils/catchAsync');
const House = require('../models/houseModel');
const GeoSchema = require('../models/geomodel/geoModel');
const geo = require('../models/geomodel/geoModel');
const geoS = require('../models/geomodel/geoModel');

exports.geoTestHouse = catchAsync(async (req, res, next) => {
  console.log('Hello');
  let getHouseData = await geoS.find({});
  var METERS_PER_MILE = 10;
  // db.restaurants.find({
  //   location: {
  //     $nearSphere: {
  //       $geometry: { type: 'Point', coordinates: [-73.93414657, 40.82302903] },
  //       $maxDistance: 5 * METERS_PER_MILE,
  //     },
  //   },
  // });

  res.status(200).json({
    status: 'success',
    results: getHouseData.length,
  });
});
