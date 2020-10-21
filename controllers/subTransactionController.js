const mongoose = require('mongoose');
const catchAsync = require('./../utils/catchAsync');
const subTransaction = require('../models/subTransactionModel');

const Subs = require('../models/subscriptionModel');

exports.getAllsubTransactionRecord = catchAsync(async (req, res, next) => {
  const getallRecords = await subTransaction.find({});
  // console.log(getallRecords);
  // for (var i in getallRecords) {
  //   const getSubdata = await Subs.find({ userID: getallRecords[i].userID });
  //   for (var j in getSubdata) {
  //     console.log(getSubdata[i]);
  //     console.log(getSubdata[j].usedPointsRent);
  //     console.log(getSubdata[j].usedPointsBuy);
  //     let updateData = await subTransaction.find({
  //       userID: getSubdata[j].userID,
  //     });
  //     console.log(updateData);
  //   }
  // }

  const getallUPdatedRecords = await subTransaction.find({});
  res.status(200).json({
    status: 'success',
    results: getallUPdatedRecords.length,
    getallUPdatedRecords,
  });
});

exports.Subscriptionfilterbydate = catchAsync(async (req, res) => {
  let { startDate, endDate } = req.body;
  console.log(req.body);
  //console.log(endDate + 'T' + '00:00:00');
  const subs = await subTransaction
    .find({
      subscriptionDate: { $gte: startDate, $lte: endDate + 'T' + '23:59:59' },
    })
    .sort({ _id: -1 });

  res.status(200).json({
    status: 'success',
    results: subs.length,
    data: subs,
  });
});

exports.SubscriptionfilterbyRentBuy = catchAsync(async (req, res) => {
  console.log(req.body);
  if (req.body.subscriptionType === 'buy') {
    const subs = await subTransaction
      .find({
        subscriptionType: 'buy',
      })
      .sort({ _id: -1 });
    res.status(200).json({
      status: 'success',
      results: subs.length,
      data: subs,
    });
  }
  if (req.body.subscriptionType === 'rent') {
    console.log('inside');
    const subs = await subTransaction
      .find({
        subscriptionType: 'rent',
      })
      .sort({ _id: -1 });
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
