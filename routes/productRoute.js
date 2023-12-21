const express = require('express');
const Product = require('../models/productModel')
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/productController')

//add prod validation middleware
const {addUserValidation} = require('../validations/Validate')

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

module.exports = router;