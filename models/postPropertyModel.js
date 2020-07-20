const mongoose = require('mongoose');

const postPropertySchema = new mongoose.Schema({
  name: String,
  email: String,
  phonenumber: Number,
  address: String,
  propertyDetails: String,
  uploadNationalId: String, // image field
  uploadPropertyImages: String, // 5 image fields
});

const PostProperty = mongoose.model('PostProperty', postPropertySchema);

module.exports = PostProperty;
