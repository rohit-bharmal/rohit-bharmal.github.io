// src/App.tsx
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProviderWrapper } from "./theme/ThemeContext";
import MainPage from "./components/MainPage";

const superiorGlobalStyles = {
  // Reset and base styles
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  html: {
    scrollBehavior: "smooth",
    fontSize: "16px",
    height: "100%",
  },
  body: {
    margin: 0,
    padding: 0,
    height: "100%",
    fontFamily: '"Inter", "Segoe UI", "Roboto", -apple-system, sans-serif',
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    textRendering: "optimizeLegibility",
    fontFeatureSettings: '"cv03", "cv04", "cv11"',
    lineHeight: 1.5,
    overflowX: "hidden",
  },
  "#root": {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },

  // Premium Keyframe Animations
  "@keyframes pulse": {
    "0%, 100%": { opacity: 1, transform: "scale(1)" },
    "50%": { opacity: 0.8, transform: "scale(1.05)" },
  },
  "@keyframes float": {
    "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
    "33%": { transform: "translateY(-10px) rotate(1deg)" },
    "66%": { transform: "translateY(-5px) rotate(-1deg)" },
  },
  "@keyframes glow": {
    "0%, 100%": {
      boxShadow: "0 0 20px rgba(30, 64, 175, 0.3)",
      filter: "brightness(1)",
    },
    "50%": {
      boxShadow:
        "0 0 40px rgba(30, 64, 175, 0.6), 0 0 60px rgba(124, 58, 237, 0.4)",
      filter: "brightness(1.1)",
    },
  },
  "@keyframes shimmer": {
    "0%": { backgroundPosition: "-200% 0" },
    "100%": { backgroundPosition: "200% 0" },
  },
  "@keyframes slideInUp": {
    "0%": {
      transform: "translateY(60px)",
      opacity: 0,
      filter: "blur(4px)",
    },
    "100%": {
      transform: "translateY(0)",
      opacity: 1,
      filter: "blur(0px)",
    },
  },
  "@keyframes slideInDown": {
    "0%": {
      transform: "translateY(-60px)",
      opacity: 0,
      filter: "blur(4px)",
    },
    "100%": {
      transform: "translateY(0)",
      opacity: 1,
      filter: "blur(0px)",
    },
  },
  "@keyframes fadeInScale": {
    "0%": {
      transform: "scale(0.8) rotate(-5deg)",
      opacity: 0,
      filter: "blur(4px)",
    },
    "100%": {
      transform: "scale(1) rotate(0deg)",
      opacity: 1,
      filter: "blur(0px)",
    },
  },
  "@keyframes rotateGlow": {
    "0%": {
      transform: "rotate(0deg)",
      filter: "hue-rotate(0deg) brightness(1)",
    },
    "100%": {
      transform: "rotate(360deg)",
      filter: "hue-rotate(360deg) brightness(1.2)",
    },
  },
  "@keyframes gradient": {
    "0%, 100%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
  },
  "@keyframes bounce": {
    "0%, 20%, 53%, 80%, 100%": {
      transform: "translate3d(0,0,0)",
    },
    "40%, 43%": {
      transform: "translate3d(0, -8px, 0)",
    },
    "70%": {
      transform: "translate3d(0, -4px, 0)",
    },
    "90%": {
      transform: "translate3d(0, -2px, 0)",
    },
  },

  // Utility Classes
  ".animate-pulse": {
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  ".animate-float": {
    animation: "float 6s ease-in-out infinite",
  },
  ".animate-glow": {
    animation: "glow 3s ease-in-out infinite",
  },
  ".animate-shimmer": {
    backgroundSize: "200% 100%",
    animation: "shimmer 3s ease-in-out infinite",
  },
  ".animate-gradient": {
    backgroundSize: "400% 400%",
    animation: "gradient 8s ease infinite",
  },
  ".animate-bounce": {
    animation: "bounce 1s infinite",
  },
  ".animate-slide-up": {
    animation: "slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards",
  },
  ".animate-slide-down": {
    animation: "slideInDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards",
  },
  ".animate-fade-scale": {
    animation: "fadeInScale 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
  },

  // Enhanced Selection Styles
  "::selection": {
    background: "rgba(30, 64, 175, 0.2)",
    color: "inherit",
    textShadow: "none",
  },
  "::-moz-selection": {
    background: "rgba(30, 64, 175, 0.2)",
    color: "inherit",
    textShadow: "none",
  },

  // Enhanced Focus Styles
  ":focus-visible": {
    outline: "2px solid #3b82f6",
    outlineOffset: "3px",
    borderRadius: "6px",
    boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.1)",
  },

  // Modern Scrollbar
  "::-webkit-scrollbar": {
    width: "12px",
    height: "12px",
  },
  "::-webkit-scrollbar-track": {
    background: "rgba(148, 163, 184, 0.1)",
    borderRadius: "6px",
  },
  "::-webkit-scrollbar-thumb": {
    background: "linear-gradient(135deg, #1e40af, #7c3aed)",
    borderRadius: "6px",
    border: "2px solid transparent",
    backgroundClip: "padding-box",
  },
  "::-webkit-scrollbar-thumb:hover": {
    background: "linear-gradient(135deg, #1e3a8a, #6d28d9)",
  },
  "::-webkit-scrollbar-corner": {
    background: "rgba(148, 163, 184, 0.1)",
  },

  // Performance optimizations
  ".gpu-accelerated": {
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
    perspective: 1000,
    willChange: "transform",
  },

  // Layout improvements
  section: {
    width: "100%",
    position: "relative",
    scrollMarginTop: "80px",
  },

  // Enhanced Typography
  ".gradient-text": {
    background:
      "linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #ec4899 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    backgroundSize: "200% 100%",
    animation: "shimmer 3s ease-in-out infinite",
  },

  // Glass morphism utilities
  ".glass": {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
  },
  ".glass-dark": {
    background: "rgba(2, 6, 23, 0.8)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(100, 116, 139, 0.2)",
    borderRadius: "16px",
  },

  // Improved spacing and layout
  ".container-padding": {
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
};

function App() {
  return (
    <ThemeProviderWrapper>
      <CssBaseline />
      <GlobalStyles styles={superiorGlobalStyles} />
      <MainPage />
    </ThemeProviderWrapper>
  );
}

export default App;
