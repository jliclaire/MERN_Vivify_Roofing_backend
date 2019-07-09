const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// command for future use
// const axios = require("axios");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const cors = require("cors");

//define Port
const PORT = 5000;

//middleware
// body-parser configuration
app.use(express.json());
// app.use(cors());

// db authentication
const mongoPROD_URI = process.env.MONGO_PROD_URI;

//require schema
const Job = require("./models/Job");

mongoose.connect(mongoPROD_URI, { useNewUrlParser: true }, err => {
  if (err) return console.log(`${err}`);
  console.log("connected to mongodb");
});

app.get("/", (req, res) => {
  res.send("testing for deployment");
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
