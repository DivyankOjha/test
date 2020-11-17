const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');

exports.postReview = catchAsync(async (req, res, next) => {
  const postReview = await Review.create(req.body);

  const finduser = await User.findById({ _id: postReview.userId });

  str1 = finduser.firstname;
  str2 = finduser.lastname;
  const newString = str1.concat(' ', str2);

  const updateReview = await Review.updateOne(
    { _id: postReview._id },
    {
      $set: { name: newString },
    }
  );

  res.status(200).json({
    status: 'Success',
    review: postReview,
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const postReview = await Review.find().sort({ _id: -1 }); //.skip(skip).limit(limit);
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

  if (review.isActive) {
    const review = await Review.findByIdAndUpdate(_id, {
      $set: { isActive: false },
    });
  }
  if (!review.isActive) {
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
