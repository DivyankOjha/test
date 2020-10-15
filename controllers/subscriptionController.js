const catchAsync = require('./../utils/catchAsync');
const Subs = require('../models/subscriptionModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const sendEmail = require('./../utils/email');
const AppError = require('./../utils/appError');

exports.Subscription = catchAsync(async (req, res, next) => {
  if (req.body.userID) {
    const getUser = await User.findById({ _id: req.body.userID });
    console.log(getUser.isSubscribed);
    if (getUser.isSubscribed) {
      return next(new AppError('You are Already Subscribed!', 400));
    }
  }
  const newSub = await Subs.create(req.body);
  console.log(newSub);
  // update issubscribed true in user
  const updateInUser = await User.findByIdAndUpdate(
    { _id: newSub.userID },
    {
      $set: { isSubscribed: true },
    }
  );
  const updateInNewSub = await Subs.findByIdAndUpdate(
    { _id: newSub._id },
    {
      $set: { email: updateInUser.email },
    }
  );
  console.log(updateInNewSub);
  const message = `<p> Your are Subscribed  </p> `;

  await sendEmail({
    email: updateInUser.email,
    subject: `Hi, ${updateInUser.firstname}, Congratulations! Your Subscription has been activated`,
    //  subject: 'Your password reset token (valid for 10 min)',
    message,
  });
  res.status(201).json({
    status: 'success',
    data: {
      Subscription: newSub,
    },
  });
});

exports.renewSubscription = catchAsync(async (req, res, next) => {
  // if (req.body.userID) {
  const getUser = await User.findById({ _id: req.body.userID });
  // console.log(getUser.isSubscribed);
  // if (getUser.isSubscribed) {
  //   return next(new AppError('You are Already Subscribed!', 400));
  // }
  //}

  const newSub = await Subs.findOne({ userID: req.body.userID });
  // console.log(newSub);
  let currentTotalPoints = newSub.totalpoints;
  let newTotalPoints = currentTotalPoints + req.body.totalpoints;
  let subscriptionFrequency = newSub.subscriptionFrequency;
  let newsubscriptionFrequency = subscriptionFrequency + 1;
  const renewSub = await Subs.findByIdAndUpdate(
    { _id: newSub._id },
    {
      $set: {
        subscriptionType: req.body.subscriptionType,
        subscriptionAmount: req.body.subscriptionAmount,
        totalpoints: newTotalPoints,
        subscriptionFrequency: newsubscriptionFrequency,
      },
    }
  );
  console.log(newSub._id);
  //update issubscribed true in user
  const updateInUser = await User.findByIdAndUpdate(
    { _id: newSub.userID },
    {
      $set: { isSubscribed: true },
    }
  );
  const updateInNewSub = await Subs.findByIdAndUpdate(
    { _id: newSub._id },
    {
      $set: { email: updateInUser.email },
    }
  );
  console.log(updateInNewSub);
  const message = `<p> Your are Subscription is Renewed  </p> `;

  await sendEmail({
    email: updateInUser.email,
    subject: `Hi, ${updateInUser.firstname}, Congratulations! Your Subscription has been activated`,
    //  subject: 'Your password reset token (valid for 10 min)',
    message,
  });
  res.status(201).json({
    status: 'success',
    data: {
      Subscription: renewSub,
    },
  });
});

exports.getAllSubscription = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const subscription = await Subs.find({}).sort({ _id: -1 }); //.skip(skip).limit(limit);
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
  //by user id
  const subscription = await Subs.find(
    { userID: req.params.id }
    //{ subscription: 1 }
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
    }).sort({ _id: -1 });
    res.status(200).json({
      status: 'success',
      results: subs.length,
      data: subs,
    });
  }
  if (req.body.subscriptionType === 'rent') {
    const subs = await Subs.find({
      subscriptionType: 'rent',
    }).sort({ _id: -1 });
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
  }).sort({ _id: -1 });
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
  console.log(req.params.id);
  let id = req.params.id; //'5f538841557252230c231db7';
  const subscription = await Subs.findOne({ userID: id });
  console.log(subscription);
  // console.log(subscription.subscription.usedPoints);
  let n = 1;
  // console.log(subscription[0]);
  //console.log(subscription[0].usedPoints);
  let up = await subscription.usedPoints;
  let sum = up + n;
  console.log('up' + up);
  const update = await Subs.findOneAndUpdate(
    { userID: id },
    {
      $set: {
        usedPoints: sum,
      },
    }
  );
  //console.log('update' + update.email);
  const checkUsedPoints = await Subs.find({ userID: id });
  //url = `https://cuboidtechnologies.com/renew-subscription/${checkUsedPoints[0].subscriptionType}/${checkUsedPoints[0].userID}`;
  //console.log(url);
  console.log('check' + checkUsedPoints[0].subscriptionType);
  let math70 = (checkUsedPoints[0].totalpoints / 100) * 75;
  let math98 = (checkUsedPoints[0].totalpoints / 100) * 98;
  console.log(math70, math98);
  const finduser = await User.findById({ _id: id });
  if (checkUsedPoints[0].usedPoints === math70) {
    //math70
    console.log('greater than 70');
    const message = `<p> Subscription Message : You have consumed 70 percent of the total points </p> `;

    await sendEmail({
      email: finduser.email,
      subject: `Hi, ${finduser.firstname}, Subscription expiring soon!`,
      //  subject: 'Your password reset token (valid for 10 min)',
      message,
    });
  }
  if (checkUsedPoints[0].usedPoints === math98) {
    //math70
    console.log('greater than 70');
    url = `https://cuboidtechnologies.com/renew-subscription/${checkUsedPoints[0].subscriptionType}/${checkUsedPoints[0].userID}`;
    console.log(url);
    // const message = `<p> Subscription Message : You have consumed 98 percent of the total points </p>`;
    const message = `<p>You have consumed 98 percent of the total points.<br> 
      <br> To renew your subcription, please <a href = "${url}"> <b>Visit this link</b> </a> </p> <hr>  
      <h3> <b>Having Trouble? </b> </h3> 
      <p>If the above link does not work try copying this link into your browser. </p> 
      <p>${url}</p>  <hr>
      <h3><b> Questions? <b> </h3>
      <p>Please let us know if there's anything we can help you with by replying to this email or by emailing <b>support@cuboid.com</b></p>
      `;

    //http://localhost:3000/renew-subscription/rent/5f707472dd65b1161400a771

    await sendEmail({
      email: finduser.email,
      subject: `Hi, ${finduser.firstname}, Subscription expiring soon!`,
      //  subject: 'Your password reset token (valid for 10 min)',
      message,
    });
  }
  //98
  //console.log(checkUsedPoints[0].usedPoints);
  if (checkUsedPoints[0].usedPoints === checkUsedPoints[0].totalpoints) {
    //console.log('In here');
    const updateinUser = await User.findOneAndUpdate(
      { _id: id },
      { $set: { isSubscribed: false } }
    );
    // console.log(updateinUser);
    //console.log('greater than  total');
    const message = `<p> Your subscription has expired! Please Subscribe / renew to resume services </p> `;

    await sendEmail({
      email: finduser.email,
      subject: `Hi, ${finduser.firstname}, Subscription expired!`,
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

exports.deleteSubscription = catchAsync(async (req, res) => {
  var ids = req.body.deleteSubscription;
  // console.log('id' + ids);
  for (var i in ids) {
    const getsub = await Subs.findById({ _id: ids[i] });
    // console.log(getsub);
    const getuser = await User.findByIdAndUpdate(
      { _id: getsub.userID },
      {
        $set: { isSubscribed: false },
      }
    );
    // console.log(getuser);
  }
  const deletemany = await Subs.deleteMany({
    _id: { $in: ids },
  });
  if (deletemany.deletedCount === 0) {
    res.status(200).json({
      message: 'Subscription not found or Already Deleted! Please refresh!',
    });
  } else {
    res.status(200).json({
      status: 'success',
      message: 'Deleted Successfully',
      deleted: deletemany.deletedCount,
    });
  }
});
