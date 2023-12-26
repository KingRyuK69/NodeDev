require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const cors = require("cors");
// const cookieSession = require("cookie-session");
const productRoute = require("./routes/productRoute");
// const dbConfig = require("./app/db.config");

const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8000;

app.use(express.json()); //json data CRUD
app.use(express.urlencoded({ extended: false })); //form data

// app.use(
//   cookieSession({
//     name: "NodeAuth",
//     keys: [0], // should use as secret environment variable
//     httpOnly: true,
//   })
// );

app.use("/api/products", productRoute);

// var corsOptions = {
//   origin: "http://localhost:8000",
// };

// app.use(cors(corsOptions));

// const db = require("./models");
// const Role = db.role;

// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user",
//       }).save((err) => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "moderator",
//       }).save((err) => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: "admin",
//       }).save((err) => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }

// db.mongoose
//   .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Successfully connect to MongoDB.");
//     initial();
//   })
//   .catch((err) => {
//     console.error("Connection error", err);
//     process.exit();
//   });

app.get("/", (req, res) => {
  // res.send("Hello NODE API");
  res.json({ message: "Welcome to my Node app" });
});

app.get("/blog", (req, res) => {
  res.send("BlogPost it is");
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
