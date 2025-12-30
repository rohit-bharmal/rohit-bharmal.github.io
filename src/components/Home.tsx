import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  IconButton,
  Grid,
  useTheme,
} from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Email,
  Download,
  ArrowForward,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import profileImg from "../assets/img_8729_720.jpg";
import { TypewriterEffect } from "./ui/TypewriterEffect";

const Home = () => {
  const theme = useTheme();

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      component="section"
      id="home"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        pt: { xs: 10, md: 12 },
        pb: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Hi, I'm
              </Typography>

              <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Rohit Bharmal
              </Typography>

              <Box sx={{ mb: 4, minHeight: "80px" }}>
                <TypewriterEffect
                  words={[
                    "Software Engineer",
                    "Frontend Developer",
                    "Open Source Contributor",
                    "Problem Solver",
                  ]}
                />
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  mb: 6,
                  maxWidth: "600px",
                  lineHeight: 1.7,
                }}
              >
                I'm an Associate Software Engineer at Red Hat, passionate about
                building scalable web applications and contributing to open-source
                projects. I specialize in frontend development with modern
                technologies and love solving complex problems through clean,
                efficient code.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mb: 6 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForward />}
                    onClick={scrollToProjects}
                    sx={{
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    View My Work
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Download />}
                    href="https://drive.google.com/file/d/1RLjMPcIYA6QxpY8kb-YOlu-PsnbyhT7D/view?usp=sharing"
                    target="_blank"
                    sx={{
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    Resume
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Email />}
                    onClick={scrollToContact}
                    sx={{
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    Contact
                  </Button>
                </motion.div>
              </Stack>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <Stack direction="row" spacing={2}>
                {[
                  { icon: <GitHub />, href: "https://github.com/rohit-bharmal" },
                  { icon: <LinkedIn />, href: "https://www.linkedin.com/in/rohitbharmal/" },
                  { icon: <Email />, href: "mailto:rohitbharmal01@gmail.com" },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        "&:hover": {
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          backgroundColor: `${theme.palette.primary.main}10`,
                        },
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {/* Animated ring around profile */}
                <Box
                  sx={{
                    position: "absolute",
                    width: { xs: 300, sm: 340, md: 380 },
                    height: { xs: 300, sm: 340, md: 380 },
                    borderRadius: "50%",
                    border: `2px solid ${theme.palette.primary.main}30`,
                    animation: "rotate 20s linear infinite",
                    "@keyframes rotate": {
                      "0%": { transform: "rotate(0deg)" },
                      "100%": { transform: "rotate(360deg)" },
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "-4px",
                      left: "50%",
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: theme.palette.primary.main,
                      transform: "translateX(-50%)",
                    },
                  }}
                />
                
                <Box
                  component="img"
                  src={profileImg}
                  alt="Rohit Bharmal"
                  sx={{
                    width: { xs: 280, sm: 320, md: 360 },
                    height: { xs: 280, sm: 320, md: 360 },
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: `4px solid ${theme.palette.primary.main}`,
                    boxShadow: `0 20px 40px ${theme.palette.primary.main}30`,
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: `0 25px 50px ${theme.palette.primary.main}40`,
                    },
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;