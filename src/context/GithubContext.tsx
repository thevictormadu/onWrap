import { createContext, useState, useContext, ReactNode } from "react";
import { YEAR } from "../constants/index.ts";

interface GitHubData {
  totalStars: number;
  totalCommits: number;
  totalPRs: number;
  totalReviews: number;
  longestStreak: number;
  peakMonth: string;
  topLanguage: string;
  profilePicture: string;
  firstName: string | null;
  lastName: string | null;
  userId: string | null;
}

interface GitHubContextType {
  data: GitHubData | null;
  fetchGitHubData: (username: string) => Promise<void>;
  loading: boolean;
  error: string | null;
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
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    if (!token) {
      setError(
        "GitHub token is not configured. Please set VITE_GITHUB_TOKEN in your environment variables."
      );
      setLoading(false);
      return;
    }

    const query = `
            query FetchGitHubData($username: String!) {
                user(login: $username) {
                    avatarUrl
                    name
                    contributionsCollection {
                        totalCommitContributions
                        totalPullRequestReviewContributions
                        pullRequestContributions(first: 100) {
                            totalCount
                            nodes {
                                pullRequest {
                                    createdAt
                                }
                            }
                        }
                        contributionCalendar {
                            totalContributions
                            weeks {
                                contributionDays {
                                    contributionCount
                                    date
                                }
                            }
                        }
                    }
                    repositories(first: 100, ownerAffiliations: OWNER) {
                        nodes {
                            stargazers {
                                totalCount
                            }
                            languages(first: 10) {
                                edges {
                                    node {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }`;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables: { username } }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "This one is on me. Please try again later."
          );
        } else if (response.status === 403) {
          throw new Error("Rate limit exceeded. Please try again later.");
        } else if (response.status === 404) {
          throw new Error(
            "User not found. Please check the username and try again."
          );
        } else {
          throw new Error(
            `Network error: ${response.status} ${response.statusText}`
          );
        }
      }

      const result = await response.json();

      if (import.meta.env.DEV) {
        console.log(result);
      }

      // Check for GraphQL errors first (even if status is 200)
      if (
        result.errors &&
        Array.isArray(result.errors) &&
        result.errors.length > 0
      ) {
        const errorMessages = result.errors.map(
          (err: { message: string; type?: string }) => {
            if (
              err.type === "NOT_FOUND" ||
              err.message.includes("Could not resolve")
            ) {
              return "User not found. Please check the username and try again.";
            } else if (
              err.message.includes("rate limit") ||
              err.message.includes("rate_limit")
            ) {
              return "GitHub API rate limit exceeded. Please try again later.";
            } else if (
              err.message.includes("Bad credentials") ||
              err.message.includes("401")
            ) {
              return "Authentication failed. Please check your GitHub token.";
            }
            return err.message;
          }
        );
        throw new Error(errorMessages.join(", "));
      }

      // Check if data exists and has user
      if (!result.data) {
        throw new Error(
          "No data received from GitHub API. Please check your token and try again."
        );
      }

      if (!result.data.user) {
        throw new Error(
          "User not found. Please check the username and try again."
        );
      }
      const userId = username;
      const user = result.data.user;
      const { contributionsCollection, repositories } = user;

      // Get the current year
      const currentYear = YEAR;

      // Safely filter Pull Requests by Year
      const pullRequestNodes =
        contributionsCollection.pullRequestContributions?.nodes || [];
      const pullRequestsThisYear = pullRequestNodes.filter((pr: any) => {
        const date = pr?.pullRequest?.createdAt
          ? new Date(pr.pullRequest.createdAt)
          : null;
        return date && date.getFullYear() === currentYear;
      });

      // Calculate metrics
      const totalStars = repositories.nodes.reduce(
        (sum: number, repo: any) => sum + (repo.stargazers.totalCount || 0),
        0
      );

      const languageCounts: Record<string, number> = {};
      repositories.nodes.forEach((repo: any) => {
        repo.languages.edges.forEach((lang: any) => {
          const langName = lang.node.name;
          // Exclude HTML and CSS from being counted
          if (langName !== "HTML" && langName !== "CSS") {
            languageCounts[langName] = (languageCounts[langName] || 0) + 1;
          }
        });
      });

      const topLanguage =
        Object.keys(languageCounts).sort(
          (a, b) => languageCounts[b] - languageCounts[a]
        )[0] || "Unknown";

      const totalCommits =
        contributionsCollection.contributionCalendar.weeks.reduce(
          (total: number, week: any) => {
            return (
              total +
              week.contributionDays.reduce((weekTotal: number, day: any) => {
                const date = new Date(day.date);
                if (date.getFullYear() === currentYear) {
                  return weekTotal + day.contributionCount;
                }
                return weekTotal;
              }, 0)
            );
          },
          0
        );
      const totalPRs = pullRequestsThisYear.length; // Use filtered PRs
      const totalReviews =
        contributionsCollection.totalPullRequestReviewContributions || 0;

      // Filter contribution days for the current year and get dates with counts
      const contributionDaysWithDates =
        contributionsCollection.contributionCalendar.weeks.flatMap(
          (week: any) =>
            week.contributionDays
              .filter((day: any) => {
                const date = new Date(day.date);
                return date.getFullYear() === currentYear;
              })
              .map((day: any) => ({
                date: new Date(day.date),
                count: day.contributionCount,
              }))
        );

      // Calculate longest streak of consecutive days with contributions
      let longestStreak = 0;
      let currentStreak = 0;

      // Sort by date to ensure chronological order
      contributionDaysWithDates.sort(
        (a: { date: Date; count: number }, b: { date: Date; count: number }) =>
          a.date.getTime() - b.date.getTime()
      );

      for (let i = 0; i < contributionDaysWithDates.length; i++) {
        if (contributionDaysWithDates[i].count > 0) {
          currentStreak++;
          longestStreak = Math.max(longestStreak, currentStreak);
        } else {
          currentStreak = 0;
        }
      }

      // Calculate Peak Performance Month
      const monthCommitCounts: Record<string, number> = {};
      contributionsCollection.contributionCalendar.weeks.forEach(
        (week: any) => {
          week.contributionDays.forEach((day: any) => {
            if (day.contributionCount > 0) {
              const date = new Date(day.date);
              if (date.getFullYear() === currentYear) {
                const month = date.toLocaleString("default", { month: "long" });
                monthCommitCounts[month] =
                  (monthCommitCounts[month] || 0) + day.contributionCount;
              }
            }
          });
        }
      );

      const peakMonth =
        Object.keys(monthCommitCounts).length > 0
          ? Object.keys(monthCommitCounts).reduce(
              (peak: string, month: string) => {
                return monthCommitCounts[month] > (monthCommitCounts[peak] || 0)
                  ? month
                  : peak;
              },
              Object.keys(monthCommitCounts)[0]
            )
          : "N/A";

      // Split the full name into first name and last name
      const fullName = user.name || "";
      const nameParts = fullName.split(" ");
      const firstName = nameParts[0] || null;
      const lastName = nameParts.slice(1).join(" ") || null;

      setData({
        totalStars,
        totalCommits,
        totalPRs,
        totalReviews,
        longestStreak,
        peakMonth,
        topLanguage,
        profilePicture: user.avatarUrl,
        firstName,
        lastName,
        userId,
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      if (import.meta.env.DEV) {
        console.error("GitHub API Error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <GitHubContext.Provider value={{ data, fetchGitHubData, loading, error }}>
      {children}
    </GitHubContext.Provider>
  );
};
