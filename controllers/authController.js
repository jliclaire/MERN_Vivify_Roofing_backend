const User = require("../models/User");
const { checkPassword, generateUser, generateAccessToken } = require('../utils/auth')

const login = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const query = await User.findOne({email: email})
      if (query !== null) {
        const result = await checkPassword(password, query.passwordDigest);
        if (!result) {
          return res.status(403).send('bad credentials');
        } else {
          const token = await generateAccessToken(query);
          return res.send({ token });
        }
      } else {
        return res.status(403).send('bad credentials');
      }
    } catch (error) {
      return res.status(404).send('an error occured');
    }
  } else {
    return res.status(403).send('bad credentials');
  }
}

const register = async (req, res) => {
  const { name, email, password, role, phone, admin } = req.body;
  if (email && password) {
    try {
      const query = await User.findOne({email: email})
      if (query === null) {
        const user = await generateUser(
          name,
          password,
          role,
          phone,
          email,
          admin
        );
        const token = await generateAccessToken(user);
        return res.send({ token })
      }
    } catch (error) {
      return res.status(404).send('an error occurred')
    }
  } else {
    return res.status(403).send('bad credentials')
  }
}

const allUsers = async (req, res) => {
  // For DEBUG only
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error.stack);
    res.send("error getting users")
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(202).send(`Deleted user ${deletedUser.id}`);
  } catch (error) {
    console.log(error.stack);
    res.send("Error deleting user");
  }
}

module.exports = {
  login,
  register,
  allUsers,
  deleteUser
}