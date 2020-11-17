const catchAsync = require('../utils/catchAsync');

const House = require('../models/houseModel');
const Land = require('../models/landModel');
const Warehouse = require('../models/warehouseModel');
const Hotel = require('../models/hotelModel');

exports.findMaxCostHouse = catchAsync(async (req, res, next) => {
  let getAllHouse = await House.find({});

  let allCosts = [];
  let allbathroom = [];
  let allsteambath = [];
  let lifts = [];
  let bathtabs = [];
  let parkingslots = [];
  let livingareasize = [];
  let kitchenareasize = [];
  let gardenareasize = [];

  for (var i in getAllHouse) {
    allCosts.push(getAllHouse[i].attributes.cost);
    allbathroom.push(getAllHouse[i].attributes.bathrooms);
    allsteambath.push(getAllHouse[i].attributes.steambath);
    lifts.push(getAllHouse[i].attributes.lift);
    bathtabs.push(getAllHouse[i].attributes.bathtab);
    parkingslots.push(getAllHouse[i].attributes.parking);
    livingareasize.push(getAllHouse[i].attributes.livingsize);
    kitchenareasize.push(getAllHouse[i].attributes.kitchensize);
    gardenareasize.push(getAllHouse[i].attributes.gardensize);
  }

  let maxCost = Math.max(...allCosts);
  let maxbathroom = Math.max(...allbathroom);
  let maxsteambath = Math.max(...allsteambath);
  let maxlift = Math.max(...lifts);
  let maxbathtabs = Math.max(...bathtabs);
  let maxparking = Math.max(...parkingslots);
  let maxlivingsize = Math.max(...livingareasize);
  let maxkitchensize = Math.max(...kitchenareasize);
  let maxgardensize = Math.max(...gardenareasize);

  res.status(200).json({
    status: 'success',
    results: getAllHouse.length,
    maxCost,
    maxbathroom,
    maxbathroom,
    maxsteambath,
    maxlift,
    maxbathtabs,
    maxparking,
    maxlivingsize,
    maxkitchensize,
    maxgardensize,
  });
});

exports.findMaxCostLand = catchAsync(async (req, res, next) => {
  let getAllLand = await Land.find({});

  let allCosts = [];
  let allSizeInAcres = [];

  for (var i in getAllLand) {
    allCosts.push(getAllLand[i].attributes.cost);
    allSizeInAcres.push(getAllLand[i].attributes.sizeinacres);
  }

  let maxCost = Math.max(...allCosts);
  let maxSizeInAcres = Math.max(...allSizeInAcres);

  res.status(200).json({
    status: 'success',
    results: getAllLand.length,
    maxSizeInAcres,
    maxCost,
  });
});

exports.findMaxBedBreakfastCost = catchAsync(async (req, res, next) => {
  let getAllHotels = await Hotel.find({});
  

  let allCosts = [];
  let kmfromtarmac = [];
  let conference = [];
 
  for (var i in getAllHotels) {
    allCosts.push(getAllHotels[i].attributes.bedbreakfastcost);
    kmfromtarmac.push(getAllHotels[i].attributes.kmfromtarmac);
    conference.push(getAllHotels[i].attributes.conferenceroom);
  }
  
  let maxCost = Math.max(...allCosts);
  let maxkmfromtarmac = Math.max(...kmfromtarmac);
  let maxconference = Math.max(...conference);
  
  res.status(200).json({
    status: 'success',
    results: getAllHotels.length,
    maxCost,
    maxkmfromtarmac,
    maxconference,
  });
});

exports.findMaxCostWarehouse = catchAsync(async (req, res, next) => {
  let getAllWarehouse = await Warehouse.find({});

  let allCosts = [];
  let sizeinft = [];
  let kmfromtarmac = [];

  for (var i in getAllWarehouse) {
    allCosts.push(getAllWarehouse[i].attributes.cost);
    sizeinft.push(getAllWarehouse[i].attributes.sizeinfeet);
    kmfromtarmac.push(getAllWarehouse[i].attributes.kmfromtarmac);
  }

  let maxCost = Math.max(...allCosts);
  let maxsizeinfeet = Math.max(...sizeinft);
  let maxkmfromtarmac = Math.max(...kmfromtarmac);

  res.status(200).json({
    status: 'success',
    results: getAllWarehouse.length,
    maxCost,
    maxsizeinfeet,
    maxkmfromtarmac,
  });
});
