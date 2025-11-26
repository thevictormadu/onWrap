import Slide from "./Slide";
import Slider from "./Slider";
import IntroSlide from "./IntroSlide.tsx";
import EndNote from "./EndNote.tsx";
import { getSlang, getIntroduction } from "../utils.ts";
import { useGitHub } from "../context/GithubContext.tsx";
import { SLIDE_CONFIG } from "../constants/index.ts";
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import {
  WHATSAPP_STATUS_WIDTH,
  WHATSAPP_STATUS_HEIGHT,
  DOWNLOAD_PADDING,
  ORIGINAL_CONTENT_WIDTH,
  DOWNLOAD_SCALE_FACTOR,
  DOWNLOAD_QUALITY,
  DOWNLOAD_CANVAS_SCALE,
} from "../constants/ui.ts";

const SlideOne: React.FC = () => <IntroSlide />;

const SlideTwo: React.FC = () => {
  const { data } = useGitHub();
  const totalStars = data?.totalStars ?? 0;

  return (
    <Slide
      icon={SLIDE_CONFIG.starsReceived.icon}
      data={totalStars.toString()}
      subText={SLIDE_CONFIG.starsReceived.subtext}
      title={SLIDE_CONFIG.starsReceived.title}
      preText={getIntroduction(totalStars, 3, "starsReceived")}
      countDown
      slideIndex={1}
      color={SLIDE_CONFIG.starsReceived.color}
      gradient={SLIDE_CONFIG.starsReceived.gradient}
    />
  );
};

const SlideThree: React.FC = () => {
  const { data } = useGitHub();
  const topLanguage = data?.topLanguage || "We Can't Tell";

  return (
    <Slide
      icon={SLIDE_CONFIG.topLanguage.icon}
      data={topLanguage}
      subText={SLIDE_CONFIG.topLanguage.subtext}
      title={SLIDE_CONFIG.topLanguage.title}
      preText={getIntroduction(topLanguage, 0, "topLanguage")}
      slideIndex={2}
      color={SLIDE_CONFIG.topLanguage.color}
      gradient={SLIDE_CONFIG.topLanguage.gradient}
    />
  );
};

const SlideFour: React.FC = () => {
  const { data } = useGitHub();
  const commits = data?.totalCommits ?? 0;

  return (
    <Slide
      icon={SLIDE_CONFIG.commits.icon}
      data={commits.toString()}
      subText={SLIDE_CONFIG.commits.subtext}
      title={SLIDE_CONFIG.commits.title}
      preText={getIntroduction(commits, 20, "commits")}
      countDown
      slideIndex={3}
      color={SLIDE_CONFIG.commits.color}
      gradient={SLIDE_CONFIG.commits.gradient}
    />
  );
};

const SlideFive: React.FC = () => {
  const { data } = useGitHub();
  const pullRequest = data?.totalPRs ?? 0;

  return (
    <Slide
      icon={SLIDE_CONFIG.pullRequests.icon}
      data={pullRequest.toString()}
      subText={SLIDE_CONFIG.pullRequests.subtext}
      title={SLIDE_CONFIG.pullRequests.title}
      preText={getIntroduction(pullRequest, 5, "pullRequests")}
      countDown
      slideIndex={4}
      color={SLIDE_CONFIG.pullRequests.color}
      gradient={SLIDE_CONFIG.pullRequests.gradient}
    />
  );
};

const SlideSix: React.FC = () => {
  const { data } = useGitHub();
  const peakMonth = data?.peakMonth ?? 0;

  return (
    <Slide
      icon={SLIDE_CONFIG.peakPerformance.icon}
      data={peakMonth.toString()}
      subText={SLIDE_CONFIG.peakPerformance.subtext}
      title={SLIDE_CONFIG.peakPerformance.title}
      preText={getIntroduction(peakMonth, 0, "peakPerformance")}
      slideIndex={5}
      color={SLIDE_CONFIG.peakPerformance.color}
      gradient={SLIDE_CONFIG.peakPerformance.gradient}
    />
  );
};

const SlideSeven: React.FC = () => {
  const { data } = useGitHub();
  const longestStreak = data?.longestStreak ?? 0;

  return (
    <Slide
      icon={SLIDE_CONFIG.streak.icon}
      data={longestStreak.toString()}
      subText={SLIDE_CONFIG.streak.subtext}
      title={SLIDE_CONFIG.streak.title}
      preText={getIntroduction(longestStreak, 3, "streak")}
      countDown
      slideIndex={6}
      color={SLIDE_CONFIG.streak.color}
      gradient={SLIDE_CONFIG.streak.gradient}
    />
  );
};

const SlideEight: React.FC = () => {
  const { data } = useGitHub();
  const reviews = data?.totalReviews ?? 0;

  return (
    <Slide
      icon={SLIDE_CONFIG.prReviews.icon}
      data={reviews.toString()}
      subText={SLIDE_CONFIG.prReviews.subtext}
      title={SLIDE_CONFIG.prReviews.title}
      preText={getIntroduction(reviews, 3, "prReviews")}
      countDown
      slideIndex={7}
      color={SLIDE_CONFIG.prReviews.color}
      gradient={SLIDE_CONFIG.prReviews.gradient}
    />
  );
};

const SlideNine: React.FC = () => {
  const { data } = useGitHub();
  const commits = data?.totalCommits ?? 0;
  const slang = getSlang(commits);
  return (
    <Slide
      icon={SLIDE_CONFIG.slang.icon}
      data={slang.slang}
      subText={SLIDE_CONFIG.slang.subtext}
      title={SLIDE_CONFIG.slang.title}
      preText={getIntroduction(commits, 5, "slang")}
      emoji={slang.emoji}
      slideIndex={8}
      color={SLIDE_CONFIG.slang.color}
      gradient={SLIDE_CONFIG.slang.gradient}
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
      "[data-endnote-content='true']"
    ) as HTMLElement;
    if (!endNoteDiv || isDownloading) return;

    setIsDownloading(true);
    try {
      // WhatsApp Status dimensions: 1080x1920 (9:16 aspect ratio)
      const targetWidth = WHATSAPP_STATUS_WIDTH;
      const targetHeight = WHATSAPP_STATUS_HEIGHT;
      const padding = DOWNLOAD_PADDING;

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
      clone.style.width = `${ORIGINAL_CONTENT_WIDTH}px`;
      clone.style.height = "auto";
      clone.style.padding = "2.5rem";
      clone.style.justifyContent = "center";
      clone.style.gap = "1.5rem";
      clone.style.transform = `scale(${DOWNLOAD_SCALE_FACTOR})`;
      clone.style.transformOrigin = "center center";

      // Show signature
      const clonedSignature = clone.querySelector(
        "[data-signature='true']"
      ) as HTMLElement;
      if (clonedSignature) {
        clonedSignature.style.display = "flex";
      }

      // Hide download button if exists
      const clonedDownloadButton = clone.querySelector(
        "[data-download-button='true']"
      ) as HTMLElement;
      if (clonedDownloadButton) {
        clonedDownloadButton.style.display = "none";
      }

      // Remove margins
      const clonedTopMargin = clone.querySelector(
        "[data-top-margin='true']"
      ) as HTMLElement;
      const clonedBottomMargin = clone.querySelector(
        "[data-bottom-margin='true']"
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
        scale: DOWNLOAD_CANVAS_SCALE,
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
          const userId = data?.userId || "wrap";
          const year = new Date().getFullYear();
          link.download = `github-onwrap-${userId}-${year}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          // Clean up wrapper (which contains clone)
          document.body.removeChild(wrapper);
        },
        "image/jpeg",
        DOWNLOAD_QUALITY
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
