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
  password,
  role,
  phone,
  email,
  admin
) => {
  const hash = await generateHash(password);
  const newUser = new User({
    name,
    passwordDigest: hash,
    role,
    phone,
    email,
    admin
  })
  return await newUser.save();
}

const generateAccessToken = async ({ email, name, role }) => {
  return jwt.sign({ email, name, role }, process.env.JWT_SECRET)
}

module.exports = {
  generateHash,
  checkPassword,
  generateUser,
  generateAccessToken
}