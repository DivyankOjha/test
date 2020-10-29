const mongoose = require('mongoose');

const houseQuery = new mongoose.Schema({
  categoryType: { type: String, default: 'House' },
  page2: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  cost: {
    min: Number,
    max: Number,
  },
  area: String,
  attributes: {
    cost: Number,
    area: String,
    //transform radio buttons like hotel
    //mainCategory : buy,let,fully

    mainCategory: String,
    // buy: { type: Boolean },
    // let: { type: Boolean },
    // fullyfurnished: { type: Boolean },

    subCategory: String,
    // gated: { type: Boolean },
    // standAlone: { type: Boolean },
    // apartment: { type: Boolean },

    propertyStatus: String,
    // complete: { type: Boolean },
    // offplan: { type: Boolean },
    // refurbished: { type: Boolean },

    opticalfiber: { type: Boolean },
    swimmingpool: { type: Boolean },
    fireplace: { type: Boolean },
    petsallowed: { type: Boolean },
    solarhotwater: { type: Boolean },
    waterfront: { type: Boolean },
    cctv: { type: Boolean },
    borehole: { type: Boolean },
    disabilityfeature: { type: Boolean },
    maturegarden: { type: Boolean },
    balcony: { type: Boolean },
    partyarea: { type: Boolean },

    gym: Boolean, //before it was number ,changed on oct 17
    bedroom: { type: Number },
    bathrooms: Number,
    steambath: { type: Number },
    lift: { type: Number },
    bathtab: { type: Number },
    parking: { type: Number },
    livingsize: {
      type: Number,
    },
    kitchensize: {
      type: Number,
    },
    gardensize: {
      type: Number,
    },
  },
  livingArea: {
    min: Number,
    max: Number,
  },
  gardenArea: {
    min: Number,
    max: Number,
  },
  kitchenArea: {
    min: Number,
    max: Number,
  },
});

const HouseQuery = mongoose.model('HouseQuery', houseQuery);

module.exports = HouseQuery;
