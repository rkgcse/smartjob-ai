app.post("/api/admin/login", async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(401).send("Invalid");

  const ok = await bcrypt.compare(req.body.password, admin.password);
  if (!ok) return res.status(401).send("Invalid");

  const token = jwt.sign({ id: admin._id, role: "admin" }, "SECRET");
  res.send({ token });
});
