const catchAsync = require('../../utils/catchAsync');
const mongoose = require('mongoose');
const Hotel = require('../../models/hotelModel');
const path = require('path');
const mime = require('mime');
const fs = require('fs');

exports.addhotel = catchAsync(async (req, res, next) => {
  const hotel = await Hotel.create(req.body);

  let cls = hotel.attributes.class;
  let classlower = cls.toLowerCase();
  let locality = hotel.attributes.locality;
  let localitylower = locality.toLowerCase();

  const updating = await Hotel.findByIdAndUpdate(
    { _id: hotel._id },
    {
      $set: {
        'attributes.class': classlower,
        'attributes.locality': localitylower,
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
  const fileName = `${hotel.sellerDetails.sellername}.${extension}`;
  //const fileName = `${req.user.firstname}_${Date.now()}_.${extension}`;

  // let fileName = name1 ++ '.' + extension;
  console.log(fileName);
  let abc = 'abc';
  path3 = path.resolve(`./public/media/admin/hotel`);

  let localpath = `${path3}/${hotel._id}/`;
  //console.log(localpath);

  if (!fs.existsSync(localpath)) {
    fs.mkdirSync(localpath);
  }
  //console.log(localpath);

  fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
  ip = '54.164.209.42';
  //console.log(ip);
  const url = `${req.protocol}://${ip}/media/admin/hotel/${hotel._id}/${fileName}`;

  console.log(url);

  const logoUpdate = await Hotel.findByIdAndUpdate(
    { _id: hotel._id },
    { $set: { 'sellerDetails.sellerlogo': url } }
  );
  res.status(201).json({
    status: 'success',
    data: {
      hotel: hotel,
    },
  });
});

exports.updateHotel = catchAsync(async (req, res, next) => {
  // console.log(req.params.id);
  let sellerlogo = req.body.sellerDetails.sellerlogo;
  var d = sellerlogo.startsWith('http', 0);
  if (d) {
    console.log('true');
    const updatedellerlogo = await Hotel.findByIdAndUpdate(
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
    ip = '54.164.209.42';
    //console.log(ip);
    const url = `${req.protocol}://${ip}/media/admin/hotel/${req.params.id}/${fileName}`;

    console.log(url);

    const logoUpdate = await Hotel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { 'sellerDetails.sellerlogo': url } }
    );
  }

  const gethotel = await Hotel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
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
        'sellerDetails.sellerwebsite': req.body.sellerDetails.sellerwebsite,
        'sellerDetails.location': req.body.sellerDetails.location,
        'sellerDetails.maplink': req.body.sellerDetails.maplink,
        'sellerDetails.nearestplace': req.body.sellerDetails.nearestplace,
      },
    }
  );

  let cls = req.body.attributes.class;
  let classlower = cls.toLowerCase();
  let locality = req.body.attributes.locality;
  let localitylower = locality.toLowerCase();

  const updating = await Hotel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        'attributes.class': classlower,
        'attributes.locality': localitylower,
      },
    }
  );
  //  console.log(gethouse);
  res.status(200).json({
    status: 'success',
    //    results: gethouse.length,
    data: gethotel,
  });
});

//Pagination Done
exports.getAllHotel = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);

  const hotel = await Hotel.find(); //.skip(skip).limit(limit);
  res.status(200).json({
    status: 'success',
    results: hotel.length,
    data: {
      hotel,
    },
  });
});

exports.filterbydate = catchAsync(async (req, res) => {
  let { startDate, endDate } = req.body;
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);

  //console.log(endDate + 'T' + '00:00:00');
  const users = await Hotel.find({
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
      const house = await Hotel.findById(searchquery);
      // console.log(house.length);
      res.status(200).json({
        status: 'success',
        results: house.length,
        data: house,
      });
    }
    // if (str.includes(substr)) {
    //   //console.log('this is email');
    //   const user = await Hotel.findOne({ email: searchquery });
    //   console.log(user);
    //   res.status(200).json({
    //     status: 'success',
    //     results: user.length,
    //     data: user,
    //   });
    // }
    if (!mongoose.Types.ObjectId.isValid(searchquery)) {
      // console.log('this is propertyname');
      const house = await Hotel.find({
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
      // .limit(limit);
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

  const searchResult = await Hotel.find(
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

exports.ajaxSearchHotelName = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  let searchquery = req.body.searchquery;
  let lowersearchquery = searchquery.toLowerCase();

  console.log(lowersearchquery);
  let query = {
    $or: [
      {
        'propertyDetails.propertyName': {
          $regex: lowersearchquery,
          $options: 'ism',
        },
      },
      // //  {
      //     'sellerDetails.nearestplace.placename': {
      //       $regex: lowersearchquery,
      //       $options: 'ism',
      //     },
      //   },
    ],
  };

  const searchResult = await Hotel.find(
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
