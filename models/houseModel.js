const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const houseSchema = new mongoose.Schema({
  //page1 in admin add property details

  propertyDetails: {
    propertyName: String,
    propertyFor: {
      rent: { type: String, default: false },
      buy: { type: String, default: false },
    },
    propertyDescription: String,
    propertyType: {
      house: { type: String, default: 'House' },
      hotel: { type: String, default: 'Hotel' },
      commercial: { type: String, default: 'Commercial' },
      residentialProperty: { type: String, default: 'Residential Property' },
      land: { type: String, default: 'Land' },
      plot: { type: String, default: 'Plot' },
    },
    otherDetails: String,
    mapLink: String,
    selectSimilarProperties: String, //this field not clear image icon is displayed in design

    // user: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },

    // buy: {
    //   buy: { type: Boolean, default: false },
    //   subcategory: {
    //     gated: { type: Boolean, default: false },
    //     standAlone: { type: Boolean, default: false },
    //     apartment: { type: Boolean, default: false },
    //   },
    // }, buy: {
    buy: { type: Boolean, default: false },
    let: { type: Boolean, default: false },
    fullyfurnished: { type: Boolean, default: false },
    //doubt in above
    subcategory: {
      gated: { type: Boolean, default: false },
      standAlone: { type: Boolean, default: false },
      apartment: { type: Boolean, default: false },
    },

    propertyStatus: {
      Complete: { type: Boolean, default: false },
      offplan: { type: Boolean, default: false },
      refurbished: { type: Boolean, default: false },
    },
    area: { type: Number },
    minPrice: { type: Currency },
    maxPrice: { type: Currency },
  },

  //attributes page 2
  attributes: {
    opticalfiber: { type: Boolean, default: false },
    swimmingpool: { type: Boolean, default: false },
    fireplace: { type: Boolean, default: false },
    petsallowed: { type: Boolean, default: false },
    solarhotwater: { type: Boolean, default: false },
    cctv: { type: Boolean, default: false },
    borehole: { type: Boolean, default: false },
    disabilityfeature: { type: Boolean, default: false },
    maturegarden: { type: Boolean, default: false },
    balcony: { type: Boolean, default: false },
    partyarea: { type: Boolean, default: false },

    bedroom: { type: Number },
    steambath: { type: Number },
    lift: { type: Number },
    bathtab: { type: Number },
    parking: { type: Number },
    livingarea: {
      type: Number,
      min: 0,
      max: 500,
    },
    kitchensize: {
      type: Number,
      min: 0,
      max: 500,
    },
    gardensize: {
      type: Number,
      min: 0,
      max: 500,
    },
  },

  //page 3 seller details

  sellerDetails: {
    sellername: String,
    sellerContactNumber: Number,
    sellerofficeaddress: String,
    selleremail: String,
    sellertype: {
      owner: { type: String, default: false },
      agent: { type: String, default: false },
    },
    selleraltnumber: Number,
    selleraltemail: String,
    sellerwebsite: String,
    sellerlogo: String, //image path
    //remaining from doc
    maximumprice: Number,
    minimumprice: Number,
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
    gated: { type: Boolean, default: false },
    opticalfiber: { type: Boolean, default: false },
    cctv: { type: Boolean, default: false },
    standalone: { type: Boolean, default: false },
    swimmingpool: { type: Boolean, default: false },
    borehole: { type: Boolean, default: false },
    apartment: { type: Boolean, default: false },
    fireplace: { type: Boolean, default: false },
    disability: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    petsallowed: { type: Boolean, default: false },
    maturegarden: { type: Boolean, default: false },
    offplane: { type: Boolean, default: false },
    solarhotwater: { type: Boolean, default: false },
    balcony: { type: Boolean, default: false },
    refurbished: { type: Boolean, default: false },
    waterfront: { type: Boolean, default: false },
    partyarea: { type: Boolean, default: false },
    bathrooms: Number,
    steambath: Number,
    lifts: Number,
    bathtabs: Number,
    parkingslots: Number,
    gym: Number,

    //select particilars
    livingareasize: { type: Number, min: 0, max: 5000 },
    kitchenareasize: { type: Number, min: 0, max: 5000 },
    gardenareasize: { type: Number, min: 0, max: 5000 },

    //Pages
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

const House = mongoose.model('House', houseSchema);

module.exports = House;
