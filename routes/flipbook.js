const express = require('express');

const router = express.Router();
const flipbookController = require('./../controllers/flipbookController');

router.post('/', flipbookController.addFlipbook);
router.get('/', flipbookController.getFlipbook);

module.exports = router;
