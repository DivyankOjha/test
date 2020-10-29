const catchAsync = require('./../utils/catchAsync');

const House = require('./../models/houseModel');
const Land = require('./../models/landModel');
const Hotel = require('./../models/hotelModel');
const WareHouse = require('./../models/warehouseModel');
const User = require('../models/userModel');
const HouseQuery = require('../models/queryModels/houseModel');
const LandQuery = require('../models/queryModels/landModel');
const HotelQuery = require('../models/queryModels/hotelModel');

exports.searchHouse1 = catchAsync(async (req, res) => {
  let testbodt = req.body;
  console.log(testbodt);
  let mincost;
  let maxcost;
  if (req.body.cost) {
    mincost = req.body.cost.min;
    maxcost = req.body.cost.max;
  }

  console.log(mincost, maxcost);
  let attributes = req.body.attributes;
  let area = req.body.area;

  let mainCategory = attributes.mainCategory;
  let propertyStatus = attributes.propertyStatus;
  let subCategory = attributes.subCategory;

  let opticalfiber = attributes.opticalfiber;
  let swimmingpool = attributes.swimmingpool;
  let fireplace = attributes.fireplace;
  let petsallowed = attributes.petsallowed;
  let solarhotwater = attributes.solarhotwater;
  let waterfront = attributes.waterfront;
  let cctv = attributes.cctv;
  let borehole = attributes.borehole;
  let disabilityfeature = attributes.disabilityfeature;
  let maturegarden = attributes.maturegarden;
  let balcony = attributes.balcony;
  let partyarea = attributes.partyarea;

  let bedroom = attributes.bedroom;

  if (mainCategory && !bedroom && !subCategory && !propertyStatus && !area) {
    console.log('inside main category');
    var search = await House.aggregate([
      {
        $match: {
          isFlipbook: true,
          'attributes.mainCategory': { $in: [mainCategory] },
        },
      },
    ]);
    let SData;
    if (search.length > 0) {
      /**************************************************** */
      SData = await HouseQuery.create(req.body);
      console.log(SData._id);

      res.status(200).json({
        status: 'success',
        results: search.length,
        queryId: SData._id,
        search,
      });

      /**************************************************** */
    } else {
      res.status(200).json({
        status: 'success',
        results: search.length,
        search,
      });
    }
  } else if (mainCategory && bedroom && !subCategory && !area) {
    console.log('inside maincategory+bedroom');
    var search = await House.aggregate([
      {
        $match: {
          'attributes.mainCategory': { $in: [mainCategory] },
          'attributes.bedroom': { $eq: bedroom },
        },
      },
    ]);
    let SData;
    if (search.length > 0) {
      /**************************************************** */
      SData = await HouseQuery.create(req.body);
      console.log(SData._id);

      res.status(200).json({
        status: 'success',
        results: search.length,
        queryId: SData._id,
        search,
      });

      /**************************************************** */
    } else {
      res.status(200).json({
        status: 'success',
        results: search.length,
        search,
      });
    }
  }

  // var search = await House.aggregate([
  //   {
  //     $match: {
  //       'attributes.mainCategory': { $in: [mainCategory] },
  //       'attributes.subCategory': `${subCategory}`,

  //       $or: [
  //         {
  //           'attributes.mainCategory': { $in: [mainCategory] },
  //         },

  //         {
  //           'attributes.subCategory': `${subCategory}`,
  //         },
  //         {
  //           'attributes.subCategory': `${propertyStatus}`,
  //         },
  //       ],
  //       $or: [
  //         //$or
  //         {
  //           'attributes.bedroom': { $in: [bedroom] },
  //         },
  //         {
  //           'attributes.opticalfiber': { $in: [opticalfiber] },
  //         },
  //         {
  //           'attributes.swimmingpool': { $in: [swimmingpool] },
  //         },
  //         {
  //           'attributes.fireplace': { $in: [fireplace] },
  //         },
  //         {
  //           'attributes.petsallowed': { $in: [petsallowed] },
  //         },
  //         {
  //           'attributes.solarhotwater': { $in: [solarhotwater] },
  //         },
  //         {
  //           'attributes.waterfront': { $in: [waterfront] },
  //         },
  //         {
  //           'attributes.disabilityfeature': { $in: [disabilityfeature] },
  //         },
  //         {
  //           'attributes.maturegarden': { $in: [maturegarden] },
  //         },
  //         {
  //           'attributes.cctv': { $in: [cctv] },
  //         },
  //         {
  //           'attributes.borehole': { $in: [borehole] },
  //         },
  //         {
  //           'attributes.balcony': { $in: [balcony] },
  //         },
  //         {
  //           'attributes.partyarea': { $in: [partyarea] },
  //         },
  //         {
  //           'attributes.mainCategory': `${mainCategory}`,
  //         },
  //         {
  //           'sellerDetails.location': `${area}`,
  //         },
  //       ],
  //       'attributes.cost': { $lte: maxcost, $gte: mincost },
  //     },
  //   },

  //   // {
  //   //   $match: {
  //   //     isFlipbook: true,

  //   //     // 'attributes.area': { $lte: areaint },

  //   //     'attributes.subCategory': `${subCategory}`,
  //   //     'attributes.propertyStatus': `${propertyStatus}`,

  //   //     //'attributes.bedroom': { $eq: bedroom }, //try this...

  //   //     //  'sellerDetails.location': `${location}`,
  //   //   },
  //   // },

  //   //  $group: { _id: null, count: { $sum: 1 } },
  // ]);

  // let SData;
  // if (search.length > 0) {
  //   /**************************************************** */
  //   SData = await HouseQuery.create(req.body);
  //   console.log(SData._id);

  //   res.status(200).json({
  //     status: 'success',
  //     results: search.length,
  //     queryId: SData._id,
  //     search,
  //   });

  //   /**************************************************** */
  // } else {
  //   res.status(200).json({
  //     status: 'success',
  //     results: search.length,
  //     search,
  //   });
  // }
});
exports.searchHouse = catchAsync(async (req, res) => {
  let testbodt = req.body;
  console.log(testbodt);
  let mincost = req.body.cost.min;
  let maxcost = req.body.cost.max;
  console.log(mincost, maxcost);
  let attributes = req.body.attributes;
  //console.log(attributes);
  //let location = req.body.attributes.location;
  let area = req.body.area;
  // let area = req.body.attributes.area;
  //  let areaint = parseInt(area);
  // console.log(areaint);
  let mainCategory = attributes.mainCategory;

  let propertyStatus = attributes.propertyStatus;

  let subCategory = attributes.subCategory;

  //const att = attributes.console.log(attributes);

  let opticalfiber = attributes.opticalfiber;
  let swimmingpool = attributes.swimmingpool;
  let fireplace = attributes.fireplace;
  let petsallowed = attributes.petsallowed;
  let solarhotwater = attributes.solarhotwater;
  let waterfront = attributes.waterfront;
  let cctv = attributes.cctv;
  let borehole = attributes.borehole;
  let disabilityfeature = attributes.disabilityfeature;
  let maturegarden = attributes.maturegarden;
  let balcony = attributes.balcony;
  let partyarea = attributes.partyarea;

  let gym = attributes.gym;
  let bedroom = attributes.bedroom;
  let bathrooms = attributes.bathrooms;
  let steambath = attributes.steambath;
  let lift = attributes.lift;
  let bathtab = attributes.bathtab;
  let parking = attributes.parking;

  let minliv = req.body.livingArea.min;
  let maxliv = req.body.livingArea.max;
  let mingarden = req.body.gardenArea.min;
  let maxgarden = req.body.gardenArea.max;
  let minkit = req.body.kitchenArea.min;
  let maxkit = req.body.kitchenArea.max;

  /********************Query************************************ */

  /************************************************************** */
  //main category, bedroom , subcategory, cost min max , attribute - checkbox number
  var search = await House.aggregate([
    {
      $match: {
        $or: [
          {
            'attributes.opticalfiber': { $in: [opticalfiber] },
          },
          {
            'attributes.swimmingpool': { $in: [swimmingpool] },
          },
          {
            'attributes.fireplace': { $in: [fireplace] },
          },
          {
            'attributes.petsallowed': { $in: [petsallowed] },
          },
          {
            'attributes.solarhotwater': { $in: [solarhotwater] },
          },
          {
            'attributes.waterfront': { $in: [waterfront] },
          },
          {
            'attributes.disabilityfeature': { $in: [disabilityfeature] },
          },
          {
            'attributes.maturegarden': { $in: [maturegarden] },
          },
          {
            'attributes.cctv': { $in: [cctv] },
          },
          {
            'attributes.borehole': { $in: [borehole] },
          },
          {
            'attributes.balcony': { $in: [balcony] },
          },
          {
            'attributes.partyarea': { $in: [partyarea] },
          },
          {
            'attributes.gym': { $in: [gym] },
          },
          // {
          //   'attributes.gym': { $gte: 0, $lte: gym },
          // },

          {
            'attributes.bathrooms': { $gte: 0, $lte: bathrooms },
          },
          {
            'attributes.steambath': { $gte: 0, $lte: steambath },
          },
          {
            'attributes.lift': { $gte: 0, $lte: lift },
          },
          {
            'attributes.bathtab': { $gte: bathtab }, //or same as above
          },
          {
            'attributes.parking': { $gte: 0, $lte: parking },
          },
          {
            'attributes.bedroom': { $in: [bedroom] },
          },
          {
            'attributes.mainCategory': `${mainCategory}`,
          },
          {
            'sellerDetails.location': `${area}`,
          },
        ],
      },
    },

    {
      $match: {
        isFlipbook: true,
        'attributes.cost': { $lte: maxcost, $gte: mincost },
        // 'attributes.area': { $lte: area },

        'attributes.mainCategory': `${mainCategory}`,
        'attributes.subCategory': subCategory,
        'attributes.propertyStatus': `${propertyStatus}`,

        //  'attributes.bedroom': { $eq: bedroom }, //try this...

        'attributes.livingsize': { $lte: maxliv, $gte: minliv },
        'attributes.kitchensize': { $lte: maxkit, $gte: minkit },
        'attributes.gardensize': { $lte: maxgarden, $gte: mingarden },
        //  'attributes.gym': { $gte: 0, $lte: gym },
        //   'sellerDetails.location': `${location}`,
      },
    },
  ]);
  let SData;
  if (search.length > 0) {
    SData = await HouseQuery.create(req.body);

    //  console.log(SData);
    console.log(SData._id);
    let updateSdata = await HouseQuery.findByIdAndUpdate(
      { _id: SData._id },
      {
        $set: {
          page2: true,
        },
      }
    );
    console.log(updateSdata);
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
}); //incomplete - radio on page 1 remaining

exports.searchLandPage1 = catchAsync(async (req, res) => {
  //  let location = req.body.location;

  let sizeinacres = req.body.sizeinacres;
  let minsizeinacres = sizeinacres.min;
  let maxsizeinacres = sizeinacres.max;
  let cost = req.body.cost;
  let mincost = req.body.cost.min;
  let maxcost = req.body.cost.max;
  let area = req.body.area;
  let attributes = req.body.attributes;
  let leasefreehold = attributes.leasefreehold;
  // let freehold = attributes.freehold;
  // let lease = attributes.lease;
  let mainCategory = attributes.mainCategory;

  console.log(mainCategory);
  var search = await Land.aggregate([
    {
      $match: {
        $or: [
          //$or
          {
            'attributes.mainCategory': { $in: [mainCategory] },
          },
          {
            'attributes.leasefreehold': { $in: [leasefreehold] },
          },
          // {
          //   'attributes.lease': { $in: [lease] },
          // },
          {
            'sellerDetails.location': `${area}`,
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
        'attributes.mainCategory': { $in: [mainCategory] },

        //   'sellerDetails.location': `${location}`,
      },
    },
  ]);

  let SData;
  if (search.length > 0) {
    /**************************************************** */
    SData = await LandQuery.create(req.body);
    console.log(SData._id);

    res.status(200).json({
      status: 'success',
      results: search.length,
      queryId: SData._id,
      search,
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

exports.searchLandPage2 = catchAsync(async (req, res) => {
  // let location = req.body.location;

  let sizeinacres = req.body.sizeinacres;
  let minsizeinacres = sizeinacres.min;
  let maxsizeinacres = sizeinacres.max;
  let cost = req.body.cost;
  let mincost = req.body.cost.min;
  let maxcost = req.body.cost.max;
  let area = req.body.area;
  let attributes = req.body.attributes;
  let leasefreehold = attributes.leasefreehold;
  // let freehold = attributes.freehold;
  // let lease = attributes.lease;
  let councilwater = attributes.councilwater;
  let electricity = attributes.electricity;
  let borehole = attributes.borehole;
  let readyfence = attributes.readyfence;
  let controlleddevelopment = attributes.controlleddevelopment;
  let maturegarden = attributes.maturegarden;
  let waterfront = attributes.waterfront;
  let gated = attributes.gated;
  let mainCategory = attributes.mainCategory;

  let soilType = attributes.soilType;

  let nature = attributes.nature;

  let road = attributes.road;
  var search = await Land.aggregate([
    {
      $match: {
        $or: [
          //$or
          {
            'attributes.mainCategory': { $in: [mainCategory] },
          },
          {
            'attributes.soilType': { $lte: soilType },
          },
          {
            'attributes.nature': { $lte: nature },
          },
          { 'attributes.road': { $lte: road } },
          {
            'attributes.maturegarden': { $in: [maturegarden] },
          },
          {
            'attributes.leasefreehold': { $in: [leasefreehold] },
          },
          // {
          //   'attributes.lease': { $in: [lease] },
          // },
          {
            'attributes.councilwater': { $in: [councilwater] },
          },
          {
            'attributes.electricity': { $in: [electricity] },
          },
          {
            'attributes.controlleddevelopment': {
              $in: [controlleddevelopment],
            },
          },
          {
            'attributes.borehole': { $in: [borehole] },
          },
          {
            'attributes.readyfence': { $in: [readyfence] },
          },
          {
            'attributes.waterfront': { $in: [waterfront] },
          },
          {
            'attributes.gated': { $in: [gated] },
          },
          {
            'sellerDetails.location': `${area}`,
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
  let SData;
  if (search.length > 0) {
    SData = await LandQuery.create(req.body);

    //  console.log(SData);
    console.log(SData._id);
    let updateSdata = await LandQuery.findByIdAndUpdate(
      { _id: SData._id },
      {
        $set: {
          page2: true,
        },
      }
    );
    console.log(updateSdata);
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
  // res.status(200).json({
  //   status: 'success',
  //   results: search.length,
  //   search,
  // });
});

exports.searchLandPage3 = catchAsync(async (req, res) => {
  let sizeinacres = req.body.sizeinacres;
  let minsizeinacres = sizeinacres.min;
  let maxsizeinacres = sizeinacres.max;
  let cost = req.body.cost;
  let mincost = req.body.cost.min;
  let maxcost = req.body.cost.max;
  let area = req.body.area;
  let attributes = req.body.attributes;

  let kmtoshoppingcenter = req.body.kmtoshoppingcenter;
  let kmtoneighbour = req.body.kmtoneighbour;
  let kmtotarmac = req.body.kmtotarmac;
  let kmtowater = req.body.kmtowater;
  let kmtoelectricity = req.body.kmtoelectricity;
  console.log(kmtoelectricity);

  let leasefreehold = attributes.leasefreehold;
  // let freehold = attributes.freehold;
  // let lease = attributes.lease;
  let councilwater = attributes.councilwater;
  let electricity = attributes.electricity;
  let borehole = attributes.borehole;
  let readyfence = attributes.readyfence;
  let controlleddevelopment = attributes.controlleddevelopment;
  let maturegarden = attributes.maturegarden;
  let waterfront = attributes.waterfront;
  let gated = attributes.gated;

  let soilType = attributes.soilType;

  let nature = attributes.nature;

  let road = attributes.road;

  // let soilType = attributes.soilType.toLowerCase();
  // let nature = attributes.nature.toLowerCase();
  // let road = attributes.road.toLowerCase();
  let mainCategory = attributes.mainCategory;

  var search = await Land.aggregate([
    {
      $match: {
        $or: [
          //$or
          {
            'attributes.mainCategory': { $in: [mainCategory] },
          },
          {
            'attributes.soilType': { $lte: soilType },
          },
          {
            'attributes.nature': { $lte: nature },
          },
          { 'attributes.road': { $lte: road } },
          {
            'attributes.maturegarden': { $in: [maturegarden] },
          },
          {
            'attributes.leasefreehold': { $in: [leasefreehold] },
          },
          // {
          //   'attributes.lease': { $in: [lease] },
          // },
          {
            'attributes.councilwater': { $in: [councilwater] },
          },
          {
            'attributes.electricity': { $in: [electricity] },
          },
          {
            'attributes.controlleddevelopment': {
              $in: [controlleddevelopment],
            },
          },
          {
            'attributes.borehole': { $in: [borehole] },
          },
          {
            'attributes.readyfence': { $in: [readyfence] },
          },
          {
            'attributes.waterfront': { $in: [waterfront] },
          },
          {
            'attributes.gated': { $in: [gated] },
          },
          {
            'sellerDetails.location': `${area}`,
          },
        ],
      },
    },

    {
      $match: {
        isFlipbook: true,
        'attributes.mainCategory': { $in: [mainCategory] },

        // 'attributes.soilType': { $lte: soilType },
        // 'attributes.nature': { $lte: nature },
        // 'attributes.road': { $lte: road }, //3 - RADIO BUTTONS

        'attributes.cost': { $lte: maxcost, $gte: mincost },
        'attributes.sizeinacres': {
          $lte: maxsizeinacres,
          $gte: minsizeinacres,
        },
        'attributes.kmtoshoppingcenter': { $lte: kmtoshoppingcenter },
        'attributes.kmtoneighbour': { $lte: kmtoneighbour },
        'attributes.kmtotarmac': { $lte: kmtotarmac },
        'attributes.kmtowater': { $lte: kmtowater },
        'attributes.kmtoelectricity': { $lte: kmtoelectricity },

        // 'sellerDetails.location': `${location}`,
      },
    },
  ]);

  let SData;
  if (search.length > 0) {
    SData = await LandQuery.create(req.body);

    //  console.log(SData);
    console.log(SData._id);
    let updateSdata = await LandQuery.findByIdAndUpdate(
      { _id: SData._id },
      {
        $set: {
          page3: true,
        },
      }
    );
    console.log(updateSdata);
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

exports.searchHotelPage1 = catchAsync(async (req, res) => {
  let attributes = req.body.attributes;

  let conferenceroom = req.body.conferenceroom; //conferenceroom number

  let kmfromtarmac = req.body.kmfromtarmac;
  let area = req.body.area;
  //let area = areaC.toLowerCase();
  let hotelname = req.body.Hotel;
  let cls = attributes.class;
  let locality = attributes.locality;
  console.log(locality);
  //let location = req.body.location;
  let bedbreakfastcost = req.body.bedbreakfastcost;
  let minbedbreakfastcost = bedbreakfastcost.min;
  let maxbedbreakfastcost = bedbreakfastcost.max;
  let cost = req.body.cost;
  console.log(cls);

  //this.pet = true;
  var search = await Hotel.aggregate([
    {
      $match: {
        $or: [
          //$or
          { 'propertyDetails.propertyName': `${hotelname}` },
          { 'sellerDetails.location': `${area}` },
          { 'attributes.class': `${cls}` },
        ],
      },
    },

    {
      $match: {
        isFlipbook: true,
        //  'attributes.cost': { $lte: cost },
        // 'attributes.area': { $lte: area },
        'attributes.class': `${cls}`,
        // 'propertyDetails.propertyName': `${hotelname}`,
        // 'sellerDetails.location': `${area}`,
        'attributes.locality': { $in: [locality] },
        'attributes.kmfromtarmac': { $lte: kmfromtarmac },
        'attributes.conferenceroom': { $lte: conferenceroom },
        'attributes.bedbreakfastcost': {
          $lte: maxbedbreakfastcost,
          $gte: minbedbreakfastcost,
        },
        //{ $type: "string" }
        //  'attributes.carpark': { $exists: true },

        // [{ 'attributes.spa': { $in: [true] } }],
        // $or: [{ 'attributes.disabilityaccess': { $in: [true] } }],
        // $or: [{ 'attributes.barlounge': { $in: [true] } }],
        // $or: [{ 'attributes.hairsalon': { $in: [true] } }],
        // $or: [{ 'attributes.petsallowed': { $in: [true] } }],

        // $or: [{ 'attributes.aircon': { $in: [true] } }],
        // $or: [{ 'attributes.spa': { $in: [true] } }],
        // $or: [{ 'attributes.disabilityaccess': { $in: [true] } }],
        // $or: [{ 'attributes.barlounge': { $in: [true] } }],
        // $or: [{ 'attributes.hairsalon': { $in: [true] } }],
        // $or: [
        //   { 'attributes.petsallowed': { $in: [true] } },
        //   {
        //     'attributes.carpark': { $exists: true },
        //   },
        // ],

        // $or: [
        //   {
        //     'attributes.carpark': { $in: [true] },
        //     'attributes.aircon': { $in: [true] },
        //     'attributes.spa': { $in: [true] },
        //     'attributes.disabilityaccess': { $in: [true] },
        //     'attributes.barlounge': { $in: [true] },
        //     'attributes.hairsalon': { $in: [true] },
        //     'attributes.petsallowed': { $in: [true] },
        //   },
        // ],
      },
      // $match: {
      //   attributes: {
      //     $exists: [body],
      //   },
      // },
    },

    // {
    // $match: {
    //   'attributes.aircon': true,
    //   // 'attributes.spa': true,
    //   // 'attributes.freshoutdoors': true,
    //   // // 'attributes.indoorpool': true,
    //   // // 'attributes.disabilityaccess': true,
    //   // 'attributes.barlounge': true,
    //   // 'attributes.hairsalon': true,
    //   // // 'attributes.petsallowed': true,\
    // },
    //},

    //$gte: [<expression1>, <expression2> ] }
    //$match: { $expr: { < aggregation expression> } } }
    // {
    //   $match: {
    //     attributes: { $exists: true },
    //     //'attributes.midrange': { $exists: true },
    //   },
    // },

    //  $group: { _id: null, count: { $sum: 1 } },
  ]);

  let SData;
  if (search.length > 0) {
    SData = await HotelQuery.create(req.body);

    //  console.log(SData);
    console.log(SData._id);
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

exports.searchHotelPage2 = catchAsync(async (req, res) => {
  let attributes = req.body.attributes;
  let conferenceroom = req.body.conferenceroom; //conferenceroom number
  let area = req.body.area;
  //let area = areaC.toLowerCase();
  let hotelname = req.body.Hotel;
  let kmfromtarmac = req.body.kmfromtarmac;
  //let area = req.body.area;
  let cls = attributes.class;
  let locality = attributes.locality;
  // let location = req.body.location;
  let bedbreakfastcost = req.body.bedbreakfastcost;
  let minbedbreakfastcost = req.body.bedbreakfastcost.min;
  let maxbedbreakfastcost = req.body.bedbreakfastcost.max;
  // let cost = req.body.cost;

  let pet = attributes.petsallowed;
  let carpark = attributes.carpark;
  let aircon = attributes.aircon;
  let spa = attributes.spa;
  let freshoutdoors = attributes.freshoutdoors;
  let indoorpool = attributes.indoorpool;
  let disabilityaccess = attributes.disabilityaccess;
  let barlounge = attributes.barlounge;
  let hairsalon = attributes.hairsalon;

  //this.pet = true;
  var search = await Hotel.aggregate([
    {
      $match: {
        $or: [
          //$or
          { 'propertyDetails.propertyName': `${hotelname}` },
          { 'sellerDetails.location': `${area}` },
          {
            'attributes.carpark': { $in: [carpark] },
          },
          {
            'attributes.petsallowed': { $in: [pet] },
          },
          {
            'attributes.aircon': { $in: [aircon] },
          },
          {
            'attributes.spa': { $in: [spa] },
          },
          {
            'attributes.freshoutdoors': { $in: [freshoutdoors] },
          },
          {
            'attributes.indoorpool': { $in: [indoorpool] },
          },
          {
            'attributes.disabilityaccess': { $in: [disabilityaccess] },
          },
          {
            'attributes.barlounge': { $in: [barlounge] },
          },
          {
            'attributes.hairsalon': { $in: [hairsalon] },
          },
          { 'attributes.class': `${cls}` },
        ],
      },
    },

    {
      $match: {
        isFlipbook: true,
        //  'attributes.cost': { $lte: cost },
        //  'attributes.area': { $lte: area },
        // 'propertyDetails.propertyName': `${hotelname}`,
        // 'sellerDetails.location': `${area}`,
        'attributes.class': { $lte: cls },
        'attributes.locality': { $lte: locality },
        'attributes.kmfromtarmac': { $lte: kmfromtarmac },
        'attributes.conferenceroom': { $lte: conferenceroom },
        'attributes.bedbreakfastcost': {
          $lte: maxbedbreakfastcost,
          $gte: minbedbreakfastcost,
        },
      },
    },
  ]);
  let SData;
  if (search.length > 0) {
    SData = await HotelQuery.create(req.body);

    //  console.log(SData);
    console.log(SData._id);
    let updateSdata = await HotelQuery.findByIdAndUpdate(
      { _id: SData._id },
      {
        $set: {
          page2: true,
        },
      }
    );
    console.log(updateSdata);
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

exports.searchWarehousePage1 = catchAsync(async (req, res) => {
  //  isSavedStatus: { type: Boolean, default: false },
  let attributes = req.body.attributes;
  let Type = attributes.Type;

  let area = req.body.area;

  let cost = req.body.cost;
  let mincost = req.body.cost.min;
  let maxcost = req.body.cost.max;

  let sizeinfeet = req.body.sizeinfeet;
  let minsizeinfeet = req.body.sizeinfeet.min;
  let maxsizeinfeet = req.body.sizeinfeet.max;

  let kmfromtarmac = req.body.kmfromtarmac; //tarmac change in frontend also.
  console.log(kmfromtarmac);

  var search = await WareHouse.aggregate([
    {
      $match: {
        isFlipbook: true,
        'attributes.Type': { $in: [Type] },
        'attributes.cost': { $lte: maxcost, $gte: mincost },
        'attributes.sizeinfeet': { $lte: maxsizeinfeet, $gte: minsizeinfeet },
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

  //  console.log(req.user.id); //add login check

  res.status(200).json({
    status: 'success',
    results: search.length,
    search,
  });
});
exports.searchWarehousePage2 = catchAsync(async (req, res) => {
  //let area = req.body.area;
  let attributes = req.body.attributes;
  let Type = attributes.Type;

  let area = req.body.area;

  let cost = req.body.cost;
  let mincost = req.body.cost.min;
  let maxcost = req.body.cost.max;

  let sizeinfeet = req.body.sizeinfeet;
  let minsizeinfeet = req.body.sizeinfeet.min;
  let maxsizeinfeet = req.body.sizeinfeet.max;

  let kmfromtarmac = req.body.kmfromtarmac; //tarmac change in frontend also.

  let conferencefacilites = attributes.conferencefacilites;
  let freshoutdoors = attributes.freshoutdoors;
  let aircon = attributes.aircon;
  let fullyfurnished = attributes.fullyfurnished;
  let landscapegarden = attributes.landscapegarden;
  let wifi = attributes.wifi;
  let sharedsecretary = attributes.sharedsecretary;

  var search = await WareHouse.aggregate([
    {
      $match: {
        $or: [
          //$or
          { 'sellerDetails.location': `${area}` },
          {
            'attributes.conferencefacilites': { $in: [conferencefacilites] },
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
        //- RADIO BUTTONS
        'attributes.Type': { $in: [Type] },
        'attributes.cost': { $lte: maxcost, $gte: mincost },
        // 'attributes.area': { $lte: area },
        'attributes.sizeinfeet': { $lte: maxsizeinfeet, $gte: minsizeinfeet },
        'attributes.kmfromtarmac': { $lte: kmfromtarmac },
        //do this spelling tarmac
      },
    },
  ]);

  //  console.log(req.user.id); //add login check

  res.status(200).json({
    status: 'success',
    results: search.length,
    search,
  });
});
exports.searchWarehousePage3 = catchAsync(async (req, res) => {
  let attributes = req.body.attributes;
  let Type = attributes.Type;

  let area = req.body.area;

  let cost = req.body.cost;
  let mincost = cost.min;
  let maxcost = cost.max;

  let sizeinfeet = req.body.sizeinfeet;
  let minsizeinfeet = sizeinfeet.min;
  let maxsizeinfeet = sizeinfeet.max;
  let kmfromtarmac = req.body.kmfromtarmac; //tarmac change in frontend also.

  let conferencefacilites = attributes.conferencefacilites;
  let freshoutdoors = attributes.freshoutdoors;
  let aircon = attributes.aircon;
  let fullyfurnished = attributes.fullyfurnished;
  let landscapegarden = attributes.landscapegarden;
  let wifi = attributes.wifi;
  let sharedsecretary = attributes.sharedsecretary;

  // let check = attributes.zoning;
  let zoning = attributes.zoning;

  let townLocation = attributes.townLocation;

  let accessRoad = attributes.accessRoad;

  let tenants = attributes.tenants;

  let elevator = attributes.elevator;

  let security = attributes.security;

  let vehicleTraffic = attributes.vehicleTraffic;

  let humanTraffic = attributes.humanTraffic;

  let meetingRoom = attributes.meetingRoom;

  let parking = attributes.parking;

  var search = await WareHouse.aggregate([
    {
      $match: {
        $or: [
          //$or

          {
            'attributes.conferencefacilites': { $in: [conferencefacilites] },
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
        //- RADIO BUTTONS
        'attributes.Type': { $in: [Type] },

        // 'attributes.zoning': { $in: [zoning] },
        // 'attributes.townLocation': { $in: [townLocation] },
        // 'attributes.accessRoad': { $in: [accessRoad] },
        // 'attributes.tenants': { $in: [tenants] },
        // 'attributes.elevator': { $in: [elevator] },
        // 'attributes.security': { $in: [security] },
        // 'attributes.vehicleTraffic': { $in: [vehicleTraffic] },
        // 'attributes.humanTraffic': { $in: [humanTraffic] },
        // 'attributes.meetingRoom': { $in: [meetingRoom] },
        // 'attributes.parking': { $in: [parking] },

        'attributes.cost': { $lte: maxcost, $gte: mincost },
        //  'attributes.area': { $lte: area },
        'attributes.sizeinfeet': { $lte: maxsizeinfeet, $gte: minsizeinfeet },
        'attributes.kmfromtarmac': { $lte: kmfromtarmac },
        //do this spelling tarmac
      },
    },
  ]);

  //  console.log(req.user.id); //add login check
  res.status(200).json({
    status: 'success',
    results: search.length,
    search,
  });
});
