import { NextRequest, NextResponse } from "next/server";
import { YEAR } from "@/constants/index";

const APP_FALLBACK_TOKEN = process.env.GITHUB_APP_TOKEN;
const PUBLIC_FALLBACK_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

interface GitHubDataResponse {
  data: {
    user: {
      avatarUrl: string;
      name: string | null;
      contributionsCollection: {
        totalCommitContributions: number;
        totalPullRequestContributions: number;
        totalPullRequestReviewContributions: number;
        pullRequestContributions: {
          totalCount: number;
          nodes: {
            pullRequest: {
              createdAt: string;
            };
          }[];
        };
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
            }[];
          }[];
        };
      };
      repositories: {
        nodes: {
          stargazers: { totalCount: number };
          languages: {
            edges: {
              size: number;
              node: { name: string };
            }[];
          };
        }[];
      };
      forkedRepos: {
        nodes: {
          createdAt: string;
        }[];
      };
    } | null;
  } | null;
  errors?: { message: string; type?: string }[];
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const username = body?.username as string | undefined;

  if (!username) {
    return NextResponse.json(
      { error: "Missing 'username' in request body" },
      { status: 400 }
    );
  }

  // Prefer per‑user OAuth token, then app‑level token, then legacy public token
  const cookieToken = req.cookies.get("gh_access_token")?.value;
  const isAuthenticated = !!cookieToken; // User is authenticated if they have an OAuth token
  const token = cookieToken || APP_FALLBACK_TOKEN || PUBLIC_FALLBACK_TOKEN;

  if (!token) {
    return NextResponse.json(
      {
        error:
          "No GitHub token available. Configure GITHUB_APP_TOKEN / NEXT_PUBLIC_GITHUB_TOKEN or sign in with GitHub.",
      },
      { status: 500 }
    );
  }

  const yearStart = `${YEAR}-01-01T00:00:00Z`;
  const yearEnd = `${YEAR}-12-31T23:59:59Z`;

  const query = `
    query FetchGitHubData($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        avatarUrl
        name
        contributionsCollection(from: $from, to: $to) {
          totalCommitContributions
          totalPullRequestContributions
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
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
          nodes {
            stargazers {
              totalCount
            }
            languages(first: 10) {
              edges {
                size
                node {
                  name
                }
              }
            }
          }
        }
        forkedRepos: repositories(
          first: 100
          ownerAffiliations: OWNER
          isFork: true
          orderBy: { field: CREATED_AT, direction: DESC }
        ) {
          nodes {
            createdAt
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username, from: yearStart, to: yearEnd },
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json(
          {
            error: "Authentication failed. Please re-authenticate with GitHub.",
          },
          { status: 401 }
        );
      } else if (response.status === 403) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 403 }
        );
      } else if (response.status === 404) {
        return NextResponse.json(
          {
            error: "User not found. Please check the username and try again.",
          },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          error: `Network error: ${response.status} ${response.statusText}`,
        },
        { status: 500 }
      );
    }

    const result = (await response.json()) as GitHubDataResponse;

    if (
      result.errors &&
      Array.isArray(result.errors) &&
      result.errors.length > 0
    ) {
      const errorMessages = result.errors.map((err) => {
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
      });

      return NextResponse.json(
        { error: errorMessages.join(", ") },
        { status: 400 }
      );
    }

    if (!result.data || !result.data.user) {
      return NextResponse.json(
        {
          error:
            "No data received from GitHub API. Please check your token and try again.",
        },
        { status: 500 }
      );
    }

    const user = result.data.user;
    const { contributionsCollection, repositories, forkedRepos } = user;

    const currentYear = YEAR;

    const totalCommits = contributionsCollection.totalCommitContributions || 0;

    const totalContributions =
      contributionsCollection.contributionCalendar.totalContributions || 0;

    const totalPRs = contributionsCollection.totalPullRequestContributions || 0;

    const totalReviews =
      contributionsCollection.totalPullRequestReviewContributions || 0;

    const forkedRepoNodes = forkedRepos?.nodes || [];
    const totalForkedRepos = forkedRepoNodes.filter((repo) => {
      const createdDate = repo?.createdAt ? new Date(repo.createdAt) : null;
      return createdDate && createdDate.getFullYear() === currentYear;
    }).length;

    const totalStars = repositories.nodes.reduce(
      (sum, repo) => sum + (repo.stargazers.totalCount || 0),
      0
    );

    // Calculate top language based on bytes of code (not repository count)
    // This matches GitHub's own calculation method
    const languageBytes: Record<string, number> = {};
    repositories.nodes.forEach((repo) => {
      repo.languages.edges.forEach((lang) => {
        const langName = lang.node.name;
        const langSize = lang.size || 0;
        // Exclude HTML and CSS as they're often markup/styling, not primary languages
        if (langName !== "HTML" && langName !== "CSS" && langSize > 0) {
          languageBytes[langName] = (languageBytes[langName] || 0) + langSize;
        }
      });
    });

    const topLanguage =
      Object.keys(languageBytes).length > 0
        ? Object.keys(languageBytes).sort(
            (a, b) => languageBytes[b] - languageBytes[a]
          )[0]
        : "Unknown";

    const contributionDaysWithDates =
      contributionsCollection.contributionCalendar.weeks.flatMap((week) =>
        week.contributionDays
          .filter((day) => {
            const date = new Date(day.date);
            return date.getFullYear() === currentYear;
          })
          .map((day) => ({
            date: new Date(day.date),
            count: day.contributionCount,
          }))
      );

    let longestStreak = 0;
    let currentStreakCount = 0;

    contributionDaysWithDates.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    for (let i = 0; i < contributionDaysWithDates.length; i++) {
      if (contributionDaysWithDates[i].count > 0) {
        currentStreakCount++;
        longestStreak = Math.max(longestStreak, currentStreakCount);
      } else {
        currentStreakCount = 0;
      }
    }

    const monthCommitCounts: Record<string, number> = {};
    contributionsCollection.contributionCalendar.weeks.forEach((week) => {
      week.contributionDays.forEach((day) => {
        if (day.contributionCount > 0) {
          const date = new Date(day.date);
          if (date.getFullYear() === currentYear) {
            const month = date.toLocaleString("default", { month: "long" });
            monthCommitCounts[month] =
              (monthCommitCounts[month] || 0) + day.contributionCount;
          }
        }
      });
    });

    const peakMonth =
      Object.keys(monthCommitCounts).length > 0
        ? Object.keys(monthCommitCounts).reduce((peak, month) => {
            return monthCommitCounts[month] > (monthCommitCounts[peak] || 0)
              ? month
              : peak;
          }, Object.keys(monthCommitCounts)[0])
        : "No Month";

    const fullName = user.name || "";
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0] || null;
    const lastName = nameParts.slice(1).join(" ") || null;

    return NextResponse.json({
      totalStars,
      totalCommits,
      totalContributions,
      totalPRs,
      totalReviews,
      totalForkedRepos,
      longestStreak,
      peakMonth,
      topLanguage,
      profilePicture: user.avatarUrl,
      firstName,
      lastName,
      userId: username,
      isAuthenticated,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
