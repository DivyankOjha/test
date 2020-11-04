const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);

const similarPropQuery = new mongoose.Schema({
  bedbreakfastcost: Number,
  Type: String,
  propertyId: mongoose.Schema.ObjectId,
  categoryType: { type: String, default: 'Others' },
  cost: Number,
});

const SimilarPropQuery = mongoose.model('similarPropQuery', similarPropQuery);

module.exports = SimilarPropQuery;
