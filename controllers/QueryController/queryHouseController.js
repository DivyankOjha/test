const express = require('express');
const HouseQuery = require('../../models/queryModels/houseModel');
const catchAsync = require('../../utils/catchAsync');
const House = require('../../models/houseModel');
const LandQuery = require('../../models/queryModels/landModel');
const Land = require('../../models/landModel');
const HotelQuery = require('../../models/queryModels/hotelModel');
const Hotel = require('../../models/hotelModel');
const WarehouseQuery = require('../../models/queryModels/warehouseModel');
const WareHouse = require('../../models/warehouseModel');
const SimilarPropQuery = require('../../models/queryModels/similarPropertyModel');
const geolocation = require('../../models/geomodel/geoModel');

exports.getQueryById = catchAsync(async (req, res, next) => {
  let getQueryData = await HouseQuery.findById({ _id: req.params.id });
  let getQueryLand = await LandQuery.findById({ _id: req.params.id });
  let getQueryHotel = await HotelQuery.findById({ _id: req.params.id });
  let getQueryWarehouse = await WarehouseQuery.findById({ _id: req.params.id });
  let getQuerySimilarProperty = await SimilarPropQuery.findById({
    _id: req.params.id,
  });

  let getGeoQuery = await geolocation.findById({ _id: req.params.id });

  if (getQueryData) {
    if (getQueryData.categoryType === 'House') {
      let query = [
        {
          isFlipbook: true,
          'attributes.mainCategory': getQueryData.attributes.mainCategory,
        },
      ];

      if (getQueryData.cost) {
        let inta = parseInt(getQueryData.cost.min);
        let intb = parseInt(getQueryData.cost.max);
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

      if (getQueryData.area) {
        let area = {
          'sellerDetails.location': getQueryData.area,
        };
        query.push(area);
      }

      if (getQueryData.attributes.propertyStatus) {
        let propertyStatus = {
          'attributes.propertyStatus': getQueryData.attributes.propertyStatus,
        };
        query.push(propertyStatus);
      }

      if (getQueryData.attributes.subCategory) {
        let subCategory = {
          'attributes.subCategory': getQueryData.attributes.subCategory,
        };
        query.push(subCategory);
      }

      if (getQueryData.attributes.opticalfiber) {
        let opticalfiber = {
          'attributes.opticalfiber': true,
        };
        query.push(opticalfiber);
      }
      if (getQueryData.attributes.swimmingpool) {
        let swimmingpool = {
          'attributes.swimmingpool': true,
        };
        query.push(swimmingpool);
      }
      if (getQueryData.attributes.fireplace) {
        let fireplace = {
          'attributes.fireplace': true,
        };
        query.push(fireplace);
      }

      if (getQueryData.attributes.petsallowed) {
        let petsallowed = {
          'attributes.petsallowed': true,
        };
        query.push(petsallowed);
      }
      if (getQueryData.attributes.solarhotwater) {
        let solarhotwater = {
          'attributes.solarhotwater': true,
        };
        query.push(solarhotwater);
      }

      if (getQueryData.attributes.waterfront) {
        let waterfront = {
          'attributes.waterfront': true,
        };
        query.push(waterfront);
      }
      if (getQueryData.attributes.cctv) {
        let cctv = {
          'attributes.cctv': true,
        };
        query.push(cctv);
      }
      if (getQueryData.attributes.borehole) {
        let borehole = {
          'attributes.borehole': true,
        };
        query.push(borehole);
      }
      if (getQueryData.attributes.disabilityfeature) {
        let disabilityfeature = {
          'attributes.disabilityfeature': true,
        };
        query.push(disabilityfeature);
      }
      if (getQueryData.attributes.maturegarden) {
        let maturegarden = {
          'attributes.maturegarden': true,
        };
        query.push(maturegarden);
      }
      if (getQueryData.attributes.balcony) {
        let balcony = {
          'attributes.balcony': true,
        };
        query.push(balcony);
      }
      if (getQueryData.attributes.partyarea) {
        let partyarea = {
          'attributes.partyarea': true,
        };
        query.push(partyarea);
      }

      if (getQueryData.attributes.gym) {
        let gym = {
          'attributes.gym': true,
        };
        query.push(gym);
      }

      if (getQueryData.attributes.bedroom) {
        let intb = parseInt(getQueryData.attributes.bedroom);
        let bedroom = {
          'attributes.bedroom': intb,
        };
        query.push(bedroom);
      }

      if (getQueryData.attributes.bathrooms) {
        let intb = parseInt(getQueryData.attributes.bathrooms);

        let bathrooms = {
          'attributes.bathrooms': intb,
        };
        query.push(bathrooms);
      }
      if (getQueryData.attributes.steambath) {
        let intb = parseInt(getQueryData.attributes.steambath);

        let steambath = {
          'attributes.steambath': intb,
        };
        query.push(steambath);
      }
      if (getQueryData.attributes.lift) {
        let intb = parseInt(getQueryData.attributes.lift);

        let lift = {
          'attributes.lift': intb,
        };
        query.push(lift);
      }
      if (getQueryData.attributes.bathtab) {
        let intb = parseInt(getQueryData.attributes.bathtab);

        let bathtab = {
          'attributes.bathtab': intb,
        };
        query.push(bathtab);
      }

      if (getQueryData.attributes.parking) {
        let intb = parseInt(getQueryData.attributes.parking);

        let parking = {
          'attributes.parking': intb,
        };
        query.push(parking);
      }

      if (getQueryData.livingsize) {
        let inta = parseInt(getQueryData.livingsize.min);
        let intb = parseInt(getQueryData.livingsize.max);

        let minliv = inta;
        let maxliv = intb;

        let livingsize = {
          'attributes.livingsize': { $lte: intb, $gte: intb },
        };
        query.push(livingsize);
      }

      if (getQueryData.gardensize) {
        let inta = parseInt(getQueryData.gardensize.min);
        let intb = parseInt(getQueryData.gardensize.max);

        let minliv = inta;
        let maxliv = intb;

        let gardensize = {
          'attributes.gardensize': { $lte: intb, $gte: intb },
        };
        query.push(gardensize);
      }

      if (getQueryData.kitchensize) {
        let inta = parseInt(getQueryData.kitchensize.min);
        let intb = parseInt(getQueryData.kitchensize.max);

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

      let getQuery = getQueryData;
      res.status(200).json({
        status: 'success',
        results: search.length,
        search,
        getQuery,
      });
    }
  }

  if (getQueryLand) {
    if (getQueryLand.categoryType === 'Land') {
      let query = [
        {
          isFlipbook: true,
          'attributes.mainCategory': getQueryLand.attributes.mainCategory,
        },
      ];

      if (getQueryLand.cost) {
        let inta = getQueryLand.cost.min;
        let intb = getQueryLand.cost.max;
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
      if (getQueryLand.sizeinacres) {
        let inta = getQueryLand.sizeinacres.min;
        let intb = getQueryLand.sizeinacres.max;
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

      if (getQueryLand.area) {
        let area = {
          'sellerDetails.location': getQueryLand.area,
        };
        query.push(area);
      }

      if (getQueryLand.kmtoshoppingcenter) {
        let inta = parseInt(getQueryLand.kmtoshoppingcenter);

        let kmtoshoppingcenter = {
          'attributes.kmtoshoppingcenter': inta,
        };
        query.push(kmtoshoppingcenter);
      }
      if (getQueryLand.kmtoneighbour) {
        let inta = parseInt(getQueryLand.kmtoneighbour);

        let kmtoneighbour = {
          'attributes.kmtoneighbour': inta,
        };
        query.push(kmtoneighbour);
      }
      if (getQueryLand.kmtotarmac) {
        let inta = parseInt(getQueryLand.kmtotarmac);

        let kmtotarmac = {
          'attributes.kmtotarmac': inta,
        };
        query.push(kmtotarmac);
      }
      if (getQueryLand.kmtowater) {
        let inta = parseInt(getQueryLand.kmtowater);

        let kmtowater = {
          'attributes.kmtowater': inta,
        };
        query.push(kmtowater);
      }
      if (getQueryLand.kmtoelectricity) {
        let inta = parseInt(getQueryLand.kmtoelectricity);

        let kmtoelectricity = {
          'attributes.kmtoelectricity': inta,
        };
        query.push(kmtoelectricity);
      }

      if (getQueryLand.attributes.councilwater) {
        let councilwater = {
          'attributes.councilwater': true,
        };
        query.push(councilwater);
      }

      if (getQueryLand.attributes.electricity) {
        let electricity = {
          'attributes.electricity': true,
        };
        query.push(electricity);
      }

      if (getQueryLand.attributes.borehole) {
        let borehole = {
          'attributes.borehole': true,
        };
        query.push(borehole);
      }

      if (getQueryLand.attributes.readyfence) {
        let readyfence = {
          'attributes.readyfence': true,
        };
        query.push(readyfence);
      }
      if (getQueryLand.attributes.controlleddevelopment) {
        let controlleddevelopment = {
          'attributes.controlleddevelopment': true,
        };
        query.push(controlleddevelopment);
      }

      if (getQueryLand.attributes.waterfront) {
        let waterfront = {
          'attributes.waterfront': true,
        };
        query.push(waterfront);
      }

      if (getQueryLand.attributes.gated) {
        let gated = {
          'attributes.gated': true,
        };
        query.push(gated);
      }

      if (getQueryLand.attributes.soilType) {
        let soilType = {
          'attributes.soilType': getQueryLand.attributes.soilType,
        };
        query.push(soilType);
      }

      if (getQueryLand.attributes.nature) {
        let nature = {
          'attributes.nature': getQueryLand.attributes.nature,
        };
        query.push(nature);
      }

      if (getQueryLand.attributes.road) {
        let road = {
          'attributes.road': getQueryLand.attributes.road,
        };
        query.push(road);
      }
      if (
        getQueryLand.attributes.freehold === true ||
        getQueryLand.attributes.lease === true
      ) {
        if (
          getQueryLand.attributes.freehold === true &&
          getQueryLand.attributes.lease === true
        ) {
        } else if (
          getQueryLand.attributes.freehold === true &&
          (getQueryLand.attributes.lease === false ||
            !getQueryLand.attributes.lease)
        ) {
          let freehold = {
            'attributes.leasefreehold': 'freehold',
          };
          query.push(freehold);
        } else if (
          getQueryLand.attributes.lease === true &&
          (getQueryLand.attributes.freehold === false ||
            !getQueryLand.attributes.freehold)
        ) {
          let lease = {
            'attributes.leasefreehold': 'lease',
          };
          query.push(lease);
        }
      }
      let jsonto = JSON.stringify(query);

      let par = JSON.parse(jsonto);

      object = Object.assign({}, ...par);

      var search = await Land.aggregate([
        {
          $match: object,
        },
      ]);
      let getQuery = getQueryLand;
      res.status(200).json({
        status: 'success',
        results: search.length,
        search,
        getQuery,
      });
    }
  }
  if (getQueryHotel) {
    if (getQueryHotel.categoryType === 'Hotel') {
      let query = [
        {
          isFlipbook: true,
        },
      ];
      if (getQueryHotel.attributes.class) {
        let cls = {
          'attributes.class': getQueryHotel.attributes.class,
        };
        query.push(cls);
      }
      if (getQueryHotel.attributes.locality) {
        let locality = {
          'attributes.locality': getQueryHotel.attributes.locality,
        };
        query.push(locality);
      }
      if (getQueryHotel.area) {
        let area = {
          'sellerDetails.location': getQueryHotel.area,
        };
        query.push(area);
      }
      if (getQueryHotel.Hotel) {
        let hotelname = {
          'propertyDetails.propertyName': getQueryHotel.Hotel,
        };
        query.push(hotelname);
      }
      if (getQueryHotel.conferenceroom) {
        let inta = parseInt(getQueryHotel.conferenceroom);

        let abc = {
          'attributes.conferenceroom': inta,
        };
        query.push(abc);
      }
      if (getQueryHotel.kmfromtarmac) {
        let inta = parseInt(getQueryHotel.kmfromtarmac);

        let abc = {
          'attributes.kmfromtarmac': inta,
        };
        query.push(abc);
      }
      if (getQueryHotel.bedbreakfastcost) {
        let inta = parseInt(getQueryHotel.bedbreakfastcost.max);
        let intb = parseInt(getQueryHotel.bedbreakfastcost.min);

        let maxcost = inta;
        let mincost = intb;

        let abc = {
          'attributes.bedbreakfastcost': { $lte: maxcost, $gte: mincost },
        };
        query.push(abc);
      }

      if (getQueryHotel.attributes.freshoutdoors) {
        let abc = {
          'attributes.freshoutdoors': true,
        };
        query.push(abc);
      }

      if (getQueryHotel.attributes.aircon) {
        let abc = {
          'attributes.aircon': true,
        };
        query.push(abc);
      }

      if (getQueryHotel.attributes.petsallowed) {
        let abc = {
          'attributes.petsallowed': true,
        };
        query.push(abc);
      }

      if (getQueryHotel.attributes.carpark) {
        let abc = {
          'attributes.carpark': true,
        };
        query.push(abc);
      }

      if (getQueryHotel.attributes.spa) {
        let abc = {
          'attributes.spa': true,
        };
        query.push(abc);
      }

      if (getQueryHotel.attributes.indoorpool) {
        let abc = {
          'attributes.indoorpool': true,
        };
        query.push(abc);
      }

      if (getQueryHotel.attributes.disabilityaccess) {
        let abc = {
          'attributes.disabilityaccess': true,
        };
        query.push(abc);
      }

      if (getQueryHotel.attributes.barlounge) {
        let abc = {
          'attributes.barlounge': true,
        };
        query.push(abc);
      }

      if (getQueryHotel.attributes.hairsalon) {
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

      let getQuery = getQueryHotel;
      res.status(200).json({
        status: 'success',
        results: search.length,
        search,
        getQuery,
      });
    }
  }
  if (getQueryWarehouse) {
    if (getQueryWarehouse.categoryType === 'Warehouse') {
      let query = [
        {
          isFlipbook: true,
          'attributes.mainCategory': getQueryWarehouse.attributes.mainCategory,
        },
      ];

      let Type;
      if (getQueryWarehouse.attributes.Type) {
        Type = { 'attributes.Type': getQueryWarehouse.attributes.Type };
        query.push(Type);
      }
      let area;
      if (getQueryWarehouse.area) {
        area = { 'sellerDetails.location': getQueryWarehouse.area };
        query.push(area);
      }

      let cost;

      if (getQueryWarehouse.cost) {
        let inta = parseInt(getQueryWarehouse.cost.max);
        let intb = parseInt(getQueryWarehouse.cost.min);

        let maxcost = inta;
        let mincost = intb;

        let abc = { 'attributes.cost': { $lte: maxcost, $gte: mincost } };

        query.push(abc);
      }
      if (getQueryWarehouse.sizeinfeet) {
        let inta = parseInt(getQueryWarehouse.sizeinfeet.max);
        let intb = parseInt(getQueryWarehouse.sizeinfeet.min);

        let maxsizeinfeet = inta;
        let minsizeinfeet = intb;

        let abc = {
          'attributes.sizeinfeet': { $lte: maxsizeinfeet, $gte: minsizeinfeet },
        };

        query.push(abc);
      }
      if (getQueryWarehouse.kmfromtarmac) {
        let inta = parseInt(getQueryWarehouse.kmfromtarmac);

        let abc = {
          'attributes.kmfromtarmac': { $eq: inta },
        };
        query.push(abc);
      }

      if (getQueryWarehouse.attributes.conferencefacilites) {
        let abc = {
          'attributes.conferencefacilites': true,
        };
        query.push(abc);
      }

      if (getQueryWarehouse.attributes.freshoutdoors) {
        let abc = {
          'attributes.freshoutdoors': true,
        };
        query.push(abc);
      }

      if (getQueryWarehouse.attributes.aircon) {
        let abc = {
          'attributes.aircon': true,
        };
        query.push(abc);
      }

      if (getQueryWarehouse.attributes.fullyfurnished) {
        let abc = {
          'attributes.fullyfurnished': true,
        };
        query.push(abc);
      }

      if (getQueryWarehouse.attributes.landscapegarden) {
        let abc = {
          'attributes.landscapegarden': true,
        };
        query.push(abc);
      }

      if (getQueryWarehouse.attributes.wifi) {
        let abc = {
          'attributes.wifi': true,
        };
        query.push(abc);
      }

      if (getQueryWarehouse.attributes.sharedsecretary) {
        let abc = {
          'attributes.sharedsecretary': true,
        };
        query.push(abc);
      }

      if (getQueryWarehouse.attributes.zoning) {
        let abc = {
          'attributes.zoning': getQueryWarehouse.attributes.zoning,
        };
        query.push(abc);
      }

      if (getQueryWarehouse.attributes.townLocation) {
        let abc = {
          'attributes.townLocation': getQueryWarehouse.attributes.townLocation,
        };
        query.push(abc);
      }

      if (getQueryWarehouse.attributes.accessRoad) {
        let abc = {
          'attributes.accessRoad': getQueryWarehouse.attributes.accessRoad,
        };
        query.push(abc);
      }

      if (getQueryWarehouse.attributes.tenants) {
        let abc = {
          'attributes.tenants': getQueryWarehouse.attributes.tenants,
        };
        query.push(abc);
      }

      if (getQueryWarehouse.attributes.elevator) {
        let abc = {
          'attributes.elevator': getQueryWarehouse.attributes.elevator,
        };
        query.push(abc);
      }

      if (getQueryWarehouse.attributes.security) {
        let abc = {
          'attributes.security': getQueryWarehouse.attributes.security,
        };
        query.push(abc);
      }

      if (getQueryWarehouse.attributes.vehicleTraffic) {
        let abc = {
          'attributes.vehicleTraffic':
            getQueryWarehouse.attributes.vehicleTraffic,
        };
        query.push(abc);
      }

      if (getQueryWarehouse.attributes.humanTraffic) {
        let abc = {
          'attributes.humanTraffic': getQueryWarehouse.attributes.humanTraffic,
        };
        query.push(abc);
      }

      if (getQueryWarehouse.attributes.meetingRoom) {
        let abc = {
          'attributes.meetingRoom': getQueryWarehouse.attributes.meetingRoom,
        };
        query.push(abc);
      }

      if (getQueryWarehouse.attributes.parking) {
        let abc = {
          'attributes.parking': getQueryWarehouse.attributes.parking,
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

      let getQuery = getQueryWarehouse;
      res.status(200).json({
        status: 'success',
        results: search.length,
        search,
        getQuery,
      });
    }
  }
  if (getQuerySimilarProperty) {
    if (
      getQuerySimilarProperty.categoryType === 'Others' &&
      getQuerySimilarProperty.Type === 'House'
    ) {
      const getHouse = await House.find({
        _id: { $ne: getQuerySimilarProperty.propertyId },
        'attributes.cost': { $eq: getQuerySimilarProperty.cost },
        isFlipbook: true,
      });
      let getQuery = getQuerySimilarProperty;
      res.status(200).json({
        status: 'success',
        results: getHouse.length,
        search: getHouse,
        getQuery,
      });
    } else if (
      getQuerySimilarProperty.categoryType === 'Others' &&
      getQuerySimilarProperty.Type === 'Land'
    ) {
      const getLand = await Land.find({
        _id: { $ne: getQuerySimilarProperty.propertyId },
        'attributes.cost': { $eq: getQuerySimilarProperty.cost },
        isFlipbook: true,
      });
      let getQuery = getQuerySimilarProperty;
      res.status(200).json({
        status: 'success',
        results: getLand.length,
        search: getLand,
        getQuery,
      });
    } else if (
      getQuerySimilarProperty.categoryType === 'Others' &&
      getQuerySimilarProperty.Type === 'Hotel'
    ) {
      const getHotel = await Hotel.find({
        _id: { $ne: getQuerySimilarProperty.propertyId },
        'attributes.cost': { $eq: getQuerySimilarProperty.cost },
        isFlipbook: true,
      });
      let getQuery = getQuerySimilarProperty;
      res.status(200).json({
        status: 'success',
        results: getHotel.length,
        search: getHotel,
        getQuery,
      });
    } else if (
      getQuerySimilarProperty.categoryType === 'Others' &&
      getQuerySimilarProperty.Type === 'Warehouse'
    ) {
      const getWarehouse = await WareHouse.find({
        _id: { $ne: getQuerySimilarProperty.propertyId },
        'attributes.cost': { $eq: getQuerySimilarProperty.cost },
        isFlipbook: true,
      });
      let getQuery = getQuerySimilarProperty;
      res.status(200).json({
        status: 'success',
        results: getWarehouse.length,
        search: getWarehouse,
        getQuery,
      });
    }
  }
  if (getGeoQuery) {
    if (getGeoQuery.propertyType === 'Land') {
      var METERS_PER_MILE = 1609;
      let getnearby = await Land.find({
        location: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [
                getGeoQuery.location.coordinates.lattitude,
                getGeoQuery.location.coordinates.longitude,
              ],
            },
            $maxDistance: 1.24274 * METERS_PER_MILE,
          },
        },
        isFlipbook: true,
      });
      res.status(200).json({
        status: 'success',
        results: getnearby.length,
        search: getnearby,
        getQuery: getGeoQuery,
      });
    } else if (getGeoQuery.propertyType === 'House') {
      var METERS_PER_MILE = 1609;
      let getnearby = await House.find({
        location: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [
                getGeoQuery.location.coordinates.longitude,
                getGeoQuery.location.coordinates.lattitude,
              ],
            },
            $maxDistance: 1.24274 * METERS_PER_MILE,
          },
        },
        isFlipbook: true,
      });
      res.status(200).json({
        status: 'success',
        results: getnearby.length,
        search: getnearby,
        getQuery: getGeoQuery,
      });
    } else if (getGeoQuery.propertyType === 'Hotel') {
      var METERS_PER_MILE = 1609;
      let getnearby = await Hotel.find({
        location: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [
                getGeoQuery.location.coordinates.longitude,
                getGeoQuery.location.coordinates.lattitude,
              ],
            },
            $maxDistance: 1.24274 * METERS_PER_MILE,
          },
        },
        isFlipbook: true,
      });
      res.status(200).json({
        status: 'success',
        results: getnearby.length,
        search: getnearby,
        getQuery: getGeoQuery,
      });
    } else if (getGeoQuery.propertyType === 'Warehouse') {
      var METERS_PER_MILE = 1609;
      let getnearby = await WareHouse.find({
        location: {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [
                getGeoQuery.location.coordinates.longitude,
                getGeoQuery.location.coordinates.lattitude,
              ],
            },
            $maxDistance: 1.24274 * METERS_PER_MILE,
          },
        },
        isFlipbook: true,
      });
      res.status(200).json({
        status: 'success',
        results: getnearby.length,
        search: getnearby,
        getQuery: getGeoQuery,
      });
    } else {
      res.status(200).json({
        status: 'error',
        message: 'No properties in Neighbourhood',
      });
    }
  }
});

exports.getGeoLocation = catchAsync(async (req, res, next) => {
  let getHouseData = await House.findById({ _id: req.body.propertyId });

  let getlandData = await Land.findById({ _id: req.body.propertyId });

  let gethotelData = await Hotel.findById({ _id: req.body.propertyId });
  let getWarehouseData = await WareHouse.findById({ _id: req.body.propertyId });

  if (getHouseData) {
    let geodata = {
      propertyType: 'House',
      propertyId: getHouseData._id,
      'location.coordinates.lattitude':
        getHouseData.location.coordinates.lattitude,
      'location.coordinates.longitude':
        getHouseData.location.coordinates.longitude,
      type: 'Point',
    };

    var METERS_PER_MILE = 1609;
    let getnearby = await House.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [
              getHouseData.location.coordinates.longitude,
              getHouseData.location.coordinates.lattitude,
            ],
          },
          $maxDistance: 1.24274 * METERS_PER_MILE,
        },
      },
    });

    let SData;
    if (getnearby.length > 0) {
      SData = await geolocation.create(geodata);
      res.status(200).json({
        status: 'success',
        results: getnearby.length,
        search: getnearby,
        queryId: SData._id,
      });
      /**************************************************** */
    } else {
      res.status(200).json({
        status: 'success',
        results: getnearby.length,
        search: getnearby,
      });
    }
  } else if (getlandData) {
    let geodata = {
      propertyType: 'Land',
      propertyId: req.body.propertyId,
      'location.coordinates.lattitude':
        getlandData.location.coordinates.lattitude,
      'location.coordinates.longitude':
        getlandData.location.coordinates.longitude,
      type: 'Point',
    };

    var METERS_PER_MILE = 1609;
    let getnearby = await Land.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [
              getlandData.location.coordinates.lattitude,
              getlandData.location.coordinates.longitude,
            ],
          },
          $maxDistance: 1.24274 * METERS_PER_MILE,
        },
      },
    });

    let SData;
    if (getnearby.length > 0) {
      SData = await geolocation.create(geodata);
      res.status(200).json({
        status: 'success',
        results: getnearby.length,
        search: getnearby,
        queryId: SData._id,
      });
    } else {
      res.status(200).json({
        status: 'success',
        results: getnearby.length,
        search: getnearby,
      });
    }
  } else if (gethotelData) {
    let geodata = {
      propertyType: 'Hotel',
      propertyId: req.body.propertyId,
      'location.coordinates.lattitude':
        gethotelData.location.coordinates.lattitude,
      'location.coordinates.longitude':
        gethotelData.location.coordinates.longitude,
      type: 'Point',
    };

    var METERS_PER_MILE = 1609;
    let getnearby = await Hotel.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [
              gethotelData.location.coordinates.longitude,
              gethotelData.location.coordinates.lattitude,
            ],
          },
          $maxDistance: 1.24274 * METERS_PER_MILE,
        },
      },
    });

    let SData;
    if (getnearby.length > 0) {
      SData = await geolocation.create(geodata);
      res.status(200).json({
        status: 'success',
        results: getnearby.length,
        search: getnearby,
        queryId: SData._id,
      });
    } else {
      res.status(200).json({
        status: 'success',
        results: getnearby.length,
        getnearby,
      });
    }
  } else if (getWarehouseData) {
    let geodata = {
      propertyType: 'Warehouse',
      propertyId: req.body.propertyId,
      'location.coordinates.lattitude':
        getWarehouseData.location.coordinates.lattitude,
      'location.coordinates.longitude':
        getWarehouseData.location.coordinates.longitude,
      type: 'Point',
    };

    var METERS_PER_MILE = 1609;
    let getnearby = await WareHouse.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [
              getWarehouseData.location.coordinates.longitude,
              getWarehouseData.location.coordinates.lattitude,
            ],
          },
          $maxDistance: 1.24274 * METERS_PER_MILE,
        },
      },
    });

    let SData;
    if (getnearby.length > 0) {
      SData = await geolocation.create(geodata);
      res.status(200).json({
        status: 'success',
        results: getnearby.length,
        search: getnearby,
        queryId: SData._id,
      });
    } else {
      res.status(200).json({
        status: 'success',
        results: getnearby.length,
        search: getnearby,
      });
    }
  } else {
    res.status(200).json({
      status: 'error',
      message: 'No Property found',
    });
  }
});
