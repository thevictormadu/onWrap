"use client";

import React, { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Slide from "@/components/Slide";
import Slider from "@/components/Slider";
import IntroSlide from "@/components/IntroSlide";
import EndNote from "@/components/EndNote";
import { useGitHub } from "@/context/GithubContext";
import {
  SLIDES,
  generateStatSlideProps,
  generateSlangSlideProps,
  SlideDefinition,
} from "@/config/slides";
import { useAudio } from "@/hooks";
import { useDownloadEndnote } from "@/hooks/useDownloadEndnote";

/**
 * Creates a slide component based on its definition and GitHub data
 */
function createSlideComponent(
  definition: SlideDefinition,
  data: ReturnType<typeof useGitHub>["data"],
  index: number
): React.FC {
  switch (definition.type) {
    case "intro": {
      const IntroComponent: React.FC = () => <IntroSlide />;
      IntroComponent.displayName = "IntroSlideWrapper";
      return IntroComponent;
    }

    case "stat": {
      const props = generateStatSlideProps(definition, data, index);
      const StatComponent: React.FC = () => (
        <Slide
          icon={props.icon}
          data={props.data}
          subText={props.subText}
          title={props.title}
          preText={props.preText}
          countDown={props.countDown}
          slideIndex={props.slideIndex}
          color={props.color}
          gradient={props.gradient}
        />
      );
      StatComponent.displayName = `StatSlide_${definition.configKey}`;
      return StatComponent;
    }

    case "slang": {
      const props = generateSlangSlideProps(data, index);
      const SlangComponent: React.FC = () => (
        <Slide
          icon={props.icon}
          data={props.data}
          subText={props.subText}
          title={props.title}
          preText={props.preText}
          emoji={props.emoji}
          slideIndex={props.slideIndex}
          color={props.color}
          gradient={props.gradient}
        />
      );
      SlangComponent.displayName = "SlangSlideWrapper";
      return SlangComponent;
    }

    case "endnote": {
      const EndnoteComponent: React.FC = () => <EndNote />;
      EndnoteComponent.displayName = "EndnoteWrapper";
      return EndnoteComponent;
    }

    default: {
      const NullComponent: React.FC = () => null;
      NullComponent.displayName = "NullSlide";
      return NullComponent;
    }
  }
}

export default function WrapPage() {
  const router = useRouter();
  const { data } = useGitHub();
  const { isPlaying, toggle } = useAudio("/comfy-vibe.mp3");
  const { download, isDownloading } = useDownloadEndnote();

  // Redirect to home if no data
  useEffect(() => {
    if (!data) {
      router.replace("/");
    }
  }, [data, router]);

  // Generate slide components from configuration
  const slides = useMemo(
    () => SLIDES.map((def, index) => createSlideComponent(def, data, index)),
    [data]
  );

  // Don't render anything while redirecting
  if (!data) {
    return null;
  }

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
        slides={slides}
        isPlaying={isPlaying}
        onToggleAudio={toggle}
        onDownload={download}
        isDownloading={isDownloading}
      />
    </div>
  );
}
