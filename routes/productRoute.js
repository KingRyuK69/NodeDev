const express = require("express");
// const Product = require("../models/productModel");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadFile,
  getFile,
  encodeBase64Img,
  decodeBase64Img,
  getImage,
  signup,
} = require("../controllers/productController");

//add prod validation middleware
const { addUserValidation } = require("../validations/eValidate");
const { upload } = require("../controllers/productController");
const router = express.Router();

//get a file
router.get("/get-file/:filename", getFile);

//get all products
router.get("/", getProducts);

//get a new product
router.get("/:id", getProduct);

//create a new product
router.post("/", addUserValidation, createProduct);

// update a prod
router.put("/:id", updateProduct);

//delete a prod
router.delete("/:id", deleteProduct);

//upload a file
router.post("/single", upload.single("image"), uploadFile);

//encode img
router.post("/encode", upload.single("image"), encodeBase64Img);

//decode img
router.post("/decode", decodeBase64Img);

//show decoded image
router.post("/get-file/:filename", getImage);

//user signup
router.post("/signup", signup);

module.exports = router;
