const express = require("express");
const app = new express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const routes = require("./routes");

// command for future use
// const axios = require("axios");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

//define Port
const port = process.env.PORT || 5000;

//middleware
// body-parser configuration
app.use(express.json());
app.use(cors());

// Add router
app.use(routes);

//require User schema
const User = require("./models/User");

//require Job schema
const Job = require("./models/Job");

// db authentication
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, err => {
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
// app.post("/user", async (req, res) => {
//   const { name, password } = req.body;
//   const newUser = new User({
//     name,
//     password
//   });

//   const savedUser = await newUser.save();
//   res.send({
//     newUser: savedUser
//   });
// });

// app.post("/job", async (req, res) => {
//   const { assignedTrade, approvedBy } = req.body;
//   const newJob = new Job({
//     assignedTrade,
//     approvedBy
//   });

//   const savedJob = await newJob.save();
//   res.send({
//     newJob: savedJob
//   });
// });

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
