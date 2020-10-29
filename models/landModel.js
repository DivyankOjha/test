const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const landSchema = new mongoose.Schema({
  //page1 in admin add property details

  isFlipbook: { type: Boolean, default: false },
  isStatus: { type: Boolean, default: true },
  categoryType: { type: String, default: 'Land' },
  createdAt: { type: Date, default: Date.now },
  isSelect: { type: Boolean, default: false },
  isSaved: { type: Boolean, default: false },
  propertyDetails: {
    propertyName: String,
    propertyFor: { type: String },
    propertyDescription: String,
    propertyType: { type: String },
    otherDetails: String,
    mapLink: String,
    selectSimilarProperties: Array, //this field not clear image icon is displayed in design
    coordinates: {
      longitude: Number,
      latitude: Number,
    },
    // price: Number,
  },

  //Attributes
  attributes: {
    mainCategory: String,
    // buy: { type: Boolean },
    // let: { type: Boolean },

    cost: Number,
    sizeinacres: { type: Number }, // need to set min max ??

    freehold: { type: Boolean },
    lease: { type: Boolean },

    leasefreehold: String,

    councilwater: { type: Boolean },
    electricity: { type: Boolean },
    borehole: { type: Boolean },
    readyfence: { type: Boolean },
    controlleddevelopment: { type: Boolean },
    waterfront: { type: Boolean },
    gated: { type: Boolean },

    soilType: String,
    nature: String,
    road: String,

    kmtoshoppingcenter: { type: Number },
    kmtoneighbour: { type: Number },
    kmtotarmac: { type: Number },
    kmtowater: { type: Number },
    kmtoelectricity: { type: Number },
  },
  // red: { type: Boolean },
  // blackcotton: { type: Boolean },
  // murram: { type: Boolean },

  // residential: { type: Boolean },
  // commercial: { type: Boolean },
  // industrial: { type: Boolean },

  // tarmac: { type: Boolean },
  // murram: { type: Boolean },
  // allweather: { type: Boolean },
  // noroad: { type: Boolean },

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
    // maximumprice: Number,
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
      cost: Boolean,
      sizeinacres: { type: Boolean }, // need to set min max ??

      freehold: { type: Boolean },
      lease: { type: Boolean },
      councilwater: { type: Boolean },
      electricity: { type: Boolean },
      borehole: { type: Boolean },
      readyfence: { type: Boolean },
      controlleddevelopment: { type: Boolean },
      waterfront: { type: Boolean },
      gated: { type: Boolean },

      soilType: Boolean,
      nature: Boolean,
      road: Boolean,

      kmtoshoppingcenter: { type: Boolean },
      kmtoneighbour: { type: Boolean },
      kmtotarmac: { type: Boolean },
      kmtowater: { type: Boolean },
      kmtoelectricity: { type: Boolean },
    },

    //Pages
    //Second page
    image2D: { type: Array },
    image3D: String,
    tour360Property: String, //link
    floorPlan: { type: Array }, //image field in design ?????
    map: String,
    // contactSeller: String,
    // propertyAvailability: Boolean,
    // sendmessageToSeller: String, //email ???

    //page3 in design
    content: String,
  },
});

const Land = mongoose.model('Land', landSchema);

module.exports = Land;
