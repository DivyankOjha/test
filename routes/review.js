const express = require('express');

const router = express.Router();
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

router.post(
  '/post-review',
  // authController.protect,
  reviewController.postReview
); //authController.protect,

router.get(
  '/admin/get-all-review',
  authController.protect,
  authController.restrictTo('admin'),
  reviewController.getReview
);

router.post(
  '/admin/get-review-by-rating',
  authController.protect,
  authController.restrictTo('admin'),
  reviewController.getReviewByRating
);

router.delete(
  '/admin/delete-review-by-id',
  authController.protect,
  authController.restrictTo('admin'),
  reviewController.deleteReview
);

router.patch(
  '/admin/update-review-status/:id',
  authController.protect,
  authController.restrictTo('admin'),
  reviewController.reviewIsactiveInactive
);
router.post(
  '/admin/get-reviews-by-property-id',
  authController.protect,
  authController.restrictTo('admin'),
  reviewController.getSpecificReviews
);
module.exports = router;
