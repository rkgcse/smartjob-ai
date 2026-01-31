require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ================= MONGODB =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ================= MODELS =================
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
}));

const Admin = mongoose.model("Admin", new mongoose.Schema({
  email: String,
  password: String,
}));

// ================= USER AUTH =================
app.post("/api/user/register", async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User exists" });

  const hash = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hash });
  res.json({ message: "User registered" });
});

app.post("/api/user/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid" });

  const token = jwt.sign({ id: user._id }, "SECRET");
  res.json({ token });
});

// ================= ADMIN LOGIN =================
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid admin" });

  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) return res.status(401).json({ message: "Invalid admin" });

  const token = jwt.sign({ id: admin._id, role: "admin" }, "SECRET");
  res.json({ token });
});

// ================= AUTH MIDDLEWARE =================
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    req.user = jwt.verify(token, "SECRET");
    next();
  } catch {
    res.status(401).send("Unauthorized");
  }
};

// ================= MATCH JOBS =================
app.get("/api/match-jobs", auth, async (req, res) => {
  res.json([]); // temporary (we will connect matching later)
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));