const catchAsync = require('../../utils/catchAsync');
const mongoose = require('mongoose');
const Land = require('../../models/landModel');

const path = require('path');
const mime = require('mime');
const fs = require('fs');
const { isNullOrUndefined } = require('util');

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

    const fileName = `${newLand.sellerDetails.sellername}.${extension}`;

    console.log(fileName);
    let abc = 'abc';
    path3 = path.resolve(`./public/media/admin/land`);

    let localpath = `${path3}/${newLand._id}/`;

    if (!fs.existsSync(localpath)) {
      fs.mkdirSync(localpath);
    }

    fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
    ip = 'cuboidtechnologies.com';

    const url = `https://${ip}/media/admin/land/${newLand._id}/${fileName}`;

    console.log(url);

    const logoUpdate = await Land.findByIdAndUpdate(
      { _id: newLand._id },
      { $set: { 'sellerDetails.sellerlogo': url } }
    );
  }
  res.status(201).json({
    status: 'success',
    data: {
      land: newLand,
    },
  });
});

exports.updateLand = catchAsync(async (req, res, next) => {
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
      const updatedellerlogo = await Land.findByIdAndUpdate(
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
      path3 = path.resolve(`./public/media/admin/land`);

      let localpath = `${path3}/${req.params.id}/`;

      if (!fs.existsSync(localpath)) {
        fs.mkdirSync(localpath);
      }

      fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
      ip = 'cuboidtechnologies.com';

      const url = `https://${ip}/media/admin/land/${req.params.id}/${fileName}`;

      console.log(url);

      const logoUpdate = await Land.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { 'sellerDetails.sellerlogo': url } }
      );
    }
  }

  const getland = await Land.findByIdAndUpdate(
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

  let mainCategory = req.body.attributes.mainCategory;

  let nature = req.body.attributes.nature;
  let naturelower = nature.toLowerCase();
  let soilType = req.body.attributes.soilType;
  let soillower = soilType.toLowerCase();
  let road = req.body.attributes.road;
  let roadlower = road.toLowerCase();

  const updating = await Land.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        'attributes.nature': naturelower,
        'attributes.soilType': soillower,
        'attributes.road': roadlower,
        'attributes.mainCategory': mainCategory,
      },
    }
  );

  res.status(200).json({
    status: 'success',
    data: updating,
  });
});

exports.getAllland = catchAsync(async (req, res) => {
  const land = await Land.find(); //.skip(skip).limit(limit);
  res.status(200).json({
    status: 'success',
    results: land.length,
    data: {
      land,
    },
  });
});
exports.filterbydate = catchAsync(async (req, res) => {
  let { startDate, endDate } = req.body;

  const users = await Land.find({
    createdAt: { $gte: startDate, $lte: endDate + 'T' + '23:59:59' },
  });

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

exports.propertySearchByName = catchAsync(async (req, res, next) => {
  let searchquery = req.body.searchquery;

  console.log(searchquery);

  try {
    if (mongoose.Types.ObjectId.isValid(searchquery)) {
      const house = await Land.findById(searchquery);
      res.status(200).json({
        status: 'success',
        results: house.length,
        data: house,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(searchquery)) {
      const house = await Land.find({
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

  const searchResult = await Land.find(query).distinct(
    'sellerDetails.location'
  );

  res.status(200).json({
    status: 'success',
    results: searchResult.length,
    data: searchResult,
  });
});
