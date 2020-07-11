const mongoose = require('mongoose');

// const housetypeSchema = new mongoose.Schema(
//   {
//     gated: { type: Boolean, default: false },
//     standAlone: { type: Boolean, default: false },
//     Apartment: { type: Boolean, default: false },
//   },
//   {
//     timestamps: true,
//     usePushEach: true,
//   }
// );

const houseSchema = new mongoose.Schema({
  area: { type: Number },
  minPrice: { type: Number },
  maxPrice: { type: Number },

  //IFMISFile: { type: mongoose.Schema.ObjectId, ref: 'ifmisFile' },
  buy: [
    {
      buy: { type: Boolean, default: false },
      subcategory: [
        {
          gated: { type: Boolean, default: false },
          standAlone: { type: Boolean, default: false },
          apartment: { type: Boolean, default: false },
        },
      ],
    },
  ],
  let: [
    {
      let: { type: Boolean, default: false },
      subcategory: [
        {
          gated: { type: Boolean, default: false },
          standAlone: { type: Boolean, default: false },
          apartment: { type: Boolean, default: false },
        },
      ],
    },
  ],
  fullyfurnished: [
    {
      fullyfurnished: { type: Boolean, default: false },
      subcategory: [
        {
          gated: { type: Boolean, default: false },
          standAlone: { type: Boolean, default: false },
          apartment: { type: Boolean, default: false },
        },
      ],
    },
  ],
  propertyStatus: [
    {
      propertyStatus: { type: Boolean, default: false },
      subcategory: [
        {
          Complete: { type: Boolean, default: false },
          offplan: { type: Boolean, default: false },
          refurbished: { type: Boolean, default: false },
        },
      ],
    },
  ],
});

const House = mongoose.model('House', houseSchema);

module.exports = House;
