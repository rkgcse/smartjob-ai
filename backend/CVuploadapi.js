const multer = require("multer");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const FormData = require("form-data");
const User = require("./models/Job");

const upload = multer();

module.exports = (app) => {

  app.post("/api/upload-cv", upload.single("cv"), async (req, res) => {
    try {
      const token = req.headers.authorization;
      const data = jwt.verify(token, "SECRET");

      const formData = new FormData();
      formData.append("file", req.file.buffer, req.file.originalname);

      // 🚨 Replace this with your real deployed AI CV URL
      const AI_CV_URL = "https://cv-ai-production.up.railway.app/parse-cv";

      const aiRes = await axios.post(AI_CV_URL, formData, {
        headers: formData.getHeaders(),
      });

      await User.findByIdAndUpdate(data.id, {
        cv_data: aiRes.data,
      });

      res.json({ message: "CV analyzed successfully", data: aiRes.data });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "CV processing failed" });
    }
  });

};