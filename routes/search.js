const express = require('express');
const Hotel = require('./../models/hotelModel');
const router = express.Router();
const searchHouse = require('../controllers/userSearchController');

//router.post('/:classs/:city', searchHouse.searchHouse);

//router.get('/', searchHouse.searchHouse);

//INDEX - show all campgrounds
router.get('/', function (req, res) {
  console.log(req.query);
  var noMatch = null;
  const regex = new RegExp(escapeRegex(req.query.search), 'gi');
  // Get all campgrounds from DB
  Hotel.find(
    { 'propertyDetails.propertyName': regex },

    function (err, hotel) {
      if (err) {
        console.log(err);
      } else {
        if (hotel.length < 1) {
          noMatch = 'No Hotels match that query, please try again.';
        }
        res.status(200).json({
          status: 'success',
          results: hotel.length,
          hotel,
        });
      }
    }
  );
});
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
