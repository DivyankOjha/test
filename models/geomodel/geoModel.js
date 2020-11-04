const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const geoQuery = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  categoryType: { type: String, default: 'Geo' },
  propertyType: { type: String },
  propertyId: mongoose.Schema.ObjectId,
  location: {
    coordinates: {
      lattitude: { type: Number },
      longitude: { type: Number },
    },
    type: { type: String, default: 'Point' },
  },
});

const geolocation = mongoose.model('geoQuery', geoQuery);

module.exports = geolocation;
