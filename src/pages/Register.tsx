import { useState } from "react";
import axios from "axios";

const API = "https://smartjob-ai.onrender.com"; // your Render backend

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API}/api/user/register`, {
        name,
        email,
        password,
      });

      alert("Registered successfully 🎉");
      console.log(res.data);
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto" }}>
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          required
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
          required
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p style={{ marginTop: "15px", textAlign: "center" }}>
  Already have an account?{" "}
  <a
    href="/login"
    style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
  >
    Login
  </a>
</p>
    </div>
  );
}

export default Register;