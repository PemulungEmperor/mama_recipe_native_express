/* eslint-disable camelcase */
const db = require('../config/db')

const productModel = {
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM foods ORDER BY food_name ASC', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },

  addProduct: ({ user_id, food_name, ingredients, video_recipe, photoPath }) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO foods (user_id, food_name, ingredients, video_recipe, photo_path) VALUES (${user_id}, '${food_name}', '${ingredients}', '${video_recipe}', '${photoPath}')`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },

  updateProduct: ({ id, food_name, ingredients, video_recipe, photoPath }) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE foods SET food_name='${food_name}', ingredients='${ingredients}', video_recipe= '${video_recipe}', photo_path= '${photoPath}' WHERE id=${id}`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },

  destroy: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM foods WHERE id = ${id}`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },

  listCategory: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM food_category', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  searchByName: (food_name) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM foods WHERE food_name ilike '%${food_name}%'`
      db.query(sql, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },

  selectByUserId: (id) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM foods WHERE user_id ='${id}'`
      db.query(sql, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },

  paginate: (limitValue, offsetValue) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM foods LIMIT ${limitValue} OFFSET ${offsetValue}`
      db.query(sql, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },

  
  getLatestProduct: () => {
    return new Promise((resolve, reject) => {
      const limit = 1
      db.query(`SELECT * FROM foods ORDER BY created_at DESC LIMIT ${limit}`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  // pagination
  // paginate2: (limit, offset) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT * FROM users LIMIT ${limit} OFFSET ${offset} `, (err, res) => {
  //       if (err) {
  //         reject(err)
  //       }

  //       resolve(res)
  //     })
  //   })
  // }

}

module.exports = productModel
