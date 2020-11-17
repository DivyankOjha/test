const catchAsync = require('./../utils/catchAsync');
const House = require('../models/houseModel');
const GeoSchema = require('../models/geomodel/geoModel');
const geo = require('../models/geomodel/geoModel');
const geoS = require('../models/geomodel/geoModel');

exports.geoTestHouse = catchAsync(async (req, res, next) => {
  let getHouseData = await geoS.find({});
  var METERS_PER_MILE = 10;

  res.status(200).json({
    status: 'success',
    results: getHouseData.length,
  });
});
