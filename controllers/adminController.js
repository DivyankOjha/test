const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/userModel');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users,
  });
});

exports.getnewUsers = catchAsync(async (req, res) => {
  //let { startDate, endDate } = req.body;
  //console.log(endDate + 'T' + '00:00:00');
  let date = new Date();
  //date = Time;
  console.log(date);
  const users = await User.find({
    createdAt: { $lte: date },

    // createdAt: { $lt: endDate },
  })
    .sort({ createdAt: -1 })
    .limit(10);
  // console.log('users: ' + users);

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
  let searchquery = req.body.searchquery;
  console.log(searchquery);

  const firstname = searchquery;
  const email = searchquery;
  const mobilenumber = searchquery;
  const _id = searchquery;
  console.log(firstname, email, mobilenumber, _id);

  //console.log(firstname, email, mobilenumber, _id);
  try {
    const user = await User.findOne({
      firstname: `${firstname}`,
      email: `${email}`,
    });
    //console.log(user);
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    console.log('Error: ' + err);
  }

  // let { firstname, email, mobilenumber, _id } = req.body;
  // //console.log(endDate + 'T' + '00:00:00');
  // try {
  //   if (firstname) {
  //     const user = await User.findOne({ firstname });
  //     if (user === null) {
  //       console.log('username not found');
  //       res.status(404).json({
  //         status: 'failed',
  //         message: 'username Not Found',
  //       });
  //     } else {
  //       res.status(200).json({
  //         status: 'success',
  //         data: user,
  //       });
  //     }
  //     // console.log('user: ' + user);
  //   }
  //   if (email) {
  //     const user = await User.findOne({ email });
  //     if (user === null) {
  //       console.log('email not found');
  //       res.status(404).json({
  //         status: 'failed',
  //         message: 'email Not Found',
  //       });
  //     } else {
  //       res.status(200).json({
  //         status: 'success',
  //         data: user,
  //       });
  //     }
  //     // console.log('user: ' + user);
  //   }
  //   if (mobilenumber) {
  //     const user = await User.findOne({ mobilenumber });
  //     if (user === null) {
  //       console.log('mobilenumber not found');
  //       res.status(404).json({
  //         status: 'failed',
  //         message: 'mobilenumber Not Found',
  //       });
  //     } else {
  //       res.status(200).json({
  //         status: 'success',
  //         data: user,
  //       });
  //     }
  //     // console.log('user: ' + user);
  //   }
  //   if (_id) {
  //     const user = await User.findOne({ _id });
  //     if (user === null) {
  //       console.log('_id not found');
  //       res.status(404).json({
  //         status: 'failed',
  //         message: '_id Not Found',
  //       });
  //     } else {
  //       res.status(200).json({
  //         status: 'success',
  //         data: user,
  //       });
  //     }
  //     // console.log('user: ' + user);
  //   }
  // if (email) {
  //   const user = await User.findOne({ email });
  //   console.log('user: ' + user);
  //   res.status(200).json({
  //     status: 'success',
  //     data: user,
  //   });
  // }
  // if (mobilenumber) {
  //   const user = await User.findOne({ mobilenumber });
  //   console.log('user: ' + user);
  //   res.status(200).json({
  //     status: 'success',
  //     data: user,
  //   });
  // }
  // if (_id) {
  //   const user = await User.findOne({ _id });
  //   console.log('user: ' + user);
  //   res.status(200).json({
  //     status: 'success',
  //     data: user,
  //   });
  // }
  // if (!firstname && !email && !mobilenumber && !_id) {
  //   console.log('not found');
  //   res.status(404).json({
  //     status: 'Failed',
  //     message: 'Not Found',
  //   });
  // }
  // } catch (err) {
  //   console.log('Error: ' + err);
  // }

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
