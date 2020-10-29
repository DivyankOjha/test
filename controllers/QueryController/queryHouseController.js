const express = require('express');
const HouseQuery = require('../../models/queryModels/houseModel');
const catchAsync = require('../../utils/catchAsync');
const House = require('../../models/houseModel');
const LandQuery = require('../../models/queryModels/landModel');
const Land = require('../../models/landModel');
const HotelQuery = require('../../models/queryModels/hotelModel');
const Hotel = require('../../models/hotelModel');

exports.getQueryById = catchAsync(async (req, res, next) => {
  let getQueryData = await HouseQuery.findById({ _id: req.params.id });
  let getQueryLand = await LandQuery.findById({ _id: req.params.id });
  let getQueryHotel = await HotelQuery.findById({ _id: req.params.id });
  console.log(getQueryHotel);
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
      res.status(200).json({
        status: 'success',
        results: search.length,
        search,
        getQueryData,
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
      res.status(200).json({
        status: 'success',
        results: search.length,
        search,
        getQueryData,
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
      res.status(200).json({
        status: 'success',
        results: search.length,
        search,
        getQueryLand,
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
      res.status(200).json({
        status: 'success',
        results: search.length,
        search,
        getQueryLand,
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
      res.status(200).json({
        status: 'success',
        results: search.length,
        search,
        getQueryLand,
      });
    }
  }
  if (getQueryHotel) {
    if (
      getQueryHotel.categoryType === 'Hotel' &&
      getQueryHotel.page2 === false
    ) {
      console.log('inside');
      // let area = getQueryData.area;
      //let area = areaC.toLowerCase();
      //let hotelname = getQueryData.Hotel;

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
      res.status(200).json({
        status: 'success',
        results: search.length,
        search,
        getQueryHotel,
      });
    }
    if (
      getQueryHotel.categoryType === 'Hotel' &&
      getQueryHotel.page2 === true
    ) {
      console.log('inside page 2');
      // let area = getQueryData.area;
      //let area = areaC.toLowerCase();
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
      res.status(200).json({
        status: 'success',
        results: search.length,
        search,
        getQueryHotel,
      });
    }
  }
});
