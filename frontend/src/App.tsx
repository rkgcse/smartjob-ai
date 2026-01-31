import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import Users from "./pages/Users";

function App() {
  const isAdminLoggedIn = !!localStorage.getItem("adminToken");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-login" />} />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/dashboard"
          element={isAdminLoggedIn ? <Dashboard /> : <Navigate to="/admin-login" />}
        />

        <Route
          path="/add-job"
          element={isAdminLoggedIn ? <AddJob /> : <Navigate to="/admin-login" />}
        />

        <Route
          path="/users"
          element={isAdminLoggedIn ? <Users /> : <Navigate to="/admin-login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;