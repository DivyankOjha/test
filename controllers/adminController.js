const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const mongoose = require('mongoose');

//pagination done
exports.getAllUsers = catchAsync(async (req, res) => {
  // const limit = parseInt(req.query.limit);
  //const skip = parseInt(req.query.skip);

  const users = await User.aggregate([
    { $match: { role: 'user' } },
    { $sort: { _id: -1 } },
    // { $skip: skip },
    // { $limit: limit },
  ]);

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

exports.ActiveInactive = catchAsync(async (req, res, next) => {
  const _id = req.params.id;
  const user = await User.findById({ _id });

  if (user.isActive) {
    const currentuser = await User.findByIdAndUpdate(user._id, {
      $set: { isActive: false },
    });
  }
  if (!user.isActive) {
    const currentuser = await User.findByIdAndUpdate(user._id, {
      $set: { isActive: true },
    });
  }
  res.status(200).json({
    status: 'success',
  });
});

exports.getnewUsers = catchAsync(async (req, res) => {
  let date = new Date();

  const users = await User.aggregate([
    {
      $match: {
        role: 'user',
      },
    },
    { $sort: { _id: -1 } },
  ]).limit(10);

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

exports.filterbydate = catchAsync(async (req, res) => {
  let { startDate, endDate } = req.body;
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);

  const users = await User.find({
    createdAt: { $gte: startDate, $lte: endDate + 'T' + '23:59:59' },
    role: 'user',
  }).sort({ _id: -1 });

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

exports.searchUser = catchAsync(async (req, res, next) => {
  let searchquery = req.body.searchquery;
  let str = searchquery;
  let substr = '@';

  try {
    if (mongoose.Types.ObjectId.isValid(searchquery)) {
      const user = await User.findOne({ _id: searchquery, role: 'user' });

      res.status(200).json({
        status: 'success',
        results: user.length,
        data: user,
      });
    }
    if (str.includes(substr)) {
      const user = await User.findOne({ email: searchquery, role: 'user' });

      res.status(200).json({
        status: 'success',
        results: user.length,
        data: user,
      });
    }
    if (searchquery) {
      const user = await User.find({
        $expr: {
          $regexMatch: {
            input: { $concat: ['$firstname', ' ', '$lastname'] },
            regex: searchquery,
            options: 'i',
          },
        },
        role: 'user',
      });

      res.status(200).json({
        status: 'success',
        results: user.length,
        data: user,
      });
    }
  } catch (error) {
    res.status(200).json({
      status: 'USER NOT FOUND',
    });
  }
});

exports.deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete({ _id: req.params.id });
  res.status(200).json({
    status: 'success',
    result: 'Deleted Successfully',
  });
});

exports.deleteManyUsers = catchAsync(async (req, res) => {
  var ids = req.body.deleteuser;

  const deletemany = await User.deleteMany({
    _id: { $in: ids },
  });

  res.status(200).json({
    status: 'success',
    result: 'Deleted Successfully',
    deletemany,
  });
});
