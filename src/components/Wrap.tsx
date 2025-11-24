import Slide from "./Slide";
import Slider from "./Slider";
import IntroSlide from "./IntroSlide.tsx";
import EndNote from "./EndNote.tsx";
import {
  getCommitsIntroduction,
  getPrReviewsIntroduction,
  getPullRequestIntroduction,
  getSlang,
  getSlangIntroduction,
  getStarsReceivedIntroduction,
  getStreakIntroduction,
  getTopLanguageIntroduction,
} from "../utils.ts";
import { useGitHub } from "../context/GithubContext.tsx";
import {
  commitsIcon,
  commitsSubtext,
  commitsTitle,
  peakPerformanceIcon,
  peakPerformanceIntroduction,
  peakPerformanceSubtext,
  peakPerformanceTitle,
  prReviewsIcon,
  prReviewsSubtext,
  prReviewsTitle,
  pullRequestsIcon,
  pullRequestsSubtext,
  pullRequestsTitle,
  slangSubtext,
  slangIcon,
  slangTitle,
  starsReceivedIcon,
  starsReceivedSubtext,
  starsReceivedTitle,
  streakIcon,
  streakSubtext,
  streakTitle,
  topLanguageIcon,
  topLanguageSubtext,
  topLanguageTitle,
} from "../constants.ts";
import { useEffect, useState, useRef } from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import IconButton from "./IconButton.tsx";

const SlideOne: React.FC = () => <IntroSlide />;

const SlideTwo: React.FC = () => {
  const { data } = useGitHub();
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
  const { data } = useGitHub();
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
  const { data } = useGitHub();
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
  const { data } = useGitHub();
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
  const { data } = useGitHub();
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
  const { data } = useGitHub();
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
  const { data } = useGitHub();
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
  const { data } = useGitHub();
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

const SlideTen: React.FC = () => <EndNote />;

export default function Wrap() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/comfy-vibe.mp3");
    audioRef.current.volume = 0.6;
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          if (import.meta.env.DEV) {
            console.error("Error playing audio:", error);
          }
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          zIndex: 100,
        }}
      >
        <IconButton
          icon={isPlaying ? <MdMusicNote /> : <MdMusicOff />}
          handleClick={toggleAudio}
          aria-label={
            isPlaying ? "Pause background music" : "Play background music"
          }
        />
      </div>
      <Slider
        slides={[
          SlideOne,
          SlideTwo,
          SlideThree,
          SlideFour,
          SlideFive,
          SlideSix,
          SlideSeven,
          SlideEight,
          SlideNine,
          SlideTen,
        ]}
      />
    </div>
  );
}
