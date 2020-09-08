const express = require('express');
//const Hotel = require('./../models/hotelModel');
const router = express.Router();
const searchHouse = require('../controllers/userSearchController');
const authController = require('../controllers/authController');

//router.post('/:classs/:city', searchHouse.searchHouse);
router.post(
  '/house-search-1',
  //  authController.protect,
  // authController.checkSubscripionStatus, //this will check if user is subscribed or not
  searchHouse.searchHouse1
);
router.post(
  '/house-search-2',
  // authController.protect,
  // authController.checkSubscripionStatus, //this will check if user is subscribed or not
  searchHouse.searchHouse
);

router.post('/land-search-1', searchHouse.searchLandPage1);
router.post('/land-search-2', searchHouse.searchLandPage2);
router.post('/land-search-3', searchHouse.searchLandPage3);

router.post('/hotel-search-1', searchHouse.searchHotelPage1);
router.post('/hotel-search-2', searchHouse.searchHotelPage2);

router.post('/warehouse-search-1', searchHouse.searchWarehousePage1);
router.post('/warehouse-search-2', searchHouse.searchWarehousePage2);
router.post('/warehouse-search-3', searchHouse.searchWarehousePage3);

//INDEX - show all campgrounds
// router.get('/', function (req, res) {
//   console.log(req.query);
//   var noMatch = null;
//   const regex = new RegExp(escapeRegex(req.query.search), 'gi');
//   // Get all campgrounds from DB
//   Hotel.find(
//     { 'propertyDetails.propertyName': regex },

//     function (err, hotel) {
//       if (err) {
//         console.log(err);
//       } else {
//         if (hotel.length < 1) {
//           noMatch = 'No Hotels match that query, please try again.';
//         }
//         res.status(200).json({
//           status: 'success',
//           results: hotel.length,
//           hotel,
//         });
//       }
//     }
//   );
// });
//   } else {
//     // Get all campgrounds from DB
//     Hotel.find({}, function (err, hotel) {
//       if (err) {
//         console.log(err);
//       } else {
//         res.status(200).json({
//           status: 'success',
//           results: hotel.length,
//           hotel,
//         });
//       }
//     });
//   }
// });

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
module.exports = router;
