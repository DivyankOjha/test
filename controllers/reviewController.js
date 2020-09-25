const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');
const { update } = require('../models/userModel');

exports.postReview = catchAsync(async (req, res, next) => {
  const postReview = await Review.create(req.body);

  const finduser = await User.findById({ _id: postReview.userId });
  // console.log(finduser.firstname);
  // console.log(finduser.lastname);
  str1 = finduser.firstname;
  str2 = finduser.lastname;
  const newString = str1.concat(' ', str2);
  //console.log(newString);

  const updateReview = await Review.updateOne(
    { _id: postReview._id },
    {
      $set: { name: newString },
    }
  );
  //console.log(finduser);

  //console.log(updateReview);
  res.status(200).json({
    status: 'Success',
    review: postReview,
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const postReview = await Review.find(); //.skip(skip).limit(limit);
  res.status(200).json({
    status: 'Success',
    results: postReview.length,
    review: postReview,
  });
});

exports.getReviewByRating = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const postReview = await Review.find({ rating: { $eq: req.body.rating } }); //.skip(skip).limit(limit);
  res.status(200).json({
    status: 'Success',
    results: postReview.length,
    review: postReview,
  });
});

exports.reviewIsactiveInactive = catchAsync(async (req, res, next) => {
  const _id = req.params.id;
  const review = await Review.findById({ _id });
  // console.log(user);
  // console.log(user._id);
  if (review.isActive) {
    //console.log('hello');
    const review = await Review.findByIdAndUpdate(_id, {
      $set: { isActive: false },
    });
  }
  if (!review.isActive) {
    //console.log('hello');
    const review = await Review.findByIdAndUpdate(_id, {
      $set: { isActive: true },
    });
  }
  res.status(200).json({
    status: 'success',
  });
});

exports.deleteReview = catchAsync(async (req, res) => {
  var ids = req.body.deletereview;
  // console.log('id' + ids);

  const deletemany = await Review.deleteMany({
    _id: { $in: ids },
  });
  if (deletemany.deletedCount === 0) {
    res.status(200).json({
      message: 'Review not found or Already Deleted! Please refresh!',
    });
  } else {
    res.status(200).json({
      status: 'success',
      message: 'Deleted Successfully',
      deleted: deletemany.deletedCount,
    });
  }
});

exports.getSpecificReviews = catchAsync(async (req, res, next) => {
  const getReviews = await Review.find({
    propertyID: req.body.propertyID,
    isActive: true,
  });
  res.status(200).json({
    status: 'Success',
    results: getReviews.length,
    getReviews,
  });
});
