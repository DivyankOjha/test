const express = require('express');
const userController = require('./../controllers/userControler');
const authController = require('./../controllers/authController');
const adminController = require('./../controllers/adminController');
const profile = require('./../controllers/userProfileController');

const router = express.Router();

router.post('/signup', authController.signup);
router.get('/confirmation/:token', authController.activateAccount);
router.post('/login', authController.login);

router.post('/google-facebook-signup', authController.extSignup);
router.post('/google-facebook-login', authController.extLogin);

router.post('/google-facebook-auth', authController.SignupLogin);

router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.post('/email-verification', authController.reVerificationEmail);
// Protect all routes after this middleware
//router.use(authController.protect);
router.post('/upload', authController.protect, userController.upload);
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

router.get('/userprofile', profile.getuser);

router.patch(
  '/admin/set-user-status/:id',
  authController.protect,
  authController.restrictTo('admin'),
  adminController.ActiveInactive
);
router.get(
  '/admin/newusers',
  authController.protect,
  authController.restrictTo('admin'),
  adminController.getnewUsers
);
router.post(
  '/admin/user-filter-by-date',
  authController.protect,
  authController.restrictTo('admin'),
  adminController.filterbydate
);
router.post(
  '/admin/search-user',
  authController.protect,
  authController.restrictTo('admin'),
  adminController.searchUser
);

router.delete(
  '/deleteuser/:id',
  authController.protect,
  authController.restrictTo('admin'),
  adminController.deleteUser
);
router.delete(
  '/deletemany',
  authController.protect,
  authController.restrictTo('admin'),
  adminController.deleteManyUsers
);

//app.post('/resend', userController.resendTokenPost);

router
  .route('/admin/allusers-list')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    adminController.getAllUsers
  );
// .post(userController.createUser);

//router.get('/:id'), userController.getUser;
// .patch(userController.updateUser)
// .delete(adminController.deleteUser);

module.exports = router;
