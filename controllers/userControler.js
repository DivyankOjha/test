const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const path = require('path');
const mime = require('mime');
const fs = require('fs');
const { deflateSync } = require('zlib');

exports.upload = catchAsync(async (req, res, next) => {
  let date = new Date().toLocaleString();
  let dataString = date.replace(' ', '-');
  let dateupdate = dataString.replace(' ', '-');

  var matches = await req.body.image.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/
    ),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }
  response.type = matches[1];

  response.data = new Buffer.from(matches[2], 'base64');
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  const name = type.split('/');

  const name1 = name[0];

  let extension = mime.extension(type);

  const rand = Math.ceil(Math.random() * 1000);
  //Random photo name with timeStamp so it will not overide previous images.
  const fileName = `${req.user.firstname}-${Date.now()}.${extension}`;

  let abc = 'abc';
  path3 = path.resolve(`./public/media/profilepictures/`);

  let localpath = `${path3}/${req.user._id}/`;

  if (!fs.existsSync(localpath)) {
    fs.mkdirSync(localpath);
  }

  fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
  ip = 'cuboidtechnologies.com';

  const url = `${req.protocol}://${ip}/media/profilepictures/${req.user._id}/${fileName}`;

  const updating = await User.findByIdAndUpdate(req.user._id, {
    $set: { imagepath: url },
  });

  return res.status(200).json({
    status: 'success',
    url,
  });
});
