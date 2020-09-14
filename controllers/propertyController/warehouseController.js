const catchAsync = require('../../utils/catchAsync');
const mongoose = require('mongoose');
const WareHouse = require('../../models/warehouseModel');

const path = require('path');
const mime = require('mime');
const fs = require('fs');

exports.addWarehouse = catchAsync(async (req, res, next) => {
  const warehouse = await WareHouse.create(req.body);

  let mainCategory = warehouse.attributes.mainCategory;
  let mainlower = mainCategory.toLowerCase();
  let typeatt = warehouse.attributes.Type;
  console.log(typeatt);
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

exports.updateWarehouse = catchAsync(async (req, res, next) => {
  // console.log(req.params.id);
  let sellerlogo = req.body.sellerDetails.sellerlogo;
  var d = sellerlogo.startsWith('http', 0);
  if (d) {
    console.log('true');
    const updatedellerlogo = await Warehouse.findByIdAndUpdate(
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

    const logoUpdate = await WareHouse.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { 'sellerDetails.sellerlogo': url } }
    );
  }

  const getware = await WareHouse.findByIdAndUpdate(
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
  //  console.log(gethouse);
  res.status(200).json({
    status: 'success',
    //    results: gethouse.length,
  });
});

//pagination done
exports.getAllWarehouse = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const warehouse = await WareHouse.find(); //.skip(skip).limit(limit);
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
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);

  //console.log(endDate + 'T' + '00:00:00');
  const users = await WareHouse.find({
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
