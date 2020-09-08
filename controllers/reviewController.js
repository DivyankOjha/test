const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');

exports.postReview = catchAsync(async (req, res, next) => {
  const postReview = await Review.create(req.body);
  res.status(200).json({
    status: 'Success',
    review: postReview,
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  const postReview = await Review.find().skip(skip).limit(limit);
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

exports.deleteReview = catchAsync(async (req, res, next) => {
  const postReview = await Review.deleteOne({ _id: req.params.id });
  res.status(200).json({
    status: 'Success',
    //postReview,
  });
});
