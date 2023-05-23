const express =require("express");
const app = express();
const mongoose =require("mongoose");
app.set('view engine','ejs') 
mongoose.connect("mongodb://127.0.0.1:27017/Ycamp");
const Campground = require("./models/campground.js");

const db = mongoose.connection;
// --------------------------------
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.on('connected', () => {
  console.log('Connected to MongoDB database');
  // Perform actions when connected
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB database');
  // Perform actions when disconnected
});

// You can also use the `once` method to listen for an event only once
db.once('open', () => {
  console.log('MongoDB connection opened');
  // Perform actions once the connection is open
});

// ----------------------------------





app.get("/",(req,res)=>{
    res.send("home")
})

app.get("/campground",(req,res)=>{

    Campground.insertMany([{
      title : "MYhome"
   }])
   
  //  res.send(Campground.find());
  //  console.log(Campground.find());
})





app.listen(3000,()=>{
    console.log("listening");
});