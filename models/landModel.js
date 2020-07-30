const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const landSchema = new mongoose.Schema({
  //page1 in admin add property details
  propertyDetails: {
    propertyName: String,
    propertyFor: {
      rent: { type: String, default: false },
      buy: { type: String, default: false },
    },
    propertyDescription: String,
    propertyType: String,
    otherDetails: String,
    mapLink: String,
    selectSimilarProperties: String, //this field not clear image icon is displayed in design
  },

  //Attributes
  attributes: {
    minimumcost: { type: Currency, default: 5 },
    maximumcost: { type: Currency, default: 500 },
    sizeinacres: { type: Number, default: 50 }, // need to set min max ??
    freehold: { type: Boolean, default: false },
    lease: { type: Boolean, default: false },
    councilwater: { type: Boolean, default: false },
    electricity: { type: Boolean, default: false },
    borehole: { type: Boolean, default: false },
    readyfence: { type: Boolean, default: false },
    controlleddevelopment: { type: Boolean, default: false },
    waterfront: { type: Boolean, default: false },
    gated: { type: Boolean, default: false },

    soiltype: {
      red: { type: Boolean, defult: false },
      blackcotton: { type: Boolean, defult: false },
      murram: { type: Boolean, defult: false },
    },
    nature: {
      residential: { type: Boolean, default: false },
      commercial: { type: Boolean, default: false },
      industrial: { type: Boolean, default: false },
    },

    road: {
      tarmac: { type: Boolean, default: false },
      murram: { type: Boolean, default: false },
      allweather: { type: Boolean, default: false },
      noroad: { type: Boolean, default: false },
    },
    kmtoshoppingcenter: { type: Number },
    kmtoneighbour: { type: Number },
    kmtotarmac: { type: Number },
    kmtowater: { type: Number },
    kmtoelectricity: { type: Number },
  },
  //page 3
  sellerDetails: {
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
  },
  //FlipbookSchema
  flipbook: {
    propertyName: String, //Title is property name ???
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
    contactSeller: String,
    propertyAvailability: Boolean,
    sendmessageToSeller: String, //email ???

    //page3 in design
    content: String,
  },
});

const Land = mongoose.model('Land', landSchema);

module.exports = Land;
