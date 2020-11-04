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

  //console.log(getQueryHotel);
  if (getQueryData) {
    if (getQueryData.categoryType === 'House' && getQueryData.page2 === false) {
      console.log('inside');
      let maxcost = getQueryData.cost.max;
      let mincost = getQueryData.cost.min;

      var search = await House.aggregate([
        {
          $match: {
            $or: [
              //$or
              {
                'attributes.bedroom': {
                  $in: [getQueryData.attributes.bedroom],
                },
              },
              {
                'attributes.opticalfiber': {
                  $in: [getQueryData.attributes.opticalfiber],
                },
              },
              {
                'attributes.swimmingpool': {
                  $in: [getQueryData.attributes.swimmingpool],
                },
              },
              {
                'attributes.fireplace': {
                  $in: [getQueryData.attributes.fireplace],
                },
              },
              {
                'attributes.petsallowed': {
                  $in: [getQueryData.attributes.petsallowed],
                },
              },
              {
                'attributes.solarhotwater': {
                  $in: [getQueryData.attributes.solarhotwater],
                },
              },
              {
                'attributes.waterfront': {
                  $in: [getQueryData.attributes.waterfront],
                },
              },
              {
                'attributes.disabilityfeature': {
                  $in: [getQueryData.attributes.disabilityfeature],
                },
              },
              {
                'attributes.maturegarden': {
                  $in: [getQueryData.attributes.maturegarden],
                },
              },
              {
                'attributes.cctv': { $in: [getQueryData.attributes.cctv] },
              },
              {
                'attributes.borehole': {
                  $in: [getQueryData.attributes.borehole],
                },
              },
              {
                'attributes.balcony': {
                  $in: [getQueryData.attributes.balcony],
                },
              },
              {
                'attributes.partyarea': {
                  $in: [getQueryData.attributes.partyarea],
                },
              },
              {
                'attributes.mainCategory': {
                  $in: [getQueryData.attributes.mainCategory],
                },
              },
              {
                'sellerDetails.location': {
                  $in: [getQueryData.area],
                },
              },
            ],
          },
        },

        {
          $match: {
            isFlipbook: true,
            'attributes.mainCategory': `${getQueryData.attributes.mainCategory}`,
            'attributes.subCategory': `${getQueryData.attributes.subCategory}`,
            'attributes.propertyStatus': `${getQueryData.attributes.propertyStatus}`,
          },
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
    if (getQueryData.categoryType === 'House' && getQueryData.page2 === true) {
      console.log('inside');
      let maxcost = getQueryData.cost.max;
      let mincost = getQueryData.cost.min;

      var search = await House.aggregate([
        {
          $match: {
            $or: [
              //$or
              {
                'attributes.bedroom': {
                  $in: [getQueryData.attributes.bedroom],
                },
              },
              {
                'attributes.opticalfiber': {
                  $in: [getQueryData.attributes.opticalfiber],
                },
              },
              {
                'attributes.swimmingpool': {
                  $in: [getQueryData.attributes.swimmingpool],
                },
              },
              {
                'attributes.fireplace': {
                  $in: [getQueryData.attributes.fireplace],
                },
              },
              {
                'attributes.petsallowed': {
                  $in: [getQueryData.attributes.petsallowed],
                },
              },
              {
                'attributes.solarhotwater': {
                  $in: [getQueryData.attributes.solarhotwater],
                },
              },
              {
                'attributes.waterfront': {
                  $in: [getQueryData.attributes.waterfront],
                },
              },
              {
                'attributes.disabilityfeature': {
                  $in: [getQueryData.attributes.disabilityfeature],
                },
              },
              {
                'attributes.maturegarden': {
                  $in: [getQueryData.attributes.maturegarden],
                },
              },
              {
                'attributes.cctv': { $in: [getQueryData.attributes.cctv] },
              },
              {
                'attributes.borehole': {
                  $in: [getQueryData.attributes.borehole],
                },
              },
              {
                'attributes.balcony': {
                  $in: [getQueryData.attributes.balcony],
                },
              },
              {
                'attributes.partyarea': {
                  $in: [getQueryData.attributes.partyarea],
                },
              },
              {
                'attributes.mainCategory': {
                  $in: [getQueryData.attributes.mainCategory],
                },
              },
              {
                'sellerDetails.location': {
                  $in: [getQueryData.area],
                },
              },
            ],
          },
        },

        {
          $match: {
            isFlipbook: true,
            'attributes.mainCategory': `${getQueryData.attributes.mainCategory}`,
            'attributes.subCategory': `${getQueryData.attributes.subCategory}`,
            'attributes.propertyStatus': `${getQueryData.attributes.propertyStatus}`,
          },
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
    if (
      getQueryLand.categoryType === 'Land' &&
      getQueryLand.page2 === false &&
      getQueryLand.page3 === false
    ) {
      let maxcost = getQueryLand.cost.max;
      let mincost = getQueryLand.cost.min;

      let minsizeinacres = getQueryLand.sizeinacres.min;
      let maxsizeinacres = getQueryLand.sizeinacres.max;
      console.log(getQueryLand);
      var search = await Land.aggregate([
        {
          $match: {
            $or: [
              //$or
              {
                'attributes.mainCategory': {
                  $in: [getQueryLand.attributes.mainCategory],
                },
              },
              {
                'attributes.leasefreehold': {
                  $in: [getQueryLand.attributes.leasefreehold],
                },
              },

              {
                'sellerDetails.location': `${getQueryLand.area}`,
              },
            ],
          },
        },

        {
          $match: {
            isFlipbook: true,
            'attributes.cost': { $lte: maxcost, $gte: mincost },
            'attributes.sizeinacres': {
              $lte: maxsizeinacres,
              $gte: minsizeinacres,
            },
            'attributes.mainCategory': {
              $in: [getQueryLand.attributes.mainCategory],
            },

            //   'sellerDetails.location': `${location}`,
          },
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
    if (
      getQueryLand.categoryType === 'Land' &&
      getQueryLand.page2 === true &&
      getQueryLand.page3 === false
    ) {
      let maxcost = getQueryLand.cost.max;
      let mincost = getQueryLand.cost.min;

      let minsizeinacres = getQueryLand.sizeinacres.min;
      let maxsizeinacres = getQueryLand.sizeinacres.max;
      var search = await Land.aggregate([
        {
          $match: {
            $or: [
              //$or
              {
                'attributes.mainCategory': {
                  $in: [getQueryLand.attributesmainCategory],
                },
              },
              {
                'attributes.soilType': {
                  $in: [getQueryLand.attributes.soilType],
                },
              },
              {
                'attributes.nature': { $in: [getQueryLand.attributes.nature] },
              },
              { 'attributes.road': { $in: [getQueryLand.attributes.road] } },
              {
                'attributes.maturegarden': {
                  $in: [getQueryLand.attributes.maturegarden],
                },
              },
              {
                'attributes.leasefreehold': {
                  $in: [getQueryLand.attributes.leasefreehold],
                },
              },
              // {
              //   'attributes.lease': { $in: [lease] },
              // },
              {
                'attributes.councilwater': {
                  $in: [getQueryLand.attributes.councilwater],
                },
              },
              {
                'attributes.electricity': {
                  $in: [getQueryLand.attributes.electricity],
                },
              },
              {
                'attributes.controlleddevelopment': {
                  $in: [getQueryLand.attributes.controlleddevelopment],
                },
              },
              {
                'attributes.borehole': {
                  $in: [getQueryLand.attributes.borehole],
                },
              },
              {
                'attributes.readyfence': {
                  $in: [getQueryLand.attributes.readyfence],
                },
              },
              {
                'attributes.waterfront': {
                  $in: [getQueryLand.attributes.waterfront],
                },
              },
              {
                'attributes.gated': { $in: [getQueryLand.attributes.gated] },
              },
              {
                'sellerDetails.location': `${getQueryLand.area}`,
              },
            ],
          },
        },

        {
          $match: {
            isFlipbook: true,
            // 'attributes.soilType': { $lte: soilType },
            // 'attributes.nature': { $lte: nature },
            // 'attributes.road': { $lte: road }, //3 - RADIO BUTTONS

            'attributes.cost': { $lte: maxcost, $gte: mincost },
            'attributes.sizeinacres': {
              $lte: maxsizeinacres,
              $gte: minsizeinacres,
            },
            //'sellerDetails.location': `${location}`,
          },
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
    if (
      getQueryLand.categoryType === 'Land' &&
      getQueryLand.page2 === false &&
      getQueryLand.page3 === true
    ) {
      let maxcost = getQueryLand.cost.max;
      let mincost = getQueryLand.cost.min;

      let minsizeinacres = getQueryLand.sizeinacres.min;
      let maxsizeinacres = getQueryLand.sizeinacres.max;
      let kmtoshoppingcenter = getQueryLand.kmtoshoppingcenter;
      let kmtoneighbour = getQueryLand.kmtoneighbour;
      let kmtotarmac = getQueryLand.kmtotarmac;
      let kmtowater = getQueryLand.kmtowater;
      let kmtoelectricity = getQueryLand.kmtoelectricity;

      var search = await Land.aggregate([
        {
          $match: {
            $or: [
              //$or
              {
                'attributes.mainCategory': {
                  $in: [getQueryLand.attributesmainCategory],
                },
              },
              {
                'attributes.soilType': {
                  $in: [getQueryLand.attributes.soilType],
                },
              },
              {
                'attributes.nature': { $in: [getQueryLand.attributes.nature] },
              },
              { 'attributes.road': { $in: [getQueryLand.attributes.road] } },
              {
                'attributes.maturegarden': {
                  $in: [getQueryLand.attributes.maturegarden],
                },
              },
              {
                'attributes.leasefreehold': {
                  $in: [getQueryLand.attributes.leasefreehold],
                },
              },
              // {
              //   'attributes.lease': { $in: [lease] },
              // },
              {
                'attributes.councilwater': {
                  $in: [getQueryLand.attributes.councilwater],
                },
              },
              {
                'attributes.electricity': {
                  $in: [getQueryLand.attributes.electricity],
                },
              },
              {
                'attributes.controlleddevelopment': {
                  $in: [getQueryLand.attributes.controlleddevelopment],
                },
              },
              {
                'attributes.borehole': {
                  $in: [getQueryLand.attributes.borehole],
                },
              },
              {
                'attributes.readyfence': {
                  $in: [getQueryLand.attributes.readyfence],
                },
              },
              {
                'attributes.waterfront': {
                  $in: [getQueryLand.attributes.waterfront],
                },
              },
              {
                'attributes.gated': { $in: [getQueryLand.attributes.gated] },
              },
              {
                'sellerDetails.location': `${getQueryLand.area}`,
              },
            ],
          },
        },

        {
          $match: {
            isFlipbook: true,
            // 'attributes.soilType': { $lte: soilType },
            // 'attributes.nature': { $lte: nature },
            // 'attributes.road': { $lte: road }, //3 - RADIO BUTTONS

            'attributes.cost': { $lte: maxcost, $gte: mincost },
            'attributes.sizeinacres': {
              $lte: maxsizeinacres,
              $gte: minsizeinacres,
            },

            'attributes.kmtoshoppingcenter': {
              $lte: kmtoshoppingcenter,
            },
            'attributes.kmtoneighbour': {
              $lte: kmtoneighbour,
            },
            'attributes.kmtotarmac': { $lte: kmtotarmac },
            'attributes.kmtowater': { $lte: kmtowater },
            'attributes.kmtoelectricity': {
              $lte: kmtoelectricity,
            },

            //'sellerDetails.location': `${location}`,
          },
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
    console.log(getQueryHotel);
    if (
      getQueryHotel.categoryType === 'Hotel' &&
      getQueryHotel.page2 === false
    ) {
      console.log('inside');

      let bedbreakfastcost = getQueryHotel.bedbreakfastcost;
      let minbedbreakfastcost = bedbreakfastcost.min;
      let maxbedbreakfastcost = bedbreakfastcost.max;

      var search = await Hotel.aggregate([
        {
          $match: {
            $or: [
              //$or
              { 'propertyDetails.propertyName': `${getQueryHotel.hotelname}` },
              { 'sellerDetails.location': `${getQueryHotel.area}` },
              { 'attributes.class': `${getQueryHotel.attributes.class}` },
            ],
          },
        },

        {
          $match: {
            isFlipbook: true,
            //  'attributes.cost': { $lte: cost },
            // 'attributes.area': { $lte: area },
            'attributes.class': `${getQueryHotel.attributes.class}`,
            // 'propertyDetails.propertyName': `${hotelname}`,
            // 'sellerDetails.location': `${area}`,
            'attributes.locality': { $in: [getQueryHotel.attributes.locality] },
            'attributes.kmfromtarmac': { $lte: getQueryHotel.kmfromtarmac },
            'attributes.conferenceroom': { $lte: getQueryHotel.conferenceroom },
            'attributes.bedbreakfastcost': {
              $lte: maxbedbreakfastcost,
              $gte: minbedbreakfastcost,
            },
          },
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
    if (
      getQueryHotel.categoryType === 'Hotel' &&
      getQueryHotel.page2 === true
    ) {
      console.log('inside page 2');

      let hotelname = getQueryHotel.Hotel;

      let bedbreakfastcost = getQueryHotel.bedbreakfastcost;
      let minbedbreakfastcost = bedbreakfastcost.min;
      let maxbedbreakfastcost = bedbreakfastcost.max;

      var search = await Hotel.aggregate([
        {
          $match: {
            $or: [
              //$or
              { 'propertyDetails.propertyName': `${getQueryHotel.Hotel}` },
              { 'sellerDetails.location': `${getQueryHotel.area}` },
              {
                'attributes.carpark': {
                  $in: [getQueryHotel.attributes.carpark],
                },
              },
              {
                'attributes.petsallowed': {
                  $in: [getQueryHotel.attributes.pet],
                },
              },
              {
                'attributes.aircon': { $in: [getQueryHotel.attributes.aircon] },
              },
              {
                'attributes.spa': { $in: [getQueryHotel.attributes.spa] },
              },
              {
                'attributes.freshoutdoors': {
                  $in: [getQueryHotel.attributes.freshoutdoors],
                },
              },
              {
                'attributes.indoorpool': {
                  $in: [getQueryHotel.attributes.indoorpool],
                },
              },
              {
                'attributes.disabilityaccess': {
                  $in: [getQueryHotel.attributes.disabilityaccess],
                },
              },
              {
                'attributes.barlounge': {
                  $in: [getQueryHotel.attributes.barlounge],
                },
              },
              {
                'attributes.hairsalon': {
                  $in: [getQueryHotel.attributes.hairsalon],
                },
              },
              { 'attributes.class': `${getQueryHotel.attributes.class}` },
            ],
          },
        },

        {
          $match: {
            isFlipbook: true,
            //  'attributes.cost': { $lte: cost },
            // 'attributes.area': { $lte: area },
            'attributes.class': `${getQueryHotel.attributes.class}`,
            // 'propertyDetails.propertyName': `${hotelname}`,
            // 'sellerDetails.location': `${area}`,
            'attributes.locality': { $in: [getQueryHotel.attributes.locality] },
            'attributes.kmfromtarmac': { $lte: getQueryHotel.kmfromtarmac },
            'attributes.conferenceroom': { $lte: getQueryHotel.conferenceroom },
            'attributes.bedbreakfastcost': {
              $lte: maxbedbreakfastcost,
              $gte: minbedbreakfastcost,
            },
          },
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
    if (
      getQueryWarehouse.categoryType === 'Warehouse' &&
      getQueryWarehouse.page2 === false &&
      getQueryWarehouse.page3 === false
    ) {
      let Type = getQueryWarehouse.attributes.Type;

      let area = getQueryWarehouse.area;

      let cost = getQueryWarehouse.cost;
      let mincost = getQueryWarehouse.cost.min;
      let maxcost = getQueryWarehouse.cost.max;

      let sizeinfeet = getQueryWarehouse.sizeinfeet;
      let minsizeinfeet = getQueryWarehouse.sizeinfeet.min;
      let maxsizeinfeet = getQueryWarehouse.sizeinfeet.max;

      let kmfromtarmac = getQueryWarehouse.kmfromtarmac;

      var search = await WareHouse.aggregate([
        {
          $match: {
            isFlipbook: true,
            'attributes.Type': { $in: [Type] },
            'attributes.cost': { $lte: maxcost, $gte: mincost },
            'attributes.sizeinfeet': {
              $lte: maxsizeinfeet,
              $gte: minsizeinfeet,
            },
            'attributes.kmfromtarmac': { $lte: kmfromtarmac },
            // 'attributes.area': { $lte: area },
            //do this spelling tarmac
          },
        },
        {
          $match: {
            $or: [
              //$or
              { 'sellerDetails.location': `${area}` },
              { 'attributes.Type': { $in: [Type] } },
            ],
          },
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
    if (
      getQueryWarehouse.categoryType === 'Warehouse' &&
      getQueryWarehouse.page2 === true &&
      getQueryWarehouse.page3 === false
    ) {
      let Type = getQueryWarehouse.attributes.Type;

      let area = getQueryWarehouse.area;

      let cost = getQueryWarehouse.cost;
      let mincost = getQueryWarehouse.cost.min;
      let maxcost = getQueryWarehouse.cost.max;

      let sizeinfeet = getQueryWarehouse.sizeinfeet;
      let minsizeinfeet = getQueryWarehouse.sizeinfeet.min;
      let maxsizeinfeet = getQueryWarehouse.sizeinfeet.max;

      let kmfromtarmac = getQueryWarehouse.kmfromtarmac;

      let conferencefacilites = getQueryWarehouse.conferencefacilites;
      let freshoutdoors = getQueryWarehouse.freshoutdoors;
      let aircon = getQueryWarehouse.aircon;
      let fullyfurnished = getQueryWarehouse.fullyfurnished;
      let landscapegarden = getQueryWarehouse.landscapegarden;
      let wifi = getQueryWarehouse.wifi;
      let sharedsecretary = getQueryWarehouse.sharedsecretary;

      var search = await WareHouse.aggregate([
        {
          $match: {
            $or: [
              //$or
              { 'sellerDetails.location': `${area}` },
              {
                'attributes.conferencefacilites': {
                  $in: [conferencefacilites],
                },
              },
              {
                'attributes.freshoutdoors': { $in: [freshoutdoors] },
              },
              {
                'attributes.aircon': { $in: [aircon] },
              },
              {
                'attributes.fullyfurnished': { $in: [fullyfurnished] },
              },
              {
                'attributes.sharedsecretary': {
                  $in: [sharedsecretary],
                },
              },
              {
                'attributes.landscapegarden': { $in: [landscapegarden] },
              },
              {
                'attributes.wifi': { $in: [wifi] },
              },
              { 'attributes.Type': { $in: [Type] } },
            ],
          },
        },

        {
          $match: {
            isFlipbook: true,

            'attributes.Type': { $in: [Type] },
            'attributes.cost': { $lte: maxcost, $gte: mincost },

            'attributes.sizeinfeet': {
              $lte: maxsizeinfeet,
              $gte: minsizeinfeet,
            },
            'attributes.kmfromtarmac': { $lte: kmfromtarmac },
          },
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
    if (
      getQueryWarehouse.categoryType === 'Warehouse' &&
      getQueryWarehouse.page2 === false &&
      getQueryWarehouse.page3 === true
    ) {
      let Type = getQueryWarehouse.attributes.Type;

      let area = getQueryWarehouse.area;

      let cost = getQueryWarehouse.cost;
      let mincost = getQueryWarehouse.cost.min;
      let maxcost = getQueryWarehouse.cost.max;

      let sizeinfeet = getQueryWarehouse.sizeinfeet;
      let minsizeinfeet = getQueryWarehouse.sizeinfeet.min;
      let maxsizeinfeet = getQueryWarehouse.sizeinfeet.max;

      let kmfromtarmac = getQueryWarehouse.kmfromtarmac;

      let conferencefacilites =
        getQueryWarehouse.attributes.conferencefacilites;
      let freshoutdoors = getQueryWarehouse.attributes.freshoutdoors;
      let aircon = getQueryWarehouse.attributes.aircon;
      let fullyfurnished = getQueryWarehouse.attributes.fullyfurnished;
      let landscapegarden = getQueryWarehouse.attributes.landscapegarden;
      let wifi = getQueryWarehouse.attributes.wifi;
      let sharedsecretary = getQueryWarehouse.attributes.sharedsecretary;

      let zoning = getQueryWarehouse.attributes.zoning;

      let townLocation = getQueryWarehouse.attributes.townLocation;

      let accessRoad = getQueryWarehouse.attributes.accessRoad;

      let tenants = getQueryWarehouse.attributes.tenants;

      let elevator = getQueryWarehouse.attributes.elevator;

      let security = getQueryWarehouse.attributes.security;

      let vehicleTraffic = getQueryWarehouse.attributes.vehicleTraffic;

      let humanTraffic = getQueryWarehouse.attributes.humanTraffic;

      let meetingRoom = getQueryWarehouse.attributes.meetingRoom;

      let parking = getQueryWarehouse.attributes.parking;

      var search = await WareHouse.aggregate([
        {
          $match: {
            $or: [
              {
                'attributes.conferencefacilites': {
                  $in: [conferencefacilites],
                },
              },
              {
                'attributes.freshoutdoors': { $in: [freshoutdoors] },
              },
              {
                'attributes.aircon': { $in: [aircon] },
              },
              {
                'attributes.fullyfurnished': { $in: [fullyfurnished] },
              },
              {
                'attributes.sharedsecretary': {
                  $in: [sharedsecretary],
                },
              },
              {
                'attributes.landscapegarden': { $in: [landscapegarden] },
              },
              {
                'attributes.wifi': { $in: [wifi] },
              },
              { 'sellerDetails.location': `${area}` },
              {
                'attributes.zoning': { $in: [zoning] },
                'attributes.townLocation': { $in: [townLocation] },
                'attributes.accessRoad': { $in: [accessRoad] },
                'attributes.tenants': { $in: [tenants] },
                'attributes.elevator': { $in: [elevator] },
                'attributes.security': { $in: [security] },
                'attributes.vehicleTraffic': { $in: [vehicleTraffic] },
                'attributes.humanTraffic': { $in: [humanTraffic] },
                'attributes.meetingRoom': { $in: [meetingRoom] },
                'attributes.parking': { $in: [parking] },
              },
              {
                'attributes.Type': { $in: [Type] },
              },
            ],
          },
        },

        {
          $match: {
            isFlipbook: true,

            'attributes.Type': { $in: [Type] },

            'attributes.cost': { $lte: maxcost, $gte: mincost },

            'attributes.sizeinfeet': {
              $lte: maxsizeinfeet,
              $gte: minsizeinfeet,
            },
            'attributes.kmfromtarmac': { $lte: kmfromtarmac },
          },
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
      console.log('inside land');
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
      console.log('inside land');
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
      console.log('inside Hotel query');
      console.log(getGeoQuery);
      console.log(getGeoQuery.location.coordinates.lattitude);
      console.log(getGeoQuery.location.coordinates.longitude);
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
      console.log('inside Warehouse');
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
    console.log('in HOUSE');

    console.log(getHouseData);
    console.log(getHouseData.createdAt);
    console.log(getHouseData.location.coordinates.lattitude);
    console.log(getHouseData.location.coordinates.longitude);
    let geodata = {
      propertyType: 'House',
      propertyId: getHouseData._id,
      'location.coordinates.lattitude':
        getHouseData.location.coordinates.lattitude,
      'location.coordinates.longitude':
        getHouseData.location.coordinates.longitude,
      type: 'Point',
    };
    // console.log(geodata);
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
    console.log('in Land');
    // console.log(getlandData);
    // console.log(getlandData.createdAt);
    // console.log(getlandData.location.coordinates.lattitude);
    // console.log(getlandData.location.coordinates.longitude);
    let geodata = {
      propertyType: 'Land',
      propertyId: req.body.propertyId,
      'location.coordinates.lattitude':
        getlandData.location.coordinates.lattitude,
      'location.coordinates.longitude':
        getlandData.location.coordinates.longitude,
      type: 'Point',
    };
    // console.log(geodata);
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
      /**************************************************** */
    } else {
      res.status(200).json({
        status: 'success',
        results: getnearby.length,
        search: getnearby,
      });
    }
  } else if (gethotelData) {
    console.log('inside hotel');
    console.log(gethotelData.location);
    console.log(gethotelData.createdAt);
    console.log(gethotelData.location.coordinates.lattitude);
    console.log(gethotelData.location.coordinates.longitude);
    let geodata = {
      propertyType: 'Hotel',
      propertyId: req.body.propertyId,
      'location.coordinates.lattitude':
        gethotelData.location.coordinates.lattitude,
      'location.coordinates.longitude':
        gethotelData.location.coordinates.longitude,
      type: 'Point',
    };
    // console.log(geodata);
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
      /**************************************************** */
    } else {
      res.status(200).json({
        status: 'success',
        results: getnearby.length,
        getnearby,
      });
    }
  } else if (getWarehouseData) {
    console.log('in Warehouse');

    console.log(getWarehouseData);
    console.log(getWarehouseData.createdAt);
    console.log(getWarehouseData.location.coordinates.lattitude);
    console.log(getWarehouseData.location.coordinates.longitude);
    let geodata = {
      propertyType: 'Warehouse',
      propertyId: req.body.propertyId,
      'location.coordinates.lattitude':
        getWarehouseData.location.coordinates.lattitude,
      'location.coordinates.longitude':
        getWarehouseData.location.coordinates.longitude,
      type: 'Point',
    };
    // console.log(geodata);
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
      /**************************************************** */
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
