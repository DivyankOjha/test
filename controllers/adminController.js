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
  ]);

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
// else if (searchquery === 23) {

//console.log(firstname, email, mobilenumber, _id);

//console.log(firstname, email, mobilenumber, _id);

// const user = await User.find({
//   $expr: {
//     $regexMatch: {
//       input: { $concat: ['$firstname', ' ', '$lastname'] },
//       regex: searchquery, //Your text search here
//       options: 'i',
//     },
//   },
// });
//pipeline array
//   {
//     $project: {
//       name: { $concat: ['$firstname', ' ', '$lastname'] },
//     },
//     // $project: { email },
//   }, //stage1
//   { $match: { name: { $regex: searchquery, $options: 'i' } } }, //stage2
// ]);
// {
//   $or: {
//     firstname: { $regex: firstname, $options: 'i' },
//     lastname: { $regex: lastname, $options: 'i' },
//   },
// }

// {
//   $match: { firstname: firstname },
// },

// console.log(user);
// res.status(200).json({
//   status: 'success',
//   results: user.length,
//   data: user,
// });

// try {
//   const user = await User.find({ searchquery });
//   //console.log(user);
//   res.status(200).json({
//     status: 'success',
//     data: user,
//   });
// } catch (err) {
//   console.log('Error: ' + err);
// }

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
