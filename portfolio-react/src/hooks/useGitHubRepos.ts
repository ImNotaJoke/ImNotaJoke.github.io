import { useEffect, useState } from "react";

const GITHUB_USERNAME = "ImNotaJoke";

const langColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  TypeScript: "#2b7489",
  Java: "#b07219",
  "C++": "#f34b7d",
  "C#": "#178600",
  Shell: "#89e051",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
};

function getContrastColor(hexColor: string): string {
  if (!hexColor) return "white";
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  languages_url: string;
  updated_at: string;
  owner: {
    login: string;
    html_url: string;
  };
}

export function useGitHubRepos(limit?: number) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos`
        );
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data: GitHubRepo[] = await res.json();
        data.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        setRepos(limit ? data.slice(0, limit) : data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, [limit]);

  return { repos, loading, error };
}

export function useRepoLanguages(languagesUrl: string) {
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchLangs() {
      try {
        const res = await fetch(languagesUrl);
        if (!res.ok) return;
        const data = await res.json();
        setLanguages(Object.keys(data));
      } catch {
        // ignore
      }
    }
    fetchLangs();
  }, [languagesUrl]);

  return languages;
}

export { langColors, getContrastColor };
