const catchAsync = require('../utils/catchAsync');

const House = require('../models/houseModel');
const Land = require('../models/landModel');
const Warehouse = require('../models/warehouseModel');
const Hotel = require('../models/hotelModel');

exports.findMaxCostHouse = catchAsync(async (req, res, next) => {
  let getAllHouse = await House.find({});

  let allCosts = [];

  console.log(Math.max(...getAllHouse));
  for (var i in getAllHouse) {
    allCosts.push(getAllHouse[i].attributes.cost);
  }
  console.log(allCosts);
  let maxCost = Math.max(...allCosts);
  //console.log(Math.max(...allCosts));

  res.status(200).json({
    status: 'success',
    results: getAllHouse.length,
    maxCost,
  });
});

exports.findMaxCostLand = catchAsync(async (req, res, next) => {
  let getAllLand = await Land.find({});
  //console.log(getAllLand);

  let allCosts = [];
  let allSizeInAcres = [];
  //console.log(Math.max(...getAllLand));
  for (var i in getAllLand) {
    allCosts.push(getAllLand[i].attributes.cost);
    allSizeInAcres.push(getAllLand[i].attributes.sizeinacres);
  }

  let maxCost = Math.max(...allCosts);
  let maxSizeInAcres = Math.max(...allSizeInAcres);
  // console.log(maxCost);
  //console.log(Math.max(...allCosts));

  res.status(200).json({
    status: 'success',
    results: getAllLand.length,
    maxSizeInAcres,
    maxCost,
  });
});

exports.findMaxBedBreakfastCost = catchAsync(async (req, res, next) => {
  let getAllHotels = await Hotel.find({});
  console.log(getAllHotels);

  let allCosts = [];
  //console.log(Math.max(...getAllHotels));
  for (var i in getAllHotels) {
    allCosts.push(getAllHotels[i].attributes.bedbreakfastcost);
  }
  //console.log(allCosts);
  let maxCost = Math.max(...allCosts);
  console.log(maxCost);
  // console.log(Math.max(...allCosts));

  res.status(200).json({
    status: 'success',
    results: getAllHotels.length,
    maxCost,
  });
});

exports.findMaxCostWarehouse = catchAsync(async (req, res, next) => {
  let getAllWarehouse = await Warehouse.find({});
  //console.log(getAllWarehouse);

  let allCosts = [];
  //console.log(Math.max(...getAllWarehouse));
  for (var i in getAllWarehouse) {
    allCosts.push(getAllWarehouse[i].attributes.cost);
  }
  //console.log(allCosts);
  let maxCost = Math.max(...allCosts);
  console.log(maxCost);
  // console.log(Math.max(...allCosts));

  res.status(200).json({
    status: 'success',
    results: getAllWarehouse.length,
    maxCost,
  });
});
