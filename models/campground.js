const mongoose= require("mongoose");
 const sch = {
    title : String,
    price : String,
    description:String,
    location: String
 };
const schema = mongoose.Schema;

const schema1 = new schema(sch);
module.exports = mongoose.model("Campground",schema1);