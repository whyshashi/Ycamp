const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.set("view engine", "ejs");
mongoose.connect("mongodb://127.0.0.1:27017/Ycamp");
const Campground = require("./models/campground.js");
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const db = mongoose.connection;
const ejsMate = require("ejs-mate");
app.engine("ejs",ejsMate);
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

app.get("/", (req, res) => {
  res.redirect("/campground");
});

// app.get("/makecampground", async (req, res) => {
//   // await Campground.insertMany({
//   //   title: "MYhome",
//   // });

//   await Campground.deleteMany({});
//   const d = await Campground.find();
//   res.send(d);
// });

app.get("/campground", async (req, res) => {
  const data = await Campground.find();
  res.render("home.ejs", { data });
});

app.get("/campground/:id/update", async (req, res) => {
  const { id } = req.params;
  const data = await Campground.findById(id);
  res.render("update.ejs", { data });
});

app.get("/campground/:id/delete", async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campground");
});

app.patch("/campground/:id", async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndUpdate(id, req.body);
  res.redirect("/campground");
});

app.get("/campground/:id/update", async (req, res) => {
  const { id } = req.params;
  const data = await Campground.findById(id);
  res.render("update.ejs", { data });
});

app.get("/campground/new", async (req, res) => {
  const { id } = req.params;
  const data = await Campground.findById(id);
  res.render("create.ejs", { data });
});

app.post("/campground/new", async (req, res) => {
  const { title, location } = await req.body;
  const dd = await new Campground({ title: title, location: location });
  await dd.save();
  res.redirect("/campground");
});

app.get("/campground/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Campground.findById(id);
  res.render("show.ejs", { data });
});

app.listen(3000, () => {
  console.log("listening");
});
