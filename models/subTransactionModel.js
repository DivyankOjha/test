const mongoose = require('mongoose');

const subTransactionSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.ObjectId },
  transactionid: String,
  paymentstatus: String,
  subscriptionType: { type: String },
  subscriptionAmount: { type: Number },
  totalpoints: { type: Number },
  usedPointsBuy: { type: Number },
  usedPointsRent: { type: Number },
  subscriptionDate: { type: Date, default: Date.now },
  email: { type: String },
});
const subTransaction = mongoose.model('subTransaction', subTransactionSchema);
module.exports = subTransaction;
