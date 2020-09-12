const mongoose = require('mongoose');

const flipbookSchema = new mongoose.Schema({
  title: String, //Title is property name ???
  description: String,
  flipbookImage: String, //Banner
  //Property Details/Attributes
  gated: { type: Boolean, default: false },
  opticalfiber: { type: Boolean, default: false },
  cctv: { type: Boolean, default: false },
  standalone: { type: Boolean, default: false },
  swimmingpool: { type: Boolean, default: false },
  borehole: { type: Boolean, default: false },
  apartment: { type: Boolean, default: false },
  fireplace: { type: Boolean, default: false },
  disability: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
  petsallowed: { type: Boolean, default: false },
  maturegarden: { type: Boolean, default: false },
  offplane: { type: Boolean, default: false },
  solarhotwater: { type: Boolean, default: false },
  balcony: { type: Boolean, default: false },
  refurbished: { type: Boolean, default: false },
  waterfront: { type: Boolean, default: false },
  partyarea: { type: Boolean, default: false },
  bathrooms: Number,
  steambath: Number,
  lifts: Number,
  bathtabs: Number,
  parkingslots: Number,
  gym: Number,

  //select particilars
  livingareasize: { type: Number, min: 0, max: 5000 },
  kitchenareasize: { type: Number, min: 0, max: 5000 },
  gardenareasize: { type: Number, min: 0, max: 5000 },

  //Pages
  //Second page
  image2D: String,
  image3D: String,
  tour360Property: String,
  floorPlan: String, //image field in design ?????
  map: String,
  //contactSeller: String,
  propertyAvailability: Boolean,
  // sendmessageToSeller: String, //email ???

  //page3 in design
  content: String,
});

const Flipbook = mongoose.model('Flipbook', flipbookSchema);

module.exports = Flipbook;
