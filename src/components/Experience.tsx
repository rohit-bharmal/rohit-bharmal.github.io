import {
  Box,
  Typography,
  Container,
  Stack,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import { Theme } from "@mui/material/styles";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    title: "Associate Software Engineer",
    company: "Red Hat",
    period: "Jan 2024 - Present",
    description: [
      "Developed interactive, production-grade lab applications using React and PatternFly within a monorepo architecture",
      "Built reusable UI components and implemented consistent design patterns to enhance developer productivity and user experience",
      "Contributed to the migration of Red Hat documentation to a server-side rendered (SSR) architecture, improving accessibility, SEO, and load times",
      "Created MCP AI tools in TypeScript, enabling natural language understanding and intelligent tool chaining",
      "Developed a Node.js-based system with Server-Sent Events (SSE) to stream real-time query responses to a React frontend",
      "Contributed to open-source projects including PatternFly, Red Hat UX Design Systems, and AI-related initiatives such as NL2SQL",
    ],
    technologies: [
      "React",
      "TypeScript",
      "PatternFly",
      "Node.js",
      "SSR",
      "AI/ML",
      "SSE",
      "Monorepo",
    ],
  },
  {
    title: "Software Engineer Trainee",
    company: "Red Hat",
    period: "Jul 2023 - Jan 2024",
    description: [
      "Contributed to the Product Security Advisory page of the Customer Portal by improving UI/UX and optimising filtering logic",
      "Developed and integrated custom web components to enhance usability and performance",
      "Developed Chatur, a chatbot during Red Hack Day that answers queries from uploaded PDFs",
      "Successfully integrated and streamed Chatur as DocsBot on the Red Hat Backstage platform",
    ],
    technologies: [
      "Web Components",
      "UI/UX",
      "React",
      "TypeScript",
      "ChatBot",
      "PDF Processing",
      "Backstage",
    ],
  },
];

const Experience = () => (
  <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
    <Box sx={{ pt: { xs: 4, md: 6 }, pb: 4 }}>
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
            textAlign: "center",
          }}
        >
          Professional Experience
        </Typography>
      </motion.div>

      <Stack spacing={4}>
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              sx={{
                background: (theme: Theme) => theme.palette.background.paper,
                border: "1px solid",
                borderColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                "&:hover": {
                  borderColor: (theme: Theme) => theme.palette.primary.main,
                  transform: "translateY(-4px)",
                  boxShadow: (theme: Theme) =>
                    theme.palette.mode === "dark"
                      ? "0 4px 20px rgba(100, 255, 218, 0.1)"
                      : "0 4px 20px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease-in-out",
                },
                transition: "all 0.3s ease-in-out",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: (theme: Theme) => theme.palette.primary.main,
                        fontWeight: 600,
                        fontSize: "1.25rem",
                        mb: 1,
                      }}
                    >
                      {exp.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: (theme: Theme) => theme.palette.text.primary,
                        fontWeight: 500,
                        mb: 0.5,
                      }}
                    >
                      {exp.company}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: (theme: Theme) => theme.palette.text.secondary,
                        mb: 2,
                        fontStyle: "italic",
                      }}
                    >
                      {exp.period}
                    </Typography>
                  </Box>

                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                    {exp.description.map((desc, idx) => (
                      <Typography
                        key={idx}
                        component="li"
                        variant="body2"
                        sx={{
                          color: (theme: Theme) => theme.palette.text.secondary,
                          mb: 1.5,
                          lineHeight: 1.6,
                          "&::marker": {
                            color: (theme: Theme) => theme.palette.primary.main,
                          },
                        }}
                      >
                        {desc}
                      </Typography>
                    ))}
                  </Box>

                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {exp.technologies.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(100, 255, 218, 0.1)",
                          color: (theme: Theme) => theme.palette.primary.main,
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          "&:hover": {
                            backgroundColor: "rgba(100, 255, 218, 0.2)",
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Stack>
    </Box>
  </Container>
);

export default Experience;
