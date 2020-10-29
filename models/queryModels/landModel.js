const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const landQuery = new mongoose.Schema({
  //page1 in admin add property details

  categoryType: { type: String, default: 'Land' },
  page2: { type: Boolean, default: false },
  page3: { type: Boolean, default: false },
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
  //Attributes
  attributes: {
    mainCategory: String,

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
  },
  kmtoshoppingcenter: { type: Number },
  kmtoneighbour: { type: Number },
  kmtotarmac: { type: Number },
  kmtowater: { type: Number },
  kmtoelectricity: { type: Number },
});

const LandQuery = mongoose.model('LandQuery', landQuery);

module.exports = LandQuery;
