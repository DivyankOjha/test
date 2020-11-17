const mongoose = require('mongoose');
const catchAsync = require('./../utils/catchAsync');
const subTransaction = require('../models/subTransactionModel');

const Subs = require('../models/subscriptionModel');

exports.getAllsubTransactionRecord = catchAsync(async (req, res, next) => {
  const getallRecords = await subTransaction.find({});

  const getallUPdatedRecords = await subTransaction.find({});
  res.status(200).json({
    status: 'success',
    results: getallUPdatedRecords.length,
    getallUPdatedRecords,
  });
});

exports.Subscriptionfilterbydate = catchAsync(async (req, res) => {
  let { startDate, endDate } = req.body;

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
});
