const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
  //  Subscription order ID
  // Customer email
  // User ID
  // Subscription type
  // Subscription amount
  // Used Points
  // Subscription date,
  subscriptionId: String,
  subscriptionDate: { type: Date, default: Date.now },
  //  amount:
  //  email:
  //  userid:
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, ' must belong to a user'],
  },
});

subSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'user',
    select: 'email _id',
  });
  next();
});

const Subs = mongoose.model('Subscription', subSchema);

module.exports = Subs;
