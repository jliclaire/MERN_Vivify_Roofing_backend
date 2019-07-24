const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

const generateHash = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

const checkPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
}

const generateUser = async (
  name,
  email,
  password,
  phone,
  role
) => {
  const hash = await generateHash(password);
  const newUser = new User({
    name,
    passwordDigest: hash,
    role,
    phone,
    email
  })
  return await newUser.save();
}

const modifyUser = async (
  id,
  name,
  password,
  role,
  phone,
  email
) => {
  const hash = await generateHash(password);
  const modifiedUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      passwordDigest: hash,
      role,
      phone,
      email
    },
    { new: true }
  )
  return await modifiedUser;
}

const generateAccessToken = async (user) => {
  try {
    return jwt.sign(user, process.env.JWT_SECRET)
  } catch (error) {
    console.log(error.stack)
  }
}

module.exports = {
  generateHash,
  checkPassword,
  generateUser,
  generateAccessToken,
  modifyUser
}