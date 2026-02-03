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

// Simple list of featured repos to prioritize
const FEATURED_REPOS = [
  "rohit-bharmal.github.io",
  "red-hat-design-system",
  "nl2sql",
  "patternfly-react",
  "chatbot-ai",
  "weather-app",
];

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  // Check cache first
  const now = Date.now();
  if (repoCache && now - repoCache.timestamp < CACHE_DURATION) {
    return repoCache.data;
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?per_page=50&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
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

    // Return cached data if available
    if (repoCache) {
      return repoCache.data;
    }

    throw error;
  }
}

export async function fetchRepoLanguages(
  languagesUrl: string
): Promise<Record<string, number>> {
  try {
    const response = await fetch(languagesUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      return {};
    }

    return await response.json();
  } catch (error) {
    return {};
  }
}

// Simple display name generator
function generateDisplayName(repoName: string): string {
  if (repoName === "rohit-bharmal.github.io") return "Portfolio Website";

  return repoName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function processRepoData(
  repo: GitHubRepo,
  languages?: Record<string, number>
): ProcessedProject {
  const displayName = generateDisplayName(repo.name);
  const description =
    repo.description || `A ${repo.language || "software"} project`;

  // Simple languages array
  const languagesList: string[] = [];

  if (repo.language) {
    languagesList.push(repo.language);
  }

  if (languages) {
    Object.keys(languages)
      .filter((lang) => lang !== repo.language)
      .slice(0, 3)
      .forEach((lang) => languagesList.push(lang));
  }

  return {
    id: repo.id,
    name: repo.name,
    title: displayName,
    description,
    html_url: repo.html_url,
    homepage: repo.homepage,
    languages: languagesList,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    watchers_count: repo.stargazers_count,
    topics: repo.topics || [],
    updated_at: repo.updated_at,
    created_at: repo.created_at,
    archived: repo.archived,
    fork: repo.fork,
  };
}

export async function getFeaturedProjects(): Promise<ProcessedProject[]> {
  try {
    const repos = await fetchGitHubRepos();

    // Simple filtering: non-archived, non-private repos
    const filteredRepos = repos.filter(
      (repo) =>
        !repo.archived &&
        !repo.private &&
        (repo.stargazers_count > 0 ||
          repo.description ||
          FEATURED_REPOS.includes(repo.name))
    );

    // Simple sorting: featured first, then by stars, then by update date
    filteredRepos.sort((a, b) => {
      const aFeatured = FEATURED_REPOS.includes(a.name);
      const bFeatured = FEATURED_REPOS.includes(b.name);

      if (aFeatured && !bFeatured) return -1;
      if (!aFeatured && bFeatured) return 1;

      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }

      return (
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    });

    // Process top 12 repos
    const processedProjects = await Promise.all(
      filteredRepos.slice(0, 12).map(async (repo) => {
        const languages = await fetchRepoLanguages(repo.languages_url);
        return processRepoData(repo, languages);
      })
    );

    return processedProjects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return getFallbackProjects();
  }
}

export function getFallbackProjects(): ProcessedProject[] {
  return [
    {
      id: 1,
      name: "rohit-bharmal.github.io",
      title: "Portfolio Website",
      description:
        "Personal portfolio website built with React, TypeScript, and Material-UI",
      html_url: "https://github.com/rohit-bharmal/rohit-bharmal.github.io",
      homepage: "https://rohit-bharmal.github.io",
      languages: ["React", "TypeScript", "Material-UI"],
      language: "TypeScript",
      stargazers_count: 0,
      forks_count: 0,
      watchers_count: 0,
      topics: ["portfolio", "react", "typescript"],
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      archived: false,
      fork: false,
    },
    {
      id: 2,
      name: "red-hat-projects",
      title: "Red Hat Projects",
      description:
        "Professional work and contributions at Red Hat including Customer Portal and Security Advisory systems",
      html_url: "https://github.com/rohit-bharmal/red-hat-projects",
      homepage: null,
      languages: ["Vue.js", "JavaScript", "TypeScript"],
      language: "JavaScript",
      stargazers_count: 0,
      forks_count: 0,
      watchers_count: 0,
      topics: ["red-hat", "vue", "enterprise"],
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      archived: false,
      fork: false,
    },
  ];
}
