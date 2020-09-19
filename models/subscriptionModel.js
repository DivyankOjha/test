const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
  isStatus: { type: Boolean, default: true },
  // Subscription order ID
  // Customer email
  userID: { type: mongoose.Schema.ObjectId },
  subscriptionType: { type: String }, //rent
  subscriptionAmount: { type: Number }, //1200,
  totalpoints: Number,
  usedPoints: { type: Number }, // 50,
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
