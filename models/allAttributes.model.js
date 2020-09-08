const mongoose = require('mongoose');

const attributesSchema = new mongoose.Schema({
  house: {
    cost: { type: Boolean, default: true },
    area: { type: Boolean, default: true },

    buy: { type: Boolean, default: true },
    let: { type: Boolean, default: true },
    fullyfurnished: { type: Boolean, default: true },

    gated: { type: Boolean, default: true },
    standAlone: { type: Boolean, default: true },
    apartment: { type: Boolean, default: true },

    complete: { type: Boolean, default: true },
    offplan: { type: Boolean, default: true },
    refurbished: { type: Boolean, default: true },

    opticalfiber: { type: Boolean, default: true },
    swimmingpool: { type: Boolean, default: true },
    fireplace: { type: Boolean, default: true },
    petsallowed: { type: Boolean, default: true },
    solarhotwater: { type: Boolean, default: true },
    waterfront: { type: Boolean, default: true },
    cctv: { type: Boolean, default: true },
    borehole: { type: Boolean, default: true },
    disabilityfeature: { type: Boolean, default: true },
    maturegarden: { type: Boolean, default: true },
    balcony: { type: Boolean, default: true },
    partyarea: { type: Boolean, default: true },
    gym: { type: Boolean, default: true },

    bedroom: { type: Boolean, default: true },
    bathrooms: { type: Boolean, default: true },
    steambath: { type: Boolean, default: true },
    lift: { type: Boolean, default: true },
    bathtab: { type: Boolean, default: true },
    parking: { type: Boolean, default: true },
    livingarea: { type: Boolean, default: true },
    kitchensize: { type: Boolean, default: true },
    gardensize: { type: Boolean, default: true },
  },
  land: {
    cost: { type: Boolean, default: true },
    sizeinacres: { type: Boolean, default: true }, // need to set min max ??

    freehold: { type: Boolean, default: true },
    lease: { type: Boolean, default: true },
    councilwater: { type: Boolean, default: true },
    electricity: { type: Boolean, default: true },
    borehole: { type: Boolean, default: true },
    readyfence: { type: Boolean, default: true },
    controlleddevelopment: { type: Boolean, default: true },
    waterfront: { type: Boolean, default: true },
    gated: { type: Boolean, default: true },

    soilType: { type: Boolean, default: true },
    nature: { type: Boolean, default: true },
    road: { type: Boolean, default: true },

    kmtoshoppingcenter: { type: Boolean, default: true },
    kmtoneighbour: { type: Boolean, default: true },
    kmtotarmac: { type: Boolean, default: true },
    kmtowater: { type: Boolean, default: true },
    kmtoelectricity: { type: Boolean, default: true },
  },
  hotel: {
    cost: { type: Boolean, default: true },
    class: { type: Boolean, default: true },
    locality: { type: Boolean, default: true },

    area: { type: Boolean, default: true },

    bedbreakfastcost: { type: Boolean, default: true },
    kmfromtarmac: { type: Boolean, default: true },
    conferenceroom: { type: Boolean, default: true },

    carpark: { type: Boolean, default: true },
    aircon: { type: Boolean, default: true },
    spa: { type: Boolean, default: true },
    freshoutdoors: { type: Boolean, default: true },
    indoorpool: { type: Boolean, default: true },
    disabilityaccess: { type: Boolean, default: true },
    barlounge: { type: Boolean, default: true },
    hairsalon: { type: Boolean, default: true },
    petsallowed: { type: Boolean, default: true },
  },
  warehouse: {
    Type: { type: Boolean, default: true },
    area: { type: Boolean, default: true },
    cost: { type: Boolean, default: true },
    sizeinfeet: { type: Boolean, default: true },
    kmfromtarmax: { type: Boolean, default: true },
    conferencefacilites: { type: Boolean, default: true },
    freshoutdoors: { type: Boolean, default: true },
    aircon: { type: Boolean, default: true },
    fullyfurnished: { type: Boolean, default: true },
    landscapegarden: { type: Boolean, default: true },
    wifi: { type: Boolean, default: true },
    sharedsecretary: { type: Boolean, default: true },
    zoning: { type: Boolean, default: true },
    townLocation: { type: Boolean, default: true },
    accessRoad: { type: Boolean, default: true },
    tenants: { type: Boolean, default: true },
    elevator: { type: Boolean, default: true },
    security: { type: Boolean, default: true },
    vehicleTraffic: { type: Boolean, default: true },
    humanTraffic: { type: Boolean, default: true },
    meetingRoom: { type: Boolean, default: true },
    parking: { type: Boolean, default: true },
  },
});

const AttributesList = mongoose.model('AttributesList', attributesSchema);

module.exports = AttributesList;
