const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  type: {
    godown: { type: Boolean, defult: false },
    commspace: { type: Boolean, defult: false },
  },
  area: { type: String },
  mincost: String,
  maxcost: String,
  sizeinfeetfrom: Number,
  sizeinfeetto: Number,
  kmfromtarmax: String,
  conferencefacilites: { type: Boolean, defult: false },
  freshoutdoors: { type: Boolean, defult: false },
  aircon: { type: Boolean, defult: false },
  fullyfurnished: { type: Boolean, defult: false },
  landscapegarden: { type: Boolean, defult: false },
  wifi: { type: Boolean, defult: false },
  sharedsecretary: { type: Boolean, defult: false },

  zoning: {
    commercial: { type: Boolean, defult: false },
    industrial: { type: Boolean, defult: false },
    residential: { type: Boolean, defult: false },
    epz: { type: Boolean, defult: false },
  },
  townlocation: {
    downtown: { type: Boolean, defult: false },
    uptown: { type: Boolean, defult: false },
    neartown: { type: Boolean, defult: false },
  },
  accessroad: {
    tarmac: { type: Boolean, defult: false },
    cabro: { type: Boolean, defult: false },
    allweather: { type: Boolean, defult: false },
    main: { type: Boolean, defult: false },
  },
  tenants: {
    mixed: { type: Boolean, defult: false },
    specialized: { type: Boolean, defult: false },
    processing: { type: Boolean, defult: false },
  },
  elevator: {
    none: { type: Boolean, defult: false }, // default true ??
    goods: { type: Boolean, defult: false },
    passenger: { type: Boolean, defult: false },
    passengerandgoods: { type: Boolean, defult: false },
  },
  security: {
    tight: { type: Boolean, defult: false },
    maingate: { type: Boolean, defult: false },
    maingateandfloors: { type: Boolean, defult: false },
    none: { type: Boolean, defult: false },
  },
  vehicletraffic: {
    veryhigh: { type: Boolean, defult: false },
    high: { type: Boolean, defult: false },
    low: { type: Boolean, defult: false },
  },
  humantraffic: {
    veryhigh: { type: Boolean, defult: false },
    high: { type: Boolean, defult: false },
    low: { type: Boolean, defult: false },
  },
  meetingroom: {
    none: { type: Boolean, defult: false },
    free: { type: Boolean, defult: false },
    paid: { type: Boolean, defult: false },
  },
  parking: {
    none: { type: Boolean, defult: false },
    free: { type: Boolean, defult: false },
    paid: { type: Boolean, defult: false },
  },
});

const WareHouse = mongoose.model('WareHouse', warehouseSchema);

module.exports = WareHouse;
