import { Box, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

const AnimatedBackground = () => {
  const theme = useTheme();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          color:
            theme.palette.mode === "light"
              ? theme.palette.primary.main
              : theme.palette.secondary.main,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener("resize", generateParticles);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", generateParticles);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [
    theme.palette.mode,
    theme.palette.primary.main,
    theme.palette.secondary.main,
  ]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Gradient mesh background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            theme.palette.mode === "light"
              ? `
              radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
            `
              : `
              radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
            `,
        }}
      />

      {/* Interactive mouse glow */}
      <motion.div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            theme.palette.mode === "light"
              ? "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: "absolute",
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: "50%",
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          initial={{
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 50,
            y: particle.y + Math.cos(Date.now() * 0.001 + particle.id) * 50,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}

      {/* Geometric shapes */}
      <motion.div
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: "100px",
          height: "100px",
          border: `2px solid ${theme.palette.primary.main}`,
          opacity: 0.1,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "15%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          border: `2px solid ${theme.palette.secondary.main}`,
          opacity: 0.1,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </Box>
  );
};

export default AnimatedBackground;
