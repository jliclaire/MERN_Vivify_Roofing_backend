const mongoose = require("mongoose");

const followupSchema = new mongoose.Schema({
  date: String, //date to conduct survey of the job
  saleId: Number,
  salesName: String, // the person who is following up this time
  type: String, //call, email, onsite visit
  tradeComments: String
})

module.exports = followupSchema;