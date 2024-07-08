import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Unauthorized from "./components/Unauthorized";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";
import GpuLockGrid from "./components/protected/GpuLockGrid";
import { ConfigProvider } from "./contexts/configuration/ConfigProvider";
import Callback from "./components/Callback";
import { CookiesProvider } from "react-cookie";
import { AppProvider } from "./contexts/app/AppProvider";

function App() {
  return (
    <Router>
      <CookiesProvider>
        <ConfigProvider>
          <AuthProvider>
            <AppProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/callback" element={<Callback />} />
                <Route
                  path="/dashboard"
                  element={<PrivateRoute element={<GpuLockGrid />} />}
                />
                <Route
                  path="/adminDashboad"
                  element={
                    <PrivateRoute
                      element={<GpuLockGrid />}
                      requiredRole="admin"
                    />
                  }
                />
                <Route path="/unauthorized" element={<Unauthorized />} />
              </Routes>
            </AppProvider>
          </AuthProvider>
        </ConfigProvider>
      </CookiesProvider>
    </Router>
  );
}

export default App;
