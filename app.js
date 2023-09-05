const express = require("express");
const app = express();
const Joi = require("joi");
const mongoose = require("mongoose");
app.set("view engine", "ejs");
mongoose.connect("mongodb://127.0.0.1:27017/Ycamp");
const AppError = require("./Utils/error/AppError.js");
const CatchAsync = require("./Utils/error/CatchAsync.js");
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const db = mongoose.connection;
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
const router = require("./routing/routing.js");
app.use(express.static('public'));
//---------------------------------------------------------
const schemaj = require("./models/validator.js");
const Campground = require("./models/campground.js");
const review = require("./models/review.js");

// --------------------------------------------------------
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.on("connected", () => {
  console.log("Connected to MongoDB database");
  // Perform actions when connected
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB database");
  // Perform actions when disconnected
});

// You can also use the `once` method to listen for an event only once
db.once("open", () => {
  console.log("MongoDB connection opened");
  // Perform actions once the connection is open
});
// -----------------------------------------

//router middleware
app.use("/", router);

//It will run when no get function is run
app.all("*", (req, res, next) => {
  next(new AppError("page not found", 404));
});

app.use((error, req, res, next) => {
  const { status = 404, message = " some error happened " } = error;
  res.status(status).render("errortemp.ejs", { error });
});

app.listen(3000, () => {
  console.log("listening");
});
