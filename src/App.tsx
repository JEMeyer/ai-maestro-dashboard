import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Unauthorized from "./components/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import GpuLockGrid from "./components/GpuLockGrid";
import Callback from "./components/Callback";
import LoadingWrapper from "./components/LoadingWrapper";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import { ConfigProvider } from "./contexts/configuration/ConfigProvider";
import { AppProvider } from "./contexts/app/AppProvider";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import Header from "./components/Header";
import ConfigEditor from "./components/ConfigEditor";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <RecoilRoot>
        <CookiesProvider>
          <ConfigProvider>
            <AppProvider>
              <AuthProvider>
                <LoadingWrapper>
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/callback" element={<Callback />} />
                    <Route
                      path="/config"
                      element={<PrivateRoute element={<ConfigEditor />} />}
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
                    <Route path="*" element={<NotFound />} />
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
