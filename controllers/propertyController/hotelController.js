const catchAsync = require('../../utils/catchAsync');
const mongoose = require('mongoose');
const Hotel = require('../../models/hotelModel');
const path = require('path');
const mime = require('mime');
const fs = require('fs');
const { isNullOrUndefined } = require('util');

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
  if (
    req.body.sellerDetails.sellerlogo &&
    req.body.sellerDetails.sellerlogo !== ''
  ) {
    var matches = await req.body.sellerDetails.sellerlogo.match(
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

    const fileName = `${hotel.sellerDetails.sellername}.${extension}`;

    console.log(fileName);
    let abc = 'abc';
    path3 = path.resolve(`./public/media/admin/hotel`);

    let localpath = `${path3}/${hotel._id}/`;

    if (!fs.existsSync(localpath)) {
      fs.mkdirSync(localpath);
    }

    fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
    ip = 'cuboidtechnologies.com';

    const url = `https://${ip}/media/admin/hotel/${hotel._id}/${fileName}`;

    console.log(url);

    const logoUpdate = await Hotel.findByIdAndUpdate(
      { _id: hotel._id },
      { $set: { 'sellerDetails.sellerlogo': url } }
    );
  }
  res.status(201).json({
    status: 'success',
    data: {
      hotel: hotel,
    },
  });
});

exports.updateHotel = catchAsync(async (req, res, next) => {
  let sellerlogo = req.body.sellerDetails.sellerlogo;
  if (
    req.body.sellerDetails.sellerlogo &&
    req.body.sellerDetails.sellerlogo != '' &&
    req.body.sellerDetails.sellerlogo != ' ' &&
    req.body.sellerDetails.sellerlogo != isNullOrUndefined
  ) {
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

      const fileName = `${req.body.sellerDetails.sellername}.${extension}`;

      console.log(fileName);
      let abc = 'abc';
      path3 = path.resolve(`./public/media/admin/hotel`);

      let localpath = `${path3}/${req.params.id}/`;

      if (!fs.existsSync(localpath)) {
        fs.mkdirSync(localpath);
      }

      fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
      ip = 'cuboidtechnologies.com';

      const url = `https://${ip}/media/admin/hotel/${req.params.id}/${fileName}`;

      console.log(url);

      const logoUpdate = await Hotel.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { 'sellerDetails.sellerlogo': url } }
      );
    }
  }

  const gethotel = await Hotel.findByIdAndUpdate(
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

  res.status(200).json({
    status: 'success',
    data: gethotel,
  });
});

exports.getAllHotel = catchAsync(async (req, res) => {
  const hotel = await Hotel.find();
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

  const users = await Hotel.find({
    createdAt: { $gte: startDate, $lte: endDate + 'T' + '23:59:59' },
  });

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

  console.log(searchquery);

  try {
    if (mongoose.Types.ObjectId.isValid(searchquery)) {
      const house = await Hotel.findById(searchquery);

      res.status(200).json({
        status: 'success',
        results: house.length,
        data: house,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(searchquery)) {
      const house = await Hotel.find({
        $expr: {
          $regexMatch: {
            input: '$propertyDetails.propertyName',
            regex: searchquery,
            options: 'm',
          },
        },
      });

      if (house.length < 1) {
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
    ],
  };

  const searchResult = await Hotel.find(query).distinct(
    'sellerDetails.location'
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
    ],
  };

  const searchResult = await Hotel.find(query).distinct(
    'propertyDetails.propertyName'
  );

  res.status(200).json({
    status: 'success',
    results: searchResult.length,
    data: searchResult,
  });
});
