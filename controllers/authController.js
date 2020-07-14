const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const { db } = require('./../models/userModel');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  //converting to miliseconds  90 days *24 hrs *60 min * 60 sec *1000 ms
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    //secure: true,
    httpOnly: true, // cookie can not be accessed or modify by the browser , prevent cross site attacks
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  //remove the password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, res);
  // const newUser = await User.create({
  //   //User.save
  //   name: req.body.name,
  //   email: req.body.email,
  //   mobilenumber: req.body.mobilenumber,
  //   address: req.body.address,
  //   zipcode: req.body.zipcode,
  //   password: req.body.password,
  //   passwordConfirm: req.body.password,
  //   passwordChangedAt: req.body.passwordChangedAt,
  // });

  const token = signToken(newUser._id);

  //const verify = verifyUser();
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'diviojha6@gmail.com',
      pass: 'WELCOME@18',
    },
  });
  const url = `http://localhost:3002/api/users/confirmation/${token}`;
  var mailOptions = {
    from: 'Rahul Dhingra <rahul.dhingra@digimonk.in>',
    to: newUser.email,
    subject: 'Account Verification Token',
    html: `Please click this link to confirm you email: <a href="${url}">${url}</a>`,
    // text:
    //   'Hello,\n\n' +
    //   'Please verify your account by clicking the link: \nhttp://' +
    //   req.headers.host +
    //   '/confirmation/' +
    //   token +
    //   '.\n',
  };
  await transporter.sendMail(mailOptions, function (err) {
    if (err) {
      return res.status(500).send({ msg: err.message });
    }
    //res
    // .status(200)
    //  .send('A verification email has been sent to ' + user.email + '.');
  });

  // res.status(201).json({
  //   status: 'success',
  //   token,
  //   data: {
  //     user: newUser,
  //   },
  // });
});
exports.activateAccount = catchAsync(async (req, res, next) => {
  //1. getting token and check if its there/exists

  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith('Bearer')
  // ) {
  //   token = req.headers.authorization.split(' ')[1];
  // }
  tokenparams = req.params.token;
  const token = tokenparams.toString();

  console.log('token :  ' + token);

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to continue', 401)
    );
  }
  //2. Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);
  //3. check if user still exists

  const user = await User.findByIdAndUpdate(
    {
      _id: decoded.id,
    },
    {
      $set: {
        isActive: true,
      },
    }
  );

  console.log(user);

  if (!user) {
    return next(
      new AppError('The user belonging to the token does no longer exist', 401)
    );
  }
  //4. check if user changed password after the JWT was issued
  if (user.isActive) {
    return next(
      new AppError('Account Already Verified! Please login again.', 401)
    );
  }
  return res.send({
    message: 'verified',
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //checking email pass exists?
  if (!email || !password) {
    return next(new AppError('Please provie email and password!', 400));
  }
  //user exists??
  const user = await User.findOne({ email }).select('+password');
  if (!user.isActive) {
    //throw new Error('Please confirm your email to login');
    return next(new AppError('Please confirm your email to login'));
  }

  //console.log(user);
  //pass correct??
  // const correct = await user.correctPassword(password, user.password);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //everything is ok, send token
  const token = signToken(user._id);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  //console.log(decoded);
  res.status(200).json({
    status: 'success',
    token,
    id: currentUser._id,
    name: currentUser.name,
    email: currentUser.email,
    mobilenumber: currentUser.mobilenumber,
  });
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  //1. getting token and check if its there/exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  //console.log(token);

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to continue', 401)
    );
  }
  //2. Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //console.log(decoded);
  //3. check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to the token does no longer exist', 401)
    );
  }
  //4. check if user changed password after the JWT was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please login again.', 401)
    );
  }
  req.user = currentUser;
  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1. get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }
  //2. generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false }); // this will disable all the validations in schema
  //3. send it to user's email
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/users/resetPassword/${resetToken}`;

  const message = `forgot your password? Submit a PATCH request with you new password and passwordconfirm to: ${resetUrl}.\nIf you didn't forget your password, Please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(err);

    return next(
      new AppError(
        'There was an error sending the email. try again later!',
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //1. get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //2. if token has not expired , and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //3. Update changedPasswordAt property for the user
  //4. log the user in, send JWT
  createSendToken(user, 201, res);
  // const token = signToken(user._id);

  // res.status(200).json({
  //   status: 'success',
  //   token,
  // });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});

//user.isActive = true;
//await user.save();
// currentUser.save(function (err) {
//   if (err) {
//     return res.status(500).send({ message: 'some error occured' });
//   }
//   res.status(200).send('The account has been verified. Please log in.');
// });
// console.log(currentUser._id);
// req.user = user;
// console.log(req.user);
// next();

// if (token) {
//   jwt.verify(token, process.env.JWT_SECRET, function (err, decodedToken) {
//     if (err) {
//       return res.status(400).json({ error: 'Incorrect or Expired Link' });
//     }
//     const _id = decodedToken;
//     const user = User.findOne({ email: req.body.email }, (error, user) => {
//       if (!user) {
//         return res
//           .status(400)
//           .json({ error: 'User with this mail already exists' });
//       }
//       console.log('Hello');
//       user.isActive = true;
//       user.save(function (err) {
//         if (err) {
//           return res.status(500).send({ msg: err.message });
//         }
//         res.status(200).send('The account has been verified. Please log in.');
//       });
//     });
//   });
// }

//Check for validation errors

// exports.verifyUser = catchAsync(async (req, res, next) => {
//   console.log('SEnding Email');
//   const verifyToken = 'adsd';
//   const user = await User.findOne({ email: req.body.email });

//   const verify = `${req.protocol}://${req.get(
//     host
//   )}/api/users/confirmation/${verifyToken}`;

//   const message = `Please ${verify} your email before login`;

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: 'Email Verification',
//       message,
//     });
//     res.status(200).json({
//       status: 'success',
//       message: 'Token sent to email',
//     });
//   } catch (err) {
//     return next(new AppError('Error sending an email'));
//   }
// });
