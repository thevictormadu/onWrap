import Slide from "./Slide";
import Slider from "./Slider";
import IntroSlide from "./IntroSlide.tsx";
import EndNote from "./EndNote.tsx";
import {
    getCommitsIntroduction, getPrReviewsIntroduction,
    getPullRequestIntroduction, getSlang, getSlangIntroduction,
    getStarsReceivedIntroduction,
    getStreakIntroduction, getTopLanguageIntroduction
} from "../utils.ts";
import {useGitHub} from "../context/GithubContext.tsx";
import {
    commitsIcon,
    commitsSubtext,
    commitsTitle, peakPerformanceIcon,
    peakPerformanceIntroduction, peakPerformanceSubtext,
    peakPerformanceTitle, prReviewsIcon, prReviewsSubtext, prReviewsTitle, pullRequestsIcon,
    pullRequestsSubtext,
    pullRequestsTitle, slangSubtext, slangIcon, slangTitle, starsReceivedIcon,
    starsReceivedSubtext,
    starsReceivedTitle, streakIcon, streakSubtext, streakTitle, topLanguageIcon,
    topLanguageSubtext,
    topLanguageTitle
} from "../constants.ts";
import {useEffect} from "react";

const SlideOne: React.FC = () => (
    <IntroSlide
    />
);

const SlideTwo: React.FC = () => {
    const {data} = useGitHub();
    const totalStars = data?.totalStars ?? 0;

    return (
        <Slide
            icon={starsReceivedIcon}
            data={totalStars.toString()}
            subText={starsReceivedSubtext}
            title={starsReceivedTitle}
            preText={getStarsReceivedIntroduction(totalStars)}
            countDown
        />
    );
};

const SlideThree: React.FC = () => {
    const {data} = useGitHub();
    const topLanguage = data?.topLanguage ?? "Tricky";

    return (
        <Slide
            icon={topLanguageIcon}
            data={topLanguage}
            subText={topLanguageSubtext}
            title={topLanguageTitle}
            preText={getTopLanguageIntroduction(topLanguage)}
        />
    );
};

const SlideFour: React.FC = () => {
    const {data} = useGitHub();
    const commits = data?.totalCommits ?? 0;

    return (
        <Slide
            icon={commitsIcon}
            data={commits.toString()}
            subText={commitsSubtext}
            title={commitsTitle}
            preText={getCommitsIntroduction(commits)}
            countDown
        />
    );
};

const SlideFive: React.FC = () => {
    const {data} = useGitHub();
    const pullRequest = data?.totalPRs ?? 0;

    return (
        <Slide
            icon={pullRequestsIcon}
            data={pullRequest.toString()}
            subText={pullRequestsSubtext}
            title={pullRequestsTitle}
            preText={getPullRequestIntroduction(pullRequest)}
            countDown
        />
    );
};

const SlideSix: React.FC = () => {
    const {data} = useGitHub();
    const peakMonth = data?.peakMonth ?? 0;

    return (
        <Slide
            icon={peakPerformanceIcon}
            data={peakMonth.toString()}
            subText={peakPerformanceSubtext}
            title={peakPerformanceTitle}
            preText={peakPerformanceIntroduction}
        />
    );
};

const SlideSeven: React.FC = () => {
    const {data} = useGitHub();
    const longestStreak = data?.longestStreak ?? 0;

    return (
        <Slide
            icon={streakIcon}
            data={longestStreak.toString()}
            subText={streakSubtext}
            title={streakTitle}
            preText={getStreakIntroduction(longestStreak)}
            countDown
        />

    );
};

const SlideEight: React.FC = () => {
    const {data} = useGitHub();
    const reviews = data?.totalReviews ?? 0;

    return (
        <Slide
            icon={prReviewsIcon}
            data={reviews.toString()}
            subText={prReviewsSubtext}
            title={prReviewsTitle}
            preText={getPrReviewsIntroduction(reviews)}
            countDown
        />

    );
};

const SlideNine: React.FC = () => {
    const {data} = useGitHub();
    const commits = data?.totalCommits ?? 0;
    const slang = getSlang(commits);
    return (
        <Slide
            icon={slangIcon}
            data={slang.slang}
            subText={slangSubtext}
            title={slangTitle}
            preText={getSlangIntroduction(commits)}
            emoji={slang.emoji}
        />

    );
};


const SlideTen: React.FC = () => (
    <EndNote
    />
);

export default function Wrap() {
    useEffect(() => {
        const audio = new Audio("/comfy-vibe.mp3");
        // audio.loop = true;
        audio.volume = 0.6;


        audio.play().catch((error) => {
            console.error("Error playing audio:", error);
        });


        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    return (
        <div style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100svh",
            overflow: "auto"
        }}>

            {/*<MotionGradientBg opacity={0.1}/>*/}
            {/*<FloatingEmojis emojiList={['🐹', '⚙️', '💻', '🎮', '🚀', '🚀', '🚀', '🚀', '🚀', '●', '◎', '•', '🎧', '💡', '💡']}*/}
            {/*                zIndex={2}/>*/}
            <Slider
                slides={[SlideOne, SlideTwo, SlideThree, SlideFour, SlideFive, SlideSix, SlideSeven, SlideEight, SlideNine, SlideTen]}/>


        </div>
    );
};
