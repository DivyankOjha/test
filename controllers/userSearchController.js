const catchAsync = require('./../utils/catchAsync');

const House = require('./../models/houseModel');
const Land = require('./../models/landModel');
const Hotel = require('./../models/hotelModel');
const WareHouse = require('./../models/warehouseModel');

exports.searchHouse1 = catchAsync(async (req, res) => {
  // for (var i in req.body) {
  //   body.push(req.body[i]);
  // }

  // const { classs, city } = req.params;
  //const clss = req.params.classs;
  //console.log(classs, city, clss);

  // var search = [];

  //query = { name: { $regex: /^divyank/i } };
  //query = { class: { $regex: /^worldclass/i } };
  //   var search = await Hotel.find({
  //     'attributes.class.worldclass': 'false',
  //   });.
  // var location = 'address 2';
  // var search = await Hotel.find({
  //   'attributes.class': { $exists: true },
  // console.log('Query ' + req.query.search);
  // if (req.query.class === 'worldclass' && req.query.locality === 'city') {
  //   console.log('Hello');
  // }
  // });
  // if (clss === true) {
  // }
  // var c = 'worldclass';
  // var cl = `attributes.class.${c}`;
  // console.log('cl' + cl);

  //body = "{ 'attributes.carpark': true }";

  // for (var i in req.body) {
  //   if (req.body[i] === true) {
  //     body.push(req.body[i]);
  //     console.log('Hello');
  //   }
  // }
  // for (var key in req.body) {
  //   if (req.body.hasOwnProperty(key)) {
  //     item = JSON.parse(JSON.stringify(req.body));
  //     // console.log(item);
  //     body.push(item);
  //     // console.log(JSON.parse(JSON.stringify(req.body)));
  //   }
  // }
  // for (var i in req.body) {
  //   if (req.body[i]) {
  //     item = JSON.parse(JSON.stringify(req.body[i]));
  //     body.push(item);
  //     console.log('hi');
  //   }
  // }

  // itemarray = JSON.parse(JSON.stringify(req.body));
  //console.log(itemarray);
  //console.log(typeof true);
  // console.log(body);
  //console.log('att1' + att1);
  //console.log(cls, locality, location, bedbreakfastcost, kmfromtarmac, aircon);

  // let myschema = {
  //   required: [
  //     `attributes.${cls}`,
  //     `attributes.${locality}`,
  //     // `attributes.${aircon}`,
  //     // 'attributes.carpark',
  //     // 'attributes.spa',
  //     // 'attributes.freshoutdoors',
  //     // // 'attributes.indoorpool',
  //     // 'attributes.disabilityaccess',
  //     // 'attributes.barlounge',
  //     // 'attributes.hairsalon',
  //     // // 'attributes.petsallowed',
  //     // // `sellerDetails.${location}`,
  //   ],
  // };
  //console.log(myschema);
  //var search = await Hotel.find({ 'attributes.cost': { $in: [cost] } });
  // let carpark1 = 'attributes.carpark',
  // body = [`${locality}`, `${cls}`, `${area}`];
  // var search = await Hotel.find({
  //   $and: [
  //     {
  //       'attributes.locality': {
  //         $in: body,
  //       },
  //       'attributes.class': {
  //         $in: body,
  //       },
  //       'attributes.area': {
  //         $in: body,
  //       },

  //       // 'attributes.area': {
  //       //   $in: body,
  //       // },
  //     },
  //     // 'attributes.class' : {$e},
  //   ],
  // });
  // score: { $gte: 8 }

  // (body = [`${locality}`, `${cls}`, `${area}`]);

  //let location = [req.query.location || []].flat();

  //this.pet = true;
  //console.log(req.body.cost);
  // let cost = req.body.cost;
  let testbodt = req.body;
  console.log(testbodt);
  let mincost = req.body.cost.min;
  let maxcost = req.body.cost.max;
  console.log(mincost, maxcost);
  let attributes = req.body.attributes;
  //console.log(attributes);
  //let location = req.body.attributes.location;

  let area = req.body.attributes.area;
  let areaint = parseInt(area);
  console.log(areaint);
  let mainCategory = attributes.mainCategory.toLowerCase();
  console.log(mainCategory);
  let subCategory = attributes.subCategory.toLowerCase();
  //console.log(subCategory);
  let propertyStatus = attributes.propertyStatus.toLowerCase();

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

  // let gym = attributes.gym;
  // let bedroom = attributes.bedroom;
  // let bathrooms = attributes.bathrooms;
  // let steambath = attributes.steambath;
  // let lift = attributes.lift;
  // let bathtab = attributes.bathtab;
  // let parking = attributes.parking;

  //main category, bedroom , subcategory, cost min max , attribute - checkbox number
  var search = await House.aggregate([
    //   // {
    //   //   $unwind: { path: '$attributes', preserveNullAndEmptyArrays: true },
    //   // },
    //   // {
    //   //   $match: { $jsonSchema: myschema },
    //   // },
    // $and: [
    //   {
    //     'attributes.locality': {
    //       $in: body,
    //     },
    //     'attributes.class': {
    //       $in: body,
    //     },
    //     'attributes.area': {
    //       $in: body,
    //     },
    //   },
    // ],
    {
      $match: {
        $or: [
          //$or

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
        ],
      },
    },

    {
      $match: {
        'attributes.cost': { $lte: maxcost, $gte: mincost },
        'attributes.area': { $lte: areaint },

        'attributes.mainCategory': `${mainCategory}`,
        'attributes.subCategory': `${subCategory}`,
        'attributes.propertyStatus': `${propertyStatus}`,

        //'attributes.bedroom': { $eq: bedroom }, //try this...

        //  'sellerDetails.location': `${location}`,

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

  res.status(200).json({
    status: 'success',
    results: search.length,
    search,
  });
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

  let area = req.body.attributes.area;
  let areaint = parseInt(area);
  console.log(areaint);
  let mainCategory = attributes.mainCategory.toLowerCase();
  console.log(mainCategory);
  let subCategory = attributes.subCategory.toLowerCase();
  //console.log(subCategory);
  let propertyStatus = attributes.propertyStatus.toLowerCase();

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

  let livingsize = attributes.livingsize;
  let kitchensize = attributes.kitchensize;
  let gardensize = attributes.gardensize;

  //main category, bedroom , subcategory, cost min max , attribute - checkbox number
  var search = await House.aggregate([
    //   // {
    //   //   $unwind: { path: '$attributes', preserveNullAndEmptyArrays: true },
    //   // },
    //   // {
    //   //   $match: { $jsonSchema: myschema },
    //   // },
    // $and: [
    //   {
    //     'attributes.locality': {
    //       $in: body,
    //     },
    //     'attributes.class': {
    //       $in: body,
    //     },
    //     'attributes.area': {
    //       $in: body,
    //     },
    //   },
    // ],
    {
      $match: {
        $or: [
          //$or

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
            'attributes.gym': { $gte: 0, $lte: gym },
          },

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
            'attributes.bedroom': { $eq: bedroom },
          },
        ],
      },
    },

    {
      $match: {
        'attributes.cost': { $lte: maxcost, $gte: mincost },
        'attributes.area': { $lte: area },

        'attributes.mainCategory': `${mainCategory}`,
        'attributes.subCategory': `${subCategory}`,
        'attributes.propertyStatus': `${propertyStatus}`,

        //  'attributes.bedroom': { $eq: bedroom }, //try this...

        'attributes.livingsize': { $lte: livingsize },
        'attributes.kitchensize': { $lte: kitchensize },
        'attributes.gardensize': { $lte: gardensize },
        //  'attributes.gym': { $gte: 0, $lte: gym },
        //   'sellerDetails.location': `${location}`,

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
  ]).project({ attributes: 1, _id: 0 });

  res.status(200).json({
    status: 'success',
    results: search.length,
    search,
  });
}); //incomplete - radio on page 1 remaining

exports.searchLandPage1 = catchAsync(async (req, res) => {
  //  let location = req.body.location;

  let sizeinacres = req.body.sizeinacres;
  let minsizeinacres = sizeinacres.min;
  let maxsizeinacres = sizeinacres.max;
  let cost = req.body.cost;
  let mincost = req.body.cost.min;
  let maxcost = req.body.cost.max;

  let attributes = req.body.attributes;
  let freehold = attributes.freehold;
  let lease = attributes.lease;

  var search = await Land.aggregate([
    {
      $match: {
        $or: [
          //$or
          {
            'attributes.freehold': { $in: [freehold] },
          },
          {
            'attributes.lease': { $in: [lease] },
          },
        ],
      },
    },

    {
      $match: {
        'attributes.cost': { $lte: maxcost, $gte: mincost },
        'attributes.sizeinacres': {
          $lte: maxsizeinacres,
          $gte: minsizeinacres,
        },
        //   'sellerDetails.location': `${location}`,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: search.length,
    search,
  });
});

exports.searchLandPage2 = catchAsync(async (req, res) => {
  // let location = req.body.location;

  let sizeinacres = req.body.sizeinacres;
  let minsizeinacres = sizeinacres.min;
  let maxsizeinacres = sizeinacres.max;
  let cost = req.body.cost;
  let mincost = req.body.cost.min;
  let maxcost = req.body.cost.max;

  let attributes = req.body.attributes;

  let freehold = attributes.freehold;
  let lease = attributes.lease;
  let councilwater = attributes.councilwater;
  let electricity = attributes.electricity;
  let borehole = attributes.borehole;
  let readyfence = attributes.readyfence;
  let controlleddevelopment = attributes.controlleddevelopment;
  let maturegarden = attributes.maturegarden;
  let waterfront = attributes.waterfront;
  let gated = attributes.gated;

  let soilType = attributes.soilType.toLowerCase();
  let nature = attributes.nature.toLowerCase();
  let road = attributes.road.toLowerCase();

  var search = await Land.aggregate([
    {
      $match: {
        $or: [
          //$or

          {
            'attributes.maturegarden': { $in: [maturegarden] },
          },
          {
            'attributes.freehold': { $in: [freehold] },
          },
          {
            'attributes.lease': { $in: [lease] },
          },
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
        ],
      },
    },

    {
      $match: {
        'attributes.soilType': { $lte: soilType },
        'attributes.nature': { $lte: nature },
        'attributes.road': { $lte: road }, //3 - RADIO BUTTONS

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
  });
});

exports.searchLandPage3 = catchAsync(async (req, res) => {
  //let location = req.body.location;

  let sizeinacres = req.body.sizeinacres;
  let minsizeinacres = sizeinacres.min;
  let maxsizeinacres = sizeinacres.max;
  let cost = req.body.cost;
  let mincost = req.body.cost.min;
  let maxcost = req.body.cost.max;

  let attributes = req.body.attributes;

  let kmtoshoppingcenter = req.body.kmtoshoppingcenter;
  let kmtoneighbour = req.body.kmtoneighbour;
  let kmtotarmac = req.body.kmtotarmac;
  let kmtowater = req.body.kmtowater;
  let kmtoelectricity = req.body.kmtoelectricity;

  let freehold = attributes.freehold;
  let lease = attributes.lease;
  let councilwater = attributes.councilwater;
  let electricity = attributes.electricity;
  let borehole = attributes.borehole;
  let readyfence = attributes.readyfence;
  let controlleddevelopment = attributes.controlleddevelopment;
  let maturegarden = attributes.maturegarden;
  let waterfront = attributes.waterfront;
  let gated = attributes.gated;

  let soilType = attributes.soilType.toLowerCase();
  let nature = attributes.nature.toLowerCase();
  let road = attributes.road.toLowerCase();

  var search = await Land.aggregate([
    {
      $match: {
        $or: [
          //$or

          {
            'attributes.maturegarden': { $in: [maturegarden] },
          },
          {
            'attributes.freehold': { $in: [freehold] },
          },
          {
            'attributes.lease': { $in: [lease] },
          },
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
        ],
      },
    },

    {
      $match: {
        'attributes.soilType': { $lte: soilType },
        'attributes.nature': { $lte: nature },
        'attributes.road': { $lte: road }, //3 - RADIO BUTTONS

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

  res.status(200).json({
    status: 'success',
    results: search.length,
    search,
  });
});

exports.searchHotelPage1 = catchAsync(async (req, res) => {
  let attributes = req.body.attributes;

  let conferenceroom = req.body.conferenceroom; //conferenceroom number

  let kmfromtarmac = req.body.kmfromtarmac;
  // let area = req.body.area;
  let cls = attributes.class.toLowerCase();
  let locality = attributes.locality.toLowerCase();
  //let location = req.body.location;
  let bedbreakfastcost = req.body.bedbreakfastcost;
  let minbedbreakfastcost = bedbreakfastcost.min;
  let maxbedbreakfastcost = bedbreakfastcost.max;
  let cost = req.body.cost;
  console.log(cls);
  // // let aircon = req.body.aircon;
  // let att1 = req.query.attributes1;
  // let body = [];
  // let ac = [];
  // ac.push(`${'attributes.petsallowed' + ':' + true}`);
  // console.log(ac);
  // if (req.body.carpark) {
  //   body.push("{ 'attributes.carpark': true }");
  // }
  // if (req.body.spa) {
  //   body.push("{ 'attributes.spa': true }");
  // }
  // if (req.body.petsallowed) {
  //   body.push('petsallowed');
  // }
  // //body = "{ 'attributes.carpark': true }";
  // console.log(body);
  // for (var i in req.body) {
  //   if (req.body[i] === true) {
  //     body.push(req.body[i]);
  //     console.log('Hello');
  //   }
  // }
  // for (var key in req.body) {
  //   if (req.body.hasOwnProperty(key)) {
  //     item = JSON.parse(JSON.stringify(req.body));
  //     // console.log(item);
  //     body.push(item);
  //     // console.log(JSON.parse(JSON.stringify(req.body)));
  //   }
  // }
  // for (var i in req.body) {
  //   if (req.body[i]) {
  //     item = JSON.parse(JSON.stringify(req.body[i]));
  //     body.push(item);
  //     console.log('hi');
  //   }
  // }

  // itemarray = JSON.parse(JSON.stringify(req.body));
  //console.log(itemarray);
  //console.log(typeof true);
  // console.log(body);
  //console.log('att1' + att1);
  //console.log(cls, locality, location, bedbreakfastcost, kmfromtarmac, aircon);

  // let myschema = {
  //   required: [
  //     `attributes.${cls}`,
  //     `attributes.${locality}`,
  //     // `attributes.${aircon}`,
  //     // 'attributes.carpark',
  //     // 'attributes.spa',
  //     // 'attributes.freshoutdoors',
  //     // // 'attributes.indoorpool',
  //     // 'attributes.disabilityaccess',
  //     // 'attributes.barlounge',
  //     // 'attributes.hairsalon',
  //     // // 'attributes.petsallowed',
  //     // // `sellerDetails.${location}`,
  //   ],
  // };
  //console.log(myschema);
  //var search = await Hotel.find({ 'attributes.cost': { $in: [cost] } });
  // let carpark1 = 'attributes.carpark',
  // body = [`${locality}`, `${cls}`, `${area}`];
  // var search = await Hotel.find({
  //   $and: [
  //     {
  //       'attributes.locality': {
  //         $in: body,
  //       },
  //       'attributes.class': {
  //         $in: body,
  //       },
  //       'attributes.area': {
  //         $in: body,
  //       },

  //       // 'attributes.area': {
  //       //   $in: body,
  //       // },
  //     },
  //     // 'attributes.class' : {$e},
  //   ],
  // });
  // score: { $gte: 8 }

  // (body = [`${locality}`, `${cls}`, `${area}`]);

  //let location = [req.query.location || []].flat();

  // let pet = req.body.petsallowed;
  // let carpark = req.body.carpark;
  // let aircon = req.body.aircon;
  // let spa = req.body.spa;
  // let freshoutdoors = req.body.freshoutdoors;
  // let indoorpool = req.body.indoorpool;
  // let disabilityaccess = req.body.disabilityaccess;
  // let barlounge = req.body.barlounge;
  // let hairsalon = req.body.hairsalon;

  //this.pet = true;
  var search = await Hotel.aggregate([
    //   // {
    //   //   $unwind: { path: '$attributes', preserveNullAndEmptyArrays: true },
    //   // },
    //   // {
    //   //   $match: { $jsonSchema: myschema },
    //   // },
    // $and: [
    //   {
    //     'attributes.locality': {
    //       $in: body,
    //     },
    //     'attributes.class': {
    //       $in: body,
    //     },
    //     'attributes.area': {
    //       $in: body,
    //     },
    //   },
    // ],

    {
      $match: {
        //  'attributes.cost': { $lte: cost },
        //'attributes.area': { $lte: area },
        'attributes.class': `${cls}`,

        // 'sellerDetails.location': `${location}`,

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

  res.status(200).json({
    status: 'success',
    results: search.length,
    search,
  });
});

exports.searchHotelPage2 = catchAsync(async (req, res) => {
  let attributes = req.body.attributes;
  let conferenceroom = req.body.conferenceroom; //conferenceroom number

  let kmfromtarmac = req.body.kmfromtarmac;
  //let area = req.body.area;
  let cls = attributes.class.toLowerCase();
  let locality = attributes.locality.toLowerCase();
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
        ],
      },
    },

    {
      $match: {
        //  'attributes.cost': { $lte: cost },
        //  'attributes.area': { $lte: area },
        'attributes.class': { $lte: cls },
        'attributes.locality': { $lte: locality },
        'attributes.kmfromtarmac': { $lte: kmfromtarmac },
        'attributes.conferenceroom': { $lte: conferenceroom },
        'attributes.bedbreakfastcost': {
          $lte: maxbedbreakfastcost,
          $gte: minbedbreakfastcost,
        },
        //   'sellerDetails.location': `${location}`,

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
  ]).project({ attributes: 1, _id: 0 });

  res.status(200).json({
    status: 'success',
    results: search.length,
    search,
  });
});

exports.searchWarehousePage1 = catchAsync(async (req, res) => {
  let attributes = req.body.attributes;
  let type = attributes.Type;
  let Type = type.toLowerCase();
  // let area = req.body.area;

  let cost = req.body.cost;
  let mincost = req.body.cost.min;
  let maxcost = req.body.cost.max;

  let sizeinfeet = req.body.sizeinfeet;
  let minsizeinfeet = req.body.sizeinfeet.min;
  let maxsizeinfeet = req.body.sizeinfeet.max;

  let kmfromtarmac = req.body.kmfromtarmac; //tarmac change in frontend also.

  var search = await WareHouse.aggregate([
    {
      $match: {
        'attributes.Type': { $in: [Type] },
        'attributes.cost': { $lte: maxcost, $gte: mincost },
        // 'attributes.area': { $lte: area },
        'attributes.sizeinfeet': { $lte: maxsizeinfeet, $gte: minsizeinfeet },
        'attributes.kmfromtarmac': { $lte: kmfromtarmac },
        //do this spelling tarmac
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    results: search.length,
    search,
  });
});
exports.searchWarehousePage2 = catchAsync(async (req, res) => {
  //let area = req.body.area;
  let attributes = req.body.attributes;
  let type = attributes.Type;
  let Type = type.toLowerCase();
  // let area = req.body.area;

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
        ],
      },
    },

    {
      $match: {
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

  res.status(200).json({
    status: 'success',
    results: search.length,
    search,
  });
});
exports.searchWarehousePage3 = catchAsync(async (req, res) => {
  let type = attributes.Type;
  let Type = type.toLowerCase();
  // let area = req.body.area;

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

  let zoning = attributes.zoning.toLowerCase();
  let townLocation = attributes.townLocation.toLowerCase();
  let accessRoad = attributes.accessRoad.toLowerCase();
  let tenants = attributes.tenants.toLowerCase();
  let elevator = attributes.elevator.toLowerCase();
  let security = attributes.security.toLowerCase();
  let vehicleTraffic = attributes.vehicleTraffic.toLowerCase();
  let humanTraffic = attributes.humanTraffic.toLowerCase();
  let meetingRoom = attributes.meetingRoom.toLowerCase();
  let parking = attributes.parking.toLowerCase();

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
        ],
      },
    },

    {
      $match: {
        //- RADIO BUTTONS
        'attributes.Type': { $in: [Type] },

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

        'attributes.cost': { $lte: maxcost, $gte: mincost },
        //  'attributes.area': { $lte: area },
        'attributes.sizeinfeet': { $lte: maxsizeinfeet, $gte: minsizeinfeet },
        'attributes.kmfromtarmac': { $lte: kmfromtarmac },
        //do this spelling tarmac
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    results: search.length,
    search,
  });
});
