const mongoose = require("mongoose");
const sch = {
  title: String,
  price: Number,
  description: String,
  location: String,
  image: String,
};

const schema1 = new mongoose.Schema(sch);
module.exports = mongoose.model("Campground", schema1);
