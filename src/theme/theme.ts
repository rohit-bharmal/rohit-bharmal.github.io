// src/theme/theme.ts
import { createTheme, PaletteMode } from "@mui/material/styles";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: mode === "light" ? "#1a1a1a" : "#64ffda",
      light: mode === "light" ? "#333333" : "#a7ffeb",
      dark: mode === "light" ? "#000000" : "#00bfa5",
    },
    secondary: {
      main: mode === "light" ? "#666666" : "#7c4dff",
      light: mode === "light" ? "#999999" : "#b47cff",
      dark: mode === "light" ? "#333333" : "#3f1dcb",
    },
    background: {
      default: mode === "light" ? "#ffffff" : "#0a192f",
      paper: mode === "light" ? "#f5f5f5" : "#112240",
    },
    text: {
      primary: mode === "light" ? "#1a1a1a" : "#ccd6f6",
      secondary: mode === "light" ? "#666666" : "#8892b0",
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "1.1rem",
      lineHeight: 1.7,
    },
    body2: {
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        item: {
          "@media (max-width: 768px)": {
            paddingLeft: "16px !important",
            paddingRight: "16px !important",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor:
            mode === "light"
              ? "rgba(0, 0, 0, 0.08)"
              : "rgba(100, 255, 218, 0.1)",
          color: mode === "light" ? "#1a1a1a" : "#64ffda",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: mode === "light" ? "#ffffff" : "#0a192f",
        },
      },
    },
  },
});

export const createAppTheme = (mode: PaletteMode) =>
  createTheme(getDesignTokens(mode));
