const express = require('express')

const routes = express.Router()
const { listProduct, addProduct, updateProduct, deleteProduct, listCategory, searchByName, getById, paginate, getProductByUserId, getLatestProduct } = require('../controller/product.controller')
const multerUpload = require('../middleware/upload')
// const { productValidation } = require('../helper/product.joi')
// const { validate } = require('../middleware/validationMiddleware')
const { hitProductAll } = require('../middleware/redis')

// end configurations
routes.get('/product', listProduct)
routes.post('/product',multerUpload, addProduct)

// update product
routes.put('/product/:id',multerUpload, updateProduct)
// delete product
routes.delete('/product/delete/:id', deleteProduct)

// category
routes.get('/product/category', listCategory)
// name
routes.get('/product/:name', searchByName)

// paginate
routes.get('/pagination', paginate)

// redish
// routes.get('/v1/getFromRedis/:id', hitProductAll, getById)

// getbyid
routes.get('/productUser/:id', getProductByUserId)

//get latest product
routes.get('/latestProduct', getLatestProduct)

module.exports = routes
