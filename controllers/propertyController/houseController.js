const catchAsync = require('../../utils/catchAsync');
const mongoose = require('mongoose');
const House = require('../../models/houseModel');
const path = require('path');
const mime = require('mime');
const fs = require('fs');

exports.house = catchAsync(async (req, res, next) => {
  // const currentlogo = req.body.sellerDetails.sellerlogo;
  //  console.log('currentlogo: ' + currentlogo);

  const newHouse = await House.create(req.body);
  let maincategory = newHouse.attributes.mainCategory;
  let mainlower = maincategory.toLowerCase();
  let subCategory = newHouse.attributes.subCategory;
  let sublower = subCategory.toLowerCase();
  let propertyStatus = newHouse.attributes.propertyStatus;
  let propertyStatusLower = propertyStatus.toLowerCase();
  console.log(mainlower);

  const updating = await House.findByIdAndUpdate(
    { _id: newHouse._id },
    {
      $set: {
        'attributes.mainCategory': mainlower,
        'attributes.subCategory': sublower,
        'attributes.propertyStatus': propertyStatusLower,
      },
    }
  );
  // console.log(updateing);
  // console.log(newHouse._id);

  //console.log(req.protocol);
  // console.log(req.get('host'));
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

  var matches = await req.body.sellerDetails.sellerlogo.match(
      /^data:([A-Za-z-+\/]+);base64,(.+)$/
    ),
    response = {};
  //console.log(matches);
  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }
  response.type = matches[1];
  //  console.log(response.type);
  response.data = new Buffer.from(matches[2], 'base64');
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  const name = type.split('/');
  //  console.log(name);
  const name1 = name[0];
  // console.log(name1);
  let extension = mime.extension(type);
  // console.log(extension);
  const rand = Math.ceil(Math.random() * 1000);
  //Random photo name with timeStamp so it will not overide previous images.
  const fileName = `${newHouse.sellerDetails.sellername}.${extension}`;
  //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

  // let fileName = name1 ++ '.' + extension;
  // console.log(fileName);
  let abc = 'abc';
  path3 = path.resolve(`./public/media/admin/house`);

  let localpath = `${path3}/${newHouse._id}/`;
  //console.log(localpath);

  if (!fs.existsSync(localpath)) {
    fs.mkdirSync(localpath);
  }
  //console.log(localpath);

  fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
  ip = '54.164.209.42';
  //console.log(ip);
  const url = `${req.protocol}://${ip}/media/admin/house/${newHouse._id}/${fileName}`;

  // console.log(url);

  const logoUpdate = await House.findByIdAndUpdate(
    { _id: newHouse._id },
    {
      $set: {
        'sellerDetails.sellerlogo': url,
        //  'attributes.mainCategory': mainlower,
      },
    }
  );
  //console.log('logoupdate' + logoUpdate);
  res.status(201).json({
    status: 'success',
    data: {
      house: newHouse,
    },
  });
});

//PAGINATION DONE
exports.getAllHouse = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const house = await House.find({}).skip(skip).limit(limit); //.sort({  'propertyDetails.propertyName': -1,});
  var props = Object.keys(House.schema.paths);
  console.log(props);

  res.status(200).json({
    status: 'success',
    results: house.length,
    data: {
      house,
    },
  });
});
exports.propertySearchByName = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  let searchquery = req.body.searchquery;
  // let str = searchquery;
  // let substr = '@';
  // console.log(str.includes(substr));
  console.log(searchquery);

  //const _id = searchquery;
  //console.log('length' + _id.length);
  try {
    if (mongoose.Types.ObjectId.isValid(searchquery)) {
      //console.log('this is id');
      const house = await House.findById(searchquery);
      // console.log(house.length);
      res.status(200).json({
        status: 'success',
        results: house.length,
        data: house,
      });
    }
    // if (str.includes(substr)) {
    //   //console.log('this is email');
    //   const user = await House.findOne({ email: searchquery });
    //   console.log(user);
    //   res.status(200).json({
    //     status: 'success',
    //     results: user.length,
    //     data: user,
    //   });
    // }
    if (!mongoose.Types.ObjectId.isValid(searchquery)) {
      // console.log('this is propertyname');
      const house = await House.find({
        $expr: {
          $regexMatch: {
            //input: { $concat: ['$firstname', ' ', '$lastname'] },
            input: '$propertyDetails.propertyName',
            regex: searchquery, //Your text search here
            options: 'i',
          },
        },
      })
        .skip(skip)
        .limit(limit);
      if (house.length < 1) {
        //console.log('hello');
        res.status(404).json({
          message: 'Property Not Found! Try another keyword',
        });
      } else {
        res.status(200).json({
          status: 'success',
          results: house.length,
          data: house,
        });
      }
    }
  } catch (error) {
    console.log(error);
    // res.status(404).json({
    //   status: 'Property NOT FOUND',
    //   message: error,
    // });
  }
});
// exports.deleteOneProperty = catchAsync(async (req, res) => {
//   console.log(req.params.id);

//   const deleteOne = await House.findByIdAndDelete({ _id: req.params.id });
//   res.status(200).json({
//     status: 'success',
//     result: 'Deleted Successfully',
//   });
// });
