const mongoose = require('mongoose');
//const User = require('.././models/userModel');

const reviewsSchema = new mongoose.Schema({
  name: String,
  review: String,
  rating: Number,
  isActive: { type: Boolean, default: true },
  userId: { type: mongoose.Schema.ObjectId },
  propertyID: { type: mongoose.Schema.ObjectId },
  isSelect: { type: Boolean, default: true },
});

const Reviews = mongoose.model('Reviews', reviewsSchema);

module.exports = Reviews;
