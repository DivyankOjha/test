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
  // console.log(user);
  // console.log(user._id);
  if (user.isActive) {
    //console.log('hello');
    const currentuser = await User.findByIdAndUpdate(user._id, {
      $set: { isActive: false },
    });
  }
  if (!user.isActive) {
    //console.log('hello');
    const currentuser = await User.findByIdAndUpdate(user._id, {
      $set: { isActive: true },
    });
  }
  res.status(200).json({
    status: 'success',
  });
});

exports.getnewUsers = catchAsync(async (req, res) => {
  //let { startDate, endDate } = req.body;
  //console.log(endDate + 'T' + '00:00:00');
  let date = new Date();
  //date = Time;
  console.log(date);
  const users = await User.aggregate([
    {
      $match: {
        role: 'user',
      },
    },
    { $sort: { _id: -1 } },
    // createdAt: { $lte: date },
    // createdAt: { $lt: endDate },
  ]).limit(10);

  //.sort({ createdAt: -1 })
  //  .limit(10);
  // const users = await User.find({
  //   // createdAt: { $lte: date },
  //   // createdAt: { $lt: endDate },
  // })
  //   .project({ role: 'user' })
  //   .sort({ createdAt: -1 })
  //   .limit(10);
  // console.log('users: ' + users);

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

  //console.log(endDate + 'T' + '00:00:00');
  const users = await User.find({
    createdAt: { $gte: startDate, $lte: endDate + 'T' + '23:59:59' },
    role: 'user',
    // createdAt: { $lt: endDate },
  }).sort({ _id: -1 });
  //.skip(skip)
  //  .limit(limit);
  // console.log('users: ' + users);

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

//name, email, mobile number, or user ID
exports.searchUser = catchAsync(async (req, res, next) => {
  let searchquery = req.body.searchquery;
  let str = searchquery;
  let substr = '@';
  // console.log(str.includes(substr));
  // console.log(searchquery);

  //const _id = searchquery;
  //console.log('length' + _id.length);
  try {
    if (mongoose.Types.ObjectId.isValid(searchquery)) {
      //console.log('this is id');
      const user = await User.findOne({ _id: searchquery, role: 'user' });
      //  console.log(user);
      res.status(200).json({
        status: 'success',
        results: user.length,
        data: user,
      });
    }
    if (str.includes(substr)) {
      //console.log('this is email');
      const user = await User.findOne({ email: searchquery, role: 'user' });
      console.log(user);
      res.status(200).json({
        status: 'success',
        results: user.length,
        data: user,
      });
    }
    if (searchquery) {
      //console.log('this is username');
      const user = await User.find({
        $expr: {
          $regexMatch: {
            input: { $concat: ['$firstname', ' ', '$lastname'] },
            regex: searchquery, //Your text search here
            options: 'i',
          },
        },
        role: 'user',
      });
      // console.log(user[0].role);
      res.status(200).json({
        status: 'success',
        results: user.length,
        data: user,
      });
    }
  } catch (error) {
    //console.log(error);
    res.status(200).json({
      status: 'USER NOT FOUND',
      // message: error,
    });
  }
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.deleteUser = catchAsync(async (req, res) => {
  console.log(req.params.id);

  await User.findByIdAndDelete({ _id: req.params.id });
  res.status(200).json({
    status: 'success',
    result: 'Deleted Successfully',
  });
});

exports.deleteManyUsers = catchAsync(async (req, res) => {
  // console.log(req.body);
  var ids = req.body.deleteuser;
  console.log(ids);

  const deletemany = await User.deleteMany({
    _id: { $in: ids },
  });

  res.status(200).json({
    status: 'success',
    result: 'Deleted Successfully',
    deletemany,
  });
});
