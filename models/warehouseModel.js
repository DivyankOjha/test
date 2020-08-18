const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  //page1 in admin add property details
  isFlipbook: { type: Boolean, default: false },
  isStatus: { type: Boolean, default: true },

  propertyDetails: {
    propertyName: String,
    propertyFor: { type: String },
    propertyDescription: String,
    propertyType: String,
    otherDetails: String,
    mapLink: String,
    selectSimilarProperties: String, //this field not clear image icon is displayed in design
    price: Number,
  },

  attributes: {
    Type: String, //type giving error
    // godown: { type: Boolean },
    // commercialspace: { type: Boolean },

    area: { type: Number },
    cost: Number,

    sizeinfeet: Number,
    kmfromtarmax: Number,

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
      kmfromtarmax: Boolean,

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
    contactSeller: String,
    propertyAvailability: Boolean,
    sendmessageToSeller: String, //email ???

    //page3 in design
    content: String,
  },
});

const WareHouse = mongoose.model('WareHouse', warehouseSchema);

module.exports = WareHouse;
