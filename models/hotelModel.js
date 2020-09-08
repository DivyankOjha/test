const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const hotelSchema = new mongoose.Schema({
  //page1 in admin add property details

  isFlipbook: { type: Boolean, default: false },
  isStatus: { type: Boolean, default: true },
  categoryType: { type: String, default: 'Hotel' },
  propertyDetails: {
    propertyName: String,
    propertyFor: { type: String },
    propertyDescription: String,
    propertyType: { type: String },
    otherDetails: String,
    mapLink: String,
    selectSimilarProperties: Array,
  },

  attributes: {
    cost: { type: Number },
    class: { type: String },
    locality: { type: String },

    area: { type: Number },

    bedbreakfastcost: { type: Number },
    kmfromtarmac: { type: Number },
    conferenceroom: { type: Number },

    carpark: { type: Boolean },
    aircon: { type: Boolean },
    spa: { type: Boolean },
    freshoutdoors: { type: Boolean },
    indoorpool: { type: Boolean },
    disabilityaccess: { type: Boolean },
    barlounge: { type: Boolean },
    hairsalon: { type: Boolean },
    petsallowed: { type: Boolean },
    // worldclass: { type: Boolean },
    // midrange: { type: Boolean },
    // budget: { type: Boolean },

    // city: { type: Boolean },
    // airport: { type: Boolean },
    // outskirts: { type: Boolean },
    // gamehotel: { type: Boolean },

    //hotelname: { type: String }, == propertyName
  },

  //page 3
  sellerDetails: {
    sellername: String,
    sellerContactNumber: Number,
    sellerofficeaddress: String,
    selleremail: String,
    sellertype: String,
    selleraltnumber: Number,
    selleraltemail: String,
    sellerwebsite: String,
    sellerlogo: String, //image path
    //remaining from doc
    //maximumprice: Number,
    //minimumprice: Number,
    location: String, //address
    description: String, // this point - !cleared
    maplink: String,
    nearestplace: {
      placename: String,
      kms: String,
    },
  },

  //FlipbookSchema
  flipbook: {
    title: String, //Title is property name ???
    description: String,
    flipbookBanner: String, //Banner
    //Property Details/Attributes
    showAttributes: {
      cost: Boolean,
      class: Boolean,
      locality: Boolean,

      area: { type: Boolean },

      bedbreakfastcost: Boolean,
      kmfromtarmac: { type: Boolean },
      conferenceroom: Boolean,

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

    //Pages
    //Second page
    image2D: { type: Array },
    image3D: String,
    tour360Property: String, //link
    floorPlan: { type: Array }, //image field in design ?????
    map: String,
    contactSeller: String,
    propertyAvailability: Boolean,
    sendmessageToSeller: String, //email ???

    //page3 in design
    content: String,
  },
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
