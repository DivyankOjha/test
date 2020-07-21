const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

exports.filterbydate = catchAsync(async (req, res) => {
  let { startDate, endDate } = req.body;
  //console.log(endDate + 'T' + '00:00:00');
  const users = await User.find({
    createdAt: { $gte: startDate, $lte: endDate + 'T' + '23:59:59' },
    // createdAt: { $lt: endDate },
  });
  // console.log('users: ' + users);

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});
//name, email, mobile number, or user ID
exports.searchUser = catchAsync(async (req, res) => {
  let { firstname, email, mobilenumber, _id } = req.body;
  //console.log(endDate + 'T' + '00:00:00');

  if (firstname) {
    const user = await User.findOne({ firstname });
    console.log('user: ' + user);

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } else if (email) {
    const user = await User.findOne({ email });
    console.log('user: ' + user);
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } else if (mobilenumber) {
    const user = await User.findOne({ mobilenumber });
    console.log('user: ' + user);
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } else if (_id) {
    const user = await User.findOne({ _id });
    console.log('user: ' + user);
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } else {
    res.status(404).json({
      status: 'Failed',
      message: 'Not Found',
    });
  }

  //const user = await User.findOne({ _id, firstname });
  //console.log('user: ' + user);

  // res.status(200).json({
  //   status: 'success',
  //   data: user,
  // });
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
