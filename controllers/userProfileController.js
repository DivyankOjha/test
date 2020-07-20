const catchAsync = require('./../utils/catchAsync');
const User = require('../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

exports.getuser = catchAsync(async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to continue', 401)
    );
  }
  //console.log('token : ' + token);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //console.log(decoded);
  //3. check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError('The user belonging to the token does no longer exist', 401)
    );
  }
  // 4. check if user changed password after the JWT was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please login again.', 401)
    );
  }
  const user = {
    firstname: currentUser.firstname,
    lastname: currentUser.lastname,
    email: currentUser.email,
    mobilenumber: currentUser.mobilenumber,
    imagepath: currentUser.imagepath,
  };
  //console.log(data);
  //user = currentUser;
  //console.log(user);

  //const user = await User.find();

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
