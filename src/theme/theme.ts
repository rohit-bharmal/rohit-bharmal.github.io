// src/theme/theme.ts
import { createTheme, PaletteMode } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    gradient: {
      primary: string;
      secondary: string;
      accent: string;
    };
    glass: {
      background: string;
      border: string;
    };
  }

  interface PaletteOptions {
    gradient?: {
      primary?: string;
      secondary?: string;
      accent?: string;
    };
    glass?: {
      background?: string;
      border?: string;
    };
  }
}

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: mode === "light" ? "#6366f1" : "#8b5cf6",
      light: mode === "light" ? "#818cf8" : "#a78bfa",
      dark: mode === "light" ? "#4f46e5" : "#7c3aed",
    },
    secondary: {
      main: mode === "light" ? "#ec4899" : "#f59e0b",
      light: mode === "light" ? "#f472b6" : "#fbbf24",
      dark: mode === "light" ? "#db2777" : "#d97706",
    },
    background: {
      default:
        mode === "light"
          ? "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)"
          : "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      paper:
        mode === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(30, 41, 59, 0.8)",
    },
    text: {
      primary: mode === "light" ? "#1e293b" : "#f1f5f9",
      secondary: mode === "light" ? "#64748b" : "#94a3b8",
    },
    gradient: {
      primary:
        mode === "light"
          ? "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)"
          : "linear-gradient(135deg, #8b5cf6 0%, #f59e0b 100%)",
      secondary:
        mode === "light"
          ? "linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)"
          : "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
      accent:
        mode === "light"
          ? "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)"
          : "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    },
    glass: {
      background:
        mode === "light"
          ? "rgba(255, 255, 255, 0.25)"
          : "rgba(30, 41, 59, 0.25)",
      border:
        mode === "light"
          ? "rgba(255, 255, 255, 0.5)"
          : "rgba(148, 163, 184, 0.2)",
    },
  },
  typography: {
    fontFamily: "'Inter', 'SF Pro Display', 'Segoe UI', sans-serif",
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.04em",
      background:
        mode === "light"
          ? "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)"
          : "linear-gradient(135deg, #8b5cf6 0%, #f59e0b 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.03em",
    },
    h3: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    body1: {
      fontSize: "1.125rem",
      lineHeight: 1.75,
      fontWeight: 400,
    },
    body2: {
      lineHeight: 1.65,
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "12px",
          padding: "12px 32px",
          fontSize: "1rem",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              mode === "light"
                ? "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)"
                : "linear-gradient(135deg, #8b5cf6 0%, #f59e0b 100%)",
            opacity: 0,
            transition: "opacity 0.3s ease",
            zIndex: -1,
          },
          "&:hover::before": {
            opacity: 0.1,
          },
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow:
              mode === "light"
                ? "0 20px 40px rgba(99, 102, 241, 0.3)"
                : "0 20px 40px rgba(139, 92, 246, 0.3)",
          },
        },
        contained: {
          background:
            mode === "light"
              ? "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)"
              : "linear-gradient(135deg, #8b5cf6 0%, #f59e0b 100%)",
          color: "#ffffff",
          boxShadow:
            mode === "light"
              ? "0 8px 32px rgba(99, 102, 241, 0.3)"
              : "0 8px 32px rgba(139, 92, 246, 0.3)",
          "&:hover": {
            background:
              mode === "light"
                ? "linear-gradient(135deg, #5b56f0 0%, #ea4298 100%)"
                : "linear-gradient(135deg, #8555f5 0%, #f49e0e 100%)",
            boxShadow:
              mode === "light"
                ? "0 12px 40px rgba(99, 102, 241, 0.4)"
                : "0 12px 40px rgba(139, 92, 246, 0.4)",
          },
        },
        outlined: {
          borderWidth: "2px",
          borderColor: mode === "light" ? "#6366f1" : "#8b5cf6",
          color: mode === "light" ? "#6366f1" : "#8b5cf6",
          background:
            mode === "light"
              ? "rgba(255, 255, 255, 0.8)"
              : "rgba(30, 41, 59, 0.8)",
          backdropFilter: "blur(20px)",
          "&:hover": {
            borderColor: mode === "light" ? "#ec4899" : "#f59e0b",
            color: mode === "light" ? "#ec4899" : "#f59e0b",
            background:
              mode === "light"
                ? "rgba(255, 255, 255, 0.9)"
                : "rgba(30, 41, 59, 0.9)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          background:
            mode === "light"
              ? "rgba(255, 255, 255, 0.25)"
              : "rgba(30, 41, 59, 0.25)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${
            mode === "light"
              ? "rgba(255, 255, 255, 0.5)"
              : "rgba(148, 163, 184, 0.2)"
          }`,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              mode === "light"
                ? "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)"
                : "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)",
            opacity: 0,
            transition: "opacity 0.3s ease",
          },
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow:
              mode === "light"
                ? "0 25px 50px rgba(99, 102, 241, 0.25)"
                : "0 25px 50px rgba(139, 92, 246, 0.25)",
            "&::before": {
              opacity: 1,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor:
            mode === "light"
              ? "rgba(99, 102, 241, 0.1)"
              : "rgba(139, 92, 246, 0.1)",
          color: mode === "light" ? "#6366f1" : "#8b5cf6",
          borderRadius: "12px",
          fontWeight: 500,
          border: `1px solid ${
            mode === "light"
              ? "rgba(99, 102, 241, 0.2)"
              : "rgba(139, 92, 246, 0.2)"
          }`,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor:
              mode === "light"
                ? "rgba(99, 102, 241, 0.2)"
                : "rgba(139, 92, 246, 0.2)",
            transform: "translateY(-1px)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-2px) scale(1.1)",
            background:
              mode === "light"
                ? "rgba(99, 102, 241, 0.1)"
                : "rgba(139, 92, 246, 0.1)",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            mode === "light"
              ? "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)"
              : "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        },
        "*": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: mode === "light" ? "#f1f5f9" : "#1e293b",
          },
          "&::-webkit-scrollbar-thumb": {
            background:
              mode === "light"
                ? "linear-gradient(135deg, #6366f1, #ec4899)"
                : "linear-gradient(135deg, #8b5cf6, #f59e0b)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background:
              mode === "light"
                ? "linear-gradient(135deg, #5b56f0, #ea4298)"
                : "linear-gradient(135deg, #8555f5, #f49e0e)",
          },
        },
      },
    },
  },
});

export const createAppTheme = (mode: PaletteMode) =>
  createTheme(getDesignTokens(mode));
