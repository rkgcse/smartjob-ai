function adminOnly(req, res, next) {
  const token = req.headers.authorization;
  const data = jwt.verify(token, "SECRET");

  if (data.role !== "admin") return res.status(403).send("Access denied");
  req.adminId = data.id;
  next();
}
