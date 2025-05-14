import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { GitHub, LinkedIn, Code } from "@mui/icons-material";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

// Typewriter effect
const Typewriter = ({
  strings,
  speed = 100,
}: {
  strings: string[];
  speed: number;
}) => {
  const [currentText, setCurrentText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;

    const text = strings[0];
    if (currentText === text) {
      setIsComplete(true);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentText(text.slice(0, currentText.length + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentText, strings, speed, isComplete]);

  return <span>{currentText}</span>;
};

const Home = () => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      background: (theme) => theme.palette.background.default,
      color: (theme) => theme.palette.text.primary,
      position: "relative",
      overflow: "hidden",
    }}
  >
    <NavLinks />
    {/* Background decoration */}
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        zIndex: 0,
        background:
          "linear-gradient(45deg, transparent 45%, #64ffda 45%, #64ffda 55%, transparent 55%)",
        backgroundSize: "20px 20px",
      }}
    />

    <Container maxWidth="lg">
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="body1"
            sx={{
              color: (theme) => theme.palette.primary.main,
              fontFamily: "'Fira Code', monospace",
              mb: 2,
            }}
          >
            Hi, my name is
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant="h1"
            gutterBottom
            fontWeight="bold"
            sx={{ fontSize: { xs: "2.5rem", md: "4rem" } }}
          >
            Rohit Bharmal
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 4,
              color: (theme) => theme.palette.text.secondary,
              fontSize: { xs: "1.5rem", md: "2rem" },
            }}
          >
            <Typewriter
              strings={["Associate Software Engineer @ Red Hat"]}
              speed={80}
            />
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Typography
            variant="body1"
            sx={{
              maxWidth: "600px",
              mb: 4,
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            I’m a software engineer who builds scalable, high-impact
            applications and contributes to open-source projects. I’m passionate
            about improving developer experiences, writing clean and
            maintainable code, and solving real-world problems through
            thoughtful engineering.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
            <Button
              component={Link}
              to="/projects"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<Code />}
            >
              View Projects
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.main,
                "&:hover": {
                  borderColor: (theme) => theme.palette.primary.light,
                  backgroundColor: "rgba(100, 255, 218, 0.1)",
                },
              }}
              href="https://drive.google.com/file/d/1RLjMPcIYA6QxpY8kb-YOlu-PsnbyhT7D/view?usp=sharing"
              target="_blank"
            >
              Resume
            </Button>
          </Stack>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Stack direction="row" spacing={2}>
            <IconButton
              href="https://github.com/rohitbharmal"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                "&:hover": {
                  color: (theme) => theme.palette.primary.main,
                },
              }}
            >
              <GitHub />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/rohitbharmal/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                "&:hover": {
                  color: (theme) => theme.palette.primary.main,
                },
              }}
            >
              <LinkedIn />
            </IconButton>
          </Stack>
        </motion.div>
      </Box>
    </Container>
  </Box>
);

export default Home;
