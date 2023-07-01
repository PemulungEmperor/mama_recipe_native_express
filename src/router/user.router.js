const express = require('express');

const {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  login,
  logout,
  updateUserImage,
  deleteUserImage,
  updateProfile,
  updateUsername,
  nativeUserImage,
  getUserById,
} = require('../controller/user.controller');
const router = express.Router();
// const { userValidation } = require('../helper/user.joi')
// const { validate } = require('../middleware/validationMiddleware')
// const { verifyToken } = require('../middleware/verifyToken')
const {isAdmin, isCustomer} = require('../middleware/authorization');
const multerUpload = require('../middleware/upload');
const multerUploadProfile = require('../middleware/uploadProfile');
const {refreshToken} = require('../controller/refreshToken');

// all users list
router.get('/users', getUsers);
// new user register
// router.post('/users', validate(userValidation), registerUser)
router.post('/users', registerUser);

// login
router.post('/login', login);
// update user
router.put('/update/:id', isCustomer, updateUser);
// delete user
router.delete('/delete/(:id)', deleteUser);

// tes refreshtoken
router.get('/token', refreshToken);

// logout
router.delete('/logout', logout);

// update image
router.put('/image/:id', multerUpload, updateUserImage);

// delete image
router.delete('/image/:id', deleteUserImage);

//update profile
router.post('/update/profile/:id', multerUploadProfile, updateProfile);

//update username only
router.post('/update/username/:id', updateUsername);

// update native profile image only
router.put('/native-update-image/:id', multerUploadProfile, nativeUserImage);

// get user by id
router.get('/get-user/:id', getUserById);

module.exports = router;
