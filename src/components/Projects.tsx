import {
  Box,
  Typography,
  Container,
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getFeaturedProjects, getFallbackProjects, ProcessedProject } from "../lib/github";
import { ProjectGrid } from "./ui/ProjectGrid";

const Projects = () => {
  const theme = useTheme();
  const [projects, setProjects] = useState<ProcessedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getFeaturedProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error("Error loading projects from GitHub API:", err);
        // Use fallback projects when API fails
        const fallbackData = getFallbackProjects();
        setProjects(fallbackData);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <Box
      component="section"
      id="projects"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              color: theme.palette.primary.main,
              fontWeight: 700,
            }}
          >
            Projects
          </Typography>

          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: theme.palette.text.secondary,
              mb: 8,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            A collection of my recent work and open-source contributions
          </Typography>
        </motion.div>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: theme.palette.text.secondary }}
            >
              Loading projects...
            </Typography>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: theme.palette.error.main }}
            >
              {error}
            </Typography>
          </motion.div>
        )}

        {!loading && !error && <ProjectGrid projects={projects} />}
      </Container>
    </Box>
  );
};

export default Projects;