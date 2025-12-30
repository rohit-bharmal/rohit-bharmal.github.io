import React from "react";
import { Box, Typography, Stack, Chip, Paper, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import {
  Code,
  Web,
  Storage,
  Build,
  Psychology,
  Terminal,
} from "@mui/icons-material";

const skillCategories = [
  {
    title: "Frontend",
    icon: <Web />,
    skills: ["React", "Vue.js", "TypeScript", "Material-UI", "HTML", "CSS"],
    description: "Building beautiful, responsive user interfaces",
    color: "#3b82f6",
  },
  {
    title: "Languages",
    icon: <Terminal />,
    skills: ["JavaScript", "TypeScript", "Python", "HTML", "CSS"],
    description: "Core programming languages",
    color: "#10b981",
  },
  {
    title: "Backend",
    icon: <Storage />,
    skills: ["Node.js", "Express", "Python", "APIs"],
    description: "Server-side development",
    color: "#f59e0b",
  },
  {
    title: "Tools & DevOps",
    icon: <Build />,
    skills: ["Git", "Docker", "CI/CD", "Vite", "Webpack"],
    description: "Development tools & workflows",
    color: "#8b5cf6",
  },
  {
    title: "AI & ML",
    icon: <Psychology />,
    skills: ["OpenAI", "Ollama", "Data Analysis", "NLP"],
    description: "Artificial Intelligence & Machine Learning",
    color: "#ec4899",
  },
  {
    title: "Frameworks",
    icon: <Code />,
    skills: ["React", "Vue.js", "Nuxt.js", "Express", "FastAPI"],
    description: "Modern development frameworks",
    color: "#06b6d4",
  },
];

export const SkillsGrid = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={3} sx={{ maxWidth: "1000px", mx: "auto" }}>
      {skillCategories.map((category, index) => (
        <Grid item xs={12} sm={6} md={4} key={category.title}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Paper
              elevation={0}
              sx={{
                height: "280px",
                p: 3,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "16px",
                position: "relative",
                overflow: "hidden",
                background: theme.palette.background.paper,
                transition: "all 0.3s ease-in-out",
                display: "flex",
                flexDirection: "column",
                "&:hover": {
                  borderColor: category.color,
                  boxShadow: `0 8px 32px ${category.color}20`,
                  transform: "translateY(-4px)",
                  "& .skill-icon": {
                    transform: "scale(1.1) rotate(5deg)",
                    color: category.color,
                  },
                  "& .category-title": {
                    color: category.color,
                  },
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${category.color}08, transparent)`,
                  opacity: 0,
                  transition: "opacity 0.3s ease-in-out",
                },
                "&:hover::before": {
                  opacity: 1,
                },
              }}
            >
              {/* Top gradient line */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                  borderRadius: "16px 16px 0 0",
                }}
              />

              {/* Header */}
              <Box sx={{ mb: 2 }}>
                <Box
                  className="skill-icon"
                  sx={{
                    color: category.color,
                    mb: 1.5,
                    transition: "all 0.3s ease-in-out",
                    "& svg": { fontSize: "2rem" },
                  }}
                >
                  {category.icon}
                </Box>

                <Typography
                  variant="h6"
                  className="category-title"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: theme.palette.text.primary,
                    transition: "color 0.3s ease-in-out",
                  }}
                >
                  {category.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: "0.85rem",
                    lineHeight: 1.4,
                    minHeight: "2.4em",
                  }}
                >
                  {category.description}
                </Typography>
              </Box>

              {/* Skills */}
              <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Chip
                        label={skill}
                        size="small"
                        sx={{
                          fontSize: "0.7rem",
                          height: "26px",
                          fontWeight: 500,
                          backgroundColor: `${category.color}15`,
                          color: theme.palette.text.primary,
                          border: `1px solid ${category.color}30`,
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            backgroundColor: category.color,
                            color: "#ffffff",
                            transform: "translateY(-1px)",
                            boxShadow: `0 4px 12px ${category.color}40`,
                          },
                        }}
                      />
                    </motion.div>
                  ))}
                </Stack>
              </Box>

              {/* Bottom accent */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: `linear-gradient(90deg, transparent, ${category.color}60, transparent)`,
                }}
              />
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};
