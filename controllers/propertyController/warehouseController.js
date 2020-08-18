const catchAsync = require('../../utils/catchAsync');
const mongoose = require('mongoose');
const WareHouse = require('../../models/warehouseModel');

const path = require('path');
const mime = require('mime');
const fs = require('fs');

exports.addWarehouse = catchAsync(async (req, res, next) => {
  const warehouse = await WareHouse.create(req.body);

  var matches = await req.body.sellerDetails.sellerlogo.match(
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
  const fileName = `${warehouse.sellerDetails.sellername}.${extension}`;
  //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

  // let fileName = name1 ++ '.' + extension;
  console.log(fileName);
  let abc = 'abc';
  path3 = path.resolve(`./public/media/admin/warehouse`);

  let localpath = `${path3}/${warehouse._id}/`;
  //console.log(localpath);

  if (!fs.existsSync(localpath)) {
    fs.mkdirSync(localpath);
  }
  //console.log(localpath);

  fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
  ip = '54.164.209.42';
  //console.log(ip);
  const url = `${req.protocol}://${ip}/media/admin/warehouse/${warehouse._id}/${fileName}`;

  console.log(url);

  const logoUpdate = await WareHouse.findByIdAndUpdate(
    { _id: warehouse._id },
    { $set: { 'sellerDetails.sellerlogo': url } }
  );

  res.status(201).json({
    status: 'success',
    data: {
      warehouse: warehouse,
    },
  });
});

exports.getAllWarehouse = catchAsync(async (req, res) => {
  const warehouse = await WareHouse.find();
  res.status(200).json({
    status: 'success',
    results: warehouse.length,
    data: {
      warehouse,
    },
  });
});

exports.propertySearchByName = catchAsync(async (req, res, next) => {
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
      const house = await WareHouse.findById(searchquery);
      // console.log(house.length);
      res.status(200).json({
        status: 'success',
        results: house.length,
        data: house,
      });
    }
    // if (str.includes(substr)) {
    //   //console.log('this is email');
    //   const user = await WareHouse.findOne({ email: searchquery });
    //   console.log(user);
    //   res.status(200).json({
    //     status: 'success',
    //     results: user.length,
    //     data: user,
    //   });
    // }
    if (!mongoose.Types.ObjectId.isValid(searchquery)) {
      // console.log('this is propertyname');
      const house = await WareHouse.find({
        $expr: {
          $regexMatch: {
            //input: { $concat: ['$firstname', ' ', '$lastname'] },
            input: '$propertyDetails.propertyName',
            regex: searchquery, //Your text search here
            options: 'i',
          },
        },
      });
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
