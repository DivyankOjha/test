const express = require('express');

const router = express.Router();
const dashboardController = require('./../controllers/dashboardController');

router.get('/summary', dashboardController.getAllproperty);
router.get('/get-property-list', dashboardController.getpropertylist); //all 4 property details for admin

router.get('/popertyattributes', dashboardController.attributes);
router.post('/popertyattributes', dashboardController.addattributes);
router.post('/addfield', dashboardController.addfield);
router.post('/delfield', dashboardController.deletefield);

module.exports = router;
