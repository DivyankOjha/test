const mongoose = require('mongoose');

const attributesSchema = new mongoose.Schema({
  food: { type: Boolean, default: false },
});

const Attributes = mongoose.model('Attributes', attributesSchema);

module.exports = Attributes;
