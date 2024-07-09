import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Unauthorized from "./components/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import GpuLockGrid from "./components/protected/GpuLockGrid";
import Callback from "./components/Callback";
import LoadingWrapper from "./components/LoadingWrapper";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import { ConfigProvider } from "./contexts/configuration/ConfigProvider";
import { AppProvider } from "./contexts/app/AppProvider";
import { AuthProvider } from "./contexts/auth/AuthProvider";

function App() {
  return (
    <Router>
      <RecoilRoot>
        <CookiesProvider>
          <ConfigProvider>
            <AppProvider>
              <AuthProvider>
                <LoadingWrapper>
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
                </LoadingWrapper>
              </AuthProvider>
            </AppProvider>
          </ConfigProvider>
        </CookiesProvider>
      </RecoilRoot>
    </Router>
  );
}

export default App;
