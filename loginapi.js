const jwt = require("jsonwebtoken");

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("Invalid");

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(401).send("Invalid");

  const token = jwt.sign({ id: user._id }, "SECRET");
  res.send({ token });
});
