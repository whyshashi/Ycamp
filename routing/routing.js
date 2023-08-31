const express = require("express");
const CatchAsync = require("../Utils/error/CatchAsync.js");
const mongoose = require("mongoose");
const router = express.Router();
const Campground = require("../models/campground.js");
const schemaj = require("../models/validator.js");

//HOME
router.get("/", (req, res) => {
  res.redirect("/campground");
});

router.get(
  "/campground",
  CatchAsync(async (req, res) => {
    const data = await Campground.find();
    res.render("home.ejs", { data });
  })
);

// UPDATE
router.get(
  "/campground/updatepage",
  CatchAsync(async (req, res) => {
    const data = await Campground.find();
    res.render("updatepage.ejs", { data });
  })
);

router.get(
  "/campground/:id/update",
  CatchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await Campground.findById(id);
    res.render("update.ejs", { data });
  })
);

//DELETE
router.get(
  "/campground/:id/delete",
  CatchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campground");
  })
);

//UPDATE
router.patch(
  "/campground/:id",
  CatchAsync(async (req, res) => {
    const value = await schemaj.validateAsync(req.body);
    const { id } = req.params;
    await Campground.findByIdAndUpdate(id, req.body);
    res.redirect("/campground");
  })
);

//NEW
router.get(
  "/campground/new",
  CatchAsync(async (req, res) => {
    res.render("create.ejs");
  })
);

router.post(
  "/campground/new",
  CatchAsync(async (req, res) => {
    const value = await schemaj.validateAsync(req.body);
    const dd = await new Campground(req.body);
    await dd.save();
    res.redirect("/campground");
  })
);

//SHOW
router.get(
  "/campground/:id",
  CatchAsync(async (req, res) => {
    const data = await Campground.findById(req.params.id).populate("reviews");
    res.render("show.ejs", { data });
  })
);

//review
router.post(
  "/campground/:id/review",
  CatchAsync(async (req, res) => {
    const data = await Campground.findById(req.params.id).populate("reviews");
    const reviewadd = await review(req.body);
    data.reviews.push(reviewadd);
    reviewadd.save();
    data.save();
    console.log(reviewadd);
    res.render("show.ejs", { data });
  })
);

//review delete
router.delete(
  "/campground/:id/review/:reviewid",
  CatchAsync(async (req, res) => {
    const { id, reviewid } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await review.findByIdAndDelete(reviewid);
    res.redirect(`/campground/${id}`);
  })
);

module.exports = router;
