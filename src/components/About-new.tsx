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
              complex security data with ease.
            </Typography>
            <Typography variant="body1" paragraph>
              As a dedicated full-stack developer, I specialize in creating
              scalable web applications and innovative solutions. My passion
              lies in transforming complex problems into intuitive,
              user-friendly experiences through clean code and thoughtful
              design.
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
                fontWeight: 700,
              }}
            >
              Technical Skills
            </Typography>

            {/* Simple Clean Skills Layout */}
            <Stack spacing={3}>
              {Object.entries(skills).map(
                ([category, items], categoryIndex) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: (theme: Theme) => theme.palette.primary.main,
                          fontWeight: 600,
                          mb: 1,
                          fontSize: "0.9rem",
                        }}
                      >
                        {category.replace("_", " & ")}
                      </Typography>

                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {items.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: categoryIndex * 0.1 + skillIndex * 0.03,
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Chip
                              label={skill}
                              size="small"
                              sx={{
                                backgroundColor: (theme: Theme) =>
                                  theme.palette.mode === "light"
                                    ? "#f8fafc"
                                    : "rgba(30, 41, 59, 0.8)",
                                color: (theme: Theme) =>
                                  theme.palette.text.primary,
                                border: (theme: Theme) =>
                                  `1px solid ${
                                    theme.palette.mode === "light"
                                      ? "#e2e8f0"
                                      : "rgba(71, 85, 105, 0.4)"
                                  }`,
                                borderRadius: "6px",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                height: "28px",
                                transition: "all 0.2s ease",
                                "&:hover": {
                                  backgroundColor: (theme: Theme) =>
                                    theme.palette.primary.main,
                                  color: "#ffffff",
                                  borderColor: (theme: Theme) =>
                                    theme.palette.primary.main,
                                  transform: "translateY(-1px)",
                                  boxShadow: (theme: Theme) =>
                                    theme.palette.mode === "light"
                                      ? "0 4px 8px rgba(30, 64, 175, 0.25)"
                                      : "0 4px 8px rgba(59, 130, 246, 0.25)",
                                },
                              }}
                            />
                          </motion.div>
                        ))}
                      </Stack>
                    </Box>
                  </motion.div>
                )
              )}
            </Stack>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  </Container>
);

export default About;
