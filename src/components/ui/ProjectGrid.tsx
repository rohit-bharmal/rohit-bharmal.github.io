import React, { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Stack,
  Paper,
  Button,
} from "@mui/material";
import { GitHub, Launch, Star, ForkRight, Visibility } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { ProcessedProject } from "../../lib/github";

interface ProjectGridProps {
  projects: ProcessedProject[];
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  const theme = useTheme();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const showMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 4,
          mb: 6,
        }}
      >
        <AnimatePresence>
          {projects.slice(0, visibleCount).map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredProject(index)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <Paper
                elevation={0}
                sx={{
                  height: "100%",
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: "20px",
                  overflow: "hidden",
                  position: "relative",
                  background: theme.palette.background.paper,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 20px 40px ${theme.palette.primary.main}15`,
                  },
                }}
              >
                {/* Animated gradient overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    transform: hoveredProject === index ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.4s ease-in-out",
                  }}
                />

                {/* Content */}
                <Box sx={{ p: 4 }}>
                  {/* Header */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: theme.palette.primary.main,
                        transition: "color 0.3s ease-in-out",
                      }}
                    >
                      {project.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                        minHeight: "3em",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {project.description || "No description available"}
                    </Typography>
                  </Box>

                  {/* Stats */}
                  <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <Star sx={{ fontSize: 18, color: "#fbbf24" }} />
                      <Typography variant="body2" color="text.secondary">
                        {project.stargazers_count}
                      </Typography>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <ForkRight sx={{ fontSize: 18, color: theme.palette.text.secondary }} />
                      <Typography variant="body2" color="text.secondary">
                        {project.forks_count}
                      </Typography>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      style={{ display: "flex", alignItems: "center", gap: 6 }}
                    >
                      <Visibility sx={{ fontSize: 18, color: theme.palette.text.secondary }} />
                      <Typography variant="body2" color="text.secondary">
                        {project.watchers_count}
                      </Typography>
                    </motion.div>
                  </Stack>

                  {/* Technologies */}
                  <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 4 }}>
                    {project.languages?.slice(0, 4).map((lang, langIndex) => (
                      <motion.div
                        key={lang}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + langIndex * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Chip
                          label={lang}
                          size="small"
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            height: "24px",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              backgroundColor: theme.palette.primary.main,
                              color: "#ffffff",
                            },
                          }}
                        />
                      </motion.div>
                    ))}
                    {project.languages && project.languages.length > 4 && (
                      <Chip
                        label={`+${project.languages.length - 4}`}
                        size="small"
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          height: "24px",
                          backgroundColor: theme.palette.action.hover,
                        }}
                      />
                    )}
                  </Stack>

                  {/* Actions */}
                  <Stack direction="row" spacing={2}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <IconButton
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: "8px",
                          p: 1,
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            backgroundColor: `${theme.palette.primary.main}08`,
                          },
                          transition: "all 0.2s ease-in-out",
                        }}
                      >
                        <GitHub sx={{ fontSize: 20 }} />
                      </IconButton>
                    </motion.div>
                    {project.homepage && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <IconButton
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: "8px",
                            p: 1,
                            "&:hover": {
                              borderColor: theme.palette.primary.main,
                              color: theme.palette.primary.main,
                              backgroundColor: `${theme.palette.primary.main}08`,
                            },
                            transition: "all 0.2s ease-in-out",
                          }}
                        >
                          <Launch sx={{ fontSize: 20 }} />
                        </IconButton>
                      </motion.div>
                    )}
                  </Stack>
                </Box>

                {/* Hover effect overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}03, transparent)`,
                    opacity: hoveredProject === index ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                    pointerEvents: "none",
                  }}
                />
              </Paper>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>

      {/* Load More Button */}
      {visibleCount < projects.length && (
        <Box sx={{ textAlign: "center" }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outlined"
              onClick={showMore}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Load More Projects ({projects.length - visibleCount} remaining)
            </Button>
          </motion.div>
        </Box>
      )}
    </Box>
  );
};
