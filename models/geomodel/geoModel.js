const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const geo = new mongoose.Schema({
  location: {
    coordinates: Array,
  },
  name: String,
});

const geoS = mongoose.model('geo', geo);

module.exports = geoS;
