const mongoose = require('mongoose');
const validator = require('validator');

const emailSchema = new mongoose.Schema({
  host: { type: String, required: [true, 'Host is required'] },
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: { type: String, required: [true, 'password is required'] },
  //updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
