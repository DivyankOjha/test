const express = require('express');

const router = express.Router();
const attributesController = require('./../controllers/allAttributesController');

router.post('/', attributesController.postAttributes);
router.get('/', attributesController.getAllAttributes);
router.patch(
  '/update-attributes-status',
  attributesController.setActiveInactiveAttributes
);

module.exports = router;
