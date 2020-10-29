const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  //page1 in admin add property details
  isSelect: { type: Boolean, default: false },
  isSaved: { type: Boolean, default: false },
  isSelect: { type: Boolean, default: false },
  isFlipbook: { type: Boolean, default: false },
  isStatus: { type: Boolean, default: true },
  categoryType: { type: String, default: 'Warehouse' },
  createdAt: { type: Date, default: Date.now },
  isSavedStatus: { type: Boolean, default: false },
  propertyDetails: {
    Type: { type: String },
    propertyName: String,
    propertyFor: { type: String },
    propertyDescription: String,
    propertyType: { type: String, value: 'Warehouse' },
    otherDetails: String,
    mapLink: String,
    selectSimilarProperties: Array, //this field not clear image icon is displayed in design
    coordinates: {
      longitude: Number,
      latitude: Number,
    },
    // price: Number,
  },

  attributes: {
    mainCategory: String,
    Type: String, //type giving error
    // godown: { type: Boolean },
    // commercialspace: { type: Boolean },.
    // buy: { type: Boolean },
    // let: { type: Boolean },

    area: { type: Number },
    cost: Number,

    sizeinfeet: Number,
    kmfromtarmac: Number, //tarmac

    conferencefacilites: { type: Boolean },
    freshoutdoors: { type: Boolean },
    aircon: { type: Boolean },
    fullyfurnished: { type: Boolean },
    landscapegarden: { type: Boolean },
    wifi: { type: Boolean },
    sharedsecretary: { type: Boolean },

    zoning: String,
    townLocation: String,
    accessRoad: String,
    tenants: String,
    elevator: String,
    security: String,
    vehicleTraffic: String,
    humanTraffic: String,
    meetingRoom: String,
    parking: String,

    // commercial: { type: Boolean },
    // industrial: { type: Boolean },
    // residential: { type: Boolean },
    // epz: { type: Boolean },

    // downtown: { type: Boolean },
    // uptown: { type: Boolean },
    // neartown: { type: Boolean },

    // tarmac: { type: Boolean },
    // cabro: { type: Boolean },
    // allweather: { type: Boolean },
    // main: { type: Boolean },

    // mixed: { type: Boolean },
    // specialized: { type: Boolean },
    // processing: { type: Boolean },

    // none: { type: Boolean }, // default true ??
    // goods: { type: Boolean },
    // passenger: { type: Boolean },
    // passengerandgoods: { type: Boolean },

    // tight: { type: Boolean },
    // maingate: { type: Boolean },
    // maingateandfloors: { type: Boolean },
    // none: { type: Boolean },

    // veryhigh: { type: Boolean },
    // high: { type: Boolean },
    // low: { type: Boolean },

    // veryhigh: { type: Boolean },
    // high: { type: Boolean },
    // low: { type: Boolean },

    // none: { type: Boolean },
    // free: { type: Boolean },
    // paid: { type: Boolean },

    // none: { type: Boolean },
    // free: { type: Boolean },
    // paid: { type: Boolean },
  },
  //page 3
  sellerDetails: {
    sellername: String,
    sellerContactNumber: Number,
    sellerofficeaddress: String,
    selleremail: String,
    sellertype: String,
    selleraltnumber: Number,
    selleraltemail: String,
    sellerwebsite: String,
    sellerlogo: String, //image path
    //remaining from doc
    //  maximumprice: Number,
    // minimumprice: Number,
    location: String, //address
    description: String, // this point - !cleared
    maplink: String,
    nearestplace: {
      placename: String,
      kms: String,
    },
  },
  //FlipbookSchema
  flipbook: {
    title: String, //Title is property name ???
    description: String,
    flipbookBanner: String, //Banner
    //Property Details/Attributes
    showAttributes: {
      Type: Boolean, //type giving error
      // godown: { type: Boolean },
      // commercialspace: { type: Boolean },

      area: { type: Boolean },
      cost: Boolean,

      sizeinfeet: Boolean,
      kmfromtarmac: Boolean,

      conferencefacilites: Boolean,
      freshoutdoors: Boolean,
      aircon: Boolean,
      fullyfurnished: Boolean,
      landscapegarden: Boolean,
      wifi: Boolean,
      sharedsecretary: Boolean,

      zoning: Boolean,
      townLocation: Boolean,
      accessRoad: Boolean,
      tenants: Boolean,
      elevator: Boolean,
      security: Boolean,
      vehicleTraffic: Boolean,
      humanTraffic: Boolean,
      meetingRoom: Boolean,
      parking: Boolean,
    },

    //Second page
    image2D: { type: Array },
    image3D: String,
    tour360Property: String, //link
    floorPlan: { type: Array }, //image field in design ?????
    map: String,
    // contactSeller: String,
    //  propertyAvailability: Boolean,
    // sendmessageToSeller: String, //email ???

    //page3 in design
    content: String,
  },
});

const WareHouse = mongoose.model('WareHouse', warehouseSchema);

module.exports = WareHouse;
