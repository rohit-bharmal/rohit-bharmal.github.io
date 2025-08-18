import React, { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import { createSuperiorTheme } from "./theme";

interface ThemeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: "dark",
  toggleColorMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>("dark");

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );

  const theme = useMemo(() => createSuperiorTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
