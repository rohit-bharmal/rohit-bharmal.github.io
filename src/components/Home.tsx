import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  IconButton,
  Grid,
  useTheme,
  Chip,
} from "@mui/material";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  GitHub,
  LinkedIn,
  Code,
  Download,
  Email,
  LocationOn,
  Work,
  School,
  EmojiEvents,
} from "@mui/icons-material";
import profileImg from "../assets/img_8729_720.jpg";
import VideoBackground from "./ui/VideoBackground";

// Enhanced Typewriter effect with cursor
const Typewriter = ({
  strings,
  speed = 100,
}: {
  strings: string[];
  speed: number;
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentString = strings[currentStringIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText === currentString) {
            setTimeout(() => setIsDeleting(true), 2000);
            return;
          }
          setCurrentText(currentString.slice(0, currentText.length + 1));
        } else {
          if (currentText === "") {
            setIsDeleting(false);
            setCurrentStringIndex((prev) => (prev + 1) % strings.length);
            return;
          }
          setCurrentText(currentText.slice(0, -1));
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentStringIndex, isDeleting, strings, speed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {currentText}
      <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
    </span>
  );
};

const Home = () => {
  const theme = useTheme();
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isStatsInView = useInView(statsRef, { once: true });

  // Simple scroll effects
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const stats = [
    { icon: <Work />, label: "Experience", value: "2+ Years" },
    { icon: <Code />, label: "Projects", value: "15+" },
    { icon: <EmojiEvents />, label: "Achievements", value: "Multiple" },
    { icon: <School />, label: "Learning", value: "Continuous" },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        color: theme.palette.text.primary,
      }}
    >
      <VideoBackground />

      {/* Hero Section */}
      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 3,
          pt: { xs: 8, md: 10 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <motion.div style={{ y, opacity }}>
          <Grid
            container
            spacing={{ xs: 4, md: 8 }}
            alignItems="center"
            sx={{ minHeight: "auto" }}
          >
            <Grid item xs={12} md={7} ref={heroRef}>
              {/* Main Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.main,
                    fontFamily: "'Fira Code', 'SF Mono', monospace",
                    fontWeight: 600,
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    mb: 3,
                    position: "relative",
                    "&::before": {
                      content: '"👋"',
                      marginRight: 2,
                      fontSize: "1.5rem",
                    },
                  }}
                >
                  Hey there! I'm
                </Typography>
              </motion.div>

              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: {
                      xs: "3.5rem",
                      sm: "4.5rem",
                      md: "6rem",
                      lg: "7rem",
                    },
                    fontWeight: 900,
                    lineHeight: 0.85,
                    mb: 4,
                    background:
                      theme.palette.mode === "light"
                        ? "linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%)"
                        : "linear-gradient(135deg, #8b5cf6 0%, #f59e0b 50%, #06b6d4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -8,
                      left: 0,
                      width: "100%",
                      height: 4,
                      background:
                        theme.palette.mode === "light"
                          ? "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)"
                          : "linear-gradient(135deg, #8b5cf6 0%, #f59e0b 100%)",
                      borderRadius: 2,
                      opacity: 0.3,
                    },
                  }}
                >
                  Rohit Bharmal
                </Typography>
              </motion.div>

              {/* Role/Title */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    mb: 6,
                    color: theme.palette.text.secondary,
                    fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
                    fontWeight: 700,
                    lineHeight: 1.2,
                    "& span": {
                      color: theme.palette.primary.main,
                      background:
                        theme.palette.mode === "light"
                          ? "rgba(99, 102, 241, 0.1)"
                          : "rgba(139, 92, 246, 0.1)",
                      px: 1,
                      borderRadius: 1,
                    },
                  }}
                >
                  <Typewriter
                    strings={[
                      "Associate Software Engineer @ Red Hat",
                      "Full-Stack Developer & Designer",
                      "Open Source Contributor",
                      "AI/ML Enthusiast & Problem Solver",
                    ]}
                    speed={80}
                  />
                </Typography>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    maxWidth: "700px",
                    mb: 8,
                    color: theme.palette.text.secondary,
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                    lineHeight: 1.8,
                    fontWeight: 400,
                  }}
                >
                  I'm a passionate software engineer who crafts{" "}
                  <Box
                    component="span"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 700,
                      background:
                        theme.palette.mode === "light"
                          ? "rgba(99, 102, 241, 0.1)"
                          : "rgba(139, 92, 246, 0.1)",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      border: `1px solid ${theme.palette.primary.main}20`,
                    }}
                  >
                    scalable, high-impact applications
                  </Box>{" "}
                  and contributes to open-source projects. Dedicated to
                  improving developer experiences, writing clean code, and
                  solving real-world problems through thoughtful engineering and
                  innovative solutions.
                </Typography>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                  sx={{ mb: 8 }}
                >
                  <Button
                    onClick={() => {
                      const element = document.getElementById("projects");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    variant="contained"
                    size="large"
                    startIcon={<Code />}
                    sx={{
                      py: 2,
                      px: 6,
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      borderRadius: 3,
                      textTransform: "none",
                      background:
                        theme.palette.mode === "light"
                          ? "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)"
                          : "linear-gradient(135deg, #8b5cf6 0%, #f59e0b 100%)",
                      boxShadow:
                        theme.palette.mode === "light"
                          ? "0 12px 40px rgba(99, 102, 241, 0.4)"
                          : "0 12px 40px rgba(139, 92, 246, 0.4)",
                      "&:hover": {
                        transform: "translateY(-3px) scale(1.02)",
                        boxShadow:
                          theme.palette.mode === "light"
                            ? "0 20px 60px rgba(99, 102, 241, 0.5)"
                            : "0 20px 60px rgba(139, 92, 246, 0.5)",
                      },
                    }}
                  >
                    Explore My Work
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Download />}
                    href="https://drive.google.com/file/d/1RLjMPcIYA6QxpY8kb-YOlu-PsnbyhT7D/view?usp=sharing"
                    target="_blank"
                    sx={{
                      py: 2,
                      px: 6,
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      borderRadius: 3,
                      textTransform: "none",
                      borderWidth: 2,
                      "&:hover": {
                        borderWidth: 2,
                        transform: "translateY(-3px) scale(1.02)",
                      },
                    }}
                  >
                    Download Resume
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Email />}
                    href="mailto:rohitbharmal01@gmail.com"
                    sx={{
                      py: 2,
                      px: 6,
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      borderRadius: 3,
                      textTransform: "none",
                      borderWidth: 2,
                      "&:hover": {
                        borderWidth: 2,
                        transform: "translateY(-3px) scale(1.02)",
                      },
                    }}
                  >
                    Let's Connect
                  </Button>
                </Stack>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              >
                <Stack direction="row" spacing={2}>
                  {[
                    {
                      icon: <GitHub />,
                      href: "https://github.com/rohit-bharmal",
                      label: "GitHub",
                    },
                    {
                      icon: <LinkedIn />,
                      href: "https://www.linkedin.com/in/rohitbharmal/",
                      label: "LinkedIn",
                    },
                    {
                      icon: <Email />,
                      href: "mailto:rohitbharmal01@gmail.com",
                      label: "Email",
                    },
                  ].map((social, index) => (
                    <motion.div
                      key={social.label}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isHeroInView
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 20 }
                      }
                      transition={{ delay: 1.2 + index * 0.1 }}
                    >
                      <IconButton
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          p: 2.5,
                          background:
                            theme.palette.mode === "light"
                              ? "rgba(255, 255, 255, 0.9)"
                              : "rgba(30, 41, 59, 0.9)",
                          backdropFilter: "blur(20px)",
                          border: `2px solid ${
                            theme.palette.mode === "light"
                              ? "rgba(99, 102, 241, 0.2)"
                              : "rgba(139, 92, 246, 0.2)"
                          }`,
                          color: theme.palette.text.secondary,
                          fontSize: "1.5rem",
                          borderRadius: 3,
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            color: theme.palette.primary.main,
                            borderColor: theme.palette.primary.main,
                            background:
                              theme.palette.mode === "light"
                                ? "rgba(99, 102, 241, 0.1)"
                                : "rgba(139, 92, 246, 0.1)",
                            boxShadow:
                              theme.palette.mode === "light"
                                ? "0 8px 25px rgba(99, 102, 241, 0.3)"
                                : "0 8px 25px rgba(139, 92, 246, 0.3)",
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </Grid>

            {/* Profile Image Section */}
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={
                  isHeroInView
                    ? { opacity: 1, scale: 1, rotate: 0 }
                    : { opacity: 0, scale: 0.8, rotate: 5 }
                }
                transition={{
                  duration: 1.2,
                  delay: 0.6,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 80,
                }}
                whileHover={{
                  scale: 1.02,
                  rotate: -1,
                  transition: { duration: 0.4 },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: { xs: "400px", md: "500px" },
                  }}
                >
                  {/* Decorative Background */}
                  <Box
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      background:
                        theme.palette.mode === "light"
                          ? "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)"
                          : "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)",
                      borderRadius: "50%",
                      transform: "scale(1.1)",
                      filter: "blur(20px)",
                    }}
                  />

                  {/* Profile Image */}
                  <Box
                    component="img"
                    src={profileImg}
                    alt="Rohit Bharmal - Software Engineer"
                    sx={{
                      width: { xs: "300px", md: "400px" },
                      height: { xs: "300px", md: "400px" },
                      borderRadius: "50%",
                      objectFit: "cover",
                      background:
                        theme.palette.mode === "light"
                          ? "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)"
                          : "linear-gradient(135deg, #8b5cf6 0%, #f59e0b 100%)",
                      padding: "6px",
                      boxShadow:
                        theme.palette.mode === "light"
                          ? "0 25px 60px rgba(99, 102, 241, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.5)"
                          : "0 25px 60px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(148, 163, 184, 0.2)",
                      filter: "grayscale(5%) contrast(1.1)",
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        filter: "grayscale(0%) contrast(1.2)",
                        boxShadow:
                          theme.palette.mode === "light"
                            ? "0 35px 80px rgba(99, 102, 241, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.8)"
                            : "0 35px 80px rgba(139, 92, 246, 0.5), 0 0 0 1px rgba(148, 163, 184, 0.4)",
                      },
                    }}
                  />

                  {/* Status Badge */}
                  <motion.div
                    style={{
                      position: "absolute",
                      bottom: "15%",
                      right: "5%",
                      background:
                        theme.palette.mode === "light"
                          ? "rgba(255, 255, 255, 0.95)"
                          : "rgba(15, 15, 35, 0.95)",
                      backdropFilter: "blur(20px)",
                      borderRadius: "20px",
                      padding: "12px 20px",
                      border: `2px solid ${
                        theme.palette.mode === "light"
                          ? "rgba(34, 197, 94, 0.3)"
                          : "rgba(34, 197, 94, 0.5)"
                      }`,
                      boxShadow:
                        theme.palette.mode === "light"
                          ? "0 10px 40px rgba(0, 0, 0, 0.1)"
                          : "0 10px 40px rgba(0, 0, 0, 0.4)",
                    }}
                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                    animate={
                      isHeroInView
                        ? { opacity: 1, scale: 1, rotate: 0 }
                        : { opacity: 0, scale: 0, rotate: -10 }
                    }
                    transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#22c55e",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        "&::before": {
                          content: '""',
                          width: 8,
                          height: 8,
                          background: "#22c55e",
                          borderRadius: "50%",
                          animation: "pulse 2s infinite",
                        },
                      }}
                    >
                      Available to collaborate
                    </Typography>
                  </motion.div>

                  {/* Floating Elements */}
                  {[
                    { icon: "💻", top: "10%", left: "10%", delay: 2 },
                    { icon: "🚀", top: "20%", right: "5%", delay: 2.2 },
                    { icon: "⚡", bottom: "25%", left: "5%", delay: 2.4 },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      style={{
                        position: "absolute",
                        fontSize: "2rem",
                        ...item,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={
                        isHeroInView
                          ? { opacity: 0.7, scale: 1 }
                          : { opacity: 0, scale: 0 }
                      }
                      transition={{ delay: item.delay, duration: 0.5 }}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {item.icon}
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* Stats Section */}
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 3, pb: 4 }}>
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={stat.label}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 4,
                      background:
                        theme.palette.mode === "light"
                          ? "rgba(255, 255, 255, 0.8)"
                          : "rgba(30, 41, 59, 0.8)",
                      backdropFilter: "blur(20px)",
                      borderRadius: 4,
                      border: `1px solid ${
                        theme.palette.mode === "light"
                          ? "rgba(255, 255, 255, 0.5)"
                          : "rgba(148, 163, 184, 0.2)"
                      }`,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                        boxShadow:
                          theme.palette.mode === "light"
                            ? "0 20px 40px rgba(99, 102, 241, 0.2)"
                            : "0 20px 40px rgba(139, 92, 246, 0.2)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        color: theme.palette.primary.main,
                        mb: 2,
                        "& svg": { fontSize: "2.5rem" },
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        mb: 1,
                        background:
                          theme.palette.mode === "light"
                            ? "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)"
                            : "linear-gradient(135deg, #8b5cf6 0%, #f59e0b 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 600,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;
