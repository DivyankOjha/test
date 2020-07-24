const mongoose = require('mongoose');

const flipbookSchema = new mongoose.Schema({
  propertyName: String,
  flipbookImage: String,
  propertyDetails: String,

  //Pages
  //Second page
  image2D: String,
  image3D: String,
  tour360Property: String,
  floorPlan: String,
  map: String,
  contactSeller: String,
  propertyAvailability: Boolean,
  sendmessageToSeller: String, //email ???
});

const Flipbook = mongoose.model('Flipbook', flipbookSchema);

module.exports = Flipbook;
