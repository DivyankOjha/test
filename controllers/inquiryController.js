const catchAsync = require('./../utils/catchAsync');
const Email = require('./../models/emailModel');
const nodemailer = require('nodemailer');
const Inquiry = require('../models/inquiryModel');
const User = require('../models/userModel');
const sendEmail = require('./../utils/email');

const Customer = require('../models/customerInquiry');

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
  const inquiry = await Inquiry.find(); //.skip(skip).limit(limit);
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
  //console.log(req.body.reciever);
  const emailsettings = await Email.findById({
    _id: '5f2e3d86d15a133adc74df50',
  });
  // console.log(emailsettings);
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
    const inquiryemail = await Inquiry.findById({ _id: req.body.reciever[i] });
    console.log(inquiryemail.email);
    if (req.body.subject[i] > req.body.subject[0]) {
      var mailOptions = {
        from: `CUBOID <${emailsettings.username}>`,
        to: inquiryemail.email,
        subject: req.body.subject[i],
        html: `<p>Hello ${req.body.message[i]}</p>`,
      };
    }
    if (req.body.subject[i] === req.body.subject[0]) {
      var mailOptions = {
        from: `CUBOID <${emailsettings.username}>`,
        to: inquiryemail.email,
        subject: req.body.subject[0],
        html: `<p>Hello ${req.body.message[0]}</p>`,
      };
    }

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

exports.filterbydate = catchAsync(async (req, res) => {
  let { startDate, endDate } = req.body;
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);

  //console.log(endDate + 'T' + '00:00:00');
  const users = await Inquiry.find({
    createdAt: { $gte: startDate, $lte: endDate + 'T' + '23:59:59' },
    // createdAt: { $lt: endDate },
  });
  //.skip(skip)
  //  .limit(limit);
  // console.log('users: ' + users);

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

//Customer Inquiry
exports.customerInquiry = catchAsync(async (req, res, next) => {
  const newInquiry = await Customer.create(req.body);
  console.log(newInquiry.userEmail);
  console.log(req.body.userId);
  const finduser = await User.findById({ _id: req.body.userId });
  console.log(finduser.email);
  str1 = finduser.firstname;
  str2 = finduser.lastname;
  const username = str1.concat(' ', str2);

  const updateInquiry = await Customer.updateMany(
    { _id: newInquiry._id },
    { $set: { userEmail: finduser.email, username: username } }
  );
  const message = `<p> ${newInquiry.message} </p> `;

  await sendEmail({
    email: newInquiry.sellerEmail,
    subject: `Hi, ${newInquiry.sellerName}, i am customer and this is my inquiry`,
    //  subject: 'Your password reset token (valid for 10 min)',
    message,
  });
  res.status(201).json({
    status: 'success',
    inquiry: newInquiry,
  });
});

exports.getAllCustomerInquiry = catchAsync(async (req, res, next) => {
  const customerInquiries = await Customer.find({});
  res.status(201).json({
    status: 'success',
    inquiry: customerInquiries,
  });
});

exports.Customerfilterbydate = catchAsync(async (req, res) => {
  let { startDate, endDate } = req.body;
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);

  //console.log(endDate + 'T' + '00:00:00');
  const users = await Customer.find({
    createdAt: { $gte: startDate, $lte: endDate + 'T' + '23:59:59' },
    // createdAt: { $lt: endDate },
  });
  //.skip(skip)
  //  .limit(limit);
  // console.log('users: ' + users);

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

exports.CustomerReplyEmail = catchAsync(async (req, res) => {
  //console.log(req.body.reciever);
  const emailsettings = await Email.findById({
    _id: '5f2e3d86d15a133adc74df50',
  });
  // console.log(emailsettings);
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
    const inquiryemail = await Customer.findById({ _id: req.body.reciever[i] });
    console.log(inquiryemail.userEmail);
    if (req.body.subject[i] > req.body.subject[0]) {
      var mailOptions = {
        from: `CUBOID <${emailsettings.username}>`,
        to: inquiryemail.userEmail,
        subject: req.body.subject[i],
        html: `<p>Hello ${req.body.message[i]}</p>`,
      };
    }
    if (req.body.subject[i] === req.body.subject[0]) {
      var mailOptions = {
        from: `CUBOID <${emailsettings.username}>`,
        to: inquiryemail.userEmail,
        subject: req.body.subject[0],
        html: `<p>Hello ${req.body.message[0]}</p>`,
      };
    }

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
