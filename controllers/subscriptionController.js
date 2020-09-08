const catchAsync = require('./../utils/catchAsync');
const Subs = require('../models/subscriptionModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');

exports.Subscription = catchAsync(async (req, res, next) => {
  const newSub = await Subs.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      Subscription: newSub,
    },
  });
});

exports.getAllSubscription = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const subscription = await Subs.find({}).skip(skip).limit(limit);
  res.status(200).json({
    status: 'success',
    results: subscription.length,
    data: {
      subscription,
    },
  });
});

//by user id from user schema
exports.getUserSubscription = catchAsync(async (req, res) => {
  const subscription = await User.find(
    { _id: req.params.id },
    { subscription: 1 }
  );
  res.status(200).json({
    status: 'success',
    data: {
      subscription,
    },
  });
});

exports.Subscriptionfilterbydate = catchAsync(async (req, res) => {
  let { startDate, endDate } = req.body;
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);

  //console.log(endDate + 'T' + '00:00:00');
  const subs = await Subs.find({
    subscriptionDate: { $gte: startDate, $lte: endDate + 'T' + '23:59:59' },
    //email: 1,
    // createdAt: { $lt: endDate },
  })
    .skip(skip)
    .limit(limit);
  //console.log('Subs: ' + subs);

  res.status(200).json({
    status: 'success',
    results: subs.length,
    data: subs,
  });
});

//searching by email and subscription id
exports.searchSubscription = catchAsync(async (req, res, next) => {
  //by subscriptionid/email
  let searchquery = req.body.searchquery;
  let str = searchquery;
  let substr = '@';
  // console.log(str.includes(substr));
  console.log(searchquery);

  //const _id = searchquery;
  //console.log('length' + _id.length);
  try {
    if (mongoose.Types.ObjectId.isValid(searchquery)) {
      console.log('this is id');
      const subs = await Subs.findById(searchquery);
      console.log(subs);
      res.status(200).json({
        status: 'success',
        results: subs.length,
        data: subs,
      });
    }
    if (str.includes(substr)) {
      //console.log('this is email');
      const subs = await Subs.findOne({ email: searchquery });
      console.log(subs);
      res.status(200).json({
        status: 'success',
        results: subs.length,
        data: subs,
      });
    }
  } catch (error) {
    //console.log(error);
    res.status(404).json({
      status: 'Not Found',
      message: 'Subscription Details Not Found! Try again.',
    });
  }
});
