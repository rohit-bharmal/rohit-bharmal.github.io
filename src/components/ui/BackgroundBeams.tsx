import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const BackgroundBeams = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Animated beams */}
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: "2px",
            height: "200px",
            background: `linear-gradient(180deg, transparent, ${theme.palette.primary.main}40, transparent)`,
            left: `${20 + i * 15}%`,
            top: "-200px",
            animation: `beam-${i} ${12 + i * 3}s linear infinite`,
            "@keyframes beam-0": {
              "0%": { transform: "translateY(-200px)" },
              "100%": { transform: "translateY(calc(100vh + 200px))" },
            },
            "@keyframes beam-1": {
              "0%": { transform: "translateY(-200px)" },
              "100%": { transform: "translateY(calc(100vh + 200px))" },
            },
            "@keyframes beam-2": {
              "0%": { transform: "translateY(-200px)" },
              "100%": { transform: "translateY(calc(100vh + 200px))" },
            },
            "@keyframes beam-3": {
              "0%": { transform: "translateY(-200px)" },
              "100%": { transform: "translateY(calc(100vh + 200px))" },
            },
            "@keyframes beam-4": {
              "0%": { transform: "translateY(-200px)" },
              "100%": { transform: "translateY(calc(100vh + 200px))" },
            },
            "@keyframes beam-5": {
              "0%": { transform: "translateY(-200px)" },
              "100%": { transform: "translateY(calc(100vh + 200px))" },
            },
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}
      
      {/* Subtle grid pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(${theme.palette.divider} 1px, transparent 1px),
            linear-gradient(90deg, ${theme.palette.divider} 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          opacity: 0.3,
          mask: "radial-gradient(circle at center, black 0%, transparent 70%)",
        }}
      />
    </Box>
  );
};
