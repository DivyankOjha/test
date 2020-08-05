const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const path = require('path');
const mime = require('mime');
const fs = require('fs');

// exports.getAllUsers = catchAsync(async (req, res) => {
//   const users = await User.find();
//   res.status(200).json({
//     status: 'success',
//     results: users.length,
//     data: {
//       users,
//     },
//   });
// });

exports.upload = catchAsync(async (req, res, next) => {
  console.log(req.protocol);
  console.log(req.get('host'));
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

  var matches = await req.body.image.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/
    ),
    response = {};
  //console.log(matches);
  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }
  response.type = matches[1];
  console.log(response.type);
  response.data = new Buffer.from(matches[2], 'base64');
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  const name = type.split('/');
  console.log(name);
  const name1 = name[0];
  console.log(name1);
  let extension = mime.extension(type);
  console.log(extension);
  const rand = Math.ceil(Math.random() * 1000);
  //Random photo name with timeStamp so it will not overide previous images.
  const fileName = `${req.user.firstname}.${extension}`;
  //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

  // let fileName = name1 ++ '.' + extension;
  // console.log(filename);
  let abc = 'abc';
  path3 = path.resolve(`./public/media/profilepictures/`);

  let localpath = `${path3}/${req.user._id}/`;
  //console.log(localpath);

  if (!fs.existsSync(localpath)) {
    fs.mkdirSync(localpath);
  }
  //console.log(localpath);

  fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
  ip = '54.164.209.42';
  //console.log(ip);
  const url = `${req.protocol}://${ip}/media/profilepictures/${req.user._id}/${fileName}`;

  //const imagepath2 = fs.readFileSync(localpath + fileName);
  //console.log('imagepath2  ' + imagepath2);
  const updating = await User.findByIdAndUpdate(req.user._id, {
    $set: { imagepath: url },
  });
  console.log(url);
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

  return res.status(200).json({
    status: 'success',
    url,
  });
});

exports.getdata = (req, res) => {
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
