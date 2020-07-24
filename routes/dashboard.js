const express = require('express');

const router = express.Router();
const dashboardController = require('./../controllers/dashboardController');

router.get('/', dashboardController.getAllproperty);
router.get('/propertydetails', dashboardController.getpropertylist);
router.get('/popertyattributes', dashboardController.attributes);
router.post('/popertyattributes', dashboardController.addattributes);
router.post('/addfield', dashboardController.addfield);

module.exports = router;
