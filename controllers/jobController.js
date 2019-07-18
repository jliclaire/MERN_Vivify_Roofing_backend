//require Job schema
const Job = require("../models/Job");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const { uploadFile } = require('../utils/cloudinary')
const { parseEmail } = require("../utils/parse");

const index = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).send(jobs);
  } catch (error) {
    console.log(error.stack);
    res.status(500).send(error.message);
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    res.status(200).send(job);
  } catch (error) {
    console.log(error.stack);
    res.status(500).send(error.message);
  }
}

const create = async (req, res) => {
  try {
    const data = req.body;
    const newJob = await Job.create(data);
    res.status(201).send(newJob);
  } catch (error) {
    console.log(error.stack);
    res.status(500).send(error.message);
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedJob = await Job.findByIdAndUpdate(id, data, { new: true });
    res.status(202).send(updatedJob);
  } catch (error) {
    console.log(error.stack);
    res.status(500).send(error.message);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);
    res.status(202).send({deleted: deletedJob});
  } catch (error) {
    console.log(error.stack);
    res.status(500).send(error.message);
  }
};

const email = async (req, res) => {
  try {
    const emailString = req.body["body-plain"];
    const jobData = parseEmail(emailString);
    const newJob = await Job.create(jobData);
    res.status(202).send(newJob);
  } catch (error) {
    console.log(error.stack);
    res.status(500).send(error.message);
  }
};

const uploadImage = async (req, res) => {
  try {
    const { buffer } = req.file
    const { id } = req.params
    const { url } = await uploadFile(buffer)
    const updatedJob = await Job.findByIdAndUpdate(id, {
      $push: { imageUrls: url }
    }, { new: true });
    res.status(202).send(updatedJob)
  } catch (error) {
    console.log(error.stack);
    res.status(500).send(error.message);
  }
}

const editFollowup = async (req, res) => {
  try {
    const { jId, fId } = req.params
    const { newComment } = req.body
    const job = await Job.findById(jId)
    const followup = await job.followUps.id(fId);
    followup.tradeComments = newComment;
    console.log(newComment)
    job.save();
    console.log(job);
    res.sendStatus(202)
  } catch (error) {
    console.log(error.stack);
    res.status(500).send(error.message);
  }
}


module.exports = {
  index,
  create,
  edit,
  destroy,
  email,
  uploadImage,
  editFollowup
};