const catchAsync = require('./../utils/catchAsync');
const nodemailer = require('nodemailer');
const Email = require('./../models/emailModel');
const postProperty = require('../models/postPropertyModel');

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
  const ip = '54.164.209.42';
  const newproperty = await postProperty.create(body);

  const propertyName = newproperty.email + '_' + newproperty._id;
  // const propName = req.body.name;
  // const propertyName = propName.replace(/\s/g, '_');
  //console.log('prop ' + prop);
  // console.log('prop ' + prop);

  // console.log('prop: ' + prop[i]);
  var matches = await req.body.nationalidimage.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/
    ),
    response = {};
  //console.log(matches);
  // if (matches.length !== 3) {
  //   return new Error('Invalid input string');
  // }
  response.type = matches[1];
  //console.log('responseType:' + response.type);
  response.data = new Buffer.from(matches[2], 'base64');
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  const name = type.split('/');
  // console.log(name);
  const name1 = name[0];
  // console.log(name1);
  let extension = mime.extension(type);
  // console.log(extension);
  const rand = Math.ceil(Math.random() * 1000);
  // Random photo name with timeStamp so it will not overide previous images.
  const fileName = `${propertyName}_${Date.now()}_${rand}.${extension}`;
  //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

  // console.log(fileName);
  path3 = path.resolve(`./public/media/propertyimages/`);

  let localpath = `${path3}/${propertyName}/`;
  // console.log(localpath);

  if (!fs.existsSync(localpath)) {
    fs.mkdirSync(localpath);
  }
  // console.log(localpath);

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
  //console.log(path3);

  // console.log('url' + url);
  // console.log('propertylinks: ' + propertylinks);
  //   const imagePath = fs.writeFileSync(
  //       path3 + '/' + fileName,
  //       imageBuffer,
  //       'utf8'
  //   );
  //   s const imagepath2 = fs.readFileSync(localpath);
  //   const imagepath1 = fs.readFileSync(path3 + '/' + 'image.png');
  //   console.log(path3 + '/' + 'image.png');
  //   const url = `${req.protocol}://${req.get('host')}/media/${fileName}`;
  //   console.log('url: ' + url);

  /************************************************************************** *******************************************************/

  // ####################################################################################################################################
  //console.log(newproperty);
  //const propertyName = newproperty.email + '_' + newproperty._id;
  //console.log(newproperty.email + '_' + newproperty._id);
  //const user = req.user.firstname;
  // console.log(user);
  /*Download the base64 image in the server and returns the filename and path of image.*/

  // //Extract base64 data.
  // const base64Data = baseImage.replace(regex, '');
  // const rand = Math.ceil(Math.random() * 1000);
  // //Random photo name with timeStamp so it will not overide previous images.
  // const filename = `Photo_${Date.now()}_${rand}.${ext}`;

  // //Check that if directory is present or not.
  // if (!fs.existsSync(`${uploadPath}/uploads/`)) {
  //   fs.mkdirSync(`${uploadPath}/uploads/`);
  // }
  // if (!fs.existsSync(localPath)) {
  //   fs.mkdirSync(localPath);
  // }
  // fs.writeFileSync(localPath + filename, base64Data, 'base64');
  // console.log(filename, localPath);

  // //return res.send(filename, localPath);
  var propertylinks = [];
  // const propName = req.body.name;
  // const propertyName = propName.replace(/\s/g, '_');

  var prop = req.body.propertyimage;
  //console.log('prop ' + prop);
  // console.log('prop ' + prop);

  for (var i in prop) {
    // console.log('prop: ' + prop[i]);
    var matches = await prop[i].match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};
    //console.log(matches);
    // if (matches.length !== 3) {
    //   return new Error('Invalid input string');
    // }
    response.type = matches[1];
    //console.log('responseType:' + response.type);
    response.data = new Buffer.from(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    const name = type.split('/');
    // console.log(name);
    const name1 = name[0];
    // console.log(name1);
    let extension = mime.extension(type);
    // console.log(extension);
    const rand = Math.ceil(Math.random() * 1000);
    // Random photo name with timeStamp so it will not overide previous images.
    const fileName = `${propertyName}_${Date.now()}_${rand}.${extension}`;
    //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

    // console.log(fileName);
    path3 = path.resolve(`./public/media/propertyimages/`);

    let localpath = `${path3}/${propertyName}/`;
    // console.log(localpath);

    if (!fs.existsSync(localpath)) {
      fs.mkdirSync(localpath);
    }
    // console.log(localpath);

    fs.writeFileSync(`${localpath}/` + fileName, imageBuffer, 'utf8');

    const url = `${req.protocol}://${ip}/media/propertyimages/${propertyName}/${fileName}`;

    propertylinks.push(url);
    //console.log(path3);

    // console.log('url' + url);
    // console.log('propertylinks: ' + propertylinks);
    //   const imagePath = fs.writeFileSync(
    //       path3 + '/' + fileName,
    //       imageBuffer,
    //       'utf8'
    //   );
    //   s const imagepath2 = fs.readFileSync(localpath);
    //   const imagepath1 = fs.readFileSync(path3 + '/' + 'image.png');
    //   console.log(path3 + '/' + 'image.png');
    //   const url = `${req.protocol}://${req.get('host')}/media/${fileName}`;
    //   console.log('url: ' + url);
  }
  const updating = await postProperty.findByIdAndUpdate(newproperty._id, {
    $set: { propertyimage: propertylinks },
  });
  return res.status(200).json({
    propertylinks,
    urlpath,
  });
  //   var match = prop[0];
  //   console.log('match:' + match);
  //   var matches = await req.body.image.match(
  //       /^data:([A-Za-z-+\/]+);base64,(.+)$/
  //     ),
  //     response = {};
  //   //console.log(matches);
  //   if (matches.length !== 3) {
  //     return new Error('Invalid input string');
  //   }
  //   response.type = matches[1];
  //   console.log('responseType:' + response.type);
  //   response.data = new Buffer.from(matches[2], 'base64');
  //   let decodedImg = response;
  //   let imageBuffer = decodedImg.data;
  //   let type = decodedImg.type;
  //   const name = type.split('/');
  //   console.log(name);
  //   const name1 = name[0];
  //   console.log(name1);
  //   let extension = mime.extension(type);
  //   console.log(extension);
  //const rand = Math.ceil(Math.random() * 1000);
  //Random photo name with timeStamp so it will not overide previous images.
  //const fileName = `${propertyname}_${Date.now()}_.${extension}`;
  //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

  // let fileName = name1 ++ '.' + extension;
  // console.log(filename);
  // let abc = 'abc';
  // path3 = path.resolve(`./public/media/propertyimages/`);

  // let localpath = `${path3}/${propertyname}/`;
  //console.log(localpath);

  // if (!fs.existsSync(localpath)) {
  ////   fs.mkdirSync(localpath);
  // }
  //console.log(localpath);

  // fs.writeFileSync(`${localpath}/` + fileName, imageBuffer, 'utf8');

  // const url = `${req.protocol}://${req.get(
  //  'host'
  // )}/media/profilepictures/${propertyname}/${fileName}`;
  // console.log(path3);
  // const imagePath = fs.writeFileSync(
  //   path3 + '/' + fileName,
  //   imageBuffer,
  //   'utf8'
  // );
  // console.log(path3 + '/' + req.body.image);
  //s const imagepath2 = fs.readFileSync(localpath);
  // const imagepath1 = fs.readFileSync(path3 + '/' + 'image.png');
  // console.log(path3 + '/' + 'image.png');
  // const url = `${req.protocol}://${req.get('host')}/media/${fileName}`;
  // console.log('url: ' + url);
  //   return res.status(200).json({
  //     url,
  //   });

  // res.status(201).json({
  //   status: 'success',
  //   data: {
  //     Property: newproperty,
  //   },
  // });
});

exports.getAllproperty = catchAsync(async (req, res) => {
  const property = await postProperty.find();
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
// exports.postPropertyEmail = catchAsync(async (req, res) => {
//   console.log(req.body.reciever);
//   const emailsettings = await Email.findById({
//     _id: '5f2e3d86d15a133adc74df50',
//   });
//   console.log(emailsettings);
//   let host = emailsettings.host;
//   let user = emailsettings.username;
//   let pass = emailsettings.password;

//   var transporter = await nodemailer.createTransport({
//     service: host,
//     auth: {
//       user: user,
//       pass: pass,
//     },
//   });
//   // const url = `http://54.164.209.42/login/${token}`;
//   //const url = `${req.protocol}://${req.get('host')}/api/login/${token}`;
//   //const url = `http://localhost:3002/api/users/confirmation/${token}`;
//   for (var i in req.body.reciever) {
//     var mailOptions = {
//       from: 'Rahul Dhingra <rahul.dhingra@digimonk.in>',
//       to: req.body.reciever[i],
//       subject: req.body.subject[i],
//       html: `<p>Hello ${req.body.message[i]}</p>`,
//     };

//     transporter.sendMail(mailOptions, function (err) {
//       if (err) {
//         console.log('ERRor sending mail: ' + err);
//       } else {
//         console.log('Mail sent to: ' + req.body.reciever[i]);
//       }
//     });
//   }
//   //const inquiry = await Inquiry.find();
//   res.status(200).json({
//     status: 'success',
//     // results: inquiry.length,
//     // data: {
//     //   inquiry,
//     // },
//   });
// });
