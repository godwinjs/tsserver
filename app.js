const express = require("express");
const cors = require("cors");
require("dotenv").config();

/* internal import */
const error = require("./middlewares/error.middleware");

/* router level imports */
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const subcategoryRoute = require("./routes/subcategory.route");
const productRoute = require("./routes/product.route");
const settingsRoute = require("./routes/settings.route");
const brandRoute = require("./routes/brand.route");
const storeRoute = require("./routes/store.route");

/* application level connection */
const app = express();

/* middleware connections */
app.use(
  cors({
    origin: "*",
    methods: "GET, PATCH, POST, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

/* router level connections */
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/subcategory", subcategoryRoute);
app.use("/api/product", productRoute);
app.use("/api/settings", settingsRoute);
app.use("/api/brand", brandRoute);
app.use("/api/store", storeRoute);

/* global error handler */
app.use(error);

/* connection establishment */
app.get("/", (req, res, next) => {
  try {
    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "The request is OK and fetch successful request",
      data: "Truthstores E-Commerce server connection establish successfully",
    });
  } catch (err) {
    next(err);
  } finally {
    console.log(`URL: ${req.url} || Method: ${req.method}`);
  }
});

/* export application */
module.exports = app;

/**
 * How to fix: "error fsevents@2.0.7: The platform "linux" is incompatible with this module."
 * https://stackoverflow.com/questions/57082249/how-to-fix-error-fsevents2-0-7-the-platform-linux-is-incompatible-with-thi
 */