const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  Category: {
    house: Boolean,
    land: Boolean,
    hotel: Boolean,
    commercial: Boolean,
  },
  propertyname: String,
  propertytype: {
    house: String,
    hotel: String,
    commercial: String,
    residential: String,
    land: String,
    plot: String,
  },

  //page 2
  propertyattributes: {
    gated: { type: Boolean, default: false },
    standalone: { type: Boolean, default: false },
    apartment: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    offplan: { type: Boolean, default: false },
    refurbished: { type: Boolean, default: false },
    opticalfiber: { type: Boolean, default: false },
    swimmingpool: { type: Boolean, default: false },
    fireplace: { type: Boolean, default: false },
    petsallowed: { type: Boolean, default: false },
    solarhotwater: { type: Boolean, default: false },
    waterfront: { type: Boolean, default: false },
  },
  bathrooms: Number,
  steambath: Number,
  bathtubs: Number,
  parkingslots: Number,
  livingareasize: Number,
  kitechenareasize: Number,
  //page 3
  sellername: String,
  sellerContactNumber: Number,
  sellerofficeaddress: String,
  selleremail: String,
  sellertype: {
    owner: { type: String, default: false },
    agent: { type: String, default: false },
  },
  selleraltnumber: Number,
  selleraltemail: String,
  sellerwebsite: String,
  sellerlogo: String, //image path
  //remaining from doc
  maximumprice: Number,
  minimumprice: Number,
  location: String, //address
  description: String, // this point - !cleared
  maplink: String,
  nearestplace: {
    placename: String,
    kms: String,
  },
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
