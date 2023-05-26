
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Ycamp");
const Campground = require("../models/campground.js");
const cities = require("./seed.js");
const {descriptors,places} = require("./seedHelpers.js");


const db = mongoose.connection;
// --------------------------------
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

// ----------------------------------

async function seedata(){
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const rand = await Math.floor(Math.random()*cities.length);
    const nn = await new Campground({location:`${cities[rand].city}, ${cities[rand].state}`,
  title:`${descriptors[Math.floor(Math.random()*descriptors.length)]}, ${places[Math.floor(Math.random()*places.length)]}`
});
    await nn.save();
  }
}

seedata();