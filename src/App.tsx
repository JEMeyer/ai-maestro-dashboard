import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Unauthorized from "./components/Unauthorized";
import { AuthProvider } from "./contexts/auth";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import GpuLockGrid from "./components/protected/GpuLockGrid";
import { ConfigProvider } from "./contexts/configuration/ConfigProvider";

function App() {
  return (
    <Router>
      <ConfigProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<GpuLockGrid />} />}
            />
            <Route
              path="/adminDashboad"
              element={
                <PrivateRoute element={<GpuLockGrid />} requiredRole="admin" />
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </AuthProvider>
      </ConfigProvider>
    </Router>
  );
}

export default App;
