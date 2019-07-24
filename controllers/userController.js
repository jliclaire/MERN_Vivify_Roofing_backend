const User = require("../models/User");
const { modifyUser } = require('../utils/auth')

const getSales = async (req, res) => {
  try {
    const salesUsers = await User.find({role: "Sales"})
    res.status(200).send(salesUsers)
  } catch (error) {
    console.log(error.stack);
    res.status(500).send("error getting users")
  }
}

const editUser = async (req, res) => {
  let { name, email, password, role, phone } = req.body;
  email = email.toLowerCase();
  if (email && password) {
    try {
      const query = await User.findOne({ email: email });
      if (query) {
        const user = await modifyUser(
          name,
          password,
          role,
          phone,
          email
        );
        const token = await generateAccessToken(user);
        return res.status(201).send({ token })
      }
    } catch (error) {
      return res.status(404).send("an error occurred");
    }
  } else {
    return res.status(403).send("bad credentials");
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
  getSales,
  names,
  destroy,
  editUser
}