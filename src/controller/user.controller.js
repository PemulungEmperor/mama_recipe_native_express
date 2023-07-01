const userModel = require('../model/user.model');
const {response} = require('../helper/response.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs-extra');

const userController = {
  getUsers: async (req, res) => {
    try {
      const user = await userModel.selectAll();
      res.json(user.rows);
    } catch (error) {
      console.log(error);
    }
  },

  registerUser: async (req, res) => {
    // ambil data key berikut
    const {username, email, password, confirmPassword} = req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({message: 'Confirm password do not match with password'});
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const data = {
      username,
      email,
      password: hashPassword,
    };
    try {
      await userModel.store(data);
      res.json({message: 'User registered successfully!'});
    } catch (error) {
      res.json({message: 'There is a mistake in model (name or function)'});
    }
  },

  updateUser: async (req, res) => {
    const id = req.params.id;
    const {username, email, password} = req.body;
    const hashPassword = await bcrypt.hash(password, 10); // hashing and salting
    const data = {
      id,
      username,
      email,
      password: hashPassword,
    };
    userModel
      .updateUser(data)
      .then(result => {
        res.json({
          message: 'User has been updated',
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  },

  deleteUser: (req, res) => {
    const id = req.params.id;
    userModel
      .destroy(id)
      .then(result => {
        response(res, result.rows, 200, 'User successfully deleted');
      })
      .catch(err => {
        response(res, err, 400, 'User fails to delete');
      });
  },

  // Login users
  login: async (req, res) => {
    try {
      const {email, password} = req.body;
      const user = await userModel.loginUser(email);
      if (user.rows.length > 0) {
        const match = await bcrypt.compare(password, user.rows[0].password);
        if (!match) {
          return res.status(400).json({message: 'Wrong credentials!'});
        } else {
          // login success & access token
          const userId = user.rows[0].id;
          const username = user.rows[0].username;
          const email = user.rows[0].email;
          const photo_path = user.rows[0].photo_path;
          const level = user.rows[0].level;
          const accessToken = jwt.sign(
            {userId, username, email, photo_path, level},
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: '30s',
            },
          );
          const refreshToken = jwt.sign(
            {userId, username, email, photo_path, level},
            process.env.REFRESH_TOKEN_SECRET,
            {
              expiresIn: '1d',
            },
          );
          await userModel.refreshTokenUpdate(refreshToken, userId);
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // secure: true
          });
          res.json({
            userId,
            username,
            email,
            photo_path,
            accessToken,
            message: 'Login successfully',
          });
        }
      } else {
        return res.status(404).json({message: 'User not found'});
      }
    } catch (err) {
      return res
        .status(400)
        .json({message: 'Confirm password do not match with password'});
    }
  },

  logout: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(204);
    const user = await userModel.findUserRefreshToken(refreshToken);
    if (!user.rows[0]) return res.status(204);
    const userId = user.rows[0].id;
    await userModel.refreshTokenUpdate(null, userId);
    res.clearCookie('refreshToken');
    return res.status(200).json({message: 'Refresh token deleted!'});
  },

  // update image
  updateUserImage: async (req, res) => {
    const id = req.params.id;
    const photoPath = req.file.filename;
    const data = {
      photoPath,
      id,
    };
    userModel
      .getById(id)
      .then(user => {
        const userPhotoPath = user.rows[0].photo_path;
        if (userPhotoPath !== null) {
          fs.unlinkSync(`./thefrontend/src/img/userPhoto/${userPhotoPath}`);
        } else {
          console.log('no image');
        }
        res.json({message: 'image clear'});
      })
      .then(() => {
        userModel.updateUserImage(data);
        res.json({message: 'Succes updating user image'});
      })
      .catch(error => {
        console.log(error.message);
      });
  },
  deleteUserImage: (req, res) => {
    const id = req.params.id;
    userModel
      .getById(id)
      .then(user => {
        const userPhotoPath = user.rows[0].photo_path;
        fs.unlinkSync(`./${userPhotoPath}`);
      })
      .then(() => {
        userModel.UserImageToNull(null, id);
        res.json({message: 'Succes delete user image'});
      })
      .catch(error => {
        console.log(error.message);
      });
  },

  updateProfile: async (req, res) => {
    const {username} = req.body;
    const id = req.params.id;
    const photoPath = req.file.filename;
    const data = {
      id,
      username,
      photoPath,
    };
    userModel
      .updateProfile(data)
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        response(res, err, 400, 'Failed to update user');
      });
  },

  updateUsername: (req, res) => {
    const {username} = req.body;
    const id = req.params.id;
    const data = {
      id,
      username,
    };
    userModel
      .updateUsername(data)
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        response(res, err, 400, 'Failed to update user');
      });
  },

  nativeUserImage: async (req, res) => {
    const id = req.params.id;
    const photoPath = req.file.filename;
    const data = {
      id,
      photoPath,
    };
    userModel
      .updateUserImage(data)
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        response(res, err, 400, 'Failed to update user');
      });
  },

  getUserById: async (req, res) => {
    const id = req.params.id;
    userModel
      .getById(id)
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        response(res, err, 400, 'Failed to get user');
      });
  },
};
module.exports = userController;
