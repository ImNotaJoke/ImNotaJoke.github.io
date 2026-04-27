import { useEffect, useState } from "react";
import type { GitHubRepo } from "./useGitHubRepos";

const CACHE_PREFIX = "github_repos_cache";
const CACHE_TTL_MS = 20 * 60 * 1000; // 20 minutes
const GITHUB_USERNAME = "ImNotaJoke";

interface CacheData {
  repos: GitHubRepo[];
  timestamp: number;
}

function getCacheKey(limit?: number): string {
  return `${CACHE_PREFIX}_${limit || "all"}`;
}

function getCachedRepos(limit?: number): GitHubRepo[] | null {
  try {
    const key = getCacheKey(limit);
    const cached = localStorage.getItem(key);

    if (!cached) return null;

    const data: CacheData = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid (less than 20 minutes old)
    if (now - data.timestamp < CACHE_TTL_MS) {
      return data.repos;
    }

    // Cache expired, remove it
    localStorage.removeItem(key);
    return null;
  } catch (error) {
    console.warn("Error reading from cache:", error);
    return null;
  }
}

function setCachedRepos(repos: GitHubRepo[], limit?: number): void {
  try {
    const key = getCacheKey(limit);
    const cacheData: CacheData = {
      repos,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.warn("Error writing to cache:", error);
  }
}

/**
 * Hook with 20-minute caching for GitHub repos
 * Reduces API calls and improves performance on Vercel
 */
export function useGitHubReposWithCache(limit?: number) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      // Check cache first
      const cachedRepos = getCachedRepos(limit);
      if (cachedRepos) {
        setRepos(cachedRepos);
        setError(null);
        setLoading(false);
        return;
      }

      // Cache miss - fetch from API
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos`
        );
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);

        const data: GitHubRepo[] = await res.json();

        // Sort by updated_at descending
        data.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );

        // Apply limit if provided
        const finalRepos = limit ? data.slice(0, limit) : data;

        // Cache the results
        setCachedRepos(finalRepos, limit);

        setRepos(finalRepos);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, [limit]);

  return { repos, loading, error };
}

/**
 * Clear cache for a specific limit or all caches
 * Useful for manual refresh/invalidation
 */
export function clearGitHubReposCache(limit?: number): void {
  try {
    if (limit === undefined) {
      // Clear all caches
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } else {
      // Clear specific cache
      localStorage.removeItem(getCacheKey(limit));
    }
  } catch (error) {
    console.warn("Error clearing cache:", error);
  }
}

/**
 * Get cache age in seconds (for debugging)
 */
export function getCacheAge(limit?: number): number | null {
  try {
    const key = getCacheKey(limit);
    const cached = localStorage.getItem(key);

    if (!cached) return null;

    const data: CacheData = JSON.parse(cached);
    return Math.round((Date.now() - data.timestamp) / 1000);
  } catch {
    return null;
  }
}
