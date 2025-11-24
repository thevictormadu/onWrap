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
import html2canvas from "html2canvas";

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
      slideIndex={1}
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
      slideIndex={2}
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
      slideIndex={3}
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
      slideIndex={4}
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
      slideIndex={5}
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
      slideIndex={6}
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
      slideIndex={7}
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
      slideIndex={8}
    />
  );
};

const SlideTen: React.FC = () => <EndNote />;

export default function Wrap() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { data } = useGitHub();

  useEffect(() => {
    audioRef.current = new Audio("/comfy-vibe.mp3");
    audioRef.current.volume = 0.6;
    audioRef.current.loop = true;

    // Auto-play audio on mount
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((error) => {
        if (import.meta.env.DEV) {
          console.error("Error playing audio:", error);
        }
        setIsPlaying(false);
      });

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

  const handleDownload = async () => {
    // Find the EndNote content div
    const endNoteDiv = document.querySelector(
      ".endnote-content"
    ) as HTMLElement;
    if (!endNoteDiv || isDownloading) return;

    setIsDownloading(true);
    try {
      // WhatsApp Status dimensions: 1080x1920 (9:16 aspect ratio)
      const targetWidth = 1080;
      const targetHeight = 1920;

      // Add generous padding - use 120px on all sides
      const padding = 120;

      // Calculate scale factor to fit content within padded area
      // Original content is ~400px wide, scale to fit nicely with padding
      const contentWidth = 700; // Target content width with padding
      const scaleFactor = contentWidth / 400; // ~1.75x scale

      // Clone the element to avoid modifying the original
      const clone = endNoteDiv.cloneNode(true) as HTMLElement;

      // Create a wrapper container with padding
      const wrapper = document.createElement("div");
      wrapper.style.position = "fixed";
      wrapper.style.left = "-9999px";
      wrapper.style.top = "0";
      wrapper.style.width = `${targetWidth}px`;
      wrapper.style.height = `${targetHeight}px`;
      wrapper.style.backgroundColor = "#000000";
      wrapper.style.display = "flex";
      wrapper.style.justifyContent = "center";
      wrapper.style.alignItems = "center";
      wrapper.style.padding = `${padding}px`;
      wrapper.style.boxSizing = "border-box";
      wrapper.style.overflow = "hidden";

      // Set clone dimensions and use transform scale
      clone.style.width = "400px";
      clone.style.height = "auto";
      clone.style.padding = "2.5rem";
      clone.style.justifyContent = "center";
      clone.style.gap = "1.5rem";
      clone.style.transform = `scale(${scaleFactor})`;
      clone.style.transformOrigin = "center center";

      // Show signature
      const clonedSignature = clone.querySelector(".signature") as HTMLElement;
      if (clonedSignature) {
        clonedSignature.style.display = "flex";
      }

      // Hide download button if exists
      const clonedDownloadButton = clone.querySelector(
        ".download-button"
      ) as HTMLElement;
      if (clonedDownloadButton) {
        clonedDownloadButton.style.display = "none";
      }

      // Remove margins
      const clonedTopMargin = clone.querySelector(".top-margin") as HTMLElement;
      const clonedBottomMargin = clone.querySelector(
        ".bottom-margin"
      ) as HTMLElement;
      if (clonedTopMargin) clonedTopMargin.style.marginTop = "0";
      if (clonedBottomMargin) clonedBottomMargin.style.marginBottom = "0";

      // Set CORS for images
      const clonedImages = clone.querySelectorAll("img");
      clonedImages.forEach((img) => {
        img.crossOrigin = "anonymous";
      });

      // Append clone to wrapper, then wrapper to body
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      // Wait for images to load
      await Promise.all(
        Array.from(clonedImages).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
            setTimeout(resolve, 3000);
          });
        })
      );

      // Wait for fonts and rendering
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Generate canvas with html2canvas - capture the wrapper
      const canvas = await html2canvas(wrapper, {
        width: targetWidth,
        height: targetHeight,
        scale: 2, // High resolution
        backgroundColor: "#000000",
        useCORS: true,
        logging: false,
        allowTaint: false,
      });

      // Convert to blob and download
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            throw new Error("Failed to create blob");
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `github-onwrap-${
            data?.userId || "wrap"
          }-${new Date().getFullYear()}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          // Clean up wrapper (which contains clone)
          document.body.removeChild(wrapper);
        },
        "image/jpeg",
        0.95
      );
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error generating image:", error);
      }
      // Clean up wrapper if it exists
      const wrapper = document.querySelector(
        '[style*="position: fixed"][style*="-9999px"]'
      ) as HTMLElement;
      if (wrapper) {
        document.body.removeChild(wrapper);
      }
    } finally {
      setIsDownloading(false);
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
        isPlaying={isPlaying}
        onToggleAudio={toggleAudio}
        onDownload={handleDownload}
        isDownloading={isDownloading}
      />
    </div>
  );
}
