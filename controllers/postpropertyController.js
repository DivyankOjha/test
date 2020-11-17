const catchAsync = require('./../utils/catchAsync');
const nodemailer = require('nodemailer');
const Email = require('./../models/emailModel');
const postProperty = require('../models/postPropertyModel');

const User = require('../models/userModel');

const path = require('path');
const mime = require('mime');
const fs = require('fs');

exports.addProperty = catchAsync(async (req, res, next) => {
  const body = {
    name: req.body.name,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    address: req.body.address,
    propertyDetails: req.body.propertyDetails,
  };
  const ip = 'cuboidtechnologies.com';
  const newproperty = await postProperty.create(body);

  const propertyName = newproperty.email + '_' + newproperty._id;

  var matches = await req.body.nationalidimage.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/
    ),
    response = {};

  response.type = matches[1];

  response.data = new Buffer.from(matches[2], 'base64');
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  const name = type.split('/');

  const name1 = name[0];

  let extension = mime.extension(type);

  const rand = Math.ceil(Math.random() * 1000);
  // Random photo name with timeStamp so it will not overide previous images.
  const fileName = `${propertyName}_${Date.now()}_${rand}.${extension}`;

  path3 = path.resolve(`./public/media/propertyimages/`);

  let localpath = `${path3}/${propertyName}/`;

  if (!fs.existsSync(localpath)) {
    fs.mkdirSync(localpath);
  }

  fs.writeFileSync(
    `${localpath}/` + 'National_id_' + fileName,
    imageBuffer,
    'utf8'
  );

  const urlpath = `${
    req.protocol
  }://${ip}/media/propertyimages/${propertyName}/${'National_id_' + fileName}`;

  const updatingnationalidimage = await postProperty.findByIdAndUpdate(
    newproperty._id,
    {
      $set: { nationalidimage: urlpath },
    }
  );

  var propertylinks = [];

  var prop = req.body.propertyimage;

  for (var i in prop) {
    var matches = await prop[i].match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

    response.type = matches[1];

    response.data = new Buffer.from(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    const name = type.split('/');

    const name1 = name[0];

    let extension = mime.extension(type);

    const rand = Math.ceil(Math.random() * 1000);
    // Random photo name with timeStamp so it will not overide previous images.
    const fileName = `${propertyName}_${Date.now()}_${rand}.${extension}`;

    path3 = path.resolve(`./public/media/propertyimages/`);

    let localpath = `${path3}/${propertyName}/`;

    if (!fs.existsSync(localpath)) {
      fs.mkdirSync(localpath);
    }

    fs.writeFileSync(`${localpath}/` + fileName, imageBuffer, 'utf8');

    const url = `${req.protocol}://${ip}/media/propertyimages/${propertyName}/${fileName}`;

    propertylinks.push(url);
  }
  const updating = await postProperty.findByIdAndUpdate(newproperty._id, {
    $set: { propertyimage: propertylinks },
  });
  return res.status(200).json({
    status: 'success',
    propertylinks,
    urlpath,
  });
});

exports.getAllproperty = catchAsync(async (req, res) => {
  const property = await postProperty.find().sort({ _id: -1 });
  res.status(200).json({
    status: 'success',
    results: property.length,
    data: {
      property,
    },
  });
});

exports.getPostPropertybyId = catchAsync(async (req, res) => {
  const property = await postProperty.findById({ _id: req.params.id });
  res.status(200).json({
    status: 'success',
    results: property.length,
    data: {
      property,
    },
  });
});

//searching by email
exports.searchPostPropertyInquiry = catchAsync(async (req, res, next) => {
  let searchquery = req.body.searchquery;
  let str = searchquery;
  let substr = '@';

  const data = await postProperty.find({
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

exports.filterbydate = catchAsync(async (req, res) => {
  let { startDate, endDate } = req.body;

  const users = await postProperty
    .find({
      createdAt: { $gte: startDate, $lte: endDate + 'T' + '23:59:59' },
    })
    .sort({ _id: -1 });

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

exports.postPropertyEmail = catchAsync(async (req, res) => {
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

  let idArr = [];
  idArr = req.body.reciever;

  for (var i in idArr) {
   
    let inquiryemail = await postProperty.findById({
      _id: idArr[i],
    });

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
        console.log('Mail sent to: ' + idArr[i] + ' ' + inquiryemail.email); //inquiryemail.email
      }
    });
  }

  res.status(200).json({
    status: 'success',
  });
});
