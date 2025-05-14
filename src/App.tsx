// src/App.tsx
import {
  BrowserRouter as Router,
  useLocation,
  Routes,
  Route,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CssBaseline, GlobalStyles } from "@mui/material";
import PageWrapper from "./components/PageWrapper";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { ThemeProviderWrapper } from "./theme/ThemeContext";

const globalStyles = {
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  "html, body": {
    minHeight: "100vh",
    width: "100%",
  },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />
        <Route
          path="/projects"
          element={
            <PageWrapper>
              <Projects />
            </PageWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProviderWrapper>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <Router>
        <AnimatedRoutes />
      </Router>
    </ThemeProviderWrapper>
  );
}

export default App;
