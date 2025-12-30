import {
  Box,
  Typography,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Timeline } from "./ui/Timeline";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
  type: "work" | "education";
}

const experiences: ExperienceItem[] = [
  {
    title: "Associate Software Engineer",
    company: "Red Hat",
    period: "Jan 2024 - Present",
    type: "work",
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
    type: "work",
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

const Experience = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="experience"
      sx={{
        py: { xs: 8, md: 12 },
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
            Experience
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
            My professional journey and key contributions in software development
          </Typography>
        </motion.div>

        <Timeline items={experiences} />
      </Container>
    </Box>
  );
};

export default Experience;
