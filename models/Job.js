const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
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
  followUps: [
    {
      date: String, //date to conduct survey of the job
      saleId: Number,
      salesName: String, // the person who is following up this time
      type: String, //call, email, onsite visit
      tradeComments: String
    }
  ],
  assignedTrade: String, //this is for the person who taking care of this job
  approvedBy: String, //this is for the person who confirm and approve the quote to process the job
  timeStamp: String, //when the job sent to the database after customer online inquire
  followUpFlag: Boolean, //to flag this job to a follow-up-later folder
  completed: Boolean, //when the customer agree to enter into a roofing work contract
  inProgress: Boolean, //to flag this job to a work-in-progress folder
  cancelled: Boolean ////to flag this job to a work-cancelled folder
});

module.exports = mongoose.model("Job", jobSchema);
