// command for future use
// require("dotenv").config();
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const axios = require("axios");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const cors = require("cors");

// app.use(cors());

//mongoDB Atlas, need to set password in .env
const mongoPROD_URI =
  "mongodb+srv://andy:<password>@cluster0-de0ww.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoPROD_URI, { useNewUrlParser: true }, err => {
  if (err) return console.log(`${err}`);
  console.log("connected to mongodb");
});
