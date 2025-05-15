// src/pages/About.tsx
import { Container, Typography, Box, Grid, Stack, Chip } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { motion } from "framer-motion";

const skills = {
  Languages: ["Python", "TypeScript", "JavaScript", "Vue.js"],
  Frontend: ["Vue.js", "React", "Material-UI", "HTML/CSS"],
  Backend: ["Python", "Node.js", "Express"],
  "Cloud & DevOps": ["Git", "CI/CD", "Docker"],
  "Machine Learning": ["scikit-learn", "TensorFlow", "Data Analysis"],
};

const About = () => (
  <Container>
    <Box
      sx={{
        pb: 6,
        px: { xs: 2, sm: 3 }, // Add horizontal padding
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
            mb: 4,
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
              }}
            >
              Technical Skills
            </Typography>

            {Object.entries(skills).map(([category, items]) => (
              <Box
                key={category}
                sx={{
                  mb: 4,
                  p: 2,
                  borderLeft: "2px solid",
                  borderColor: (theme: Theme) => theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: "rgba(100, 255, 218, 0.05)",
                    transform: "translateX(10px)",
                    transition: "all 0.3s ease-in-out",
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: (theme: Theme) => theme.palette.text.primary,
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  {category}
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1.5}>
                  {items.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      sx={{
                        backgroundColor: "rgba(100, 255, 218, 0.1)",
                        color: (theme: Theme) => theme.palette.primary.main,
                        borderRadius: "16px",
                        fontWeight: 500,
                        "&:hover": {
                          backgroundColor: "rgba(100, 255, 218, 0.2)",
                          transform: "translateY(-2px)",
                          transition: "all 0.2s ease-in-out",
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            ))}
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  </Container>
);

export default About;
