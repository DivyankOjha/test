const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
  isStatus: { type: Boolean, default: true },
  // Subscription order ID
  // Customer email
  userID: { type: mongoose.Schema.ObjectId },
  subscriptionType: { type: String, default: 'rent' }, //rent
  subscriptionAmount: { type: Number, default: 1200 }, //1200,
  usedPoints: { type: Number, default: 50 }, // 50,
  subscriptionDate: { type: Date, default: Date.now },
  email: String,
  // subscriptionId: String,
  //  email:
});

// subSchema.pre(/^find/, function (next) {
//   this.populate('user').populate({
//     path: 'user',
//     select: 'email',
//   });
//   next();
// });

const Subs = mongoose.model('Subscription', subSchema);

module.exports = Subs;
