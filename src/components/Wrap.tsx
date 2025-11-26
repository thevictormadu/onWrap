import React, { useMemo } from "react";
import Slide from "./Slide";
import Slider from "./Slider";
import IntroSlide from "./IntroSlide";
import EndNote from "./EndNote";
import { useGitHub } from "../context/GithubContext";
import {
  SLIDES,
  generateStatSlideProps,
  generateSlangSlideProps,
  SlideDefinition,
} from "../config/slides";
import { useAudio } from "../hooks";
import { useDownloadEndnote } from "../hooks/useDownloadEndnote";

/**
 * Creates a slide component based on its definition and GitHub data
 */
function createSlideComponent(
  definition: SlideDefinition,
  data: ReturnType<typeof useGitHub>["data"],
  index: number
): React.FC {
  switch (definition.type) {
    case "intro":
      return () => <IntroSlide />;

    case "stat": {
      const props = generateStatSlideProps(definition, data, index);
      return () => (
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
    }

    case "slang": {
      const props = generateSlangSlideProps(data, index);
      return () => (
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
    }

    case "endnote":
      return () => <EndNote />;

    default:
      return () => null;
  }
}

export default function Wrap() {
  const { data } = useGitHub();
  const { isPlaying, toggle } = useAudio("/comfy-vibe.mp3");
  const { download, isDownloading } = useDownloadEndnote();

  // Generate slide components from configuration
  const slides = useMemo(
    () => SLIDES.map((def, index) => createSlideComponent(def, data, index)),
    [data]
  );

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
