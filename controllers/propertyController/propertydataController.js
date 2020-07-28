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
    val = housedata[i].propertyDetails.propertyName;
    PropertyNames.push(val);
  }
  //   for (let i = 0; i <= housedata.length; i++) {
  //     PropertyNames.push(housedata[i].propertyDetails.propertyName);
  //   }

  const land = await Land.find();
  for (var i in land) {
    val = land[i].propertyDetails.propertyName;
    PropertyNames.push(val);
  }

  const hotel = await Hotel.find();
  for (var i in hotel) {
    val = hotel[i].propertyDetails.propertyName;
    PropertyNames.push(val);
  }

  const warehouse = await Warehouse.find();

  for (var i in warehouse) {
    val = warehouse[i].propertyDetails.propertyName;
    PropertyNames.push(val);
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
