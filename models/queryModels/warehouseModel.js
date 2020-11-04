const mongoose = require('mongoose');

const warehouseQuery = new mongoose.Schema({
  //page1 in admin add property details
  categoryType: { type: String, default: 'Warehouse' },
  page2: { type: Boolean, default: false },
  page3: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  area: { type: String },
  cost: {
    min: Number,
    max: Number,
  },
  sizeinfeet: {
    min: Number,
    max: Number,
  },
  kmfromtarmac: Number,

  attributes: {
    mainCategory: String,
    Type: String,

    conferencefacilites: { type: Boolean },
    freshoutdoors: { type: Boolean },
    aircon: { type: Boolean },
    fullyfurnished: { type: Boolean },
    landscapegarden: { type: Boolean },
    wifi: { type: Boolean },
    sharedsecretary: { type: Boolean },

    zoning: String,
    townLocation: String,
    accessRoad: String,
    tenants: String,
    elevator: String,
    security: String,
    vehicleTraffic: String,
    humanTraffic: String,
    meetingRoom: String,
    parking: String,
  },
});

const WarehouseQuery = mongoose.model('warehouseQuery', warehouseQuery);

module.exports = WarehouseQuery;
