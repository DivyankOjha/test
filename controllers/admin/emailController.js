const express = require('express');
const router = express.Router();
const catchAsync = require('./../../utils/catchAsync');
const Email = require('../../models/emailModel');
const { find, findById, findOne } = require('../../models/emailModel');

exports.email = catchAsync(async (req, res, next) => {
  // let _id = req.body._id;

  const checkExist = await Email.findById({ _id: '5f2e3d86d15a133adc74df50' });
  // console.log(username, checkExist);
  //const checkExist = Email.findOne(req.body.email);
  if (checkExist) {
    // console.log('found email');
    const updateEmailSettings = await Email.findOneAndUpdate(
      { _id: '5f2e3d86d15a133adc74df50' },
      {
        $set: {
          host: req.body.host,
          username: req.body.username,
          password: req.body.password,
        },
      }
    );
    res.status(200).json({ status: 'success', updateEmailSettings });
  } else {
    res.status(200).json({ status: 'Failed to update! try again later' });
  }
  // if (!checkExist) {
  //   const email = await Email.create(req.body);
  //   // console.log(email);
  //   res.status(200).json({ status: 'success', email });
  // }
});
exports.getStoredEmailSettings = catchAsync(async (req, res, next) => {
  //console.log(req.user.id);
  const email = await Email.find();
  res.status(200).json({ status: 'success', email });
});
