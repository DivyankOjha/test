const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
  isStatus: { type: Boolean, default: true }, // Subscription order ID

  userID: { type: mongoose.Schema.ObjectId },
  transactionid: String,
  paymentstatus: String,
  subscriptionType: {
    buy: { type: Boolean, default: false },
    rent: { type: Boolean, default: false },
  },
  subscriptionAmount: {
    buy: { type: Number },
    rent: { type: Number },
  },
  totalpoints: {
    rent: { type: Number, default: 0 },
    buy: { type: Number, default: 0 },
  },
  usedPointsRent: { type: Number, default: 0 },
  usedPointsBuy: { type: Number, default: 0 },

  subscriptionDate: { type: Date, default: Date.now },
  email: String,
  isSelect: { type: Boolean, default: false },
  subscriptionFrequency: { type: Number, default: 1 },
});

const Subs = mongoose.model('Subscription', subSchema);

module.exports = Subs;
