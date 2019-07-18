const express = require("express");
const app = new express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const routes = require("./routes");

//define Port
const port = process.env.PORT || 5000;

//middleware
// body-parser configuration
app.use(express.json());
app.use(cors());

// Add router
app.use(routes);

// db authentication
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, err => {
  if (err) return console.log(`${err}`);
  console.log("connected to mongodb");
});

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
