require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const productRoute = require("./routes/productRoute");

const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8000;

app.use(express.json()); //json data CRUD
app.use(express.urlencoded({ extended: false })); //form data

app.use("/api/products", productRoute);

// app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello NODE API");
  // res.json({ message: "Welcome to my Node app" });
});

app.get("/blog", (req, res) => {
  res.send("BlogPost it is");
});

app.get("/signup", (req, res) => {
  res.send("Signup Page");
});

app.get("/login", (req, res) => {
  res.send("Login Page");
});

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Node API app is running on port ${PORT}`);
});
