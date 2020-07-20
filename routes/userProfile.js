const express = require('express');

const router = express.Router();
const profile = require('./../controllers/userProfileController');

router.get('/', profile.getuser);

module.exports = router;
