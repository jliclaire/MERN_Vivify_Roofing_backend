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
  email,
  password,
  role,
  phone,
  email,
  admin
) => {
  const hash = await generateHash(password);
  const newUser = new User({
    email,
    password,
    role,
    phone,
    email,
    admin
  })
  return await newUser.save();
}

const generateAccessToken = async ({ name }) => {
  return jwt.sign({ name }, process.env.JWT_SECRET)
}

module.exports = {
  checkPassword,
  generateUser,
  generateAccessToken
}