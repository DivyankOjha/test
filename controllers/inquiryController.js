const catchAsync = require('./../utils/catchAsync');
const Email = require('./../models/emailModel');
const Inquiry = require('../models/inquiryModel');
const nodemailer = require('nodemailer');

//post inquiry
exports.Inquiry = catchAsync(async (req, res, next) => {
  const newInquiry = await Inquiry.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      inquiry: newInquiry,
    },
  });
});

exports.getAllInquiry = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const inquiry = await Inquiry.find().skip(skip).limit(limit);
  res.status(200).json({
    status: 'success',
    results: inquiry.length,
    data: {
      inquiry,
    },
  });
});

exports.getInquirybyId = catchAsync(async (req, res) => {
  console.log('Hello' + req.params.id);
  const inquiry = await Inquiry.findById({ _id: req.params.id });
  res.status(200).json({
    status: 'success',
    results: inquiry.length,
    data: {
      inquiry,
    },
  });
});

exports.deleteInquiry = catchAsync(async (req, res) => {
  const inquiry = await Inquiry.find();
  res.status(200).json({
    status: 'success',
    results: inquiry.length,
    data: {
      inquiry,
    },
  });
});

exports.deleteInquiry = catchAsync(async (req, res) => {
  const inquiry = await Inquiry.find();
  res.status(200).json({
    status: 'success',
    results: inquiry.length,
    data: {
      inquiry,
    },
  });
});

exports.searchInquiry = catchAsync(async (req, res, next) => {
  //by subscriptionid/email
  let searchquery = req.body.searchquery;
  let str = searchquery;
  let substr = '@';
  // console.log(str.includes(substr));
  console.log(searchquery);
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);

  //const _id = searchquery;
  //console.log('length' + _id.length);
  try {
    if (str.includes(substr)) {
      console.log('this is email');
      const data = await Inquiry.find({ email: searchquery })
        .skip(skip)
        .limit(limit);
      console.log(data);
      res.status(200).json({
        status: 'success',
        results: data.length,
        data: data,
      });
    }
  } catch (error) {
    //console.log(error);
    res.status(404).json({
      status: 'Not Found',
      message: 'Property Inquiry Details Not Found! Try again.',
    });
  }
});

exports.InquiryEmail = catchAsync(async (req, res) => {
  console.log(req.body.reciever);
  const emailsettings = await Email.findById({
    _id: '5f2e3d86d15a133adc74df50',
  });
  console.log(emailsettings);
  let host = emailsettings.host;
  let user = emailsettings.username;
  let pass = emailsettings.password;

  var transporter = await nodemailer.createTransport({
    service: host,
    auth: {
      user: user,
      pass: pass,
    },
  });
  // const url = `http://54.164.209.42/login/${token}`;
  //const url = `${req.protocol}://${req.get('host')}/api/login/${token}`;
  //const url = `http://localhost:3002/api/users/confirmation/${token}`;
  for (var i in req.body.reciever) {
    var mailOptions = {
      from: `CUBOID <${emailsettings.username}>`,
      to: req.body.reciever[i],
      subject: req.body.subject[i],
      html: `<p>Hello ${req.body.message[i]}</p>`,
    };

    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        console.log('ERRor sending mail: ' + err);
      } else {
        console.log('Mail sent to: ' + req.body.reciever[i]);
      }
    });
  }
  //const inquiry = await Inquiry.find();
  res.status(200).json({
    status: 'success',
    // results: inquiry.length,
    // data: {
    //   inquiry,
    // },
  });
});
