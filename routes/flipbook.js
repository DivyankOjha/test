const express = require('express');

const router = express.Router();
const flipbookController = require('./../controllers/flipbookController');

router.post('/', flipbookController.addFlipbook);
//router.get('/', flipbookController.getFlipbook);

router.patch('/delete-flipbook/:id', flipbookController.deleteFlipbook);

router.get(
  '/get-saved-flipbook/:id',
  flipbookController.getFlipbookSavedByUser
);

router.get('/get-flipbook-by-id/:id', flipbookController.getFlipbookbyID);

router.patch('/delete-flipbook/:id', flipbookController.deleteFlipbook);

module.exports = router;
