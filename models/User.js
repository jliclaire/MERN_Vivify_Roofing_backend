const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  passwordDigest: String,
  role: String, //the position of this person, a rep, management
  phone: String,
  email: String,
  admin: Boolean
});

module.exports = mongoose.model("User", userSchema);
