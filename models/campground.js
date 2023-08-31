const review = require("./review.js");
const mongoose = require("mongoose");
const sch = {
  title: String,
  price: Number,
  description: String,
  location: String,
  image: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
  ],
};

const schema1 = new mongoose.Schema(sch);

schema1.post("findOneAndDelete", async function (data) {
  if (data.reviews.length) {
    await review.deleteMany({ _id: { $in: data.reviews } });
    await console.log("deleting whole campground");
  }
});

module.exports = mongoose.model("Campground", schema1);
