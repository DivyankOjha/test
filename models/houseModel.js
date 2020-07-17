const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
// const housetypeSchema = new mongoose.Schema(
//   {
//     gated: { type: Boolean, default: false },
//     standAlone: { type: Boolean, default: false },
//     Apartment: { type: Boolean, default: false },
//   },
//   {
//     timestamps: true,
//     usePushEach: true,
//   }
// );

const houseSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
  area: { type: Number },
  minPrice: { type: Currency },
  maxPrice: { type: Currency },

  //IFMISFile: { type: mongoose.Schema.ObjectId, ref: 'ifmisFile' },
  buy: {
    buy: { type: Boolean, default: false },
    subcategory: {
      gated: { type: Boolean, default: false },
      standAlone: { type: Boolean, default: false },
      apartment: { type: Boolean, default: false },
    },
  },
  // buy: {
  //   buy: { type: Boolean, default: false },
  //   subcategory: {
  //     gated: { type: Boolean, default: false },
  //     standAlone: { type: Boolean, default: false },
  //     apartment: { type: Boolean, default: false },
  //   },
  // },
  let: {
    let: { type: Boolean, default: false },
    subcategory: {
      gated: { type: Boolean, default: false },
      standAlone: { type: Boolean, default: false },
      apartment: { type: Boolean, default: false },
    },
  },

  fullyfurnished: {
    fullyfurnished: { type: Boolean, default: false },
    subcategory: {
      gated: { type: Boolean, default: false },
      standAlone: { type: Boolean, default: false },
      apartment: { type: Boolean, default: false },
    },
  },

  propertyStatus: {
    propertyStatus: { type: Boolean, default: false },
    subcategory: {
      Complete: { type: Boolean, default: false },
      offplan: { type: Boolean, default: false },
      refurbished: { type: Boolean, default: false },
    },
  },

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

  bedroom: { type: Boolean, default: false },
  steambath: { type: Boolean, default: false },
  lift: { type: Boolean, default: false },
  bathtab: { type: Boolean, default: false },
  parking: { type: Boolean, default: false },
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
  //page 3
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
});

const House = mongoose.model('House', houseSchema);

module.exports = House;
