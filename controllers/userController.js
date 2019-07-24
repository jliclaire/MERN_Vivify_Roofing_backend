const User = require("../models/User");

const getSales = async (req, res) => {
  try {
    const salesUsers = await User.find({role: "Sales"})
    res.status(200).send(salesUsers)
  } catch (error) {
    console.log(error.stack);
    res.status(500).send("error getting users")
  }
}

const names = async (req, res) => {
  try {
    const users = await User.find();
    usernames = users.map((user) => user.name)
    res.status(200).send(usernames);
  } catch (error) {
    console.log(error.stack);
    res.status(500).send("error getting usernames")
  }
}

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(202).send(deletedUser);
  } catch (error) {
    console.log(error.stack);
    res.status(500).send("Error deleting user");
  }
};

module.exports = {
  names,
  destroy
}