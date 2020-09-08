const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  //page1 in admin add property details

  isFlipbook: { type: Boolean, default: false },
  isStatus: { type: Boolean, default: true },
  categoryType: { type: String, default: 'House' },

  propertyDetails: {
    propertyName: String,
    propertyFor: { type: String },
    propertyDescription: String,
    propertyType: { type: String, default: 'House' },
    otherDetails: String,
    mapLink: String,
    selectSimilarProperties: Array, //this field not clear image icon is displayed in design
    //area: { type: Number },
    // price: Number,
  },

  //attributes page 2
  attributes: {
    cost: Number,
    area: Number,
    //transform radio buttons like hotel
    //mainCategory : buy,let,fully

    mainCategory: String,
    // buy: { type: Boolean },
    // let: { type: Boolean },
    // fullyfurnished: { type: Boolean },

    subCategory: String,
    // gated: { type: Boolean },
    // standAlone: { type: Boolean },
    // apartment: { type: Boolean },

    propertyStatus: String,
    // complete: { type: Boolean },
    // offplan: { type: Boolean },
    // refurbished: { type: Boolean },

    opticalfiber: { type: Boolean },
    swimmingpool: { type: Boolean },
    fireplace: { type: Boolean },
    petsallowed: { type: Boolean },
    solarhotwater: { type: Boolean },
    waterfront: { type: Boolean },
    cctv: { type: Boolean },
    borehole: { type: Boolean },
    disabilityfeature: { type: Boolean },
    maturegarden: { type: Boolean },
    balcony: { type: Boolean },
    partyarea: { type: Boolean },

    gym: Number,
    bedroom: { type: Number },
    bathrooms: Number,
    steambath: { type: Number },
    lift: { type: Number },
    bathtab: { type: Number },
    parking: { type: Number },
    livingsize: {
      type: Number,
    },
    kitchensize: {
      type: Number,
    },
    gardensize: {
      type: Number,
    },
  },

  //page 3 seller details

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
    // maximumprice: Number,
    // minimumprice: Number,
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
    //showattributes
    showAttributes: {
      cost: Boolean,

      buy: { type: Boolean },
      let: { type: Boolean },
      fullyfurnished: { type: Boolean },

      gated: { type: Boolean },
      standAlone: { type: Boolean },
      apartment: { type: Boolean },

      complete: { type: Boolean },
      offplan: { type: Boolean },
      refurbished: { type: Boolean },

      opticalfiber: { type: Boolean },
      swimmingpool: { type: Boolean },
      fireplace: { type: Boolean },
      petsallowed: { type: Boolean },
      solarhotwater: { type: Boolean },
      waterfront: { type: Boolean },
      cctv: { type: Boolean },
      borehole: { type: Boolean },
      disabilityfeature: { type: Boolean },
      maturegarden: { type: Boolean },
      balcony: { type: Boolean },
      partyarea: { type: Boolean },
      gym: Boolean,

      bedroom: { type: Boolean },
      bathrooms: Boolean,
      steambath: { type: Boolean },
      lift: { type: Boolean },
      bathtab: { type: Boolean },
      parking: { type: Boolean },
      livingarea: Boolean,
      kitchensize: Boolean,
      gardensize: Boolean,
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

const House = mongoose.model('House', houseSchema);

module.exports = House;
