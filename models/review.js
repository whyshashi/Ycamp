const mongoose = require("mongoose");

const review = {
  body: String,
  rating: Number
}

const reviewschema = new mongoose.Schema(review);
module.exports = mongoose.model("review", reviewschema);
