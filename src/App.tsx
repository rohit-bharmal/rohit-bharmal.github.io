import { CssBaseline } from "@mui/material";
import { ThemeProviderWrapper } from "./theme/ThemeContext";
import MainPage from "./components/MainPage";

function App() {
  return (
    <ThemeProviderWrapper>
      <CssBaseline />
      <MainPage />
    </ThemeProviderWrapper>
  );
}

export default App;
