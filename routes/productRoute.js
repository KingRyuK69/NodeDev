const express = require('express');
const Product = require('../models/productModel')
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct, uploadFile} = require('../controllers/productController')

//add prod validation middleware
const {addUserValidation} = require('../validations/eValidate')
const {upload} = require('../controllers/productController')
const router = express.Router();

//get all products
router.get('/', getProducts);

//get a new product
router.get('/:id', getProduct);

//create a new product
router.post('/', addUserValidation, createProduct);

// update a prod
router.put('/:id', updateProduct);
  
//delete a prod
router.delete('/:id', deleteProduct);

//upload a file
router.post('/single', upload.single("image"), uploadFile);

module.exports = router;