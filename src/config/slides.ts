import { IconType } from "react-icons/lib";
import { SLIDE_CONFIG, SlideKey } from "../constants/index";
import { GitHubData } from "../context/GithubContext";
import { getIntroduction, getSlang } from "../utils";

/**
 * Slide type definitions for the data-driven slide system
 */
export type SlideType = "intro" | "stat" | "slang" | "endnote";

interface BaseSlideDefinition {
  type: SlideType;
}

interface StatSlideDefinition extends BaseSlideDefinition {
  type: "stat";
  configKey: SlideKey;
  dataKey: keyof GitHubData;
  countDown?: boolean;
  /** Threshold for determining which intro text to show */
  cutOff?: number;
}

interface SlangSlideDefinition extends BaseSlideDefinition {
  type: "slang";
  configKey: "slang";
}

interface IntroSlideDefinition extends BaseSlideDefinition {
  type: "intro";
}

interface EndnoteSlideDefinition extends BaseSlideDefinition {
  type: "endnote";
}

export type SlideDefinition =
  | IntroSlideDefinition
  | StatSlideDefinition
  | SlangSlideDefinition
  | EndnoteSlideDefinition;

/**
 * Central slide configuration - defines the order and type of all slides
 * This is the single source of truth for what slides appear and in what order
 */
export const SLIDES: SlideDefinition[] = [
  { type: "intro" },
  {
    type: "stat",
    configKey: "starsReceived",
    dataKey: "totalStars",
    countDown: true,
    cutOff: 3,
  },
  {
    type: "stat",
    configKey: "topLanguage",
    dataKey: "topLanguage",
    cutOff: 0,
  },
  {
    type: "stat",
    configKey: "commits",
    dataKey: "totalCommits",
    countDown: true,
    cutOff: 20,
  },
  {
    type: "stat",
    configKey: "pullRequests",
    dataKey: "totalPRs",
    countDown: true,
    cutOff: 5,
  },
  {
    type: "stat",
    configKey: "peakPerformance",
    dataKey: "peakMonth",
    cutOff: 0,
  },
  {
    type: "stat",
    configKey: "streak",
    dataKey: "longestStreak",
    countDown: true,
    cutOff: 3,
  },
  {
    type: "stat",
    configKey: "prReviews",
    dataKey: "totalReviews",
    countDown: true,
    cutOff: 3,
  },
  {
    type: "slang",
    configKey: "slang",
  },
  { type: "endnote" },
];

/**
 * Props generated for a Slide component based on slide definition and data
 */
export interface GeneratedSlideProps {
  icon: IconType;
  data: string;
  subText: string;
  title: string;
  preText: string;
  countDown?: boolean;
  emoji?: string;
  slideIndex: number;
  color: string;
  gradient: string;
}

/**
 * Generates props for a stat slide based on definition and GitHub data
 */
export function generateStatSlideProps(
  definition: StatSlideDefinition,
  data: GitHubData | null,
  slideIndex: number
): GeneratedSlideProps {
  const config = SLIDE_CONFIG[definition.configKey];
  const value = data?.[definition.dataKey] ?? 0;
  const displayValue =
    typeof value === "number" ? value.toString() : String(value);

  return {
    icon: config.icon,
    data: displayValue,
    subText: config.subtext,
    title: config.title,
    preText: getIntroduction(
      value as number | string,
      definition.cutOff ?? 0,
      definition.configKey
    ),
    countDown: definition.countDown,
    slideIndex,
    color: config.color,
    gradient: config.gradient,
  };
}

/**
 * Generates props for the slang slide based on commit count
 */
export function generateSlangSlideProps(
  data: GitHubData | null,
  slideIndex: number
): GeneratedSlideProps {
  const config = SLIDE_CONFIG.slang;
  const commits = data?.totalCommits ?? 0;
  const slang = getSlang(commits);

  return {
    icon: config.icon,
    data: slang.slang,
    subText: config.subtext,
    title: config.title,
    preText: getIntroduction(commits, 5, "slang"),
    emoji: slang.emoji,
    slideIndex,
    color: config.color,
    gradient: config.gradient,
  };
}
