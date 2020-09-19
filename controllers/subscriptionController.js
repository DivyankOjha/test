const catchAsync = require('./../utils/catchAsync');
const Subs = require('../models/subscriptionModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const sendEmail = require('./../utils/email');

exports.Subscription = catchAsync(async (req, res, next) => {
  const newSub = await Subs.create(req.body);
  console.log(newSub);
  // update issubscribed true in user
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
  const subscription = await Subs.find({}); //.skip(skip).limit(limit);
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

exports.SubscriptionfilterbyRentBuy = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);

  if (req.body.subscriptionType === 'buy') {
    const subs = await Subs.find({
      subscriptionType: 'buy',
    });
    res.status(200).json({
      status: 'success',
      results: subs.length,
      data: subs,
    });
  }
  if (req.body.subscriptionType === 'rent') {
    const subs = await Subs.find({
      subscriptionType: 'rent',
    });
    res.status(200).json({
      status: 'success',
      results: subs.length,
      data: subs,
    });
  }

  // .skip(skip)
  // .limit(limit);
  //console.log('Subs: ' + subs);
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
  });
  // .skip(skip)
  // .limit(limit);
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
      // console.log('this is id');
      const subs = await Subs.findById(searchquery);
      // console.log(subs);
      res.status(200).json({
        status: 'success',
        results: subs.length,
        data: subs,
      });
    } else {
      //console.log('this is email');
      const subs = await Subs.find({
        $expr: {
          $regexMatch: {
            input: '$email',
            regex: searchquery, //Your text search here
            options: 'm',
          },
        },
      });
      //console.log(subs);
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

exports.updateUsedPoints = catchAsync(async (req, res) => {
  //  console.log(req.user.id);
  let id = '5f538841557252230c231db7';
  const subscription = await User.findByIdAndUpdate({ _id: id });
  //console.log(subscription.subscription.usedPoints);
  const update = await User.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        'subscription.usedPoints': subscription.subscription.usedPoints + 1,
      },
    }
  );

  const checkUsedPoints = await User.findById({ _id: id });
  // console.log(checkUsedPoints);
  let math70 = (checkUsedPoints.subscription.totalPoints / 100) * 70;
  //console.log(math70);
  if (checkUsedPoints.subscription.usedPoints === math70) {
    //math70
    console.log('greater than 70');
    const message = `<p> Subscription Message : You have consumed 70 percent of the total points </p> `;

    await sendEmail({
      email: checkUsedPoints.email,
      subject: `Hi, ${checkUsedPoints.firstname}, Subscription expiring soon!`,
      //  subject: 'Your password reset token (valid for 10 min)',
      message,
    });
  }
  res.status(200).json({
    status: 'success',
    // results: subscription.length,
    data: {
      checkUsedPoints,
    },
  });
});
