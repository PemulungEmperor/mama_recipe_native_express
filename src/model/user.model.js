/* eslint-disable camelcase */
const db = require('../config/db');

const userModel = {
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, username, email FROM users', (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  store: ({username, email, password}) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        },
      );
    });
  },

  // login user
  loginUser: email => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  // refreshTokenUpdate
  refreshTokenUpdate: (token, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET refresh_token = '${token}' WHERE id = ${id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        },
      );
    });
  },

  // userRefreshToken
  findUserRefreshToken: token => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE refresh_token = '${token}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        },
      );
    });
  },

  updateUser: ({id, username, email, password}) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET username='${username}', email='${email}', password='${password}' WHERE id=${id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        },
      );
    });
  },

  destroy: id => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id = ${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  // update user's image
  updateUserImage: ({photoPath, id}) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET photo_path='${photoPath}' WHERE id=${id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        },
      );
    });
  },

  // null photoPath store
  UserImageToNull: (photoPath, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET photo_path=${photoPath} WHERE id=${id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        },
      );
    });
  },

  // get userby id
  getById: id => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id = ${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  updateProfile: ({id, username, photoPath}) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET username='${username}', photo_path='${photoPath}' WHERE id=${id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        },
      );
    });
  },

  updateUsername: ({id, username}) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET username='${username}' WHERE id=${id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        },
      );
    });
  },
};

module.exports = userModel;
