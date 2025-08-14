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
  title: string;
  description: string;
  tags: string[];
  github: string;
  live?: string;
  language: string | null;
  stars: number;
  forks: number;
  lastUpdated: string;
  isArchived: boolean;
  isFork: boolean;
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

  // Create tags from topics, language, and languages
  const tags: string[] = [];

  // Add primary language
  if (repo.language) {
    tags.push(repo.language);
  }

  // Add additional languages from languages API
  if (languages) {
    const additionalLanguages = Object.keys(languages)
      .filter((lang) => lang !== repo.language)
      .slice(0, 3); // Limit to top 3 additional languages
    tags.push(...additionalLanguages);
  }

  // Add topics
  if (repo.topics && repo.topics.length > 0) {
    tags.push(...repo.topics.slice(0, 5)); // Limit topics
  }

  // Add some smart tags based on repo name and description
  const smartTags = getSmartTags(repo.name, description);
  tags.push(...smartTags);

  // Remove duplicates and limit total tags
  const uniqueTags = Array.from(new Set(tags)).slice(0, 6);

  return {
    id: repo.id,
    title: displayName,
    description,
    tags: uniqueTags,
    github: repo.html_url,
    live:
      repo.homepage ||
      (repo.name === "rohit-bharmal.github.io"
        ? "https://rohit-bharmal.github.io"
        : undefined),
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    lastUpdated: repo.updated_at,
    isArchived: repo.archived,
    isFork: repo.fork,
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

function getFallbackProjects(): ProcessedProject[] {
  return [
    {
      id: 1,
      title: "Red Hat Design System",
      description:
        "Contributing to Red Hat's Design System, helping improve and maintain the company's unified design language and component library.",
      tags: ["HTML", "CSS", "Design System", "Red Hat", "UI/UX"],
      github: "https://github.com/rohit-bharmal/red-hat-design-system",
      language: "CSS",
      stars: 0,
      forks: 0,
      lastUpdated: new Date().toISOString(),
      isArchived: false,
      isFork: false,
    },
    {
      id: 2,
      title: "NL2SQL",
      description:
        "Natural Language to SQL pipeline that converts plain English queries into SQL. Uses AI to generate database queries and perform data analysis automatically.",
      tags: ["TypeScript", "AI/ML", "NLP", "SQL", "Data Analysis"],
      github: "https://github.com/rohit-bharmal/nl2sql",
      language: "TypeScript",
      stars: 0,
      forks: 0,
      lastUpdated: new Date().toISOString(),
      isArchived: false,
      isFork: false,
    },
    {
      id: 3,
      title: "Portfolio Website",
      description:
        "My personal portfolio website built with React, TypeScript, and Material-UI featuring modern design and interactive elements.",
      tags: ["React", "TypeScript", "Material-UI", "Vite"],
      github: "https://github.com/rohit-bharmal/rohit-bharmal.github.io",
      live: "https://rohit-bharmal.github.io",
      language: "TypeScript",
      stars: 0,
      forks: 0,
      lastUpdated: new Date().toISOString(),
      isArchived: false,
      isFork: false,
    },
  ];
}
