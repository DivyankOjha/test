const express = require('express');
const userController = require('./../controllers/userControler');
const authController = require('./../controllers/authController');
const adminController = require('./../controllers/adminController');

const router = express.Router();

router.post('/signup', authController.signup);
router.get('/confirmation/:token', authController.activateAccount);
router.post('/login', authController.login);
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
router.delete('/deleteuser/:id', adminController.deleteUser);

//app.post('/resend', userController.resendTokenPost);

router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);

router.route('/:id').get(userController.getUser);
// .patch(userController.updateUser)
// .delete(adminController.deleteUser);

module.exports = router;
