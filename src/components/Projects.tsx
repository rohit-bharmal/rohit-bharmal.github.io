import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Stack,
  Alert,
  useTheme,
  Badge,
} from "@mui/material";
import { motion, useInView } from "framer-motion";
import {
  GitHub,
  Launch,
  Star,
  ForkRight,
  Update,
  Code,
} from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";

import { getFeaturedProjects, ProcessedProject } from "../lib/github";
import LoadingSpinner from "./ui/LoadingSpinner";
import VideoBackground from "./ui/VideoBackground";

// Utility function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Updated yesterday";
  if (diffDays < 7) return `Updated ${diffDays} days ago`;
  if (diffDays < 30) return `Updated ${Math.ceil(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `Updated ${Math.ceil(diffDays / 30)} months ago`;
  return `Updated ${Math.ceil(diffDays / 365)} years ago`;
};

const ProjectCard = ({
  project,
  index,
}: {
  project: ProcessedProject;
  index: number;
}) => {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.9 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          background:
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.7)"
              : "rgba(30, 41, 59, 0.7)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.5)"
              : "rgba(148, 163, 184, 0.2)"
          }`,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              theme.palette.mode === "light"
                ? "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)"
                : "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)",
            opacity: 0,
            transition: "opacity 0.3s ease",
          },
          "&:hover": {
            "&::before": {
              opacity: 1,
            },
            boxShadow:
              theme.palette.mode === "light"
                ? "0 20px 40px rgba(99, 102, 241, 0.15)"
                : "0 20px 40px rgba(139, 92, 246, 0.15)",
          },
        }}
      >
        {/* Language indicator */}
        {project.language && (
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 2,
            }}
          >
            <Chip
              icon={<Code />}
              label={project.language}
              size="small"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                fontWeight: 600,
                fontSize: "0.7rem",
              }}
            />
          </Box>
        )}

        <CardContent
          sx={{ flexGrow: 1, p: 3, position: "relative", zIndex: 1 }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              fontSize: "1.3rem",
              mb: 2,
              pr: project.language ? 6 : 0,
            }}
          >
            {project.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mb: 3,
              minHeight: "60px",
              lineHeight: 1.7,
              color: theme.palette.text.secondary,
            }}
          >
            {project.description}
          </Typography>

          {/* Stats row */}
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            {project.stars > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Star sx={{ fontSize: "1rem", color: "#fbbf24" }} />
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {project.stars}
                </Typography>
              </Box>
            )}
            {project.forks > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <ForkRight
                  sx={{ fontSize: "1rem", color: theme.palette.text.secondary }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {project.forks}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Update
                sx={{ fontSize: "1rem", color: theme.palette.text.secondary }}
              />
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.secondary }}
              >
                {formatDate(project.lastUpdated)}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 1 }}>
            {project.tags.slice(0, 5).map((tag, tagIndex) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
                }
                transition={{
                  duration: 0.3,
                  delay: index * 0.1 + tagIndex * 0.1 + 0.3,
                }}
              >
                <Chip
                  label={tag}
                  size="small"
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? "rgba(99, 102, 241, 0.1)"
                        : "rgba(139, 92, 246, 0.1)",
                    color: theme.palette.primary.main,
                    borderRadius: "8px",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    border: `1px solid ${
                      theme.palette.mode === "light"
                        ? "rgba(99, 102, 241, 0.2)"
                        : "rgba(139, 92, 246, 0.2)"
                    }`,
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "light"
                          ? "rgba(99, 102, 241, 0.2)"
                          : "rgba(139, 92, 246, 0.2)",
                    },
                  }}
                />
              </motion.div>
            ))}
            {project.tags.length > 5 && (
              <Chip
                label={`+${project.tags.length - 5}`}
                size="small"
                sx={{
                  backgroundColor: theme.palette.text.secondary,
                  color: "white",
                  borderRadius: "8px",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                }}
              />
            )}
          </Stack>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between", p: 3, pt: 0 }}>
          <Stack direction="row" spacing={1}>
            <IconButton
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.text.secondary,
                background:
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.5)"
                    : "rgba(148, 163, 184, 0.2)"
                }`,
                "&:hover": {
                  color: theme.palette.primary.main,
                  transform: "scale(1.1)",
                  boxShadow:
                    theme.palette.mode === "light"
                      ? "0 4px 12px rgba(99, 102, 241, 0.3)"
                      : "0 4px 12px rgba(139, 92, 246, 0.3)",
                },
              }}
            >
              <GitHub />
            </IconButton>

            {project.live && (
              <IconButton
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: theme.palette.text.secondary,
                  background:
                    theme.palette.mode === "light"
                      ? "rgba(255, 255, 255, 0.8)"
                      : "rgba(30, 41, 59, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${
                    theme.palette.mode === "light"
                      ? "rgba(255, 255, 255, 0.5)"
                      : "rgba(148, 163, 184, 0.2)"
                  }`,
                  "&:hover": {
                    color: theme.palette.secondary.main,
                    transform: "scale(1.1)",
                    boxShadow:
                      theme.palette.mode === "light"
                        ? "0 4px 12px rgba(236, 72, 153, 0.3)"
                        : "0 4px 12px rgba(245, 158, 11, 0.3)",
                  },
                }}
              >
                <Launch />
              </IconButton>
            )}
          </Stack>
        </CardActions>
      </Card>
    </motion.div>
  );
};

const Projects = () => {
  const theme = useTheme();
  const [projects, setProjects] = useState<ProcessedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProjects = await getFeaturedProjects();
        setProjects(fetchedProjects);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <VideoBackground />

      <Container
        maxWidth="xl"
        sx={{ px: { xs: 2, md: 4 }, position: "relative", zIndex: 2 }}
      >
        <Box sx={{ pt: { xs: 4, md: 6 }, pb: 4 }}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                background:
                  theme.palette.mode === "light"
                    ? "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)"
                    : "linear-gradient(135deg, #8b5cf6 0%, #f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 800,
                fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                textAlign: "center",
                mb: 2,
              }}
            >
              Featured Projects
            </Typography>

            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: theme.palette.text.secondary,
                fontSize: "1.2rem",
                mb: 6,
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              A collection of my work, dynamically fetched from GitHub. From AI
              applications to design systems and full-stack solutions.
            </Typography>
          </motion.div>

          {loading && (
            <LoadingSpinner message="Fetching latest projects from GitHub..." />
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Alert
                severity="error"
                sx={{
                  mb: 4,
                  background:
                    theme.palette.mode === "light"
                      ? "rgba(255, 255, 255, 0.8)"
                      : "rgba(30, 41, 59, 0.8)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${
                    theme.palette.mode === "light"
                      ? "rgba(255, 255, 255, 0.5)"
                      : "rgba(148, 163, 184, 0.2)"
                  }`,
                }}
              >
                {error}
              </Alert>
            </motion.div>
          )}

          {!loading && !error && projects.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  },
                  gap: { xs: 3, md: 4 },
                  width: "100%",
                }}
              >
                {projects.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} />
                ))}
              </Box>

              {/* GitHub CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    mt: 8,
                    p: 4,
                    background:
                      theme.palette.mode === "light"
                        ? "rgba(255, 255, 255, 0.8)"
                        : "rgba(30, 41, 59, 0.8)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "20px",
                    border: `1px solid ${
                      theme.palette.mode === "light"
                        ? "rgba(255, 255, 255, 0.5)"
                        : "rgba(148, 163, 184, 0.2)"
                    }`,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.text.primary,
                      mb: 2,
                      fontWeight: 600,
                    }}
                  >
                    Want to see more?
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      mb: 3,
                    }}
                  >
                    Check out my GitHub for more projects and contributions
                  </Typography>
                  <IconButton
                    href="https://github.com/rohit-bharmal"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      background:
                        theme.palette.mode === "light"
                          ? "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)"
                          : "linear-gradient(135deg, #8b5cf6 0%, #f59e0b 100%)",
                      color: "white",
                      p: 2,
                      "&:hover": {
                        transform: "scale(1.1)",
                        boxShadow:
                          theme.palette.mode === "light"
                            ? "0 8px 32px rgba(99, 102, 241, 0.3)"
                            : "0 8px 32px rgba(139, 92, 246, 0.3)",
                      },
                    }}
                  >
                    <GitHub sx={{ fontSize: "2rem" }} />
                  </IconButton>
                </Box>
              </motion.div>
            </motion.div>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;
