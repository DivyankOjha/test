const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const landQuery = new mongoose.Schema({
  location: {
    coordinates: {
      lattitude: { type: Number },
      longitude: { type: Number },
    },
    type: { type: String, default: 'Point' },
  },
  categoryType: { type: String, default: 'Land' },

  createdAt: { type: Date, default: Date.now },

  area: String,
  cost: {
    min: Number,
    max: Number,
  },
  sizeinacres: {
    min: Number,
    max: Number,
  },

  attributes: {
    mainCategory: String,

    // leasefreehold: String,
    lease: Boolean,
    freehold: Boolean,

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
  },
  kmtoshoppingcenter: { type: Number },
  kmtoneighbour: { type: Number },
  kmtotarmac: { type: Number },
  kmtowater: { type: Number },
  kmtoelectricity: { type: Number },
});

const LandQuery = mongoose.model('LandQuery', landQuery);

module.exports = LandQuery;
