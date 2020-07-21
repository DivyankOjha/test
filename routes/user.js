const express = require('express');
const userController = require('./../controllers/userControler');
const authController = require('./../controllers/authController');
const adminController = require('./../controllers/adminController');

const router = express.Router();

router.post('/signup', authController.signup);
router.get('/confirmation/:token', authController.activateAccount);
router.post('/login', authController.login);

router.post('/google-facebook-signup', authController.extSignup);
router.post('/google-facebook-login', authController.extLogin);

router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
//router.use(authController.protect);
router.post('/upload', userController.upload);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
router.patch(
  '/editprofile',
  authController.protect,
  authController.editUserProfile
);

router.get('/newusers', adminController.getnewUsers);
router.get('/filter', adminController.filterbydate);
router.get('/searchuser', adminController.searchUser);

router.delete('/deleteuser/:id', adminController.deleteUser);

//app.post('/resend', userController.resendTokenPost);

router
  .route('/')
  .get(adminController.getAllUsers)
  .post(userController.createUser);

router.get('/:id'), userController.getUser;
// .patch(userController.updateUser)
// .delete(adminController.deleteUser);

module.exports = router;
