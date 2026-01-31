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

export default function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState("");
  const [applyLink, setApplyLink] = useState("");

  const addJob = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      await axios.post(
        `${API}/api/admin/add-job`,
        {
          title,
          company,
          skills: skills.split(","),
          applyLink
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      alert("Job added!");
      setTitle("");
      setCompany("");
      setSkills("");
      setApplyLink("");
    } catch {
      alert("Failed to add job");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <input className="border p-2 block mb-2 w-full" placeholder="Job Title" onChange={e => setTitle(e.target.value)} />
      <input className="border p-2 block mb-2 w-full" placeholder="Company" onChange={e => setCompany(e.target.value)} />
      <input className="border p-2 block mb-2 w-full" placeholder="Skills (comma separated)" onChange={e => setSkills(e.target.value)} />
      <input className="border p-2 block mb-4 w-full" placeholder="Apply Link" onChange={e => setApplyLink(e.target.value)} />

      <button onClick={addJob} className="bg-green-600 text-white px-6 py-2 rounded">
        Add Job
      </button>
    </div>
  );
}