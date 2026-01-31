app.get("/api/profile", async (req, res) => {
  const token = req.headers.authorization;
  const data = jwt.verify(token, "SECRET");

  const user = await User.findById(data.id);
  res.send(user);
});
