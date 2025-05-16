// src/App.tsx
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProviderWrapper } from "./theme/ThemeContext";
import MainPage from "./components/MainPage";

const globalStyles = {
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
    scrollBehavior: "smooth",
  },
  "html, body": {
    minHeight: "100vh",
    width: "100%",
    margin: 0,
    padding: 0,
    overflow: "auto",
  },
  "#root": {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  section: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    scrollMarginTop: "56px", // Account for mobile header
    padding: "0 0 80px", // Remove top padding, keep bottom padding
    "& > *": {
      width: "100%",
    },
  },
};

function App() {
  return (
    <ThemeProviderWrapper>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <MainPage />
    </ThemeProviderWrapper>
  );
}

export default App;
