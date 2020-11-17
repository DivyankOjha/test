const catchAsync = require('../../utils/catchAsync');
const mongoose = require('mongoose');
const House = require('../../models/houseModel');
const path = require('path');
const mime = require('mime');
const fs = require('fs');
const { isNullOrUndefined } = require('util');

exports.house = catchAsync(async (req, res, next) => {
  const newHouse = await House.create(req.body);
  let maincategory = newHouse.attributes.mainCategory;
  let mainlower = maincategory.toLowerCase();
  let subCategory = newHouse.attributes.subCategory;
  let propertyStatus = newHouse.attributes.propertyStatus;
  let sublower = subCategory.toLowerCase();
  let propertyStatusLower = propertyStatus.toLowerCase();

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

    const fileName = `${newHouse.sellerDetails.sellername}.${extension}`;

    let abc = 'abc';
    path3 = path.resolve(`./public/media/admin/house`);

    let localpath = `${path3}/${newHouse._id}/`;

    if (!fs.existsSync(localpath)) {
      fs.mkdirSync(localpath);
    }

    fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
    ip = 'cuboidtechnologies.com';

    const url = `https://${ip}/media/admin/house/${newHouse._id}/${fileName}`;

    const logoUpdate = await House.findByIdAndUpdate(
      { _id: newHouse._id },
      {
        $set: {
          'sellerDetails.sellerlogo': url,
        },
      }
    );
  }

  res.status(201).json({
    status: 'success',
    data: {
      house: newHouse,
    },
  });
});
exports.updateHouse = catchAsync(async (req, res, next) => {
  let sellerlogo = req.body.sellerDetails.sellerlogo;
  if (
    req.body.sellerDetails.sellerlogo &&
    req.body.sellerDetails.sellerlogo != ''
  ) {
    var d = sellerlogo.startsWith('http', 0);
    if (d) {
      const updatedellerlogo = await House.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: { 'sellerDetails.sellerlogo': sellerlogo },
        }
      );
    }
    if (!d) {
      var matches = await req.body.sellerDetails.sellerlogo.match(
          /^data:([A-Za-z-+\/]+);base64,(.+)$/
        ),
        response = {};
      //console.log(matches);
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
      const fileName = `${req.body.sellerDetails.sellername}.${extension}`;
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

  res.status(200).json({
    status: 'success',
  });
});

exports.getAllHouse = catchAsync(async (req, res) => {
  const house = await House.find({});

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

  const users = await House.find({
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
      const house = await House.findById(searchquery);

      res.status(200).json({
        status: 'success',
        results: house.length,
        data: house,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(searchquery)) {
      const house = await House.find({
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

  const searchResult = await House.find(query).distinct(
    'sellerDetails.location'
  );

  res.status(200).json({
    status: 'success',
    results: searchResult.length,
    data: searchResult,
  });
});
