const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const Email = require('./../models/emailModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  // Remove password from output
  user.password = undefined;
  //  user.imagepath = undefined;
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
  const emailsettings = await Email.findById({
    _id: '5f2e3d86d15a133adc74df50',
  });

  const token = signToken(newUser._id);

  let host = emailsettings.host;
  let user = emailsettings.username;
  let pass = emailsettings.password;
  //const verify = verifyUser();
  var transporter = nodemailer.createTransport({
    service: host,
    auth: {
      user: user,
      pass: pass,
    },
  });

  const url = `https://cuboidtechnologies.com/login/${token}`;

  var mailOptions = {
    from: `CUBOID <noreply@CUBOID.com>`,
    to: newUser.email,
    subject: 'Account Verification',
    html: `Please click this link to confirm you email: <a href="${url}">${url}</a>  <br>
    <p>click here to verify your email : <a href="${url}" target="_blank"><button style="background-color:rgb(72, 21, 192); color:aliceblue">Verify!</p>`,
  };
  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log('Error sending mail: ' + err);
    } else {
      console.log('Mail sent to: ' + newUser.email);
    }
  });

  createSendToken(newUser, 201, req, res);
});
exports.activateAccount = catchAsync(async (req, res, next) => {
  tokenparams = req.params.token;
  const token = tokenparams.toString();

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to continue', 200)
    );
  }
  //2. Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

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

  if (!user) {
    return next(
      new AppError('The user belonging to the token does no longer exist', 200)
    );
  }
  //4. check if user changed password after the JWT was issued
  if (user.isActive) {
    return next(
      new AppError('Account Already Verified! Please login again.', 200)
    );
  }
  return res.send({
    status: 'success',
    message: 'verified',
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 200));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 200));
  }
  if (user.isActive === false) {
    return next(
      new AppError(
        'email is not verified , Please verify your email to login',
        200
      )
    );
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

// for google and facebook signup
exports.extSignup = catchAsync(async (req, res, next) => {
  const { firstname, lastname, email, imagepath } = req.body;

  // 1) Check if email  exist
  if (!email) {
    return next(new AppError('Please provide email ', 200));
  }
  // if (!user) {
  //   return next(new AppError('Incorrect email', 401));
  // }

  const newUser = await User.create(req.body);

  const user = await User.findByIdAndUpdate(
    {
      _id: newUser._id,
    },
    {
      $set: {
        isActive: true,
      },
    }
  );

  const token = signToken(newUser._id);

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});
// firstname last,email.,image, email-required, check email exists? true, if false then register.

// for google and facebook login
exports.extLogin = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // 1) Check if email exist
  if (!email) {
    return next(new AppError('Please provide email ', 200));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('Incorrect email', 200));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

exports.SignupLogin = catchAsync(async (req, res, next) => {
  const { firstname, lastname, email, imagepath } = req.body;

  if (!email) {
    return next(new AppError('Please provide email ', 400));
  }
  const user = await User.findOne({ email });

  if (user) {
    createSendToken(user, 200, req, res);
  }

  if (!user) {
    const user = await User.create(req.body);
    const updateuser = await User.findByIdAndUpdate(
      {
        _id: user._id,
      },
      {
        $set: {
          isActive: true,
        },
      }
    );
    createSendToken(user, 200, req, res);
  }
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

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to continue', 401)
    );
  }
  // if (token == null) {
  //   return next(
  //     new AppError('You are not logged in! Please log in to continue', 401)
  //   );
  // }
  //2. Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

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

exports.checkSubscripionStatus = catchAsync(async (req, res, next) => {
  const checkSubscripion = await User.findById(req.user.id);
  if (!checkSubscripion.isSubscribed) {
    return next(
      new AppError(
        'You are not Subscribed, Please Subscribe to view Properties.',
        401
      )
    );
  }
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1. get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 200));
  }
  //2. generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false }); // this will disable all the validations in schema
  //3. send it to user's email

  const resetUrl = `https://cuboidtechnologies.com/reset-password/${resetToken}`;

  const message = `<p>We have recieved a request to have your password reset for <b>Cuboid</b>. If you did not make this request, please ignore this email.  <br> 
      <br> To reset your password, please <a href = "${resetUrl}"> <b>Visit this link</b> </a> </p> <hr>  
      <h3> <b>Having Trouble? </b> </h3> 
      <p>If the above link does not work try copying this link into your browser. </p> 
      <p>${resetUrl}</p>  <hr>
      <h3><b> Questions? <b> </h3>
      <p>Please let us know if there's anything we can help you with by replying to this email or by emailing <b>care@cuboidtechnologies.com</b></p>
      `;
  try {
    await sendEmail({
      email: user.email,
      subject: `Hi, ${user.firstname}, here's how to reset your password. (Valid for 10 mins)`,
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

    return next(
      new AppError(
        'There was an error sending the email. try again later!',
        200
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
    return next(new AppError('Token is invalid or has expired', 200));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //3. Update changedPasswordAt property for the user
  //4. log the user in, send JWT
  createSendToken(user, 201, req, res);
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
    return next(new AppError('Your current password is wrong.', 200));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, req, res);
});

exports.editUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.reVerificationEmail = catchAsync(async (req, res, next) => {
  const newUser = await User.findOne({ email: req.body.email });
  if (!newUser) {
    return next(new AppError('No user found with that email', 200));
  }

  const emailsettings = await Email.findById({
    _id: '5f2e3d86d15a133adc74df50',
  });

  const token = signToken(newUser._id);

  let host = emailsettings.host;
  let user = emailsettings.username;
  let pass = emailsettings.password;

  var transporter = nodemailer.createTransport({
    service: host,
    auth: {
      user: user,
      pass: pass,
    },
  });

  const url = `https://cuboidtechnologies.com/login/${token}`;

  var mailOptions = {
    from: `CUBOID <noreply@CUBOID.com>`,
    to: newUser.email,
    subject: 'Account Verification',
    html: `Please click this link to confirm you email: <a href="${url}">${url}</a>  <br>
    <p>click here to verify your email : <a href="${url}" target="_blank"><button style="background-color:rgb(72, 21, 192); color:aliceblue">Verify!</p>`,
  };
  transporter.sendMail(mailOptions, function (err) {
    if (err) {
      console.log('ERRor sending mail: ' + err);
    } else {
      console.log('Mail sent to: ' + newUser.email);
    }
  });

  createSendToken(newUser, 201, req, res);
});
