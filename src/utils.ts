import {
    commitsAltIntroduction,
    commitsIntroduction, prReviewsAltIntroduction, prReviewsIntroduction,
    pullRequestsAltIntroduction,
    pullRequestsIntroduction,
    slangAltIntroduction,
    slangIntroduction,
    starsReceivedAltIntroduction, starsReceivedIntroduction,
    streakAltIntroduction,
    streakIntroduction
} from "./constants.ts";
import {Slangs} from "./types.ts";


export const easeInOutQuad = (t: number): number => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

export function getStarsReceivedIntroduction(stars: number): string {
    if (stars < 3) {
        return starsReceivedAltIntroduction
    } else {
        return starsReceivedIntroduction
    }
}

export function getStreakIntroduction(streak: number): string {
    if (streak < 3) {
        return streakAltIntroduction
    } else {
        return streakIntroduction
    }
}

export function getCommitsIntroduction(commits: number): string {
    if (commits < 20) {
        return commitsAltIntroduction
    } else {
        return commitsIntroduction
    }
}

export function getPullRequestIntroduction(pullRequests: number): string {
    if (pullRequests < 5) {
        return pullRequestsAltIntroduction
    } else {
        return pullRequestsIntroduction
    }
}

export function getPrReviewsIntroduction(prReviews: number): string {
    if (prReviews < 3) {
        return prReviewsAltIntroduction
    } else {
        return prReviewsIntroduction
    }
}

export function getSlangIntroduction(commits: number): string {
    if (commits < 5) {
        return slangAltIntroduction
    } else {
        return slangIntroduction
    }
}

export function getSlang(commits: number): Slangs {
    if (commits > 150) {
        return {slang: "President General!", emoji: "🎖️"}
    } else if (commits > 100) {
        return {slang: "Odogwu!", emoji: "👑"}
    } else if (commits > 70) {
        return {slang: "Raise am! Raise am!", emoji: "🙌️"}
    } else if (commits > 30) {
        return {slang: "You too do o!", emoji: "🫣️"}
    } else if (commits > 15) {
        return {slang: "Omo!", emoji: "🙂️"}
    } else if (commits > 5) {
        return {slang: "Na wa o!", emoji: "🤐️"}
    } else {
        return {slang: "God Abeg!", emoji: "😩"}
    }
}