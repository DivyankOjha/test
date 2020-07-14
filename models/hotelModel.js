const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const hotelSchema = new mongoose.Schema({
  class: {
    worldclass: { type: Boolean, defult: false },
    midrange: { type: Boolean, defult: false },
    budget: { type: Boolean, defult: false },
  },
  locality: {
    city: { type: Boolean, default: false },
    airport: { type: Boolean, default: false },
    outskirts: { type: Boolean, default: false },
    gamehotel: { type: Boolean, default: false },
  },
  area: { type: String },
  bedbreakfastmincost: String,
  bedbreakfastmaxcost: String,
  hotelname: { type: String },
  kmfromtarmac: { type: String },
  conferenceroom: Number,

  carpark: { type: Boolean, default: false },
  aircon: { type: Boolean, default: false },
  spa: { type: Boolean, default: false },
  freshoutdoors: { type: Boolean, default: false },
  indoorpool: { type: Boolean, default: false },
  disabilityaccess: { type: Boolean, default: false },
  barlounge: { type: Boolean, default: false },
  hairsalon: { type: Boolean, default: false },
  petsallowed: { type: Boolean, default: false },

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

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
