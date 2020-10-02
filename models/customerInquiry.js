const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  flipbookName: String,
  sellerName: String,
  sellerEmail: String,
  message: String,
  username: String,
  userEmail: String,
  createdAt: { type: Date, default: Date.now },
  isSelect: { type: Boolean, default: false },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
