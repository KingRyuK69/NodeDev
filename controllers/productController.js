const Product = require("../models/productModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//get all product
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get a single prod
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create a new product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

//update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    // we can't find the prod
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product can't be found with ID ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    // we can't find the prod
    if (!product) {
      return res
        .status(404)
        .json({ message: `my product can't be found with ID ${id}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//upload file
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(200).json({ message: "Single File Uploaded", file: req.file });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({
  storage: fileStorageEngine,
  fileFilter: (req, file, cb) => {
    console.log(file.originalname);
    let ext = path.extname(file.originalname);
    console.log("ext", ext);
    if (ext != ".png" && ext != ".jpg" && ext != ".jpeg") {
      req.fileValidationError = "Forbidden extension";
      return cb(null, false, req.fileValidationError);
    }
    cb(null, true);
  },
});

//get a file
const getFile = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join("images", filename);

    if (fs.existsSync(filePath)) {
      res.status(200).download(filePath, filename);
    } else {
      throw new Error("File not found");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadFile,
  upload,
  getFile,
};
