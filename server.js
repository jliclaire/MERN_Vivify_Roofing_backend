const express = require("express");
const app = new express();
const mongoose = require("mongoose");
require("dotenv").config();

// command for future use
// const axios = require("axios");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const cors = require("cors");

//define Port
const port = process.env.PORT || 5000;

//middleware
// body-parser configuration
app.use(express.json());
// app.use(cors());

//require User schema
const User = require("./models/User");

//local db
// const mongo_URI = process.env.DB_URL;
// mongoose.connect(mongo_URI, { useNewUrlParser: true }, err => {
//   if (err) return console.log(`${err}`);
//   console.log("connected to mongodb");
// });

//require schema
// const Job = require("./models/Job");

// Cloud db
const mongoPROD_URI = process.env.DB_URL;

mongoose.connect(mongoPROD_URI, { useNewUrlParser: true }, err => {
  if (err) return console.log(`${err}`);
  console.log("connected to mongodb");
});

app.get("/test", (req, res) => {
  res.send({
    status: "success",
    message: "testing for deployment"
  });
});

//below post end to test db, both working on local and cloud
app.post("/user", async (req, res) => {
  const { name, password } = req.body;
  const newUser = new User({
    name,
    password
  });

  const savedUser = await newUser.save();
  res.send({
    newUser: savedUser
  });
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
