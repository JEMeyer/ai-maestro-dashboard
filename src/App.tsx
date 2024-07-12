import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Unauthorized from "./components/Pages/Unauthorized";
import PrivateRoute from "./components/Core/PrivateRoute";
import Callback from "./components/Core/Callback";
import LoadingWrapper from "./components/Core/LoadingWrapper";
import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import Header from "./components/Header/Header";
import NotFound from "./components/Pages/NotFound";
import About from "./components/Header/About";
import Contact from "./components/Header/Contact";
import Unauthenticated from "./components/Pages/Unauthenticated";
import { ConfigurationVisualizer } from "./components/Configuration/ConfigurationVisualizer";

function App() {
  return (
    <Router>
      <RecoilRoot>
        <CookiesProvider>
          <LoadingWrapper>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/callback" element={<Callback />} />
              <Route
                path="/configuration"
                element={<PrivateRoute element={<ConfigurationVisualizer />} />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/unauthenticated" element={<Unauthenticated />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LoadingWrapper>
        </CookiesProvider>
      </RecoilRoot>
    </Router>
  );
}

export default App;
