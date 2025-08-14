// src/pages/About.tsx
import { Container, Typography, Box, Grid, Stack, Chip } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { motion } from "framer-motion";

const skills = {
  Languages: ["JavaScript", "TypeScript", "Python", "HTML", "CSS"],
  Frameworks: ["Vue.js", "Nuxt.js", "React", "Material-UI"],
  Backend: ["Express", "Python"],
  DevOps: ["Git", "CI/CD"],
  AI_and_ML: ["MCP", "Ollama", "Data Analysis"],
};

const About = () => (
  <Container>
    <Box
      sx={{
        pt: { xs: 4, md: 6 },
        pb: 4,
        px: { xs: 2, sm: 3 },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: (theme: Theme) => theme.palette.primary.main,
            fontWeight: 700,
            mb: 3,
          }}
        >
          About Me
        </Typography>
      </motion.div>

      <Grid
        container
        spacing={4}
        sx={{
          mt: 0, // Remove top margin
        }}
      >
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="body1" paragraph>
              I'm Rohit Bharmal, an Associate Software Engineer at Red Hat with
              a strong focus on frontend development and user experience. At Red
              Hat, I've contributed to key projects on the Customer Portal,
              including the Security Advisory and CVE Database. Using
              technologies like Vue.js and JavaScript, I've built dynamic,
              responsive interfaces that help thousands of users navigate
              complex security information with ease.
            </Typography>
            <Typography variant="body1" paragraph>
              My work involves more than just coding — I collaborate closely
              with designers, product managers, and backend engineers to create
              seamless, cross-browser-compatible solutions that prioritize
              performance and accessibility. I'm passionate about building
              products that not only look good but also solve real-world
              problems efficiently.
            </Typography>
            <Typography variant="body1" paragraph>
              Whether it's optimizing UI workflows or implementing robust
              frontend architectures, I strive to deliver clean, maintainable
              code and a smooth user experience. I've also been recognized with
              the Red Hat eXcEed Award for my impact and contributions.
            </Typography>
          </motion.div>
        </Grid>

        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: (theme: Theme) => theme.palette.primary.main,
                mb: 3,
                textAlign: "center",
              }}
            >
              Technical Skills
            </Typography>

            {/* Horizontal Skills Layout */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                background: (theme: Theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(15, 23, 42, 0.8)",
                backdropFilter: "blur(20px)",
                borderRadius: "20px",
                border: (theme: Theme) =>
                  `1px solid ${
                    theme.palette.mode === "light"
                      ? "rgba(30, 64, 175, 0.1)"
                      : "rgba(59, 130, 246, 0.1)"
                  }`,
                p: 3,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: (theme: Theme) =>
                    theme.palette.mode === "light"
                      ? "linear-gradient(135deg, rgba(30, 64, 175, 0.02), rgba(124, 58, 237, 0.02))"
                      : "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.05))",
                  pointerEvents: "none",
                },
              }}
            >
              {Object.entries(skills).map(
                ([category, items], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        py: 1.5,
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {/* Category Label */}
                      <Box
                        sx={{
                          minWidth: 120,
                          textAlign: "right",
                          pr: 2,
                          borderRight: (theme: Theme) =>
                            `2px solid ${theme.palette.primary.main}`,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: (theme: Theme) => theme.palette.primary.main,
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {category.replace("_", " & ")}
                        </Typography>
                      </Box>

                      {/* Skills Chips */}
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          flex: 1,
                        }}
                      >
                        {items.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: categoryIndex * 0.1 + skillIndex * 0.05,
                            }}
                            whileHover={{ scale: 1.05, y: -2 }}
                          >
                            <Chip
                              label={skill}
                              size="small"
                              sx={{
                                background: (theme: Theme) =>
                                  theme.palette.mode === "light"
                                    ? "linear-gradient(135deg, rgba(30, 64, 175, 0.1), rgba(124, 58, 237, 0.1))"
                                    : "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(168, 85, 247, 0.15))",
                                color: (theme: Theme) =>
                                  theme.palette.primary.main,
                                border: (theme: Theme) =>
                                  `1px solid ${
                                    theme.palette.mode === "light"
                                      ? "rgba(30, 64, 175, 0.2)"
                                      : "rgba(59, 130, 246, 0.2)"
                                  }`,
                                borderRadius: "8px",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                height: "28px",
                                transition:
                                  "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                "&:hover": {
                                  background: (theme: Theme) =>
                                    theme.palette.mode === "light"
                                      ? "linear-gradient(135deg, rgba(30, 64, 175, 0.15), rgba(124, 58, 237, 0.15))"
                                      : "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))",
                                  borderColor: (theme: Theme) =>
                                    theme.palette.primary.main,
                                  boxShadow: (theme: Theme) =>
                                    theme.palette.mode === "light"
                                      ? "0 4px 12px rgba(30, 64, 175, 0.2)"
                                      : "0 4px 12px rgba(59, 130, 246, 0.2)",
                                },
                              }}
                            />
                          </motion.div>
                        ))}
                      </Box>
                    </Box>

                    {/* Divider line except for last item */}
                    {categoryIndex < Object.entries(skills).length - 1 && (
                      <Box
                        sx={{
                          height: "1px",
                          background: (theme: Theme) =>
                            theme.palette.mode === "light"
                              ? "linear-gradient(90deg, transparent, rgba(30, 64, 175, 0.1), transparent)"
                              : "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
                          my: 0.5,
                        }}
                      />
                    )}
                  </motion.div>
                )
              )}
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  </Container>
);

export default About;
