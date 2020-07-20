const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const path = require('path');

const mime = require('mime');
const fs = require('fs');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.upload = catchAsync(async (req, res, next) => {
  //data: String;
  // const data = req.body;
  // console.log(data);

  //let buff = new Buffer(data,, 'base64');
  // let buff = new Buffer.from([data], 'base64');

  //Buffer.from(string, encoding);s
  //  fs.writeFileSync('../images/', 'logo-out.png', buff);

  //console.log('Base64 image data converted to file: stack-abuse-logo-out.png');

  var matches = await req.body.image.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/
    ),
    response = {};
  //console.log(matches);
  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }
  response.type = matches[1];
  response.data = new Buffer.from(matches[2], 'base64');
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  let extension = mime.extension(type);
  let fileName = 'image1.' + extension;
  path3 = path.resolve('./public/images/');
  //console.log(path3);
  // console.log(filename, extension);
  const imagePath = fs.writeFileSync(
    path3 + '/' + fileName,
    imageBuffer,
    'utf8'
  );
  // console.log(path3 + '/' + req.body.image);

  const imagepath1 = fs.readFileSync(path3 + '/' + 'image.png');
  console.log(path3 + '/' + 'image.png');
  return res.send(path3 + '/' + 'image.png');
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
