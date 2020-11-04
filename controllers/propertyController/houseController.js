const catchAsync = require('../../utils/catchAsync');
const mongoose = require('mongoose');
const House = require('../../models/houseModel');
const path = require('path');
const mime = require('mime');
const fs = require('fs');
const { isNullOrUndefined } = require('util');

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
  if (
    req.body.sellerDetails.sellerlogo &&
    req.body.sellerDetails.sellerlogo != '' &&
    req.body.sellerDetails.sellerlogo != ' ' &&
    req.body.sellerDetails.sellerlogo != isNullOrUndefined
  ) {
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
    ip = 'cuboidtechnologies.com';
    //console.log(ip);
    const url = `https://${ip}/media/admin/house/${newHouse._id}/${fileName}`;

    console.log(url);

    const logoUpdate = await House.findByIdAndUpdate(
      { _id: newHouse._id },
      {
        $set: {
          'sellerDetails.sellerlogo': url,
          //  'attributes.mainCategory': mainlower,
        },
      }
    );
  }
  //console.log('logoupdate' + logoUpdate);
  res.status(201).json({
    status: 'success',
    data: {
      house: newHouse,
    },
  });
});
exports.updateHouse = catchAsync(async (req, res, next) => {
  // console.log(req.params.id);
  let sellerlogo = req.body.sellerDetails.sellerlogo;
  if (
    req.body.sellerDetails.sellerlogo &&
    req.body.sellerDetails.sellerlogo != ''
  ) {
    var d = sellerlogo.startsWith('http', 0);
    if (d) {
      console.log('true');
      const updatedellerlogo = await House.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: { 'sellerDetails.sellerlogo': sellerlogo },
        }
      );
    }
    if (!d) {
      console.log(false);
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
      const fileName = `${req.body.sellerDetails.sellername}.${extension}`;
      //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

      // let fileName = name1 ++ '.' + extension;
      console.log(fileName);
      let abc = 'abc';
      path3 = path.resolve(`./public/media/admin/hotel`);

      let localpath = `${path3}/${req.params.id}/`;
      //console.log(localpath);

      if (!fs.existsSync(localpath)) {
        fs.mkdirSync(localpath);
      }
      //console.log(localpath);

      fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
      ip = 'cuboidtechnologies.com';
      //console.log(ip);
      const url = `https://${ip}/media/admin/hotel/${req.params.id}/${fileName}`;

      console.log(url);

      const logoUpdate = await House.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { 'sellerDetails.sellerlogo': url } }
      );
    }
  }

  const gethouse = await House.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        'location.coordinates.longitude':
          req.body.location.coordinates.longitude,
        'location.coordinates.lattitude':
          req.body.location.coordinates.lattitude,
        propertyDetails: req.body.propertyDetails,
        attributes: req.body.attributes,
        'sellerDetails.sellername': req.body.sellerDetails.sellername,
        'sellerDetails.sellerContactNumber':
          req.body.sellerDetails.sellerContactNumber,
        'sellerDetails.sellerofficeaddress':
          req.body.sellerDetails.sellerofficeaddress,
        'sellerDetails.selleremail': req.body.sellerDetails.selleremail,
        'sellerDetails.sellertype': req.body.sellerDetails.sellertype,
        'sellerDetails.selleraltnumber': req.body.sellerDetails.selleraltnumber,
        'sellerDetails.selleraltemail': req.body.sellerDetails.selleraltemail,
        'sellerDetails.sellerwebsite': req.body.sellerDetails.sellerwebsite,
        'sellerDetails.location': req.body.sellerDetails.location,
        'sellerDetails.maplink': req.body.sellerDetails.maplink,
        'sellerDetails.nearestplace': req.body.sellerDetails.nearestplace,
      },
    }
  );

  let maincategory = req.body.attributes.mainCategory;
  let mainlower = maincategory.toLowerCase();
  let subCategory = req.body.attributes.subCategory;
  let sublower = subCategory.toLowerCase();
  let propertyStatus = req.body.attributes.propertyStatus;
  let propertyStatusLower = propertyStatus.toLowerCase();

  const updating = await House.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        'attributes.mainCategory': mainlower,
        'attributes.subCategory': sublower,
        'attributes.propertyStatus': propertyStatusLower,
      },
    }
  );
  //  console.log(gethouse);
  res.status(200).json({
    status: 'success',

    //    results: gethouse.length,
  });
});

//PAGINATION DONE
exports.getAllHouse = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const house = await House.find({}); //skip(skip).limit(limit); //.sort({  'propertyDetails.propertyName': -1,});
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
exports.filterbydate = catchAsync(async (req, res) => {
  let { startDate, endDate } = req.body;
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);

  //console.log(endDate + 'T' + '00:00:00');
  const users = await House.find({
    createdAt: { $gte: startDate, $lte: endDate + 'T' + '23:59:59' },
    // createdAt: { $lt: endDate },
  });
  //.skip(skip)
  //  .limit(limit);
  // console.log('users: ' + users);

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
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
            options: 'm',
          },
        },
      });
      // .skip(skip)
      //.limit(limit);
      if (house.length < 1) {
        //console.log('hello');
        res.status(200).json({
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
      // {
      //   'sellerDetails.nearestplace.placename': {
      //     $regex: lowersearchquery,
      //     $options: 'ism',
      //   },
      // },
    ],
  };

  const searchResult = await House.find(
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
// exports.deleteOneProperty = catchAsync(async (req, res) => {
//   console.log(req.params.id);

//   const deleteOne = await House.findByIdAndDelete({ _id: req.params.id });
//   res.status(200).json({
//     status: 'success',
//     result: 'Deleted Successfully',
//   });
// });
