const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  dob: String,
  category: String,
  state: String,
  education: String,
  cv_url: String,
  cv_data: Object
});

module.exports = mongoose.model("User", userSchema);
