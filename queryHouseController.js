const express = require('express');
const HouseQuery = require('../../models/queryModels/houseModel');
const catchAsync = require('../../utils/catchAsync');
const House = require('../../models/houseModel');

exports.getQueryById = catchAsync(async (req, res, next) => {
  let getQueryData = await HouseQuery.findById({ _id: req.params.id });
  console.log(getQueryData);
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
              'attributes.bedroom': { $in: [getQueryData.attributes.bedroom] },
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
              'attributes.balcony': { $in: [getQueryData.attributes.balcony] },
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
              'attributes.bedroom': { $in: [getQueryData.attributes.bedroom] },
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
              'attributes.balcony': { $in: [getQueryData.attributes.balcony] },
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
    });
  }
});