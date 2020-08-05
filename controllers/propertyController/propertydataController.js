const catchAsync = require('../../utils/catchAsync');
const mongoose = require('mongoose');

const House = require('../../models/houseModel');
const Land = require('../../models/landModel');
const Hotel = require('../../models/hotelModel');
const Warehouse = require('../../models/warehouseModel');

const PropertyNames = [];
//PropertyNames.push(1);
//console.log(PropertyNames);

exports.getdata = catchAsync(async (req, res, next) => {
  const housedata = await House.find();
  // console.log(housedata.length);
  for (var i in housedata) {
    var data = [];
    val = housedata[i].propertyDetails.propertyName;
    data.push(val);
    val = housedata[i]._id;
    data.push(val);
    PropertyNames.push(data);
  }

  //   for (let i = 0; i <= housedata.length; i++) {
  //     PropertyNames.push(housedata[i].propertyDetails.propertyName);
  //   }

  const land = await Land.find();
  for (var i in land) {
    var data1 = [];
    val = land[i].propertyDetails.propertyName;
    data1.push(val);
    val = land[i]._id;
    data1.push(val);
    PropertyNames.push(data1);
  }

  const hotel = await Hotel.find();
  for (var i in hotel) {
    var data2 = [];
    val = hotel[i].propertyDetails.propertyName;
    data2.push(val);
    val = hotel[i]._id;
    data2.push(val);
    console.log(data2);
    PropertyNames.push(data2);
  }

  const warehouse = await Warehouse.find();
  for (var i in warehouse) {
    var data = [];
    val = warehouse[i].propertyDetails.propertyName;
    data.push(val);
    val = warehouse[i]._id;
    data.push(val);
    PropertyNames.push(data);
  }
  // console.log(PropertyNames);
  let sortedName = [];
  sortedName = PropertyNames.sort();
  //console.log('sort:' + sortedName);

  res.status(200).json({
    status: 'success',
    sortedName,
  });
});
