import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

const LoadingSpinner = ({
  message = "Loading...",
  size = 40,
}: LoadingSpinnerProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        py: 8,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            size={size}
            thickness={4}
            sx={{
              color: theme.palette.primary.main,
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />

          {/* Outer ring */}
          <CircularProgress
            size={size + 16}
            thickness={2}
            variant="determinate"
            value={25}
            sx={{
              color: theme.palette.secondary.main,
              position: "absolute",
              opacity: 0.3,
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {message}
        </Typography>
      </motion.div>

      {/* Animated dots */}
      <motion.div
        style={{
          display: "flex",
          gap: "4px",
          alignItems: "center",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: theme.palette.primary.main,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </Box>
  );
};

export default LoadingSpinner;
