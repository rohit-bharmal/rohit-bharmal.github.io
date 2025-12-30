import { createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

const getCleanDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: mode === "light" ? "#6366f1" : "#8b5cf6",
      light: mode === "light" ? "#a78bfa" : "#c4b5fd",
      dark: mode === "light" ? "#4f46e5" : "#7c3aed",
    },
    secondary: {
      main: mode === "light" ? "#64748b" : "#94a3b8",
      light: mode === "light" ? "#94a3b8" : "#cbd5e1",
      dark: mode === "light" ? "#475569" : "#64748b",
    },
    background: {
      default: mode === "light" ? "#fafafa" : "#0f0f23",
      paper: mode === "light" ? "#ffffff" : "#1a1a2e",
    },
    text: {
      primary: mode === "light" ? "#1a1a2e" : "#f8fafc",
      secondary: mode === "light" ? "#64748b" : "#94a3b8",
    },
    divider: mode === "light" ? "#f1f5f9" : "#334155",
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "clamp(2.5rem, 5vw, 4rem)",
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 600,
      fontSize: "clamp(1.875rem, 4vw, 2.5rem)",
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600,
      fontSize: "clamp(1.5rem, 3vw, 2rem)",
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1.125rem",
      lineHeight: 1.7,
      fontWeight: 400,
    },
    body2: {
      fontSize: "1rem",
      lineHeight: 1.6,
      fontWeight: 400,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          scrollBehavior: "smooth",
        },
        body: {
          fontFamily:
            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        "::selection": {
          background:
            mode === "light"
              ? "rgba(37, 99, 235, 0.2)"
              : "rgba(59, 130, 246, 0.3)",
          color: "inherit",
        },
        "::-webkit-scrollbar": {
          width: "6px",
        },
        "::-webkit-scrollbar-track": {
          background: mode === "light" ? "#f1f5f9" : "#1e293b",
        },
        "::-webkit-scrollbar-thumb": {
          background: mode === "light" ? "#cbd5e1" : "#475569",
          borderRadius: "3px",
        },
        "::-webkit-scrollbar-thumb:hover": {
          background: mode === "light" ? "#94a3b8" : "#64748b",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: "8px",
          padding: "10px 24px",
          fontSize: "0.95rem",
          transition: "all 0.2s ease-in-out",
        } as const,
        contained: {
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            transform: "translateY(-1px)",
          },
        } as const,
        outlined: {
          borderWidth: "1.5px",
          "&:hover": {
            borderWidth: "1.5px",
            transform: "translateY(-1px)",
          },
        } as const,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          border: `1px solid ${mode === "light" ? "#e2e8f0" : "#334155"}`,
          boxShadow:
            mode === "light"
              ? "0 1px 3px rgba(0, 0, 0, 0.1)"
              : "0 1px 3px rgba(0, 0, 0, 0.3)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow:
              mode === "light"
                ? "0 8px 25px rgba(0, 0, 0, 0.1)"
                : "0 8px 25px rgba(0, 0, 0, 0.4)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          fontWeight: 500,
          fontSize: "0.875rem",
          border: `1px solid ${mode === "light" ? "#e2e8f0" : "#334155"}`,
          backgroundColor: mode === "light" ? "#f8fafc" : "#1e293b",
          "&:hover": {
            backgroundColor: mode === "light" ? "#f1f5f9" : "#334155",
          },
        },
      },
    },
  },
});

export const createCleanTheme = (mode: PaletteMode) =>
  createTheme(getCleanDesignTokens(mode));
