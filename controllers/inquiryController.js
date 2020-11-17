const catchAsync = require('./../utils/catchAsync');
const Email = require('./../models/emailModel');
const nodemailer = require('nodemailer');
const Inquiry = require('../models/inquiryModel');
const User = require('../models/userModel');
const sendEmail = require('./../utils/email');

const Customer = require('../models/customerInquiry');
const House = require('../models/houseModel');
const Land = require('../models/landModel');
const Hotel = require('../models/hotelModel');
const WareHouse = require('../models/warehouseModel');

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
  const inquiry = await Inquiry.find().sort({ _id: -1 });
  res.status(200).json({
    status: 'success',
    results: inquiry.length,
    data: {
      inquiry,
    },
  });
});

exports.getInquirybyId = catchAsync(async (req, res) => {
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

  const data = await Inquiry.find({
    $expr: {
      $regexMatch: {
        input: '$email',
        regex: searchquery,
        options: 'm',
      },
    },
  });

  if (data.length < 1) {
    res.status(200).json({
      status: 'Not Found',
      message: 'Details Not Found! Try again.',
    });
  } else {
    res.status(200).json({
      status: 'success',
      results: data.length,
      data: data,
    });
  }
});

exports.InquiryEmail = catchAsync(async (req, res) => {
  const emailsettings = await Email.findById({
    _id: '5f2e3d86d15a133adc74df50',
  });

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

  for (var i in req.body.reciever) {
    let inquiryemail = await Inquiry.findById({ _id: req.body.reciever[i] });

    var mailOptions = {
      from: `CUBOID <${emailsettings.username}>`,
      to: inquiryemail.email,
      subject: req.body.subject[0],
      html: `<p>${req.body.message[0]}</p>`,
    };

    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        console.log('ERRor sending mail: ' + err);
      } else {
        console.log(
          'Mail sent to: ' + req.body.reciever[i] + inquiryemail.email
        );
      }
    });
  }

  res.status(200).json({
    status: 'success',
  });
});

exports.filterbydate = catchAsync(async (req, res) => {
  let { startDate, endDate } = req.body;

  const users = await Inquiry.find({
    createdAt: { $gte: startDate, $lte: endDate + 'T' + '23:59:59' },
  }).sort({ _id: -1 });

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

//Customer Inquiry
exports.customerInquiry = catchAsync(async (req, res, next) => {
  let findpropertyHouse = await House.findById({ _id: req.body.propertyID });
  let findpropertyLand = await Land.findById({ _id: req.body.propertyID });
  let findpropertyHotel = await Hotel.findById({
    _id: req.body.propertyID,
  });
  let findpropertyWarehouse = await WareHouse.findById({
    _id: req.body.propertyID,
  });

  if (findpropertyHouse) {
    let newInquiry = await Customer.create(req.body);
    let updatedata = await Customer.findByIdAndUpdate(
      { _id: newInquiry._id },
      {
        $set: {
          sellerEmail: findpropertyHouse.sellerDetails.selleremail,
          sellerName: findpropertyHouse.sellerDetails.sellername,
          flipbookName: findpropertyHouse.flipbook.title,
        },
      }
    );

    const finduser = await User.findById({ _id: req.body.userId });

    str1 = finduser.firstname;
    str2 = finduser.lastname;
    const username = str1.concat(' ', str2);

    const updateInquiry = await Customer.updateMany(
      { _id: newInquiry._id },
      { $set: { userEmail: finduser.email, username: username } }
    );
    const message = `<p> ${newInquiry.message} </p> `;
    let currentinquiry = await Customer.findById({ _id: newInquiry._id });
    await sendEmail({
      email: currentinquiry.sellerEmail,
      subject: `Hi, ${currentinquiry.sellerName}, i am customer and this is my inquiry`,
      //  subject: 'Your password reset token (valid for 10 min)',
      message,
    });
    res.status(201).json({
      status: 'success',
      inquiry: newInquiry,
    });
  }
  if (findpropertyLand) {
    const newInquiry = await Customer.create(req.body);
    let updatedata = await Customer.findByIdAndUpdate(
      { _id: newInquiry._id },
      {
        $set: {
          sellerEmail: findpropertyLand.sellerDetails.selleremail,
          sellerName: findpropertyLand.sellerDetails.sellername,
          flipbookName: findpropertyLand.flipbook.title,
        },
      }
    );

    const finduser = await User.findById({ _id: req.body.userId });

    str1 = finduser.firstname;
    str2 = finduser.lastname;
    const username = str1.concat(' ', str2);

    const updateInquiry = await Customer.updateMany(
      { _id: newInquiry._id },
      { $set: { userEmail: finduser.email, username: username } }
    );
    const message = `<p> ${newInquiry.message} </p> `;
    let currentinquiry = await Customer.findById({ _id: newInquiry._id });
    await sendEmail({
      email: currentinquiry.sellerEmail,
      subject: `Hi, ${currentinquiry.sellerName}, i am customer and this is my inquiry`,

      message,
    });
    res.status(201).json({
      status: 'success',
      inquiry: newInquiry,
    });
  }
  if (findpropertyHotel) {
    const newInquiry = await Customer.create(req.body);
    let updatedata = await Customer.findByIdAndUpdate(
      { _id: newInquiry._id },
      {
        $set: {
          sellerEmail: findpropertyHotel.sellerDetails.selleremail,
          sellerName: findpropertyHotel.sellerDetails.sellername,
          flipbookName: findpropertyHotel.flipbook.title,
        },
      }
    );

    const finduser = await User.findById({ _id: req.body.userId });

    str1 = finduser.firstname;
    str2 = finduser.lastname;
    const username = str1.concat(' ', str2);

    const updateInquiry = await Customer.updateMany(
      { _id: newInquiry._id },
      { $set: { userEmail: finduser.email, username: username } }
    );
    const message = `<p> ${newInquiry.message} </p> `;
    let currentinquiry = await Customer.findById({ _id: newInquiry._id });

    await sendEmail({
      email: currentinquiry.sellerEmail,
      subject: `Hi, ${currentinquiry.sellerName}, i am customer and this is my inquiry`,

      message,
    });
    res.status(201).json({
      status: 'success',
      inquiry: newInquiry,
    });
  }
  if (findpropertyWarehouse) {
    const newInquiry = await Customer.create(req.body);
    let updatedata = await Customer.findByIdAndUpdate(
      { _id: newInquiry._id },
      {
        $set: {
          sellerEmail: findpropertyWarehouse.sellerDetails.selleremail,
          sellerName: findpropertyWarehouse.sellerDetails.sellername,
          flipbookName: findpropertyWarehouse.flipbook.title,
        },
      }
    );

    const finduser = await User.findById({ _id: req.body.userId });

    str1 = finduser.firstname;
    str2 = finduser.lastname;
    const username = str1.concat(' ', str2);

    const updateInquiry = await Customer.updateMany(
      { _id: newInquiry._id },
      { $set: { userEmail: finduser.email, username: username } }
    );
    const message = `<p> ${newInquiry.message} </p> `;
    let currentinquiry = await Customer.findById({ _id: newInquiry._id });

    await sendEmail({
      email: currentinquiry.sellerEmail,
      subject: `Hi, ${currentinquiry.sellerName}, i am customer and this is my inquiry`,

      message,
    });
    res.status(201).json({
      status: 'success',
      inquiry: newInquiry,
    });
  }
});

exports.getAllCustomerInquiry = catchAsync(async (req, res, next) => {
  const customerInquiries = await Customer.find({}).sort({ _id: -1 });
  res.status(201).json({
    status: 'success',
    inquiry: customerInquiries,
  });
});

exports.searchInquiryCustomer = catchAsync(async (req, res, next) => {
  //by subscriptionid/email
  let searchquery = req.body.searchquery;
  let str = searchquery;
  let substr = '@';

  const data = await Customer.find({
    $expr: {
      $regexMatch: {
        input: '$userEmail',
        regex: searchquery,
        options: 'm',
      },
    },
  });

  if (data.length < 1) {
    res.status(200).json({
      status: 'Not Found',
      message: 'Details Not Found! Try again.',
    });
  } else {
    res.status(200).json({
      status: 'success',
      results: data.length,
      data: data,
    });
  }
});
exports.Customerfilterbydate = catchAsync(async (req, res) => {
  let { startDate, endDate } = req.body;
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);

  const users = await Customer.find({
    createdAt: { $gte: startDate, $lte: endDate + 'T' + '23:59:59' },
  }).sort({ _id: -1 });

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

exports.CustomerReplyEmail = catchAsync(async (req, res) => {
  const emailsettings = await Email.findById({
    _id: '5f2e3d86d15a133adc74df50',
  });

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

  for (var i in req.body.reciever) {
    const inquiryemail = await Customer.findById({ _id: req.body.reciever[i] });

    var mailOptions = {
      from: `CUBOID <${emailsettings.username}>`,
      to: inquiryemail.userEmail,
      subject: req.body.subject[0],
      html: `<p>${req.body.message[0]}</p>`,
    };

    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        console.log('ERRor sending mail: ' + err);
      } else {
        console.log('Mail sent to: ' + req.body.reciever[i]);
      }
    });
  }

  res.status(200).json({
    status: 'success',
  });
});
