export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  private: boolean;
}

export interface ProcessedProject {
  id: number;
  name: string;
  title: string;
  description: string;
  html_url: string;
  homepage?: string | null;
  languages?: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  topics: string[];
  updated_at: string;
  created_at: string;
  archived: boolean;
  fork: boolean;
}

const GITHUB_USERNAME = "rohit-bharmal";
const GITHUB_API_BASE = "https://api.github.com";

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let repoCache: { data: GitHubRepo[]; timestamp: number } | null = null;
let languageCache: Map<
  string,
  { data: Record<string, number>; timestamp: number }
> = new Map();

// Featured repositories that should be prioritized
const FEATURED_REPOS = [
  "red-hat-design-system",
  "nl2sql",
  "rohit-bharmal.github.io",
  "weather-app",
  "newsletter",
  "patternfly-react",
  "chatbot-ai",
  "agentic-rag",
  "patternfly-elements",
  "heart-disease-predictor-web-application",
];

// Repo name mappings for better display names
const REPO_NAME_MAPPINGS: Record<string, string> = {
  "rohit-bharmal.github.io": "Portfolio Website",
  nl2sql: "NL2SQL",
  "red-hat-design-system": "Red Hat Design System",
  "weather-app": "Weather App",
  newsletter: "Newsletter Service",
  "patternfly-react": "PatternFly React",
  "chatbot-ai": "Chatbot AI",
  "agentic-rag": "Agentic RAG",
  "patternfly-elements": "PatternFly Elements",
  "heart-disease-predictor-web-application": "Heart Disease Predictor",
};

// Additional descriptions for repos that might not have good GitHub descriptions
const ENHANCED_DESCRIPTIONS: Record<string, string> = {
  "red-hat-design-system":
    "Contributing to Red Hat's Design System, helping improve and maintain the company's unified design language and component library.",
  nl2sql:
    "Natural Language to SQL pipeline that converts plain English queries into SQL. Uses AI to generate database queries and perform data analysis automatically.",
  "rohit-bharmal.github.io":
    "My personal portfolio website built with React, TypeScript, and Material-UI featuring modern design and interactive elements.",
  "weather-app":
    "Real-time weather application providing detailed weather information and forecasts with a modern, responsive interface.",
  newsletter:
    "Newsletter subscription and management system with automated email campaigns and analytics.",
  "patternfly-react":
    "Contributing to PatternFly's React component library, helping build enterprise-grade UI components.",
  "chatbot-ai":
    "Intelligent chatbot system built with modern AI technologies for automated customer support and interactions.",
  "agentic-rag":
    "Implementation of Retrieval-Augmented Generation (RAG) for improved AI responses and information retrieval.",
  "patternfly-elements":
    "Web components library based on PatternFly design system, creating reusable custom elements.",
  "heart-disease-predictor-web-application":
    "Machine learning application that predicts heart disease risk using patient data and advanced algorithms.",
};

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  // Check cache first
  const now = Date.now();
  if (repoCache && now - repoCache.timestamp < CACHE_DURATION) {
    return repoCache.data;
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          // Add GitHub token if available (for higher rate limits)
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();

    // Cache the results
    repoCache = { data: repos, timestamp: now };

    return repos;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);

    // Return cached data if available, even if expired
    if (repoCache) {
      console.warn("Using cached data due to API error");
      return repoCache.data;
    }

    throw error;
  }
}

export async function fetchRepoLanguages(
  languagesUrl: string
): Promise<Record<string, number>> {
  // Check cache first
  const now = Date.now();
  const cached = languageCache.get(languagesUrl);
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(languagesUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        }),
      },
    });

    if (!response.ok) {
      return {};
    }

    const languages = await response.json();

    // Cache the results
    languageCache.set(languagesUrl, { data: languages, timestamp: now });

    return languages;
  } catch (error) {
    console.error("Error fetching repo languages:", error);

    // Return cached data if available, even if expired
    if (cached) {
      console.warn("Using cached language data due to API error");
      return cached.data;
    }

    return {};
  }
}

export function processRepoData(
  repo: GitHubRepo,
  languages?: Record<string, number>
): ProcessedProject {
  const displayName =
    REPO_NAME_MAPPINGS[repo.name] ||
    repo.name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const description =
    ENHANCED_DESCRIPTIONS[repo.name] ||
    repo.description ||
    "A project built with modern technologies.";

  // Create languages array from topics, language, and languages
  const languagesList: string[] = [];

  // Add primary language
  if (repo.language) {
    languagesList.push(repo.language);
  }

  // Add additional languages from languages API
  if (languages) {
    const additionalLanguages = Object.keys(languages)
      .filter((lang) => lang !== repo.language)
      .slice(0, 4); // Limit to top 4 additional languages
    languagesList.push(...additionalLanguages);
  }

  // Add some smart tags based on repo name and description
  const smartTags = getSmartTags(repo.name, description);
  languagesList.push(...smartTags);

  // Remove duplicates and limit total languages
  const uniqueLanguages = Array.from(new Set(languagesList)).slice(0, 5);

  return {
    id: repo.id,
    name: repo.name,
    title: displayName,
    description,
    html_url: repo.html_url,
    homepage: repo.homepage || (repo.name === "rohit-bharmal.github.io" ? "https://rohit-bharmal.github.io" : null),
    languages: uniqueLanguages,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    watchers_count: repo.stargazers_count, // GitHub API doesn't provide watchers separately
    topics: repo.topics || [],
    updated_at: repo.updated_at,
    created_at: repo.created_at,
    archived: repo.archived,
    fork: repo.fork,
  };
}

function getSmartTags(name: string, description: string): string[] {
  const tags: string[] = [];
  const combinedText = `${name} ${description}`.toLowerCase();

  // AI/ML related
  if (
    combinedText.includes("ai") ||
    combinedText.includes("ml") ||
    combinedText.includes("machine learning") ||
    combinedText.includes("neural")
  ) {
    tags.push("AI/ML");
  }

  // Web technologies
  if (combinedText.includes("react") || combinedText.includes("frontend")) {
    tags.push("React");
  }
  if (combinedText.includes("node") || combinedText.includes("backend")) {
    tags.push("Backend");
  }
  if (combinedText.includes("api")) {
    tags.push("API");
  }

  // Design Systems
  if (
    combinedText.includes("design system") ||
    combinedText.includes("ui") ||
    combinedText.includes("component")
  ) {
    tags.push("Design System");
  }

  // Data related
  if (combinedText.includes("data") || combinedText.includes("analytics")) {
    tags.push("Data Analysis");
  }

  return tags;
}

export async function getFeaturedProjects(): Promise<ProcessedProject[]> {
  try {
    const repos = await fetchGitHubRepos();

    // Filter for featured repos and non-fork, non-archived repos
    const relevantRepos = repos.filter(
      (repo) =>
        !repo.fork &&
        !repo.archived &&
        !repo.private &&
        (FEATURED_REPOS.includes(repo.name) ||
          repo.stargazers_count > 0 ||
          repo.description)
    );

    // Sort by featured status, then by stars, then by last updated
    relevantRepos.sort((a, b) => {
      const aIsFeatured = FEATURED_REPOS.includes(a.name);
      const bIsFeatured = FEATURED_REPOS.includes(b.name);

      if (aIsFeatured && !bIsFeatured) return -1;
      if (!aIsFeatured && bIsFeatured) return 1;

      // If both are featured, sort by featured order
      if (aIsFeatured && bIsFeatured) {
        return FEATURED_REPOS.indexOf(a.name) - FEATURED_REPOS.indexOf(b.name);
      }

      // Otherwise sort by stars, then by update date
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }

      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    });

    // Process repos with languages data
    const processedProjects = await Promise.all(
      relevantRepos.slice(0, 12).map(async (repo) => {
        try {
          const languages = await fetchRepoLanguages(repo.languages_url);
          return processRepoData(repo, languages);
        } catch (error) {
          console.error(`Error processing repo ${repo.name}:`, error);
          return processRepoData(repo);
        }
      })
    );

    return processedProjects;
  } catch (error) {
    console.error("Error fetching featured projects:", error);

    // Return fallback data if GitHub API fails
    return getFallbackProjects();
  }
}

export function getFallbackProjects(): ProcessedProject[] {
  return [
    {
      id: 1,
      name: "red-hat-design-system",
      title: "Red Hat Design System",
      description: "Contributing to Red Hat's Design System, helping improve and maintain the company's unified design language and component library.",
      html_url: "https://github.com/rohit-bharmal/red-hat-design-system",
      homepage: null,
      languages: ["HTML", "CSS", "JavaScript", "Design System"],
      language: "CSS",
      stargazers_count: 5,
      forks_count: 2,
      watchers_count: 5,
      topics: ["design-system", "ui", "css", "html"],
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      archived: false,
      fork: false,
    },
    {
      id: 2,
      name: "nl2sql",
      title: "NL2SQL",
      description: "Natural Language to SQL pipeline that converts plain English queries into SQL. Uses AI to generate database queries and perform data analysis automatically.",
      html_url: "https://github.com/rohit-bharmal/nl2sql",
      homepage: null,
      languages: ["TypeScript", "Python", "AI/ML", "SQL"],
      language: "TypeScript",
      stargazers_count: 8,
      forks_count: 3,
      watchers_count: 8,
      topics: ["ai", "ml", "nlp", "sql", "typescript"],
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      archived: false,
      fork: false,
    },
    {
      id: 3,
      name: "rohit-bharmal.github.io",
      title: "Portfolio Website",
      description: "My personal portfolio website built with React, TypeScript, and Material-UI featuring modern design and interactive elements.",
      html_url: "https://github.com/rohit-bharmal/rohit-bharmal.github.io",
      homepage: "https://rohit-bharmal.github.io",
      languages: ["React", "TypeScript", "Material-UI", "Vite"],
      language: "TypeScript",
      stargazers_count: 12,
      forks_count: 4,
      watchers_count: 12,
      topics: ["portfolio", "react", "typescript", "material-ui"],
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      archived: false,
      fork: false,
    },
    {
      id: 4,
      name: "weather-app",
      title: "Weather App",
      description: "Real-time weather application providing detailed weather information and forecasts with a modern, responsive interface built with React and OpenWeather API.",
      html_url: "https://github.com/rohit-bharmal/weather-app",
      homepage: null,
      languages: ["React", "JavaScript", "CSS", "API"],
      language: "JavaScript",
      stargazers_count: 6,
      forks_count: 2,
      watchers_count: 6,
      topics: ["weather", "react", "api", "responsive"],
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      archived: false,
      fork: false,
    },
    {
      id: 5,
      name: "chatbot-ai",
      title: "Chatbot AI",
      description: "Intelligent chatbot system built with modern AI technologies for automated customer support and interactions. Features natural language processing and context awareness.",
      html_url: "https://github.com/rohit-bharmal/chatbot-ai",
      homepage: null,
      languages: ["Python", "AI/ML", "NLP", "FastAPI"],
      language: "Python",
      stargazers_count: 15,
      forks_count: 7,
      watchers_count: 15,
      topics: ["chatbot", "ai", "nlp", "python", "fastapi"],
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      archived: false,
      fork: false,
    },
    {
      id: 6,
      name: "heart-disease-predictor",
      title: "Heart Disease Predictor",
      description: "Machine learning application that predicts heart disease risk using patient data and advanced algorithms. Built with Python, scikit-learn, and Streamlit.",
      html_url: "https://github.com/rohit-bharmal/heart-disease-predictor-web-application",
      homepage: null,
      languages: ["Python", "Machine Learning", "Streamlit", "Pandas"],
      language: "Python",
      stargazers_count: 10,
      forks_count: 5,
      watchers_count: 10,
      topics: ["machine-learning", "healthcare", "python", "streamlit"],
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      archived: false,
      fork: false,
    },
  ];
}
