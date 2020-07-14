const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const landSchema = new mongoose.Schema({
  minimumcost: { type: Currency, default: 5 },
  maximumcost: { type: Currency, default: 500 },
  sizeinacres: { type: Number, default: 50 }, // need to set min max ??
  freehold: { type: Boolean, default: false },
  councilwater: { type: Boolean, default: false },
  electricity: { type: Boolean, default: false },
  borehole: { type: Boolean, default: false },
  readyfence: { type: Boolean, default: false },
  controlleddevelopment: { type: Boolean, default: false },
  waterfront: { type: Boolean, default: false },
  gated: { type: Boolean, default: false },
  // soiltype: ['red', 'blackcotton', 'murram'],
  soiltype: {
    red: { type: Boolean, defult: false },
    blackcotton: { type: Boolean, defult: false },
    murram: { type: Boolean, defult: false },
  },
  nature: {
    residential: { type: Boolean, default: false },
    commercial: { type: Boolean, default: false },
    industrial: { type: Boolean, default: false },
  },
  //   road: [
  //     { tarmac: { type: Boolean, default: false } },
  //     { murram: { type: Boolean, default: false } },
  //     { allweather: { type: Boolean, default: false } },
  //     { noroad: { type: Boolean, default: false } },
  //   ],

  road: {
    tarmac: { type: Boolean, default: false },
    murram: { type: Boolean, default: false },
    allweather: { type: Boolean, default: false },
    noroad: { type: Boolean, default: false },
  },
  kmtoshoppingcenter: { type: Number },
  kmtoneighbour: { type: Number },
  kmtotarmac: { type: Number },
  kmtowater: { type: Number },
  electricity: { type: Number },
});

const Land = mongoose.model('Land', landSchema);

module.exports = Land;
