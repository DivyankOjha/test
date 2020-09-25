const express = require('express');

const router = express.Router();
const flipbookController = require('./../controllers/flipbookController');
const authController = require('../controllers/authController');
router.post(
  '/',
  authController.protect,
  authController.restrictTo('admin'),
  flipbookController.addFlipbook
);
//router.get('/', flipbookController.getFlipbook);

router.patch(
  '/delete-flipbook/:id',
  authController.protect,
  authController.restrictTo('admin'),
  flipbookController.deleteFlipbook
);

router.get(
  '/get-saved-flipbook/:id',
  authController.protect,
  flipbookController.getFlipbookSavedByUser
);

router.get(
  '/get-flipbook-by-id/:id',
  authController.protect,
  flipbookController.getFlipbookbyID
);

router.patch(
  '/delete-flipbook/:id',
  authController.protect,
  flipbookController.deleteFlipbook
);

module.exports = router;
