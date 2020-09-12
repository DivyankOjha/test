const catchAsync = require('../../utils/catchAsync');
const mongoose = require('mongoose');
const Land = require('../../models/landModel');

const path = require('path');
const mime = require('mime');
const fs = require('fs');

exports.land = catchAsync(async (req, res, next) => {
  const newLand = await Land.create(req.body);

  let mainCategory = newLand.attributes.mainCategory;
  let mainlower = mainCategory.toLowerCase();
  let nature = newLand.attributes.nature;
  let naturelower = nature.toLowerCase();
  let soilType = newLand.attributes.soilType;
  let soillower = soilType.toLowerCase();
  let road = newLand.attributes.road;
  let roadlower = road.toLowerCase();
  console.log(mainlower);

  const updating = await Land.findByIdAndUpdate(
    { _id: newLand._id },
    {
      $set: {
        'attributes.nature': naturelower,
        'attributes.soilType': soillower,
        'attributes.road': roadlower,
        'attributes.mainCategory': mainlower,
      },
    }
  );

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
  const fileName = `${newLand.sellerDetails.sellername}.${extension}`;
  //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

  // let fileName = name1 ++ '.' + extension;
  console.log(fileName);
  let abc = 'abc';
  path3 = path.resolve(`./public/media/admin/land`);

  let localpath = `${path3}/${newLand._id}/`;
  //console.log(localpath);

  if (!fs.existsSync(localpath)) {
    fs.mkdirSync(localpath);
  }
  //console.log(localpath);

  fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
  ip = '54.164.209.42';
  //console.log(ip);
  const url = `${req.protocol}://${ip}/media/admin/land/${newLand._id}/${fileName}`;

  console.log(url);

  const logoUpdate = await Land.findByIdAndUpdate(
    { _id: newLand._id },
    { $set: { 'sellerDetails.sellerlogo': url } }
  );

  res.status(201).json({
    status: 'success',
    data: {
      land: newLand,
    },
  });
});

//Pagination done
exports.getAllland = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const land = await Land.find().skip(skip).limit(limit);
  res.status(200).json({
    status: 'success',
    results: land.length,
    data: {
      land,
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
      const house = await Land.findById(searchquery);
      // console.log(house.length);
      res.status(200).json({
        status: 'success',
        results: house.length,
        data: house,
      });
    }
    // if (str.includes(substr)) {
    //   //console.log('this is email');
    //   const user = await Land.findOne({ email: searchquery });
    //   console.log(user);
    //   res.status(200).json({
    //     status: 'success',
    //     results: user.length,
    //     data: user,
    //   });
    // }
    if (!mongoose.Types.ObjectId.isValid(searchquery)) {
      // console.log('this is propertyname');
      const house = await Land.find({
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

exports.ajaxSearch = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  let searchquery = req.body.searchquery;
  let lowersearchquery = searchquery.toLowerCase();

  console.log(lowersearchquery);
  let query = {
    $or: [
      {
        'sellerDetails.location': { $regex: lowersearchquery, $options: 'ism' },
      },
      {
        'sellerDetails.nearestplace.placename': {
          $regex: lowersearchquery,
          $options: 'ism',
        },
      },
    ],
  };

  const searchResult = await Land.find(
    query
    // $expr: {
    //   $regexMatch: {
    //     input: '$sellerDetails.location',
    //     regex: lowersearchquery, //Your text search here
    //     options: 'm',
    //   },
    // },
  );

  res.status(200).json({
    status: 'success',
    results: searchResult.length,
    data: searchResult,
  });
});
