import { useState } from "react";
import axios from "axios";

const API = "https://smartjob-ai.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${API}/api/user/login`, {
        email,
        password,
      });

      // Save JWT token
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;