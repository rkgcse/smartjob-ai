const Job = require("./models/job");
const User = require("./models/User");

module.exports = async (req, res) => {
  const user = await User.findById(req.user.id);

  const jobs = await Job.find();

  const matched = jobs.filter(job =>
    job.skills.some(skill =>
      user.skills?.includes(skill)
    )
  );

  res.json(matched);
};