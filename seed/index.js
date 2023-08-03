const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Ycamp");
const Campground = require("../models/campground.js");
const cities = require("./seed.js");
const { descriptors, places } = require("./seedHelpers.js");

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


  async function getUsers() {
    let url = "https://api.unsplash.com/photos/random?client_id=2DbXVboX-l09cZ5tOWx5yXnaPf_TS7yUpZLlZWx5Wsc&count=1";
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
let link;
getUsers()
.then((data) => {
    link = data[0].urls.small;
    console.log(link);
});

setTimeout(()=>{
  console.log(link);
  seedata();
},3000);
async function seedata() {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const rand = await Math.floor(Math.random() * cities.length);
  
      const nn = await new Campground({
        location: `${cities[rand].city}, ${cities[rand].state}`,
        image:link,
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis delectus ipsam sit voluptatum dolor, rerum illo, provident nostrum deserunt aliquam, non quasi itaque sed quo doloribus totam laboriosam necessitatibus quas!",
        title: `${descriptors[Math.floor(Math.random() * descriptors.length)]}, ${
          places[Math.floor(Math.random() * places.length)]
        }`
      });
      await nn.save();
  
  }
}


