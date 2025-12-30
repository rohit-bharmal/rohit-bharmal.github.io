import React from "react";
import {
  Box,
  Typography,
  Stack,
  Chip,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import { Work, School } from "@mui/icons-material";

interface TimelineItem {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
  type: "work" | "education";
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const theme = useTheme();

  return (
    <Box sx={{ position: "relative", maxWidth: "800px", mx: "auto" }}>
      {/* Timeline line */}
      <Box
        sx={{
          position: "absolute",
          left: { xs: "20px", md: "50%" },
          top: 0,
          bottom: 0,
          width: "2px",
          background: `linear-gradient(180deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          transform: { xs: "none", md: "translateX(-50%)" },
        }}
      />

      <Stack spacing={6}>
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", md: index % 2 === 0 ? "row" : "row-reverse" },
                alignItems: { xs: "flex-start", md: "center" },
                gap: 4,
              }}
            >
              {/* Timeline dot */}
              <Box
                sx={{
                  position: "absolute",
                  left: { xs: "12px", md: "50%" },
                  top: { xs: "20px", md: "50%" },
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  backgroundColor: theme.palette.primary.main,
                  border: `4px solid ${theme.palette.background.default}`,
                  transform: { xs: "translateX(-50%)", md: "translate(-50%, -50%)" },
                  zIndex: 2,
                  boxShadow: `0 0 20px ${theme.palette.primary.main}40`,
                }}
              />

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                style={{
                  position: "absolute",
                  left: { xs: "4px", md: "50%" } as any,
                  top: { xs: "12px", md: "50%" } as any,
                  transform: { xs: "translateX(-50%)", md: "translate(-50%, -50%)" } as any,
                  zIndex: 3,
                }}
              >
                <Box
                  sx={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: theme.palette.primary.main,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    "& svg": { fontSize: "18px" },
                  }}
                >
                  {item.type === "work" ? <Work /> : <School />}
                </Box>
              </motion.div>

              {/* Content */}
              <Box sx={{ flex: 1, ml: { xs: 6, md: 0 } }}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: "16px",
                      position: "relative",
                      overflow: "hidden",
                      background: theme.palette.background.paper,
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 8px 32px ${theme.palette.primary.main}15`,
                        transform: "translateY(-2px)",
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}05, transparent)`,
                        opacity: 0,
                        transition: "opacity 0.3s ease-in-out",
                      },
                      "&:hover::before": {
                        opacity: 1,
                      },
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        mb: 1,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 500,
                        color: theme.palette.text.primary,
                        mb: 0.5,
                      }}
                    >
                      {item.company}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: 3,
                        fontStyle: "italic",
                      }}
                    >
                      {item.period}
                    </Typography>

                    <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                      {item.description.map((desc, idx) => (
                        <Typography
                          key={idx}
                          component="li"
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary,
                            mb: 1,
                            lineHeight: 1.6,
                          }}
                        >
                          {desc}
                        </Typography>
                      ))}
                    </Box>

                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {item.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Chip
                            label={tech}
                            size="small"
                            sx={{
                              fontWeight: 500,
                              fontSize: "0.75rem",
                              transition: "all 0.2s ease-in-out",
                              "&:hover": {
                                backgroundColor: theme.palette.primary.main,
                                color: "#ffffff",
                              },
                            }}
                          />
                        </motion.div>
                      ))}
                    </Stack>
                  </Paper>
                </motion.div>
              </Box>

              {/* Spacer for alternating layout */}
              <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }} />
            </Box>
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
};
