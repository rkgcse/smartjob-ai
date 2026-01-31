import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
    </>
  );
}

const API = "https://smartjob-ai.onrender.com";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(`${API}/api/admin/login`, {
        email,
        password
      });

      localStorage.setItem("adminToken", res.data.token);
      window.location.href = "/admin/dashboard";
    } catch {
      alert("Invalid admin login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Admin Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}