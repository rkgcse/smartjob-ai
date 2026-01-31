require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

mongoose.connect(process.env.MONGO_URI);

const Admin = mongoose.model("Admin", new mongoose.Schema({
  email: String,
  password: String
}));

(async () => {
  await Admin.deleteMany({});

  const hash = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "admin@smartjob.ai",
    password: hash
  });

  console.log("ADMIN CREATED");
  process.exit();
})();