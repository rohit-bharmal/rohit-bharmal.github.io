import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";
import { GitHub } from "@mui/icons-material";
import NavLinks from "./NavLinks";

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
}

const projects: Project[] = [
  {
    title: "Red Hat Design System",
    description:
      "Contributing to Red Hat's Design System, helping improve and maintain the company's unified design language and component library.",
    tags: ["HTML", "CSS", "Design System", "Red Hat", "UI/UX"],
    github: "https://github.com/rohit-bharmal/red-hat-design-system",
  },
  {
    title: "NL2SQL",
    description:
      "Natural Language to SQL pipeline that converts plain English queries into SQL. Uses AI to generate database queries and perform data analysis automatically.",
    tags: ["TypeScript", "AI/ML", "NLP", "SQL", "Data Analysis"],
    github: "https://github.com/rohit-bharmal/nl2sql",
  },
  {
    title: "Portfolio",
    description:
      "Personal portfolio website showcasing projects and professional experience with modern design.",
    tags: ["JavaScript", "React", "Portfolio", "Frontend"],
    github: "https://github.com/rohit-bharmal/rohit-portfolio",
  },
  {
    title: "Weather App",
    description:
      "Real-time weather application providing detailed weather information and forecasts with a modern, responsive interface.",
    tags: ["JavaScript", "Weather API", "Frontend", "React"],
    github: "https://github.com/rohit-bharmal/weather-app",
  },
  {
    title: "Newsletter Service",
    description:
      "Newsletter subscription and management system with automated email campaigns and analytics.",
    tags: ["JavaScript", "Email", "Backend", "Analytics"],
    github: "https://github.com/rohit-bharmal/newsletter",
  },
  {
    title: "PatternFly React",
    description:
      "Contributing to PatternFly's React component library, helping build enterprise-grade UI components.",
    tags: ["TypeScript", "React", "PatternFly", "UI Components"],
    github: "https://github.com/rohit-bharmal/patternfly-react",
  },
  {
    title: "Chatbot AI",
    description:
      "Intelligent chatbot system built with modern AI technologies for automated customer support and interactions.",
    tags: ["JavaScript", "AI/ML", "NLP", "Chatbot"],
    github: "https://github.com/rohit-bharmal/chatbot-ai",
  },
  {
    title: "Agentic RAG",
    description:
      "Implementation of Retrieval-Augmented Generation (RAG) for improved AI responses and information retrieval.",
    tags: ["AI/ML", "NLP", "RAG", "Information Retrieval"],
    github: "https://github.com/rohit-bharmal/agentic-rag",
  },
  {
    title: "PatternFly Elements",
    description:
      "Web components library based on PatternFly design system, creating reusable custom elements.",
    tags: ["TypeScript", "Web Components", "PatternFly", "UI"],
    github: "https://github.com/rohit-bharmal/patternfly-elements",
  },
  {
    title: "Heart Disease Predictor",
    description:
      "Machine learning application that predicts heart disease risk using patient data and advanced algorithms.",
    tags: ["Python", "Machine Learning", "Healthcare", "Data Science"],
    github:
      "https://github.com/rohit-bharmal/heart-disease-predictor-web-application",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: (theme) => theme.palette.background.paper,
        border: "1px solid",
        borderColor: "rgba(255, 255, 255, 0.1)",
        "&:hover": {
          borderColor: (theme) => theme.palette.primary.main,
          transform: "translateY(-4px)",
          transition: "all 0.3s ease-in-out",
        },
        transition: "all 0.3s ease-in-out",
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: (theme) => theme.palette.primary.main,
            fontWeight: 600,
            fontSize: "1.25rem",
            mb: 2,
          }}
        >
          {project.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, minHeight: "60px", lineHeight: 1.6 }}
        >
          {project.description}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
          {project.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                backgroundColor: "rgba(100, 255, 218, 0.1)",
                color: (theme) => theme.palette.primary.main,
                borderRadius: "4px",
                fontSize: "0.75rem",
              }}
            />
          ))}
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", p: 2, pt: 0 }}>
        <IconButton
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            "&:hover": {
              color: (theme) => theme.palette.primary.main,
              transform: "scale(1.1)",
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <GitHub />
        </IconButton>
      </CardActions>
    </Card>
  </motion.div>
);

const Projects = () => (
  <>
    <NavLinks />
    <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
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
              mb: 6,
              textAlign: "center",
            }}
          >
            Featured Projects
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
            width: "100%",
          }}
        >
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} />
          ))}
        </Box>
      </Box>
    </Container>
  </>
);

export default Projects;
