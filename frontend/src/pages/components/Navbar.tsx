import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="w-full bg-black text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">SmartJob Admin</h1>

      <div className="flex gap-6">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-job">Add Job</Link>
        <Link to="/users">Users</Link>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}