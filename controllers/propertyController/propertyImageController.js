const catchAsync = require('../../utils/catchAsync');

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
  //const user = req.user.firstname;

  var propertylinks = [];
  const propName = req.body.propertyName;
  const propertyName = propName.replace(/\s/g, '_');

  var prop = req.body.image;
  console.log('prop ' + prop);

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
    ip = 'https://cuboidtechnologies.com';
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
