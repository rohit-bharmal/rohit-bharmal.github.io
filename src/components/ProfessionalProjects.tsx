import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import {
  Launch,
  Security,
  Dashboard,
  Code,
  Group,
  Business,
} from "@mui/icons-material";

interface ProfessionalProject {
  id: number;
  title: string;
  company: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
}

const professionalProjects: ProfessionalProject[] = [
  {
    id: 1,
    title: "Customer Portal - Security Advisory UI",
    company: "Red Hat",
    description:
      "Built and enhanced the Security Advisory page of Red Hat's Customer Portal, serving thousands of enterprise customers with critical security information and CVE data.",
    icon: <Security />,
    link: "https://access.redhat.com/security/security-updates/",
  },
  {
    id: 2,
    title: "CVE Database UI",
    company: "Red Hat",
    description:
      "Developed dynamic, responsive interfaces for the CVE Database system, helping users navigate complex security vulnerability data with enhanced filtering and search capabilities.",
    icon: <Dashboard />,
    link: "https://access.redhat.com/security/cve/",
  },
  {
    id: 3,
    title: "Red Hat Documentation Migration",
    company: "Red Hat",
    description:
      "Contributed to migrating Red Hat documentation to a server-side rendered architecture, improving accessibility, SEO, and load times for enterprise documentation.",
    icon: <Business />,
  },
  {
    id: 4,
    title: "Interactive Lab Applications",
    company: "Red Hat",
    description:
      "Developed production-grade interactive lab applications within a monorepo architecture, enabling hands-on learning experiences for developers.",
    icon: <Group />,
  },
  {
    id: 5,
    title: "PatternFly Design System Contributions",
    company: "Red Hat",
    description:
      "Contributed to PatternFly, Red Hat's open-source design system, helping build and maintain enterprise-grade UI components used across Red Hat products.",
    icon: <Code />,
    link: "https://www.patternfly.org/",
  },
];

export const ProfessionalProjects = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="professional-projects"
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
            Professional Projects
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
            Enterprise-level projects and contributions at Red Hat, serving
            thousands of customers worldwide
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {professionalProjects.map((project, index) => (
            <Grid item xs={12} md={6} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "16px",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      borderColor:
                        theme.palette.mode === "light" ? "#64748b" : "#94a3b8",
                      boxShadow:
                        theme.palette.mode === "light"
                          ? "0 8px 32px rgba(100, 116, 139, 0.15)"
                          : "0 8px 32px rgba(148, 163, 184, 0.15)",
                      "& .project-icon": {
                        transform: "scale(1.1) rotate(5deg)",
                        color:
                          theme.palette.mode === "light"
                            ? "#475569"
                            : "#cbd5e1",
                      },
                    },
                  }}
                >
                  {/* Professional accent */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background:
                        theme.palette.mode === "light"
                          ? "linear-gradient(90deg, #64748b, #94a3b8)"
                          : "linear-gradient(90deg, #475569, #64748b)",
                    }}
                  />

                  <CardContent sx={{ p: 4, flexGrow: 1 }}>
                    {/* Header */}
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}
                    >
                      <Box
                        className="project-icon"
                        sx={{
                          color:
                            theme.palette.mode === "light"
                              ? "#64748b"
                              : "#94a3b8",
                          mr: 2,
                          mt: 0.5,
                          transition: "all 0.3s ease-in-out",
                          "& svg": { fontSize: "2rem" },
                        }}
                      >
                        {project.icon}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            mb: 0.5,
                            color: theme.palette.text.primary,
                            lineHeight: 1.3,
                          }}
                        >
                          {project.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color:
                              theme.palette.mode === "light"
                                ? "#475569"
                                : "#cbd5e1",
                            fontWeight: 600,
                            mb: 0.5,
                          }}
                        >
                          {project.company}
                        </Typography>
                      </Box>
                      {project.link && (
                        <IconButton
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            "&:hover": {
                              borderColor:
                                theme.palette.mode === "light"
                                  ? "#64748b"
                                  : "#94a3b8",
                              color:
                                theme.palette.mode === "light"
                                  ? "#64748b"
                                  : "#94a3b8",
                            },
                          }}
                        >
                          <Launch sx={{ fontSize: 18 }} />
                        </IconButton>
                      )}
                    </Box>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: 3,
                        lineHeight: 1.6,
                      }}
                    >
                      {project.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Professional Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Box
            sx={{
              textAlign: "center",
              mt: 6,
              p: 4,
              backgroundColor:
                theme.palette.mode === "light"
                  ? "rgba(248, 250, 252, 0.8)"
                  : "rgba(30, 41, 59, 0.5)",
              borderRadius: "16px",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 600,
                mb: 1,
              }}
            >
              Associate Software Engineer at{" "}
              <Box
                component="span"
                sx={{
                  color: theme.palette.mode === "light" ? "#475569" : "#cbd5e1",
                  fontWeight: 700,
                }}
              >
                Red Hat
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              Contributing to enterprise-grade solutions serving millions of
              users worldwide
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};
