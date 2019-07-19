const User = require("../models/User");

const index = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error.stack);
    res.send("error getting users")
  }
}

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (error) {
    console.log(error.stack);
    res.status(500).send(error.message);
  }
}

const create = async (req, res) => {
  try {
    const data = req.body;
    const newUser = await User.create(data);
    res.status(201).send(newUser);
  } catch (error) {
    console.log(error.stack);
    res.status(500).send(error.message);
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    res.status(202).send(updatedUser);
  } catch (error) {
    console.log(error.stack);
    res.status(500).send(error.message);
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(202).send(deletedUser);
  } catch (error) {
    console.log(error.stack);
    res.status(400).send("Error deleting user");
  }
};

module.exports = {
  index,
  show,
  create,
  edit,
  destroy
}