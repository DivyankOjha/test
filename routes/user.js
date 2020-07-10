const express = require('express');
const userController = require('./../controllers/userControler');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.get('/confirmation/:token', authController.activateAccount);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

//app.post('/resend', userController.resendTokenPost);

router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
