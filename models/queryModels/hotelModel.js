const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);

const hotelQuery = new mongoose.Schema({
  Hotel: String,
  area: { type: String },
  categoryType: { type: String, default: 'Hotel' },

  createdAt: { type: Date, default: Date.now },

  bedbreakfastcost: {
    min: Number,
    max: Number,
  },
  kmfromtarmac: { type: Number },
  conferenceroom: { type: Number },
  attributes: {
    mainCategory: { type: String, default: 'let' },
    class: { type: String },
    locality: { type: String },

    carpark: { type: Boolean },
    aircon: { type: Boolean },
    spa: { type: Boolean },
    freshoutdoors: { type: Boolean },
    indoorpool: { type: Boolean },
    disabilityaccess: { type: Boolean },
    barlounge: { type: Boolean },
    hairsalon: { type: Boolean },
    petsallowed: { type: Boolean },
  },
});

const HotelQuery = mongoose.model('hotelQuery', hotelQuery);

module.exports = HotelQuery;
