const catchAsync = require('./../utils/catchAsync');
const { isNullOrUndefined } = require('util');

const House = require('./../models/houseModel');
const Land = require('./../models/landModel');
const Hotel = require('./../models/hotelModel');
const WareHouse = require('./../models/warehouseModel');

const HouseQuery = require('../models/queryModels/houseModel');
const LandQuery = require('../models/queryModels/landModel');
const HotelQuery = require('../models/queryModels/hotelModel');
const WarehouseQuery = require('../models/queryModels/warehouseModel');
exports.searchHouse = catchAsync(async (req, res) => {
  let attributes = req.body.attributes;

  let mainCategory = attributes.mainCategory;
  let query = [
    {
      isFlipbook: true,
      'attributes.mainCategory': mainCategory,
    },
  ];

  if (req.body.cost) {
    let inta = parseInt(req.body.cost.min);
    let intb = parseInt(req.body.cost.max);
    let mincost = inta;
    let maxcost = intb;

    let abc = {
      'attributes.cost': {
        $lte: maxcost,
        $gte: mincost,
      },
    };
    query.push(abc);
  }

  if (req.body.area) {
    let area = {
      'sellerDetails.location': req.body.area,
    };
    query.push(area);
  }

  if (req.body.attributes.propertyStatus) {
    let propertyStatus = {
      'attributes.propertyStatus': req.body.attributes.propertyStatus,
    };
    query.push(propertyStatus);
  }

  if (req.body.attributes.subCategory) {
    let subCategory = {
      'attributes.subCategory': req.body.attributes.subCategory,
    };
    query.push(subCategory);
  }

  if (req.body.attributes.opticalfiber) {
    let opticalfiber = {
      'attributes.opticalfiber': true,
    };
    query.push(opticalfiber);
  }
  if (req.body.attributes.swimmingpool) {
    let swimmingpool = {
      'attributes.swimmingpool': true,
    };
    query.push(swimmingpool);
  }
  if (req.body.attributes.fireplace) {
    let fireplace = {
      'attributes.fireplace': true,
    };
    query.push(fireplace);
  }

  if (req.body.attributes.petsallowed) {
    let petsallowed = {
      'attributes.petsallowed': true,
    };
    query.push(petsallowed);
  }
  if (req.body.attributes.solarhotwater) {
    let solarhotwater = {
      'attributes.solarhotwater': true,
    };
    query.push(solarhotwater);
  }

  if (req.body.attributes.waterfront) {
    let waterfront = {
      'attributes.waterfront': true,
    };
    query.push(waterfront);
  }
  if (req.body.attributes.cctv) {
    let cctv = {
      'attributes.cctv': true,
    };
    query.push(cctv);
  }
  if (req.body.attributes.borehole) {
    let borehole = {
      'attributes.borehole': true,
    };
    query.push(borehole);
  }
  if (req.body.attributes.disabilityfeature) {
    let disabilityfeature = {
      'attributes.disabilityfeature': true,
    };
    query.push(disabilityfeature);
  }
  if (req.body.attributes.maturegarden) {
    let maturegarden = {
      'attributes.maturegarden': true,
    };
    query.push(maturegarden);
  }
  if (req.body.attributes.balcony) {
    let balcony = {
      'attributes.balcony': true,
    };
    query.push(balcony);
  }
  if (req.body.attributes.partyarea) {
    let partyarea = {
      'attributes.partyarea': true,
    };
    query.push(partyarea);
  }

  if (req.body.attributes.gym) {
    let gym = {
      'attributes.gym': true,
    };
    query.push(gym);
  }

  if (req.body.attributes.bedroom) {
    let intb = parseInt(req.body.attributes.bedroom);

    let bedroom = {
      'attributes.bedroom': intb,
    };
    query.push(bedroom);
  }

  if (req.body.attributes.bathrooms) {
    let intb = parseInt(req.body.attributes.bathrooms);

    let bathrooms = {
      'attributes.bathrooms': intb,
    };
    query.push(bathrooms);
  }
  if (req.body.attributes.steambath) {
    let intb = parseInt(req.body.attributes.steambath);

    let steambath = {
      'attributes.steambath': intb,
    };
    query.push(steambath);
  }
  if (req.body.attributes.lift) {
    let intb = parseInt(req.body.attributes.lift);

    let lift = {
      'attributes.lift': intb,
    };
    query.push(lift);
  }
  if (req.body.attributes.bathtab) {
    let intb = parseInt(req.body.attributes.bathtab);

    let bathtab = {
      'attributes.bathtab': intb,
    };
    query.push(bathtab);
  }

  if (req.body.attributes.parking) {
    let intb = parseInt(req.body.attributes.parking);

    let parking = {
      'attributes.parking': intb,
    };
    query.push(parking);
  }

  if (req.body.livingsize) {
    let inta = parseInt(req.body.livingsize.min);
    let intb = parseInt(req.body.livingsize.max);

    let minliv = inta;
    let maxliv = intb;

    let livingsize = {
      'attributes.livingsize': { $lte: intb, $gte: intb },
    };
    query.push(livingsize);
  }

  if (req.body.gardensize) {
    let inta = parseInt(req.body.gardensize.min);
    let intb = parseInt(req.body.gardensize.max);

    let minliv = inta;
    let maxliv = intb;

    let gardensize = {
      'attributes.gardensize': { $lte: intb, $gte: intb },
    };
    query.push(gardensize);
  }

  if (req.body.kitchensize) {
    let inta = parseInt(req.body.kitchensize.min);
    let intb = parseInt(req.body.kitchensize.max);

    let minliv = inta;
    let maxliv = intb;

    let kitchensize = {
      'attributes.kitchensize': { $lte: intb, $gte: intb },
    };
    query.push(kitchensize);
  }
  let jsonto = JSON.stringify(query);
  let par = JSON.parse(jsonto);
  object = Object.assign({}, ...par);

  var search = await House.aggregate([
    {
      $match: object,
    },
  ]);
  let SData;
  if (search.length > 0) {
    SData = await HouseQuery.create(req.body);

    res.status(200).json({
      status: 'success',
      results: search.length,
      search,
      queryId: SData._id,
    });
  } else {
    res.status(200).json({
      status: 'success',
      results: search.length,
      search,
    });
  }
});

exports.searchLandPage3 = catchAsync(async (req, res) => {
  let attributes = req.body.attributes;

  let mainCategory = attributes.mainCategory;
  let query = [
    {
      isFlipbook: true,
      'attributes.mainCategory': mainCategory,
    },
  ];

  if (req.body.cost) {
    let inta = req.body.cost.min;
    let intb = req.body.cost.max;
    let mincost = inta;
    let maxcost = intb;

    let abc = {
      'attributes.cost': {
        $lte: maxcost,
        $gte: mincost,
      },
    };
    query.push(abc);
  }
  if (req.body.sizeinacres) {
    let inta = req.body.sizeinacres.min;
    let intb = req.body.sizeinacres.max;
    let mincost = inta;
    let maxcost = intb;

    let abc = {
      'attributes.sizeinacres': {
        $lte: maxcost,
        $gte: mincost,
      },
    };
    query.push(abc);
  }

  if (req.body.area) {
    let area = {
      'sellerDetails.location': req.body.area,
    };
    query.push(area);
  }

  if (req.body.kmtoshoppingcenter) {
    let inta = parseInt(req.body.kmtoshoppingcenter);

    let kmtoshoppingcenter = {
      'attributes.kmtoshoppingcenter': inta,
    };
    query.push(kmtoshoppingcenter);
  }
  if (req.body.kmtoneighbour) {
    let inta = parseInt(req.body.kmtoneighbour);

    let kmtoneighbour = {
      'attributes.kmtoneighbour': inta,
    };
    query.push(kmtoneighbour);
  }
  if (req.body.kmtotarmac) {
    let inta = parseInt(req.body.kmtotarmac);

    let kmtotarmac = {
      'attributes.kmtotarmac': inta,
    };
    query.push(kmtotarmac);
  }
  if (req.body.kmtowater) {
    let inta = parseInt(req.body.kmtowater);

    let kmtowater = {
      'attributes.kmtowater': inta,
    };
    query.push(kmtowater);
  }
  if (req.body.kmtoelectricity) {
    let inta = parseInt(req.body.kmtoelectricity);

    let kmtoelectricity = {
      'attributes.kmtoelectricity': inta,
    };
    query.push(kmtoelectricity);
  }
  if (req.body.attributes.leasefreehold) {
    let leasefreehold = {
      'attributes.leasefreehold': req.body.attributes.leasefreehold,
    };
    query.push(leasefreehold);
  }

  if (req.body.attributes.councilwater) {
    let councilwater = {
      'attributes.councilwater': true,
    };
    query.push(councilwater);
  }

  if (req.body.attributes.electricity) {
    let electricity = {
      'attributes.electricity': true,
    };
    query.push(electricity);
  }

  if (req.body.attributes.borehole) {
    let borehole = {
      'attributes.borehole': true,
    };
    query.push(borehole);
  }

  if (req.body.attributes.readyfence) {
    let readyfence = {
      'attributes.readyfence': true,
    };
    query.push(readyfence);
  }
  if (req.body.attributes.controlleddevelopment) {
    let controlleddevelopment = {
      'attributes.controlleddevelopment': true,
    };
    query.push(controlleddevelopment);
  }

  if (req.body.attributes.waterfront) {
    let waterfront = {
      'attributes.waterfront': true,
    };
    query.push(waterfront);
  }

  if (req.body.attributes.gated) {
    let gated = {
      'attributes.gated': true,
    };
    query.push(gated);
  }

  if (req.body.attributes.soilType) {
    let soilType = {
      'attributes.soilType': req.body.attributes.soilType,
    };
    query.push(soilType);
  }

  if (req.body.attributes.nature) {
    let nature = {
      'attributes.nature': req.body.attributes.nature,
    };
    query.push(nature);
  }

  if (req.body.attributes.road) {
    let road = {
      'attributes.road': req.body.attributes.road,
    };
    query.push(road);
  }

  let jsonto = JSON.stringify(query);

  let par = JSON.parse(jsonto);

  object = Object.assign({}, ...par);
  console.log(object);
  var search = await Land.aggregate([
    {
      $match: object,
    },
  ]);

  let SData;
  if (search.length > 0) {
    SData = await LandQuery.create(req.body);
    if (
      req.body.attributes.freehold === true &&
      (req.body.attributes.lease === false || !req.body.attributes.lease)
    ) {
      console.log(' in free');
      const updatesdata = await LandQuery.findByIdAndUpdate(
        { _id: SData._id },
        {
          $set: {
            'attributes.freehold': true,
          },
        }
      );
    }
    if (
      req.body.attributes.lease === true &&
      (req.body.attributes.freehold === false || !req.body.attributes.freehold)
    ) {
      console.log(' in lease');

      const updatesdata = await LandQuery.findByIdAndUpdate(
        { _id: SData._id },
        {
          $set: {
            'attributes.lease': true,
          },
        }
      );
    }

    res.status(200).json({
      status: 'success',
      results: search.length,
      search,
      queryId: SData._id,
    });
  } else {
    res.status(200).json({
      status: 'success',
      results: search.length,
      search,
    });
  }
});

exports.searchHotelPage2 = catchAsync(async (req, res) => {
  let attributes = req.body.attributes;

  let query = [
    {
      isFlipbook: true,
    },
  ];
  if (attributes.class) {
    let cls = {
      'attributes.class': req.body.attributes.class,
    };
    query.push(cls);
  }
  if (attributes.locality) {
    let locality = {
      'attributes.locality': req.body.attributes.locality,
    };
    query.push(locality);
  }
  if (req.body.area) {
    let area = {
      'sellerDetails.location': req.body.area,
    };
    query.push(area);
  }
  if (req.body.Hotel) {
    let hotelname = {
      'propertyDetails.propertyName': req.body.Hotel,
    };
    query.push(hotelname);
  }
  if (req.body.conferenceroom) {
    let inta = parseInt(req.body.conferenceroom);

    let abc = {
      'attributes.conferenceroom': inta,
    };
    query.push(abc);
  }
  if (req.body.kmfromtarmac) {
    let inta = parseInt(req.body.kmfromtarmac);

    let abc = {
      'attributes.kmfromtarmac': inta,
    };
    query.push(abc);
  }
  if (req.body.bedbreakfastcost) {
    let inta = parseInt(req.body.bedbreakfastcost.max);
    let intb = parseInt(req.body.bedbreakfastcost.min);

    let maxcost = inta;
    let mincost = intb;

    let abc = {
      'attributes.bedbreakfastcost': { $lte: maxcost, $gte: mincost },
    };
    query.push(abc);
  }

  if (attributes.freshoutdoors) {
    let abc = {
      'attributes.freshoutdoors': true,
    };
    query.push(abc);
  }

  if (attributes.aircon) {
    let abc = {
      'attributes.aircon': true,
    };
    query.push(abc);
  }

  if (attributes.petsallowed) {
    let abc = {
      'attributes.petsallowed': true,
    };
    query.push(abc);
  }

  if (attributes.carpark) {
    let abc = {
      'attributes.carpark': true,
    };
    query.push(abc);
  }

  if (attributes.spa) {
    let abc = {
      'attributes.spa': true,
    };
    query.push(abc);
  }

  if (attributes.indoorpool) {
    let abc = {
      'attributes.indoorpool': true,
    };
    query.push(abc);
  }

  if (attributes.disabilityaccess) {
    let abc = {
      'attributes.disabilityaccess': true,
    };
    query.push(abc);
  }

  if (attributes.barlounge) {
    let abc = {
      'attributes.barlounge': true,
    };
    query.push(abc);
  }

  if (attributes.hairsalon) {
    let abc = {
      'attributes.hairsalon': true,
    };
    query.push(abc);
  }

  let jsonto = JSON.stringify(query);

  let par = JSON.parse(jsonto);

  object = Object.assign({}, ...par);

  var search = await Hotel.aggregate([
    {
      $match: object,
    },
  ]);

  let SData;
  if (search.length > 0) {
    SData = await HotelQuery.create(req.body);

    res.status(200).json({
      status: 'success',
      results: search.length,
      search,
      queryId: SData._id,
    });
    /**************************************************** */
  } else {
    res.status(200).json({
      status: 'success',
      results: search.length,
      search,
    });
  }
});

exports.searchWarehousePage3 = catchAsync(async (req, res) => {
  let attributes = req.body.attributes;

  let mainCategory = attributes.mainCategory;

  let query = [
    {
      isFlipbook: true,
      'attributes.mainCategory': mainCategory,
    },
  ];
  let Type;
  if (attributes.Type) {
    Type = { 'attributes.Type': attributes.Type };
    query.push(Type);
  }
  let area;
  if (req.body.area) {
    area = { 'sellerDetails.location': req.body.area };
    query.push(area);
  }

  let cost;

  if (req.body.cost) {
    let inta = parseInt(req.body.cost.max);
    let intb = parseInt(req.body.cost.min);

    let maxcost = inta;
    let mincost = intb;

    let abc = { 'attributes.cost': { $lte: maxcost, $gte: mincost } };

    query.push(abc);
  }
  if (req.body.sizeinfeet) {
    let inta = parseInt(req.body.sizeinfeet.max);
    let intb = parseInt(req.body.sizeinfeet.min);

    let maxsizeinfeet = inta;
    let minsizeinfeet = intb;

    let abc = {
      'attributes.sizeinfeet': { $lte: maxsizeinfeet, $gte: minsizeinfeet },
    };

    query.push(abc);
  }
  if (req.body.kmfromtarmac) {
    let inta = parseInt(req.body.kmfromtarmac);

    let abc = {
      'attributes.kmfromtarmac': { $eq: inta },
    };
    query.push(abc);
  }

  if (attributes.conferencefacilites) {
    let abc = {
      'attributes.conferencefacilites': true,
    };
    query.push(abc);
  }

  if (attributes.freshoutdoors) {
    let abc = {
      'attributes.freshoutdoors': true,
    };
    query.push(abc);
  }

  if (attributes.aircon) {
    let abc = {
      'attributes.aircon': true,
    };
    query.push(abc);
  }

  if (attributes.fullyfurnished) {
    let abc = {
      'attributes.fullyfurnished': true,
    };
    query.push(abc);
  }

  if (attributes.landscapegarden) {
    let abc = {
      'attributes.landscapegarden': true,
    };
    query.push(abc);
  }

  if (attributes.wifi) {
    let abc = {
      'attributes.wifi': true,
    };
    query.push(abc);
  }

  if (attributes.sharedsecretary) {
    let abc = {
      'attributes.sharedsecretary': true,
    };
    query.push(abc);
  }

  if (attributes.zoning) {
    let abc = {
      'attributes.zoning': attributes.zoning,
    };
    query.push(abc);
  }

  if (attributes.townLocation) {
    let abc = {
      'attributes.townLocation': attributes.townLocation,
    };
    query.push(abc);
  }

  if (attributes.accessRoad) {
    let abc = {
      'attributes.accessRoad': attributes.accessRoad,
    };
    query.push(abc);
  }

  if (attributes.tenants) {
    let abc = {
      'attributes.tenants': attributes.tenants,
    };
    query.push(abc);
  }

  if (attributes.elevator) {
    let abc = {
      'attributes.elevator': attributes.elevator,
    };
    query.push(abc);
  }

  if (attributes.security) {
    let abc = {
      'attributes.security': attributes.security,
    };
    query.push(abc);
  }

  if (attributes.vehicleTraffic) {
    let abc = {
      'attributes.vehicleTraffic': attributes.vehicleTraffic,
    };
    query.push(abc);
  }

  if (attributes.humanTraffic) {
    let abc = {
      'attributes.humanTraffic': attributes.humanTraffic,
    };
    query.push(abc);
  }

  if (attributes.meetingRoom) {
    let abc = {
      'attributes.meetingRoom': attributes.meetingRoom,
    };
    query.push(abc);
  }

  if (attributes.parking) {
    let abc = {
      'attributes.parking': attributes.parking,
    };
    query.push(abc);
  }

  let jsonto = JSON.stringify(query);

  let par = JSON.parse(jsonto);

  object = Object.assign({}, ...par);

  var search = await WareHouse.aggregate([
    {
      $match: object,
    },
  ]);
  let SData;
  if (search.length > 0) {
    SData = await WarehouseQuery.create(req.body);

    res.status(200).json({
      status: 'success',
      results: search.length,
      search,
      queryId: SData._id,
    });
  } else {
    res.status(200).json({
      status: 'success',
      results: search.length,
      search,
    });
  }
});
