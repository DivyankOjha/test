const catchAsync = require('../../utils/catchAsync');
const mongoose = require('mongoose');
const WareHouse = require('../../models/warehouseModel');

const path = require('path');
const mime = require('mime');
const fs = require('fs');
const { isNullOrUndefined } = require('util');

exports.addWarehouse = catchAsync(async (req, res, next) => {
  const warehouse = await WareHouse.create(req.body);

  let mainCategory = warehouse.attributes.mainCategory;
  let mainlower = mainCategory.toLowerCase();
  let typeatt = warehouse.attributes.Type;

  let typelower = typeatt.toLowerCase();
  let zoning = warehouse.attributes.zoning;
  let zoninglower = zoning.toLowerCase();
  let townLocation = warehouse.attributes.townLocation;
  let townlower = townLocation.toLowerCase();
  let accessRoad = warehouse.attributes.accessRoad;
  let roadlower = accessRoad.toLowerCase();
  let tenants = warehouse.attributes.tenants;
  let tenantslower = tenants.toLowerCase();
  let elevator = warehouse.attributes.elevator;
  let elevatorlower = elevator.toLowerCase();
  let vehicleTraffic = warehouse.attributes.vehicleTraffic;
  let vehiclelower = vehicleTraffic.toLowerCase();
  let humanTraffic = warehouse.attributes.humanTraffic;
  let humanlower = humanTraffic.toLowerCase();
  let meetingRoom = warehouse.attributes.meetingRoom;
  let meetinglower = meetingRoom.toLowerCase();
  let parking = warehouse.attributes.parking;
  let parkinglower = parking.toLowerCase();
  let security = warehouse.attributes.security;
  let securitylower = security.toLowerCase();

  const updating = await WareHouse.findByIdAndUpdate(
    { _id: warehouse._id },
    {
      $set: {
        'attributes.mainCategory': mainlower,
        'attributes.Type': typelower,
        'attributes.zoning': zoninglower,
        'attributes.townLocation': townlower,
        'attributes.accessRoad': roadlower,
        'attributes.tenants': tenantslower,
        'attributes.elevator': elevatorlower,
        'attributes.vehicleTraffic': vehiclelower,
        'attributes.humanTraffic': humanlower,
        'attributes.meetingRoom': meetinglower,
        'attributes.parking': parkinglower,
        'attributes.security': securitylower,
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

    const fileName = `${warehouse.sellerDetails.sellername}.${extension}`;

    let abc = 'abc';
    path3 = path.resolve(`./public/media/admin/warehouse`);

    let localpath = `${path3}/${warehouse._id}/`;

    if (!fs.existsSync(localpath)) {
      fs.mkdirSync(localpath);
    }

    fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
    ip = 'cuboidtechnologies.com';

    const url = `https:://${ip}/media/admin/warehouse/${warehouse._id}/${fileName}`;

    const logoUpdate = await WareHouse.findByIdAndUpdate(
      { _id: warehouse._id },
      { $set: { 'sellerDetails.sellerlogo': url } }
    );
  }
  res.status(201).json({
    status: 'success',
    data: {
      warehouse: warehouse,
    },
  });
});

exports.updateWarehouse = catchAsync(async (req, res, next) => {
  let sellerlogo = req.body.sellerDetails.sellerlogo;
  if (
    req.body.sellerDetails.sellerlogo &&
    req.body.sellerDetails.sellerlogo != '' &&
    req.body.sellerDetails.sellerlogo != ' ' &&
    req.body.sellerDetails.sellerlogo != isNullOrUndefined
  ) {
    var d = sellerlogo.startsWith('http', 0);
    if (d) {
      const updatedellerlogo = await WareHouse.findByIdAndUpdate(
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
      path3 = path.resolve(`./public/media/admin/hotel`);

      let localpath = `${path3}/${req.params.id}/`;

      if (!fs.existsSync(localpath)) {
        fs.mkdirSync(localpath);
      }

      fs.writeFileSync(`${localpath}` + fileName, imageBuffer, 'utf8');
      ip = 'cuboidtechnologies.com';

      const url = `https://${ip}/media/admin/hotel/${req.params.id}/${fileName}`;

      console.log(url);

      const logoUpdate = await WareHouse.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { 'sellerDetails.sellerlogo': url } }
      );
    }
  }

  const getware = await WareHouse.findByIdAndUpdate(
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
  let mainlower = mainCategory.toLowerCase();
  let typeatt = req.body.attributes.Type;

  let typelower = typeatt.toLowerCase();
  let zoning = req.body.attributes.zoning;
  let zoninglower = zoning.toLowerCase();
  let townLocation = req.body.attributes.townLocation;
  let townlower = townLocation.toLowerCase();
  let accessRoad = req.body.attributes.accessRoad;
  let roadlower = accessRoad.toLowerCase();
  let tenants = req.body.attributes.tenants;
  let tenantslower = tenants.toLowerCase();
  let elevator = req.body.attributes.elevator;
  let elevatorlower = elevator.toLowerCase();
  let vehicleTraffic = req.body.attributes.vehicleTraffic;
  let vehiclelower = vehicleTraffic.toLowerCase();
  let humanTraffic = req.body.attributes.humanTraffic;
  let humanlower = humanTraffic.toLowerCase();
  let meetingRoom = req.body.attributes.meetingRoom;
  let meetinglower = meetingRoom.toLowerCase();
  let parking = req.body.attributes.parking;
  let parkinglower = parking.toLowerCase();

  const updating = await WareHouse.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        'attributes.mainCategory': mainlower,
        'attributes.Type': typelower,
        'attributes.zoning': zoninglower,
        'attributes.townLocation': townlower,
        'attributes.accessRoad': roadlower,
        'attributes.tenants': tenantslower,
        'attributes.elevator': elevatorlower,
        'attributes.vehicleTraffic': vehiclelower,
        'attributes.humanTraffic': humanlower,
        'attributes.meetingRoom': meetinglower,
        'attributes.parking': parkinglower,
      },
    }
  );

  res.status(200).json({
    status: 'success',
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

exports.filterbydate = catchAsync(async (req, res) => {
  let { startDate, endDate } = req.body;

  const users = await WareHouse.find({
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

  try {
    if (mongoose.Types.ObjectId.isValid(searchquery)) {
      const house = await WareHouse.findById(searchquery);

      res.status(200).json({
        status: 'success',
        results: house.length,
        data: house,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(searchquery)) {
      const house = await WareHouse.find({
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

exports.ajaxSearchArea = catchAsync(async (req, res, next) => {
  let searchquery = req.body.searchquery;

  let query = {
    $or: [
      {
        'sellerDetails.location': {
          $regex: searchquery,
          $options: 'm',
        },
      },
    ],
  };

  const searchResult = await WareHouse.find(query).distinct(
    'sellerDetails.location'
  );

  res.status(200).json({
    status: 'success',
    results: searchResult.length,
    data: searchResult,
  });
});
