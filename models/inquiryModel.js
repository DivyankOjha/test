const mongoose = require('mongoose');
const validator = require('validator');

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please Tell us your name'] },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    //validate: [validator.isEmail, 'Please provide a valid email'],
  },
  mobilenumber: Number,
  // idproof: { type: String, requird: [true, 'enter id proof'] },
  comment: String,
  code: Number,
  address: String,
  createdAt: { type: Date, default: Date.now },
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
