import {
    commitsAltIntroduction,
    commitsIntroduction, prReviewsAltIntroduction, prReviewsIntroduction,
    pullRequestsAltIntroduction,
    pullRequestsIntroduction,
    slangAltIntroduction,
    slangIntroduction,
    starsReceivedAltIntroduction, starsReceivedIntroduction,
    streakAltIntroduction,
    streakIntroduction, topLanguageAltIntroduction, topLanguageIntroduction
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

export function getTopLanguageIntroduction(language: string): string {
    if (language == "Unknown") {
        return topLanguageAltIntroduction
    } else {
        return topLanguageIntroduction
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
    if (commits > 2000) {
        return {slang: "Idan!", emoji: "👑"}
    } else if (commits > 1500) {
        return {slang: "President General!", emoji: "🎖️"}
    } else if (commits > 1000) {
        return {slang: "Raise am!!", emoji: "🙌️"}
    } else if (commits > 500) {
        return {slang: "Opor!", emoji: "🫡"}
    } else if (commits > 400) {
        return {slang: "Who dey breathe!", emoji: "✌️"}
    } else if (commits > 300) {
        return {slang: "E choke!", emoji: "🫣️"}
    } else if (commits > 200) {
        return {slang: "Omo!", emoji: "🙂"}
    } else if (commits > 100) {
        return {slang: "Odogwu!", emoji: "🤑"}
    } else if (commits > 50) {
        return {slang: "On colos!", emoji: "🤐️"}
    } else if (commits > 10) {
        return {slang: "We mueve!", emoji: "🤐️"}
    } else if (commits > 5) {
        return {slang: "Wahala!", emoji: "🤐️"}
    } else if (commits > 2) {
        return {slang: "God abeg!", emoji: "🤲"}
    } else {
        return {slang: "Dey play!", emoji: "😩"}
    }
}