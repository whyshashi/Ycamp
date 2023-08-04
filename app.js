const express = require("express");
const app = express();
const Joi = require("joi");
const mongoose = require("mongoose");
app.set("view engine", "ejs");
mongoose.connect("mongodb://127.0.0.1:27017/Ycamp");
const Campground = require("./models/campground.js");
const AppError = require("./Utils/AppError.js");
const CatchAsync = require("./Utils/CatchAsync.js");
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const db = mongoose.connection;
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
const schemaj = require("./models/validator.js");

// -----------------------------------------
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

//HOME
app.get("/", (req, res) => {
  res.redirect("/campground");
});

app.get("/campground",CatchAsync(async (req, res) => {
  const data = await Campground.find();
  res.render("home.ejs", { data });
}));

// UPDATE
app.get("/campground/updatepage",CatchAsync( async (req, res) => {
  const data = await Campground.find();
  res.render("updatepage.ejs", { data });
}));

app.get("/campground/:id/update",CatchAsync( async (req, res) => {
  const { id } = req.params;
  const data = await Campground.findById(id);
  res.render("update.ejs", { data });
}));

//DELETE
app.get("/campground/:id/delete",CatchAsync( async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campground");
}));

//UPDATE
app.patch(
  "/campground/:id",
  CatchAsync(async (req, res) => {
    const value = await schemaj.validateAsync(req.body);
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, req.body);
    res.redirect("/campground");
  })
);

//NEW
app.get("/campground/new",CatchAsync( async (req, res) => {
  res.render("create.ejs");
}));

app.post(
  "/campground/new",
  CatchAsync(async (req, res) => {
    const value = await schemaj.validateAsync(req.body);
    const dd = await new Campground(req.body);
    await dd.save();
    res.redirect("/campground");
  })
);

//SHOW
app.get("/campground/:id",CatchAsync(async (req, res) => {
    const data = await Campground.findById(req.params.id);
    res.render("show.ejs", { data });
  })
);

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
