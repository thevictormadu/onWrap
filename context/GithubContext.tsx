"use client";

import { createContext, useState, useContext, ReactNode } from "react";

export interface GitHubData {
  totalStars: number;
  totalCommits: number;
  totalContributions: number;
  totalPRs: number;
  totalReviews: number;
  totalForkedRepos: number;
  longestStreak: number;
  peakMonth: string;
  topLanguage: string;
  profilePicture: string;
  firstName: string | null;
  lastName: string | null;
  userId: string | null;
  isAuthenticated?: boolean;
}

interface GitHubContextType {
  data: GitHubData | null;
  fetchGitHubData: (username: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  clearData: () => void;
}

const GitHubContext = createContext<GitHubContextType | undefined>(undefined);

export const useGitHub = () => {
  const context = useContext(GitHubContext);
  if (!context) {
    throw new Error("useGitHub must be used within a GitHubProvider");
  }
  return context;
};

export const GitHubProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubData = async (username: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/github-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const result = await response.json();

      if (!response.ok) {
        const message =
          typeof result?.error === "string"
            ? result.error
            : "Failed to fetch data from GitHub.";
        throw new Error(message);
      }

      setData(result);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      if (process.env.NODE_ENV !== "production") {
        console.error("GitHub API Error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearData = () => {
    setData(null);
    setError(null);
  };

  return (
    <GitHubContext.Provider
      value={{ data, fetchGitHubData, loading, error, clearError, clearData }}
    >
      {children}
    </GitHubContext.Provider>
  );
};
