import {createContext, useState, useContext, ReactNode} from "react";

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

export const GitHubProvider = ({children}: { children: ReactNode }) => {
    const [data, setData] = useState<GitHubData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchGitHubData = async (username: string): Promise<void> => {
        const token = import.meta.env.VITE_GITHUB_TOKEN
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
                body: JSON.stringify({query, variables: {username}}),
            });

            const result = await response.json();
            console.log(result);
            if (result.errors) {

                throw new Error(result.errors.map((err: any) => err.message).join(", "));
            }
            const userId = username
            const user = result.data.user;
            const {contributionsCollection, repositories} = user;

            // Get the current year
            const currentYear = new Date().getFullYear();

            // Safely filter Pull Requests by Year
            const pullRequestNodes = contributionsCollection.pullRequestContributions?.nodes || [];
            const pullRequestsThisYear = pullRequestNodes.filter((pr: any) => {
                const date = pr?.pullRequest?.createdAt ? new Date(pr.pullRequest.createdAt) : null;
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

            const topLanguage = Object.keys(languageCounts).sort(
                (a, b) => languageCounts[b] - languageCounts[a]
            )[0] || "Unknown";

            const totalCommits = contributionsCollection.contributionCalendar.weeks.reduce(
                (total: number, week: any) => {
                    return total + week.contributionDays.reduce((weekTotal: number, day: any) => {
                        const date = new Date(day.date);
                        if (date.getFullYear() === currentYear) {
                            return weekTotal + day.contributionCount;
                        }
                        return weekTotal;
                    }, 0);
                },
                0
            );
            const totalPRs = pullRequestsThisYear.length; // Use filtered PRs
            const totalReviews = contributionsCollection.totalPullRequestReviewContributions || 0;

            // Filter contribution days for the current year
            const contributionDays = contributionsCollection.contributionCalendar.weeks.flatMap(
                (week: any) =>
                    week.contributionDays.filter((day: any) => {
                        const date = new Date(day.date);
                        return date.getFullYear() === currentYear;
                    }).map((day: any) => day.contributionCount)
            );

            const longestStreak = contributionDays.reduce(
                (longest: number, count: number, index: number, arr: number[]) => {
                    if (count > 0) {
                        const streak = arr.slice(index).findIndex((val) => val === 0);
                        return Math.max(longest, streak === -1 ? arr.length - index : streak);
                    }
                    return longest;
                },
                0
            );

            // Calculate Peak Performance Month
            const monthCommitCounts: Record<string, number> = {};
            contributionsCollection.contributionCalendar.weeks.forEach((week: any) => {
                week.contributionDays.forEach((day: any) => {
                    if (day.contributionCount > 0) {
                        const date = new Date(day.date);
                        if (date.getFullYear() === currentYear) {
                            const month = date.toLocaleString("default", {month: "long"});
                            monthCommitCounts[month] = (monthCommitCounts[month] || 0) + day.contributionCount;
                        }
                    }
                });
            });

            const peakMonth = Object.keys(monthCommitCounts).reduce((peak, month) => {
                return monthCommitCounts[month] > (monthCommitCounts[peak] || 0) ? month : peak;
            }, "");

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
                userId
            });
        } catch (err: any) {
            setError(err.message || "Something went wrong");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <GitHubContext.Provider value={{data, fetchGitHubData, loading, error}}>
            {children}
        </GitHubContext.Provider>
    );
};