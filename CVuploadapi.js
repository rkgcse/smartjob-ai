const multer = require("multer");
const axios = require("axios");
const upload = multer();

app.post("/api/upload-cv", upload.single("cv"), async (req, res) => {
  const token = req.headers.authorization;
  const data = jwt.verify(token, "SECRET");

  const formData = new FormData();
  formData.append("file", req.file.buffer, req.file.originalname);

  const aiRes = await axios.post("http://localhost:8000/parse-cv", formData, {
    headers: formData.getHeaders()
  });

  await User.findByIdAndUpdate(data.id, {
    cv_data: aiRes.data
  });

  res.send({ message: "CV analyzed" });
});
