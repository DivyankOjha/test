const express = require('express');

const router = express.Router();
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

router.post(
  '/post-review', //authController.protect,
  reviewController.postReview
); //authController.protect,

router.get('/admin/get-all-review', reviewController.getReview);
router.delete('/admin/delete-review-by-id/:id', reviewController.deleteReview);

router.patch(
  '/admin/update-review-status/:id',
  reviewController.reviewIsactiveInactive
);

module.exports = router;
