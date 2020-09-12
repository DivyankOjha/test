const mongoose = require('mongoose');

const postPropertySchema = new mongoose.Schema({
  name: String,
  email: String,
  phonenumber: Number,
  address: String,
  propertyDetails: String,
  nationalidimage: String, // image field
  propertyimage: [], // 5 image fields
  createdAt: { type: Date, default: Date.now },
});

const PostProperty = mongoose.model('PostProperty', postPropertySchema);

module.exports = PostProperty;
