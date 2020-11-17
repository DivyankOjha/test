const catchAsync = require('../../utils/catchAsync');

const path = require('path');
const mime = require('mime');
const fs = require('fs');

exports.upload = catchAsync(async (req, res, next) => {
  var propertylinks = [];
  const propName = req.body.propertyName;
  const propertyName = propName.replace(/\s/g, '_');

  var prop = req.body.image;

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

    const fileName = `${propertyName}_${Date.now()}_${rand}.${extension}`;

    path3 = path.resolve(`./public/media/propertyimages/`);

    let localpath = `${path3}/${propertyName}/`;

    if (!fs.existsSync(localpath)) {
      fs.mkdirSync(localpath);
    }

    fs.writeFileSync(`${localpath}/` + fileName, imageBuffer, 'utf8');
    ip = 'https://cuboidtechnologies.com';
    const url = `${req.protocol}://${ip}/media/propertyimages/${propertyName}/${fileName}`;

    propertylinks.push(url);
  }

  return res.status(200).json({
    propertylinks,
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
