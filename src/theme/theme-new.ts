// src/theme/theme-new.ts - Premium theme with exceptional design
import { createTheme, PaletteMode } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    gradient: {
      primary: string;
      secondary: string;
      accent: string;
      rainbow: string;
    };
    glass: {
      background: string;
      backdrop: string;
      border: string;
    };
    glow: {
      primary: string;
      secondary: string;
    };
  }

  interface PaletteOptions {
    gradient?: {
      primary?: string;
      secondary?: string;
      accent?: string;
      rainbow?: string;
    };
    glass?: {
      background?: string;
      backdrop?: string;
      border?: string;
    };
    glow?: {
      primary?: string;
      secondary?: string;
    };
  }
}

const getSuperiorDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: mode === "light" ? "#1e40af" : "#3b82f6",
      light: mode === "light" ? "#3b82f6" : "#60a5fa",
      dark: mode === "light" ? "#1e3a8a" : "#2563eb",
    },
    secondary: {
      main: mode === "light" ? "#7c3aed" : "#a855f7",
      light: mode === "light" ? "#a855f7" : "#c084fc",
      dark: mode === "light" ? "#6d28d9" : "#9333ea",
    },
    background: {
      default: mode === "light" ? "#ffffff" : "#020617",
      paper:
        mode === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(2, 6, 23, 0.8)",
    },
    text: {
      primary: mode === "light" ? "#0f172a" : "#f8fafc",
      secondary: mode === "light" ? "#334155" : "#e2e8f0",
    },
    divider:
      mode === "light" ? "rgba(15, 23, 42, 0.1)" : "rgba(248, 250, 252, 0.1)",
    gradient: {
      primary:
        mode === "light"
          ? "linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #ec4899 100%)"
          : "linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #f472b6 100%)",
      secondary:
        mode === "light"
          ? "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f59e0b 100%)"
          : "linear-gradient(135deg, #a855f7 0%, #f472b6 50%, #fbbf24 100%)",
      accent:
        mode === "light"
          ? "linear-gradient(135deg, #06b6d4 0%, #1e40af 50%, #7c3aed 100%)"
          : "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #a855f7 100%)",
      rainbow:
        mode === "light"
          ? "linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #3b82f6, #8b5cf6, #ec4899)"
          : "linear-gradient(90deg, #dc2626, #ea580c, #ca8a04, #16a34a, #0891b2, #2563eb, #7c3aed, #db2777)",
    },
    glass: {
      background:
        mode === "light" ? "rgba(255, 255, 255, 0.1)" : "rgba(2, 6, 23, 0.1)",
      backdrop:
        mode === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(15, 23, 42, 0.8)",
      border:
        mode === "light"
          ? "rgba(148, 163, 184, 0.2)"
          : "rgba(100, 116, 139, 0.2)",
    },
    glow: {
      primary:
        mode === "light"
          ? "0 0 30px rgba(30, 64, 175, 0.3)"
          : "0 0 30px rgba(59, 130, 246, 0.4)",
      secondary:
        mode === "light"
          ? "0 0 30px rgba(124, 58, 237, 0.3)"
          : "0 0 30px rgba(168, 85, 247, 0.4)",
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", -apple-system, sans-serif',
    h1: {
      fontWeight: 900,
      letterSpacing: "-0.05em",
      fontSize: "clamp(2.5rem, 8vw, 7rem)",
      lineHeight: 0.9,
      background:
        mode === "light"
          ? "linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #ec4899 100%)"
          : "linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #f472b6 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    h2: {
      fontWeight: 800,
      letterSpacing: "-0.03em",
      fontSize: "clamp(1.5rem, 4vw, 3rem)",
      lineHeight: 1.1,
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      fontSize: "clamp(1.25rem, 3vw, 2rem)",
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
      fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
      lineHeight: 1.3,
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
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          scrollBehavior: "smooth",
          fontSize: "16px",
        },
        body: {
          margin: 0,
          padding: 0,
          fontFamily:
            '"Inter", "Segoe UI", "Roboto", -apple-system, sans-serif',
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "optimizeLegibility",
          fontFeatureSettings: '"cv03", "cv04", "cv11"',
          background: mode === "light" ? "#ffffff" : "#020617",
          color: mode === "light" ? "#0f172a" : "#f8fafc",
          minHeight: "100vh",
          overflow: "auto",
        },
        "::selection": {
          background:
            mode === "light"
              ? "rgba(30, 64, 175, 0.15)"
              : "rgba(59, 130, 246, 0.25)",
          color: "inherit",
        },
        "::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "::-webkit-scrollbar-track": {
          background: mode === "light" ? "#f1f5f9" : "#1e293b",
          borderRadius: "4px",
        },
        "::-webkit-scrollbar-thumb": {
          background:
            mode === "light"
              ? "linear-gradient(135deg, #1e40af, #7c3aed)"
              : "linear-gradient(135deg, #3b82f6, #a855f7)",
          borderRadius: "4px",
          border: `2px solid ${mode === "light" ? "#f1f5f9" : "#1e293b"}`,
        },
        "::-webkit-scrollbar-thumb:hover": {
          background:
            mode === "light"
              ? "linear-gradient(135deg, #1e3a8a, #6d28d9)"
              : "linear-gradient(135deg, #2563eb, #9333ea)",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: false,
        disableElevation: false,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "12px",
          padding: "12px 32px",
          fontSize: "1rem",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-2px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
        contained: {
          background:
            mode === "light"
              ? "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)"
              : "linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)",
          color: "#ffffff",
          boxShadow:
            mode === "light"
              ? "0 4px 14px rgba(30, 64, 175, 0.4)"
              : "0 4px 14px rgba(59, 130, 246, 0.4)",
          border: "none",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              mode === "light"
                ? "linear-gradient(135deg, #1e3a8a 0%, #6d28d9 100%)"
                : "linear-gradient(135deg, #2563eb 0%, #9333ea 100%)",
            opacity: 0,
            transition: "opacity 0.3s ease",
            zIndex: -1,
          },
          "&:hover": {
            boxShadow:
              mode === "light"
                ? "0 8px 25px rgba(30, 64, 175, 0.5)"
                : "0 8px 25px rgba(59, 130, 246, 0.5)",
            "&::before": {
              opacity: 1,
            },
          },
        },
        outlined: {
          borderWidth: "2px",
          borderColor: mode === "light" ? "#1e40af" : "#3b82f6",
          color: mode === "light" ? "#1e40af" : "#3b82f6",
          background:
            mode === "light"
              ? "rgba(255, 255, 255, 0.8)"
              : "rgba(2, 6, 23, 0.8)",
          backdropFilter: "blur(10px)",
          "&:hover": {
            borderColor: mode === "light" ? "#7c3aed" : "#a855f7",
            color: mode === "light" ? "#7c3aed" : "#a855f7",
            background:
              mode === "light"
                ? "rgba(30, 64, 175, 0.05)"
                : "rgba(59, 130, 246, 0.05)",
            boxShadow:
              mode === "light"
                ? "0 4px 14px rgba(30, 64, 175, 0.15)"
                : "0 4px 14px rgba(59, 130, 246, 0.15)",
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
              ? "rgba(255, 255, 255, 0.8)"
              : "rgba(2, 6, 23, 0.8)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${
            mode === "light"
              ? "rgba(148, 163, 184, 0.2)"
              : "rgba(100, 116, 139, 0.2)"
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
                ? "linear-gradient(135deg, rgba(30, 64, 175, 0.03), rgba(124, 58, 237, 0.03))"
                : "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.05))",
            opacity: 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          },
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow:
              mode === "light"
                ? "0 20px 40px rgba(30, 64, 175, 0.15)"
                : "0 20px 40px rgba(59, 130, 246, 0.15)",
            borderColor: mode === "light" ? "#1e40af" : "#3b82f6",
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
              ? "rgba(30, 64, 175, 0.1)"
              : "rgba(59, 130, 246, 0.1)",
          color: mode === "light" ? "#1e40af" : "#3b82f6",
          borderRadius: "10px",
          fontWeight: 600,
          fontSize: "0.875rem",
          border: `1px solid ${
            mode === "light"
              ? "rgba(30, 64, 175, 0.2)"
              : "rgba(59, 130, 246, 0.2)"
          }`,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor:
              mode === "light"
                ? "rgba(30, 64, 175, 0.15)"
                : "rgba(59, 130, 246, 0.15)",
            transform: "translateY(-1px)",
            boxShadow:
              mode === "light"
                ? "0 4px 8px rgba(30, 64, 175, 0.2)"
                : "0 4px 8px rgba(59, 130, 246, 0.2)",
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
            transform: "translateY(-2px) scale(1.05)",
            background:
              mode === "light"
                ? "rgba(30, 64, 175, 0.1)"
                : "rgba(59, 130, 246, 0.1)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "transparent",
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${
            mode === "light"
              ? "rgba(148, 163, 184, 0.1)"
              : "rgba(100, 116, 139, 0.1)"
          }`,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "16px",
          paddingRight: "16px",
          "@media (min-width: 600px)": {
            paddingLeft: "24px",
            paddingRight: "24px",
          },
          "@media (min-width: 1200px)": {
            paddingLeft: "32px",
            paddingRight: "32px",
          },
        },
      },
    },
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
});

export const createSuperiorTheme = (mode: PaletteMode) =>
  createTheme(getSuperiorDesignTokens(mode));
