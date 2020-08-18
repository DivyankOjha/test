const catchAsync = require('./../utils/catchAsync');
const Email = require('./../models/emailModel');
const Inquiry = require('../models/inquiryModel');
const nodemailer = require('nodemailer');
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
  const inquiry = await Inquiry.find();
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
      from: 'Rahul Dhingra <rahul.dhingra@digimonk.in>',
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
