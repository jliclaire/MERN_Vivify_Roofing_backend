const User = require("../models/User");
const {
  checkPassword,
  generateUser,
  generateAccessToken
} = require("../utils/auth");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const query = await User.findOne({ email: email });
      if (query !== null) {
        const result = await checkPassword(password, query.passwordDigest);
        if (!result) {
          return res.status(403).send("bad credentials");
        } else {
          const token = await generateAccessToken(query);
          return res.send({ token });
        }
      } else {
        return res.status(403).send("bad credentials");
      }
    } catch (error) {
      return res.status(404).send("an error occured");
    }
  } else {
    return res.status(403).send("bad credentials");
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;
  // const { name, email, password, role, phone, admin } = req.body;
  if (email && password) {
    try {
      const query = await User.findOne({ email: email });
      if (query === null) {
        const user = await generateUser(
          email,
          password
          // role,
          // phone,
          // name,
          // admin
        );
        const token = await generateAccessToken(user);
        return res.send({ token });
      }
    } catch (error) {
      return res.status(404).send("an error occurred");
    }
  } else {
    return res.status(403).send("bad credentials");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(202).send(`Deleted user ${deletedUser.id}`);
  } catch (error) {
    console.log(error.stack);
    res.send("Error deleting user");
  }
};

module.exports = {
  login,
  register,
  deleteUser
};
