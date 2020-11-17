const catchAsync = require('../../utils/catchAsync');
const mongoose = require('mongoose');

const House = require('../../models/houseModel');
const Land = require('../../models/landModel');
const Hotel = require('../../models/hotelModel');
const Warehouse = require('../../models/warehouseModel');

//including isFlipbook
exports.getdata = catchAsync(async (req, res, next) => {
  let PropertyNames = [];
  let housedata = await House.find();

  for (var i in housedata) {
    if (!housedata[i].isFlipbook) {
      let data = [];
      val1 = housedata[i].propertyDetails.propertyName;
      data.push(val1);
      val2 = housedata[i].categoryType;
      data.push(val2);
      val3 = housedata[i]._id;
      data.push(val3);
      PropertyNames.push(data);
    }
  }

  const land = await Land.find();
  console.log(land[0].isFlipbook);
  for (var i in land) {
    if (!land[i].isFlipbook) {
      let data1 = [];
      val1 = land[i].propertyDetails.propertyName;
      data1.push(val1);
      val2 = land[i].categoryType;
      data1.push(val2);
      val3 = land[i]._id;
      data1.push(val3);
      PropertyNames.push(data1);
    }
  }

  const hotel = await Hotel.find();
  for (var i in hotel) {
    if (!hotel[i].isFlipbook) {
      let data2 = [];
      val1 = hotel[i].propertyDetails.propertyName;
      data2.push(val1);
      val2 = hotel[i].categoryType;
      data2.push(val2);
      val3 = hotel[i]._id;
      data2.push(val3);
      console.log(data2);
      PropertyNames.push(data2);
    }
  }

  const warehouse = await Warehouse.find();
  for (var i in warehouse) {
    if (!warehouse[i].isFlipbook) {
      let data3 = [];
      val1 = warehouse[i].propertyDetails.propertyName;
      data3.push(val1);
      val2 = warehouse[i].categoryType;
      data3.push(val2);
      val3 = warehouse[i]._id;
      data3.push(val3);
      PropertyNames.push(data3);
    }
  }

  let sortedName = [];
  sortedName = PropertyNames.sort();

  res.status(200).json({
    status: 'success',
    results: sortedName.length,
    sortedName,
  });
});

//Excluding isFlipbook
exports.getdataEx = catchAsync(async (req, res, next) => {
  let PropertyNames = [];
  let housedata = await House.find();

  for (var i in housedata) {
    let data = [];
    val1 = housedata[i].propertyDetails.propertyName;
    data.push(val1);
    val2 = housedata[i].categoryType;
    data.push(val2);
    val3 = housedata[i]._id;
    data.push(val3);
    PropertyNames.push(data);
  }

  const land = await Land.find();
  console.log(land[0].isFlipbook);
  for (var i in land) {
    let data1 = [];
    val1 = land[i].propertyDetails.propertyName;
    data1.push(val1);
    val2 = land[i].categoryType;
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
    val2 = hotel[i].categoryType;
    data2.push(val2);
    val3 = hotel[i]._id;
    data2.push(val3);

    PropertyNames.push(data2);
  }

  const warehouse = await Warehouse.find();
  for (var i in warehouse) {
    let data3 = [];
    val1 = warehouse[i].propertyDetails.propertyName;
    data3.push(val1);
    val2 = warehouse[i].categoryType;
    data3.push(val2);
    val3 = warehouse[i]._id;
    data3.push(val3);
    PropertyNames.push(data3);
  }

  let sortedName = [];
  sortedName = PropertyNames.sort();

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

  if (property) {
    if (property.isStatus) {
      const currentProperty = await House.findByIdAndUpdate(property._id, {
        $set: { isStatus: false },
      });
      res.status(200).json({
        status: 'success',
      });
    }
    if (!property.isStatus) {
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
      const currentProperty = await Land.findByIdAndUpdate(land._id, {
        $set: { isStatus: false },
      });
      res.status(200).json({
        status: 'success',
      });
    }
    if (!land.isStatus) {
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
      const currentProperty = await Hotel.findByIdAndUpdate(hotel._id, {
        $set: { isStatus: false },
      });
      res.status(200).json({
        status: 'success',
      });
    }
    if (!hotel.isStatus) {
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
      const currentProperty = await Warehouse.findByIdAndUpdate(warehouse._id, {
        $set: { isStatus: false },
      });
      res.status(200).json({
        status: 'success',
      });
    }
    if (!warehouse.isStatus) {
      const currentProperty = await Warehouse.findByIdAndUpdate(warehouse._id, {
        $set: { isStatus: true },
      });
      res.status(200).json({
        status: 'success',
      });
    }
  }
});

exports.getPropertyInNeighbourhood = catchAsync(async (req, res, next) => {
  const _id = req.params.id;
  const house = await House.findById({ _id });
  const land = await Land.findById({ _id });
  const hotel = await Hotel.findById({ _id });
  const warehouse = await Warehouse.findById({ _id });

  let property = [];
  if (house) {
    let placename = house.sellerDetails.nearestplace.placename;

    const findinHouse = await House.find({
      $expr: {
        $regexMatch: {
          input: '$sellerDetails.nearestplace.placename',
          regex: placename,
          options: 'm',
        },
      },
    });

    for (var i in findinHouse) {
      property.push(findinHouse[i]._id);
    }
    const findinland = await Land.find({
      $expr: {
        $regexMatch: {
          input: '$sellerDetails.nearestplace.placename',
          regex: placename,
          options: 'm',
        },
      },
    });

    for (var i in findinland) {
      property.push(findinland[i]._id);
    }
    const findinHotel = await Hotel.find({
      $expr: {
        $regexMatch: {
          input: '$sellerDetails.nearestplace.placename',
          regex: placename,
          options: 'm',
        },
      },
    });

    for (var i in findinHotel) {
      property.push(findinHotel[i]._id);
    }
    const findinWarehouse = await Warehouse.find({
      $expr: {
        $regexMatch: {
          input: '$sellerDetails.nearestplace.placename',
          regex: placename,
          options: 'm',
        },
      },
    });

    for (var i in findinWarehouse) {
      property.push(findinWarehouse[i]._id);
    }
    res.status(200).json({
      status: 'success',
      results: property.length,
      property,
    });
  }

  if (land) {
    let placename = house.sellerDetails.nearestplace.placename;

    const findinHouse = await House.find({
      $expr: {
        $regexMatch: {
          input: '$sellerDetails.nearestplace.placename',
          regex: placename,
          options: 'm',
        },
      },
    });

    for (var i in findinHouse) {
      property.push(findinHouse[i]._id);
    }
    const findinland = await Land.find({
      $expr: {
        $regexMatch: {
          input: '$sellerDetails.nearestplace.placename',
          regex: placename,
          options: 'm',
        },
      },
    });

    for (var i in findinland) {
      property.push(findinland[i]._id);
    }
    const findinHotel = await Hotel.find({
      $expr: {
        $regexMatch: {
          input: '$sellerDetails.nearestplace.placename',
          regex: placename,
          options: 'm',
        },
      },
    });

    for (var i in findinHotel) {
      property.push(findinHotel[i]._id);
    }
    const findinWarehouse = await Warehouse.find({
      $expr: {
        $regexMatch: {
          input: '$sellerDetails.nearestplace.placename',
          regex: placename,
          options: 'm',
        },
      },
    });

    for (var i in findinWarehouse) {
      console.log(findinWarehouse[i]._id);
      property.push(findinWarehouse[i]._id);
    }
    res.status(200).json({
      status: 'success',
      results: property.length,
      property,
    });
  }
  if (hotel) {
    let placename = house.sellerDetails.nearestplace.placename;

    const findinHouse = await House.find({
      $expr: {
        $regexMatch: {
          input: '$sellerDetails.nearestplace.placename',
          regex: placename,
          options: 'm',
        },
      },
    });

    for (var i in findinHouse) {
      property.push(findinHouse[i]._id);
    }
    const findinland = await Land.find({
      $expr: {
        $regexMatch: {
          input: '$sellerDetails.nearestplace.placename',
          regex: placename,
          options: 'm',
        },
      },
    });

    for (var i in findinland) {
      property.push(findinland[i]._id);
    }
    const findinHotel = await Hotel.find({
      $expr: {
        $regexMatch: {
          input: '$sellerDetails.nearestplace.placename',
          regex: placename,
          options: 'm',
        },
      },
    });

    for (var i in findinHotel) {
      property.push(findinHotel[i]._id);
    }
    const findinWarehouse = await Warehouse.find({
      $expr: {
        $regexMatch: {
          input: '$sellerDetails.nearestplace.placename',
          regex: placename,
          options: 'm',
        },
      },
    });

    for (var i in findinWarehouse) {
      console.log(findinWarehouse[i]._id);
      property.push(findinWarehouse[i]._id);
    }
    res.status(200).json({
      status: 'success',
      results: property.length,
      property,
    });
  }
  if (warehouse) {
    let placename = house.sellerDetails.nearestplace.placename;

    const findinHouse = await House.find({
      $expr: {
        $regexMatch: {
          input: '$sellerDetails.nearestplace.placename',
          regex: placename,
          options: 'm',
        },
      },
    });

    for (var i in findinHouse) {
     
      property.push(findinHouse[i]._id);
    }
    const findinland = await Land.find({
      $expr: {
        $regexMatch: {
          input: '$sellerDetails.nearestplace.placename',
          regex: placename, 
          options: 'm',
        },
      },
    });

   
    for (var i in findinland) {
    
      property.push(findinland[i]._id);
    }
    const findinHotel = await Hotel.find({
      $expr: {
        $regexMatch: {
          input: '$sellerDetails.nearestplace.placename',
          regex: placename, 
          options: 'm',
        },
      },
    });

   
    for (var i in findinHotel) {
    
      property.push(findinHotel[i]._id);
    }
    const findinWarehouse = await Warehouse.find({
      $expr: {
        $regexMatch: {
          input: '$sellerDetails.nearestplace.placename',
          regex: placename, 
          options: 'm',
        },
      },
    });

 
    for (var i in findinWarehouse) {
    
      property.push(findinWarehouse[i]._id);
    }
    res.status(200).json({
      status: 'success',
      results: property.length,
      property,
    });
  }
});

exports.deleteOneProperty = catchAsync(async (req, res) => {


  propertyType = req.body.propertyType;


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

exports.deleteProperty = catchAsync(async (req, res) => {
  var ids = req.body.deleteuser;

  propertyType = req.body.propertyType;


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
