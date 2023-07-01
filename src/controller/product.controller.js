/* eslint-disable camelcase */
const productModel = require("../model/product.model");
const { response } = require("../helper/response");
// const client = require('../config/redis')

const productController = {
  listProduct: (req, res) => {
    productModel
      .selectAll()
      .then((result) => {
        res.json(result.rows);
        console.log(result);
      })
      .catch((err) => {
        response(res, err, 400, "Error");
      });
  },
  listCategory: (req, res) => {
    productModel
      .listCategory()
      .then((result) => {
        response(res, result.rows, 200, "All category");
      })
      .catch((err) => {
        response(res, err, 400, "Error");
      });
  },
  searchByName: (req, res) => {
    const food_name = req.params.name;
    productModel
      .searchByName(food_name)
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        response(res, err, 400, "Error");
      });
  },
  addProduct: (req, res) => {
    const { user_id, food_name, ingredients, video_recipe } = req.body;
    const photoPath = req.file.filename;
    const data = {
      user_id,
      // category_id,
      food_name,
      ingredients,
      video_recipe,
      photoPath,
    };
    console.log(req.file);
    productModel
      .addProduct(data)
      .then((result) => {
        res.json({ status: "success", image: photoPath });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  updateProduct: (req, res) => {
    const { food_name, ingredients, video_recipe } = req.body;
    const id = req.params.id;
    const photoPath = req.file.filename;
    const data = {
      id,
      // category_id,
      food_name,
      ingredients,
      video_recipe,
      photoPath,
    };
    productModel
      .updateProduct(data)
      .then((result) => {
        response(res, result.rows, 200, "Product updated successfully");
      })
      .catch((err) => {
        response(res, err, 400, "Failed to update product");
      });
  },
  deleteProduct: (req, res) => {
    const id = req.params.id;
    productModel
      .destroy(id)
      .then((result) => {
        response(res, result.rows, 200, "Product successfully deleted");
      })
      .catch((err) => {
        response(res, err, 400, "product fails to delete");
      });
  },
  paginate: async (req, res) => {
    const { limit, page } = req.query;
    const pageValue = page ? Number(page) : 1;
    const limitValue = limit ? Number(limit) : 2;
    const offsetValue = pageValue === 1 ? 0 : (pageValue - 1) * limitValue;

    // total page & total data
    const allData = await productModel.selectAll();
    const totalData = Number(allData);

    productModel
      .paginate(limitValue, offsetValue)
      .then((result) => {
        const pagination = {
          currentPage: pageValue,
          dataperPage: limitValue,
          totalPage: Math.ceil(totalData / limitValue),
          totalData,
        };
        res.json({
          message: "data berhasil masuk",
          result: pagination,
        });
      })
      .catch(() => {
        res.status(404).send("Error");
      });
  },

  // redish
  // getById: (req, res) => {
  //   const id = req.params.id
  //   productModel.selectById(id)
  //     .then(result => {
  //       const dataRedis = client.set(`getFromRedis/${id}`, JSON.stringify(result), {
  //         EX: 180,
  //         NX: true
  //       })
  //       res.send({
  //         fromCache: false,
  //         data: dataRedis
  //       })
  //     })
  //     .catch((err) => {
  //       response(res, err, 400, 'Error')
  //     })
  // },

  getProductByUserId: (req, res) => {
    const id = req.params.id;
    productModel
      .selectByUserId(id)
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        response(res, err, 400, "Error");
      });
  },

  getLatestProduct: (req, res) => {
    productModel
      .getLatestProduct()
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        console.log(err);
        response(res, err, 400, "Error");
      });
  },
};

module.exports = productController;
