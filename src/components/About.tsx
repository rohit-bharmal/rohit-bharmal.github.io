// src/pages/About.tsx
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Stack,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import NavLinks from "./NavLinks";

const skills = {
  Languages: ["Python", "TypeScript", "JavaScript", "Vue.js"],
  Frontend: ["Vue.js", "React", "Material-UI", "HTML/CSS"],
  Backend: ["Python", "Node.js", "Express"],
  "Cloud & DevOps": ["Git", "CI/CD", "Docker"],
  "Machine Learning": ["scikit-learn", "TensorFlow", "Data Analysis"],
};

const About = () => (
  <>
    <NavLinks />
    <Container>
      <Box sx={{ pt: { xs: 12, md: 16 }, pb: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: (theme) => theme.palette.primary.main,
              fontWeight: 700,
              mb: 4,
            }}
          >
            About Me
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="body1" paragraph>
                Hello! I'm Rohit Bharmal, an Associate Software Engineer at Red
                Hat based in Pune, India. I'm passionate about open-source
                development and building innovative solutions.
              </Typography>
              <Typography variant="body1" paragraph>
                At Red Hat, I contribute to various projects while focusing on
                developing scalable applications. I have experience in both
                frontend and backend development, with a particular interest in
                Vue.js and Python.
              </Typography>
              <Typography variant="body1" paragraph>
                My recent work includes developing a heart disease prediction
                application, creating modern web applications with Vue.js, and
                contributing to various open-source projects. I'm always eager
                to learn new technologies and contribute to meaningful projects.
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ width: "100%" }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  background: (theme) => theme.palette.background.paper,
                  border: "1px solid",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: (theme) => theme.palette.primary.main }}
                >
                  Technical Skills
                </Typography>

                <Stack spacing={2}>
                  {Object.entries(skills).map(([category, items]) => (
                    <Box key={category}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: (theme) => theme.palette.text.secondary,
                          mb: 1,
                        }}
                      >
                        {category}
                      </Typography>
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {items.map((skill) => (
                          <Chip
                            key={skill}
                            label={skill}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(100, 255, 218, 0.1)",
                              color: (theme) => theme.palette.primary.main,
                              borderRadius: "4px",
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  </>
);

export default About;
