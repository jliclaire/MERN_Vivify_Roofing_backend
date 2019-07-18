const mongoose = require("mongoose");

const followupSchema = require("./Followup");

const jobSchema = new mongoose.Schema({
  createdTime: { type: Date, default: Date.now },
  projectType: String,
  roofFrameType: String,
  sizeOfHome: String,
  houseLevels: String,
  roofType: String,
  currentRoofMaterial: String,
  desiredRoofMaterial: String,
  gutterDownpipeReplacement: String,
  name: String,
  suburb: String,
  email: String,
  phone: String,
  comments: String,
  //below are the fields that we inserted, need to confirm after Andy's meeting with client
  followups: [followupSchema],
  imageUrls: [String],
  assignedTrade: String, //this is for the person who taking care of this job
  sold: Boolean, //when the customer agree to enter into a roofing work contract
  inProgress: Boolean, //to flag this job to a work-in-progress folder
  archived: Boolean ////to flag this job to a work-cancelled folder
});

module.exports = mongoose.model("Job", jobSchema);
