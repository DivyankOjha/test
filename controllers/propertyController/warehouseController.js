const catchAsync = require('../../utils/catchAsync');

const WareHouse = require('../../models/warehouseModel');

exports.addWarehouse = catchAsync(async (req, res, next) => {
  const warehouse = await WareHouse.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      warehouse: warehouse,
    },
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
