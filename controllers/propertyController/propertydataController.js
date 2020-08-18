const catchAsync = require('../../utils/catchAsync');
const mongoose = require('mongoose');

const House = require('../../models/houseModel');
const Land = require('../../models/landModel');
const Hotel = require('../../models/hotelModel');
const Warehouse = require('../../models/warehouseModel');

//let PropertyNames = [];
//PropertyNames.length = 0;
//console.log(PropertyNames.length);
//PropertyNames.push(1);
//console.log(PropertyNames);

exports.getdata = catchAsync(async (req, res, next) => {
  let PropertyNames = [];
  let housedata = await House.find();
  // console.log(housedata.length);
  for (var i in housedata) {
    let data = [];
    val1 = housedata[i].propertyDetails.propertyName;
    data.push(val1);
    val2 = housedata[i].propertyDetails.propertyType;
    data.push(val2);
    val3 = housedata[i]._id;
    data.push(val3);
    PropertyNames.push(data);
  }

  //   for (let i = 0; i <= housedata.length; i++) {
  //     PropertyNames.push(housedata[i].propertyDetails.propertyName);
  //   }

  const land = await Land.find();
  for (var i in land) {
    let data1 = [];
    val1 = land[i].propertyDetails.propertyName;
    data1.push(val1);
    val2 = land[i].propertyDetails.propertyType;
    data1.push(val2);
    val3 = land[i]._id;
    data1.push(val3);
    PropertyNames.push(data1);
  }

  const hotel = await Hotel.find();
  for (var i in hotel) {
    let data2 = [];
    val1 = hotel[i].propertyDetails.propertyName;
    data2.push(val1);
    val2 = hotel[i].propertyDetails.propertyType;
    data2.push(val2);
    val3 = hotel[i]._id;
    data2.push(val3);
    console.log(data2);
    PropertyNames.push(data2);
  }

  const warehouse = await Warehouse.find();
  for (var i in warehouse) {
    let data3 = [];
    val1 = warehouse[i].propertyDetails.propertyName;
    data3.push(val1);
    val2 = warehouse[i].propertyDetails.propertyType;
    data3.push(val2);
    val3 = warehouse[i]._id;
    data3.push(val3);
    PropertyNames.push(data3);
  }
  // console.log(PropertyNames);
  let sortedName = [];
  sortedName = PropertyNames.sort();
  //console.log('sort:' + sortedName);

  res.status(200).json({
    status: 'success',
    results: sortedName.length,
    sortedName,
  });
});

exports.ActiveInactive = catchAsync(async (req, res, next) => {
  const _id = req.params.id;
  const property = await House.findById({ _id });
  const land = await Land.findById({ _id });
  const hotel = await Hotel.findById({ _id });
  const warehouse = await Warehouse.findById({ _id });
  // console.log(user);
  // console.log(user._id);
  if (property) {
    if (property.isStatus) {
      //console.log('hello');
      const currentProperty = await House.findByIdAndUpdate(property._id, {
        $set: { isStatus: false },
      });
      res.status(200).json({
        status: 'success',
      });
    }
    if (!property.isStatus) {
      //console.log('hello');
      const currentProperty = await House.findByIdAndUpdate(property._id, {
        $set: { isStatus: true },
      });
      res.status(200).json({
        status: 'success',
      });
    }
  }
  if (land) {
    if (land.isStatus) {
      //console.log('hello');
      const currentProperty = await Land.findByIdAndUpdate(land._id, {
        $set: { isStatus: false },
      });
      res.status(200).json({
        status: 'success',
      });
    }
    if (!land.isStatus) {
      //console.log('hello');
      const currentProperty = await Land.findByIdAndUpdate(land._id, {
        $set: { isStatus: true },
      });
      res.status(200).json({
        status: 'success',
      });
    }
  }
  if (hotel) {
    if (hotel.isStatus) {
      //console.log('hello');
      const currentProperty = await Hotel.findByIdAndUpdate(hotel._id, {
        $set: { isStatus: false },
      });
      res.status(200).json({
        status: 'success',
      });
    }
    if (!hotel.isStatus) {
      //console.log('hello');
      const currentProperty = await Hotel.findByIdAndUpdate(hotel._id, {
        $set: { isStatus: true },
      });
      res.status(200).json({
        status: 'success',
      });
    }
  }
  if (warehouse) {
    if (warehouse.isStatus) {
      //console.log('hello');
      const currentProperty = await Warehouse.findByIdAndUpdate(warehouse._id, {
        $set: { isStatus: false },
      });
      res.status(200).json({
        status: 'success',
      });
    }
    if (!warehouse.isStatus) {
      //console.log('hello');
      const currentProperty = await Warehouse.findByIdAndUpdate(warehouse._id, {
        $set: { isStatus: true },
      });
      res.status(200).json({
        status: 'success',
      });
    }
  }
});

// exports.propertySearchByName = catchAsync(async (req, res, next) => {
//   let searchquery = req.body.searchquery;
//   console.log(searchquery);
//   if (searchquery) {
//     //console.log('this is username');
//     const data = await House.find({});
//     res.status(200).json({
//       status: 'success',
//       results: data.length,
//       data: data,
//     });
//   }
//   try {
//   } catch (error) {
//     //console.log(error);
//     res.status(404).json({
//       status: 'Property NOT FOUND',
//       // message: error,
//     });
//   }
// });

// exports.propertySearchByName = catchAsync(async (req, res, next) => {
//   let searchquery = req.body.searchquery;
//   // let str = searchquery;
//   // let substr = '@';
//   // console.log(str.includes(substr));
//   console.log(searchquery);

//   //const _id = searchquery;
//   //console.log('length' + _id.length);
//   try {
//     if (mongoose.Types.ObjectId.isValid(searchquery)) {
//       //console.log('this is id');
//       const house = await House.findById(searchquery);
//       // console.log(house.length);
//       res.status(200).json({
//         status: 'success',
//         results: house.length,
//         data: house,
//       });
//     }
//     // if (str.includes(substr)) {
//     //   //console.log('this is email');
//     //   const user = await House.findOne({ email: searchquery });
//     //   console.log(user);
//     //   res.status(200).json({
//     //     status: 'success',
//     //     results: user.length,
//     //     data: user,
//     //   });
//     // }
//     if (!mongoose.Types.ObjectId.isValid(searchquery)) {
//       // console.log('this is propertyname');
//       const house = await House.find({
//         $expr: {
//           $regexMatch: {
//             //input: { $concat: ['$firstname', ' ', '$lastname'] },
//             input: '$propertyDetails.propertyName',
//             regex: searchquery, //Your text search here
//             options: 'i',
//           },
//         },
//       });
//       if (house.length < 1) {
//         //console.log('hello');
//         res.status(404).json({
//           message: 'Property Not Found! Try another keyword',
//         });
//       } else {
//         res.status(200).json({
//           status: 'success',
//           results: house.length,
//           data: house,
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     // res.status(404).json({
//     //   status: 'Property NOT FOUND',
//     //   message: error,
//     // });
//   }
// });

exports.deleteOneProperty = catchAsync(async (req, res) => {
  console.log(req.params.id);

  propertyType = req.body.propertyType;
  console.log(propertyType);

  if (propertyType === 'House') {
    const deleteOne = await House.deleteOne({ _id: req.params.id });
    if (deleteOne.deletedCount === 0) {
      res.status(404).json({
        message: 'Property not found or Already Deleted!',
      });
    } else {
      res.status(200).json({
        status: 'success',
        result: 'Deleted Successfully',
        deleted: deleteOne.deletedCount,
      });
    }
  }
  if (propertyType === 'Hotel') {
    const deleteOne = await Hotel.deleteOne({ _id: req.params.id });
    if (deleteOne.deletedCount === 0) {
      res.status(404).json({
        message: 'Property not found or Already Deleted!',
      });
    } else {
      res.status(200).json({
        status: 'success',
        result: 'Deleted Successfully',
        deleted: deleteOne.deletedCount,
      });
    }
  }
  if (propertyType === 'Land') {
    const deleteOne = await Land.deleteOne({ _id: req.params.id });
    if (deleteOne.deletedCount === 0) {
      res.status(404).json({
        message: 'Property not found or Already Deleted!',
      });
    } else {
      res.status(200).json({
        status: 'success',
        result: 'Deleted Successfully',
        deleted: deleteOne.deletedCount,
      });
    }
  }
  if (propertyType === 'Warehouse') {
    const deleteOne = await Warehouse.deleteOne({
      _id: req.params.id,
    });
    if (deleteOne.deletedCount === 0) {
      res.status(404).json({
        message: 'Property not found or Already Deleted!',
      });
    } else {
      res.status(200).json({
        status: 'success',
        result: 'Deleted Successfully',
        deleted: deleteOne.deletedCount,
      });
    }
  }
});

/*Delete Many Property */
exports.deleteProperty = catchAsync(async (req, res) => {
  var ids = req.body.deleteuser;
  // console.log('id' + ids);
  propertyType = req.body.propertyType;
  // console.log(propertyType);

  if (propertyType === 'House') {
    const deletemany = await House.deleteMany({
      _id: { $in: ids },
    });
    if (deletemany.deletedCount === 0) {
      res.status(404).json({
        message: 'Property not found or Already Deleted!',
      });
    } else {
      res.status(200).json({
        status: 'success',
        result: 'Deleted Successfully',
        deleted: deletemany.deletedCount,
      });
    }
  }
  if (propertyType === 'Hotel') {
    const deletemany = await Hotel.deleteMany({
      _id: { $in: ids },
    });
    if (deletemany.deletedCount === 0) {
      res.status(404).json({
        message: 'Property not found or Already Deleted!',
      });
    } else {
      res.status(200).json({
        status: 'success',
        result: 'Deleted Successfully',
        deleted: deletemany.deletedCount,
      });
    }
  }
  if (propertyType === 'Land') {
    const deletemany = await Land.deleteMany({
      _id: { $in: ids },
    });
    if (deletemany.deletedCount === 0) {
      res.status(404).json({
        message: 'Property not found or Already Deleted!',
      });
    } else {
      res.status(200).json({
        status: 'success',
        result: 'Deleted Successfully',
        deleted: deletemany.deletedCount,
      });
    }
  }
  if (propertyType === 'Warehouse') {
    const deletemany = await Warehouse.deleteMany({
      _id: { $in: ids },
    });
    if (deletemany.deletedCount === 0) {
      res.status(404).json({
        message: 'Property not found or Already Deleted!',
      });
    } else {
      res.status(200).json({
        status: 'success',
        result: 'Deleted Successfully',
        deleted: deletemany.deletedCount,
      });
    }
  }
});
