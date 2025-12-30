import { Container, Typography, Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { SkillsGrid } from "./ui/SkillsGrid";

const About = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            mb: 2,
            color: theme.palette.primary.main,
            fontWeight: 700,
          }}
        >
          About Me
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
          Learn more about my background, skills, and passion for technology
        </Typography>

        <Grid container spacing={8}>
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  mb: 3,
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                My Story
              </Typography>
              <Box sx={{ maxWidth: "900px", mx: "auto", mb: 6 }}>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    textAlign: "center",
                    fontSize: "1.2rem",
                    lineHeight: 1.8,
                    mb: 3,
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                  }}
                >
                  I'm <strong>Rohit Bharmal</strong>, an Associate Software
                  Engineer at <strong>Red Hat</strong> with a passion for
                  creating exceptional digital experiences that make a real
                  impact.
                </Typography>

                <Typography
                  variant="body1"
                  paragraph
                  sx={{
                    textAlign: "center",
                    fontSize: "1.1rem",
                    lineHeight: 1.8,
                    mb: 3,
                    color: theme.palette.text.secondary,
                  }}
                >
                  At Red Hat, I've contributed to critical projects on the{" "}
                  <strong>Customer Portal</strong>, including the{" "}
                  <strong>Security Advisory</strong> and{" "}
                  <strong>CVE Database</strong> systems that serve thousands of
                  enterprise customers worldwide. My work focuses on building
                  scalable, accessible interfaces using modern technologies like{" "}
                  <strong>Vue.js</strong>,<strong>React</strong>, and{" "}
                  <strong>TypeScript</strong>.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "center",
                    fontSize: "1.1rem",
                    lineHeight: 1.8,
                    color: theme.palette.text.secondary,
                  }}
                >
                  Beyond my day job, I'm deeply involved in{" "}
                  <strong>open-source contributions</strong>,
                  <strong>AI/ML projects</strong>, and building innovative
                  solutions that bridge the gap between complex technology and
                  user-friendly design. I believe in writing clean, maintainable
                  code and creating experiences that users genuinely love to
                  interact with.
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  mb: 6,
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                Technical Skills
              </Typography>
              <SkillsGrid />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
