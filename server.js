const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});

const User = require("./models/User");
const bcrypt = require("bcryptjs");

app.post("/api/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = new User({ ...req.body, password: hashed });
  await user.save();
  res.send({ message: "User registered" });
});
