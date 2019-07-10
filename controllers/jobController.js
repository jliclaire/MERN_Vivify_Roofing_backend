//require Job schema
const Job = require("./models/Job");

const index = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).send(jobs);
  } catch (error) {
    console.log(error.stack);
    res.send("There was an error on the GET /jobs endpoint at the controller");
  }
}

const create = async (req, res) => {
  try {
    const data = req.body;
    const newJob = await Job.create(data)
    res.status(201).send(newJob);
  } catch (error) {
    console.log(error.stack);
    res.send("There was an error on the POST /jobs endpoint at the controller");
  }
}

const edit = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body
    const updatedJob = await Job.findOneAndUpdate({ id }, data, {new: true})
    res.status(202).send(updatedJob)
  } catch (error) {
    console.log(error.stack);
    res.send("Error with the PUT / jobs id endpoint")
  }
}

const destroy = async (req, res) => {
  try {
    const { id } = req.params
    const deletedJob = await Job.findOneAndDelete({ id })
    res.status(202).send(`Deleted job ${deletedJob.id}`)
  } catch (error) {
    console.log(error.stack);
    res.send("Error with DELETE / job endpoint from the controller")
  }
}

module.exports = {
  index,
  create,
  edit,
  destroy
}