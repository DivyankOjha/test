const catchAsync = require('./../utils/catchAsync');
const Subs = require('../models/subscriptionModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const sendEmail = require('./../utils/email');
const AppError = require('./../utils/appError');
const subTransaction = require('../models/subTransactionModel');

exports.Subscription = catchAsync(async (req, res, next) => {
  console.log(req.body);
  //req.body.userID;
  const getUser = await User.findById({ _id: req.body.userID });
  //console.log(getUser);
  //console.log(getUser.isSubscribedBuy);
  // console.log(getUser.isSubscribedRent);

  // console.log(getUser.IsSubscribedRent);
  if (getUser.isSubscribedRent === true && getUser.isSubscribedBuy === true) {
    return next(new AppError('You are Already Subscribed!', 400));
  } else if (
    getUser.isSubscribedBuy === false &&
    getUser.isSubscribedRent === true &&
    req.body.subscriptionType.buy === true
  ) {
    console.log('selected Buy package');
    //  const newSub = await Subs.create(req.body);
    const findSub = await Subs.findOne({ userID: req.body.userID });
    console.log('findSub: ' + findSub);
    const getBuySub = await Subs.findByIdAndUpdate(
      { _id: findSub._id },
      {
        $set: {
          'subscriptionType.buy': true,
          'subscriptionAmount.buy': req.body.subscriptionAmount.buy,
          'totalpoints.buy': req.body.totalpoints.buy,
        },
      }
    );
    console.log(getBuySub);
    // update issubscribed true in user

    const updateInUser = await User.findByIdAndUpdate(
      { _id: req.body.userID },
      {
        $set: { isSubscribedBuy: true },
      }
    );
    // console.log(updateInUser);
    const updateInNewSub = await Subs.findByIdAndUpdate(
      { _id: req.body.userID },
      {
        $set: { email: updateInUser.email },
      }
    );
    console.log(req.body);

    let addInRecordData = {
      userID: req.body.userID,
      subscriptionType: 'buy',
      subscriptionAmount: req.body.subscriptionAmount.buy,
      totalpoints: req.body.totalpoints.buy,
      email: getUser.email,
    };
    //console.log(addInRecordData);
    let addRecord = await subTransaction.create(addInRecordData);
    const message = `<p> Your are Subscribed  </p> `;

    await sendEmail({
      email: getUser.email,
      subject: `Hi, ${getUser.firstname}, Congratulations! Your Buy Pack Subscription has been activated`,
      //  subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    res.status(201).json({
      status: 'success',
    });
  } else if (
    getUser.isSubscribedRent === false &&
    getUser.isSubscribedBuy === true &&
    req.body.subscriptionType.rent === true
  ) {
    console.log('selected Rent package');
    //  const newSub = await Subs.create(req.body);
    const findSub = await Subs.findOne({ userID: req.body.userID });
    console.log('findSub: ' + findSub);
    const getBuySub = await Subs.findByIdAndUpdate(
      { _id: findSub._id },
      {
        $set: {
          'subscriptionType.rent': true,
          'subscriptionAmount.rent': req.body.subscriptionAmount.rent,
          'totalpoints.rent': req.body.totalpoints.rent,
        },
      }
    );
    // console.log(getBuySub);
    // update issubscribed true in user

    const updateInUser = await User.findByIdAndUpdate(
      { _id: req.body.userID },
      {
        $set: { isSubscribedRent: true },
      }
    );
    // console.log(updateInUser);
    const updateInNewSub = await Subs.findByIdAndUpdate(
      { _id: req.body.userID },
      {
        $set: { email: updateInUser.email },
      }
    );
    let addInRecordData = {
      userID: req.body.userID,
      subscriptionType: 'rent',
      subscriptionAmount: req.body.subscriptionAmount.rent,
      totalpoints: req.body.totalpoints.rent,
      email: getUser.email,
    };
    //console.log(addInRecordData);
    let addRecord = await subTransaction.create(addInRecordData);
    const message = `<p> Your are Subscribed  </p> `;

    await sendEmail({
      email: getUser.email,
      subject: `Hi, ${getUser.firstname}, Congratulations! Your Rent Pack Subscription has been activated`,
      //  subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    res.status(201).json({
      status: 'success',
      // data: {
      //   Subscription: newSub,
      // },
    });
  } else {
    const newSub = await Subs.create(req.body);
    console.log(newSub);
    // update issubscribed true in user
    if (req.body.subscriptionType.buy) {
      const updateInUser1 = await User.findByIdAndUpdate(
        { _id: newSub.userID },
        {
          $set: { isSubscribedBuy: true },
        }
      );
    }
    if (req.body.subscriptionType.rent) {
      const updateInUser2 = await User.findByIdAndUpdate(
        { _id: newSub.userID },
        {
          $set: { isSubscribedRent: true },
        }
      );
    }

    const updateInNewSub = await Subs.findByIdAndUpdate(
      { _id: newSub._id },
      {
        $set: { email: getUser.email },
      }
    );

    if (req.body.subscriptionType.buy) {
      let addInRecordData = {
        userID: req.body.userID,
        subscriptionType: 'buy',
        subscriptionAmount: req.body.subscriptionAmount.buy,
        totalpoints: req.body.totalpoints.buy,
        email: getUser.email,
      };

      let addRecord = await subTransaction.create(addInRecordData);
    }
    if (req.body.subscriptionType.rent) {
      let addInRecordData = {
        userID: req.body.userID,
        subscriptionType: 'rent',
        subscriptionAmount: req.body.subscriptionAmount.rent,
        totalpoints: req.body.totalpoints.rent,
        email: getUser.email,
      };
      let addRecord = await subTransaction.create(addInRecordData);
    }

    const message = `<p> Your are Subscribed  </p> `;

    await sendEmail({
      email: getUser.email,
      subject: `Hi, ${getUser.firstname}, Congratulations! Your Subscription has been activated`,
      //  subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    res.status(201).json({
      status: 'success',
      data: {
        Subscription: newSub,
      },
    });

    // res.status(201).json({
    //   status: 'success',
    // });
  }
});

exports.NewRenewSubscriptionAPi = catchAsync(async (req, res, next) => {
  let userID = req.body.userID;
  let type = req.body.type;
  const getUser = await User.findById({ _id: userID });
  //console.log(getUser);
  const getSub = await Subs.findOne({ userID: userID });
  console.log(getSub);
  if (getSub) {
    const newSub = await Subs.findOne({ userID: req.body.userID });
    //  console.log('newsub' + newSub);
    if (type === 'buy') {
      let currentTotalPoints = newSub.totalpoints.buy;
      let newTotalPoints = currentTotalPoints + req.body.totalpoints.buy;
      //let newTotalPoints = currentTotalPoints + req.body.totalpoints;
      let subscriptionFrequency = newSub.subscriptionFrequency;
      let newsubscriptionFrequency = subscriptionFrequency + 1;
      // if (req.body.subscriptionType.buy)
      const renewSub = await Subs.findByIdAndUpdate(
        { _id: newSub._id },
        {
          $set: {
            'subscriptionType.buy': req.body.subscriptionType.buy,
            'subscriptionAmount.buy': req.body.subscriptionAmount.buy,
            'totalpoints.buy': newTotalPoints,
            subscriptionFrequency: newsubscriptionFrequency,
          },
        }
      );
      // console.log('2nd console : ' + newSub._id);
      //update issubscribed true in user
      const getUser = await User.findById({ _id: userID });
      const updateInUser = await User.findByIdAndUpdate(
        { _id: newSub.userID },
        {
          $set: { isSubscribedBuy: true },
        }
      );
      console.log(getUser);
      const updateInNewSub = await Subs.findByIdAndUpdate(
        { _id: newSub._id },
        {
          $set: { email: getUser.email },
        }
      );
      let addInRecordData = {
        userID: req.body.userID,
        subscriptionType: 'buy',
        subscriptionAmount: req.body.subscriptionAmount.buy,
        totalpoints: req.body.totalpoints.buy,
        email: getUser.email,
      };
      let addRecord = await subTransaction.create(addInRecordData);
      //  console.log('updateInNewSub : ' + updateInNewSub);
      const message = `<p> Your are Subscription is Renewed  </p>`;

      await sendEmail({
        email: getUser.email,
        subject: `Hi, ${getUser.firstname}, Congratulations! Your Subscription for BUY PACK has been activated`,
        //  subject: 'Your password reset token (valid for 10 min)',
        message,
      });
      res.status(201).json({
        status: 'success',
        data: {
          Subscription: renewSub,
        },
      });
    } else if (type === 'rent') {
      let currentTotalPoints = newSub.totalpoints.rent;
      let newTotalPoints = currentTotalPoints + req.body.totalpoints.rent;
      //let newTotalPoints = currentTotalPoints + req.body.totalpoints;
      let subscriptionFrequency = newSub.subscriptionFrequency;
      let newsubscriptionFrequency = subscriptionFrequency + 1;
      // if (req.body.subscriptionType.buy)
      const renewSub = await Subs.findByIdAndUpdate(
        { _id: newSub._id },
        {
          $set: {
            'subscriptionType.rent': req.body.subscriptionType.rent,
            'subscriptionAmount.rent': req.body.subscriptionAmount.rent,
            'totalpoints.rent': newTotalPoints,
            subscriptionFrequency: newsubscriptionFrequency,
          },
        }
      );
      console.log('2nd console : ' + newSub._id);
      //update issubscribed true in user
      const updateInUser = await User.findByIdAndUpdate(
        { _id: newSub.userID },
        {
          $set: { isSubscribedRent: true },
        }
      );
      const updateInNewSub = await Subs.findByIdAndUpdate(
        { _id: newSub._id },
        {
          $set: { email: updateInUser.email },
        }
      );
      let addInRecordData = {
        userID: req.body.userID,
        subscriptionType: 'rent',
        subscriptionAmount: req.body.subscriptionAmount.rent,
        totalpoints: req.body.totalpoints.rent,
        email: getUser.email,
      };
      let addRecord = await subTransaction.create(addInRecordData);
      // console.log('updateInNewSub : ' + updateInNewSub);
      const message = `<p> Your are Subscription is Renewed  </p>`;

      await sendEmail({
        email: updateInUser.email,
        subject: `Hi, ${updateInUser.firstname}, Congratulations! Your Subscription for RENT PACK has been activated`,
        //  subject: 'Your password reset token (valid for 10 min)',
        message,
      });
      res.status(201).json({
        status: 'success',
        data: {
          Subscription: renewSub,
        },
      });
    }
  } else {
    const getUser = await User.findById({ _id: userID });
    const newSub = await Subs.create(req.body);
    console.log(newSub);
    // update issubscribed true in user
    if (req.body.subscriptionType.buy) {
      const updateInUser1 = await User.findByIdAndUpdate(
        { _id: newSub.userID },
        {
          $set: { isSubscribedBuy: true },
        }
      );

      let addInRecordData = {
        userID: req.body.userID,
        subscriptionType: 'buy',
        subscriptionAmount: req.body.subscriptionAmount.buy,
        totalpoints: newSub.totalpoints.buy,
        email: getUser.email,
      };
      let addRecord = await subTransaction.create(addInRecordData);
    }
    if (req.body.subscriptionType.rent) {
      const updateInUser2 = await User.findByIdAndUpdate(
        { _id: newSub.userID },
        {
          $set: { isSubscribedRent: true },
        }
      );

      let addInRecordData = {
        userID: req.body.userID,
        subscriptionType: 'rent',
        subscriptionAmount: req.body.subscriptionAmount.rent,
        totalpoints: newSub.totalpoints.rent,
        email: getUser.email,
      };
      let addRecord = await subTransaction.create(addInRecordData);
    }

    const updateInNewSub = await Subs.findByIdAndUpdate(
      { _id: newSub._id },
      {
        $set: { email: getUser.email },
      }
    );
    // console.log(updateInNewSub);
    const message = `<p> Your are Subscribed  </p> `;

    await sendEmail({
      email: getUser.email,
      subject: `Hi, ${getUser.firstname}, Congratulations! Your Subscription has been activated`,
      //  subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    res.status(201).json({
      status: 'success',
      data: {
        Subscription: newSub,
      },
    });
  }
});
exports.renewSubscription = catchAsync(async (req, res, next) => {
  // if (req.body.userID) {
  const getUser = await User.findById({ _id: req.body.userID });

  const newSub = await Subs.findOne({ userID: req.body.userID });

  console.log('newsub' + newSub);
  if (req.body.type === 'buy') {
    let currentTotalPoints = newSub.totalpoints.buy;
    let newTotalPoints = currentTotalPoints + req.body.totalpoints.buy;
    //let newTotalPoints = currentTotalPoints + req.body.totalpoints;
    let subscriptionFrequency = newSub.subscriptionFrequency;
    let newsubscriptionFrequency = subscriptionFrequency + 1;
    // if (req.body.subscriptionType.buy)
    const renewSub = await Subs.findByIdAndUpdate(
      { _id: newSub._id },
      {
        $set: {
          'subscriptionType.buy': req.body.subscriptionType.buy,
          'subscriptionAmount.buy': req.body.subscriptionAmount.buy,
          'totalpoints.buy': newTotalPoints,
          subscriptionFrequency: newsubscriptionFrequency,
        },
      }
    );
    console.log('2nd console : ' + newSub._id);
    //update issubscribed true in user
    const updateInUser = await User.findByIdAndUpdate(
      { _id: newSub.userID },
      {
        $set: { isSubscribedBuy: true },
      }
    );
    const updateInNewSub = await Subs.findByIdAndUpdate(
      { _id: newSub._id },
      {
        $set: { email: updateInUser.email },
      }
    );

    let addInRecordData = {
      userID: req.body.userID,
      subscriptionType: 'buy',
      subscriptionAmount: req.body.subscriptionAmount.buy,
      totalpoints: req.body.totalpoints.buy,
      email: getUser.email,
    };
    let addRecord = await subTransaction.create(addInRecordData);
    //console.log('updateInNewSub : ' + updateInNewSub);
    const message = `<p> Your are Subscription is Renewed  </p>`;

    await sendEmail({
      email: updateInUser.email,
      subject: `Hi, ${updateInUser.firstname}, Congratulations! Your Subscription for BUY PACK has been activated`,
      //  subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    res.status(201).json({
      status: 'success',
      data: {
        Subscription: renewSub,
      },
    });
  } else if (req.body.type === 'rent') {
    let currentTotalPoints = newSub.totalpoints.rent;
    let newTotalPoints = currentTotalPoints + req.body.totalpoints.rent;
    //let newTotalPoints = currentTotalPoints + req.body.totalpoints;
    let subscriptionFrequency = newSub.subscriptionFrequency;
    let newsubscriptionFrequency = subscriptionFrequency + 1;
    // if (req.body.subscriptionType.buy)
    const renewSub = await Subs.findByIdAndUpdate(
      { _id: newSub._id },
      {
        $set: {
          'subscriptionType.rent': req.body.subscriptionType.rent,
          'subscriptionAmount.rent': req.body.subscriptionAmount.rent,
          'totalpoints.rent': newTotalPoints,
          subscriptionFrequency: newsubscriptionFrequency,
        },
      }
    );
    console.log('2nd console : ' + newSub._id);
    //update issubscribed true in user
    const updateInUser = await User.findByIdAndUpdate(
      { _id: newSub.userID },
      {
        $set: { isSubscribedRent: true },
      }
    );
    const updateInNewSub = await Subs.findByIdAndUpdate(
      { _id: newSub._id },
      {
        $set: { email: updateInUser.email },
      }
    );
    let addInRecordData = {
      userID: req.body.userID,
      subscriptionType: 'rent',
      subscriptionAmount: req.body.subscriptionAmount.rent,
      totalpoints: req.body.totalpoints.rent,
      email: getUser.email,
    };
    let addRecord = await subTransaction.create(addInRecordData);

    //  console.log('updateInNewSub : ' + updateInNewSub);
    const message = `<p> Your are Subscription is Renewed  </p>`;

    await sendEmail({
      email: updateInUser.email,
      subject: `Hi, ${updateInUser.firstname}, Congratulations! Your Subscription for RENT PACK has been activated`,
      //  subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    res.status(201).json({
      status: 'success',
      data: {
        Subscription: renewSub,
      },
    });
  }
});
//if id renew else buy
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

  if (req.body.subscriptionType.buy === 'buy') {
    const subs = await Subs.find({
      subscriptionType: 'buy',
    }).sort({ _id: -1 });
    res.status(200).json({
      status: 'success',
      results: subs.length,
      data: subs,
    });
  }
  if (req.body.subscriptionType.rent === 'rent') {
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
  //  let subscription = await Subs.findOne({ userID: id });
  if (req.body.type === 'buy') {
    let subscription = await Subs.findOne({ userID: id });
    console.log('subscription Details: ' + subscription);
    // console.log(subscription.subscription.usedPoints);
    let n = 1;
    // console.log(subscription[0]);
    //console.log(subscription[0].usedPoints);
    let ups = subscription.usedPointsBuy;
    up = parseInt(ups);
    let sum = up + n;
    console.log('up' + up);
    const update = await Subs.findOneAndUpdate(
      { userID: id },
      {
        $set: {
          usedPointsBuy: sum,
        },
      }
    );
    //console.log('update' + update.email);
    const checkUsedPoints = await Subs.find({ userID: id });
    //url = `https://cuboidtechnologies.com/renew-subscription/${checkUsedPoints[0].subscriptionType}/${checkUsedPoints[0].userID}`;
    //console.log(url);
    //type
    console.log('check' + checkUsedPoints[0].subscriptionType);
    let math70 = (checkUsedPoints[0].totalpoints.buy / 100) * 75;
    let math98 = (checkUsedPoints[0].totalpoints.buy / 100) * 98;
    console.log(math70, math98);
    const finduser = await User.findById({ _id: id });
    if (checkUsedPoints[0].usedPointsBuy === math70) {
      //math70
      console.log('greater than 70');
      const message = `<p> Subscription Message : You have consumed 70 percent of the total points of your Buy Pack </p> `;

      await sendEmail({
        email: finduser.email,
        subject: `Hi, ${finduser.firstname}, Subscription expiring soon!`,
        //  subject: 'Your password reset token (valid for 10 min)',
        message,
      });
    }
    if (checkUsedPoints[0].usedPointsBuy === math98) {
      //math70
      console.log('greater than 70');
      url = `https://cuboidtechnologies.com/renew-subscription/buy/${checkUsedPoints[0].userID}`;
      console.log(url);
      // const message = `<p> Subscription Message : You have consumed 98 percent of the total points </p>`;
      const message = `<p>You have consumed 98 percent of the total points in you <b>buy pack</b>.<br> 
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
    if (
      checkUsedPoints[0].usedPointsBuy === checkUsedPoints[0].totalpoints.buy
    ) {
      //console.log('In here');
      const updateinUser = await User.findOneAndUpdate(
        { _id: id },
        { $set: { isSubscribedBuy: false } }
      );
      // console.log(updateinUser);
      //console.log('greater than  total');
      const message = `<p> Your subscription has expired! Please Subscribe / renew to resume services of your Buy Pack </p> `;

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
  } else if (req.body.type === 'rent') {
    const subscription = await Subs.findOne({ userID: id });
    console.log(subscription);
    // console.log(subscription.subscription.usedPoints);
    let n = 1;
    // console.log(subscription[0]);
    //console.log(subscription[0].usedPoints);
    let up = await subscription.usedPointsRent;
    let sum = up + n;
    // console.log('up' + up);
    const update = await Subs.findOneAndUpdate(
      { userID: id },
      {
        $set: {
          usedPointsRent: sum,
        },
      }
    );
    console.log('update' + update);
    const checkUsedPoints = await Subs.find({ userID: id });
    //url = `https://cuboidtechnologies.com/renew-subscription/${checkUsedPoints[0].subscriptionType}/${checkUsedPoints[0].userID}`;
    //console.log(url);
    //type
    console.log('check' + checkUsedPoints[0].subscriptionType);
    let math70 = (checkUsedPoints[0].totalpoints.rent / 100) * 75;
    let math98 = (checkUsedPoints[0].totalpoints.rent / 100) * 98;
    console.log(math70, math98);
    const finduser = await User.findById({ _id: id });
    if (checkUsedPoints[0].usedPointsRent === math70) {
      //math70
      console.log('greater than 70');
      const message = `<p> Subscription Message : You have consumed 70 percent of the total points of your <b>Rent Pack</b> </p> `;

      await sendEmail({
        email: finduser.email,
        subject: `Hi, ${finduser.firstname}, Subscription expiring soon!`,
        //  subject: 'Your password reset token (valid for 10 min)',
        message,
      });
    }
    if (checkUsedPoints[0].usedPointsRent === math98) {
      //math70
      console.log('greater than 70');
      url = `https://cuboidtechnologies.com/renew-subscription/rent/${checkUsedPoints[0].userID}`;
      console.log(url);
      // const message = `<p> Subscription Message : You have consumed 98 percent of the total points </p>`;
      const message = `<p>You have consumed 98 percent of the total points of your <b>Rent Pack</b>.<br> 
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
    if (
      checkUsedPoints[0].usedPointsRent === checkUsedPoints[0].totalpoints.rent
    ) {
      //console.log('In here');
      const updateinUser = await User.findOneAndUpdate(
        { _id: id },
        { $set: { isSubscribedRent: false } }
      );
      // console.log(updateinUser);
      //console.log('greater than  total');
      const message = `<p> Your subscription has expired for the Rent Pack! Please Subscribe / renew to resume services </p> `;

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
  }
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
