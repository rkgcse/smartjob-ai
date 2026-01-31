const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  minQualification: String,
  skills: [String],
  applyLink: String,
});

module.exports = mongoose.model("Job", jobSchema);