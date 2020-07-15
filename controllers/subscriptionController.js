const catchAsync = require('./../utils/catchAsync');
const Subs = require('../models/subscriptionModel');

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
  const subs = await Subs.find();
  res.status(200).json({
    status: 'success',
    results: subs.length,
    data: {
      subs,
    },
  });
});
