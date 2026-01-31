import { useState } from "react";
import axios from "axios";

const API = "https://smartjob-ai.onrender.com";

function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a CV");

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("cv", file);

    try {
      setLoading(true);

      await axios.post(`${API}/api/upload-cv`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      alert("CV uploaded & analyzed 🎯");
      window.location.href = "/dashboard";
    } catch {
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Upload Your CV</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files![0])}
      />

      <br /><br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload CV"}
      </button>
    </div>
  );
}

export default Upload;