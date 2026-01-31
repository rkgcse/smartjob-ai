app.post("/api/admin/add-job", adminOnly, async (req, res) => {
  await Job.create(req.body);
  res.send({ message: "Job added" });
});
