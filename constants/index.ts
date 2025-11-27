import { GoZap } from "react-icons/go";
import { IconType } from "react-icons/lib";
import { COLORS } from "./colors";
import { GRADIENTS } from "./colors";
import { MdCode, MdMergeType } from "react-icons/md";
import { LuGitCommitVertical } from "react-icons/lu";
import { RiFireLine } from "react-icons/ri";
import { LiaAwardSolid } from "react-icons/lia";
import { RiGitForkLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";

export const YEAR: number = 2025;

export type PerformanceLevel = "elite" | "strong" | "casual" | "ghost";

export interface IntroTier {
  level: PerformanceLevel;
  /**
   * Inclusive lower bound for this tier. If omitted, any value less than `max` is allowed.
   */
  min?: number;
  /**
   * Exclusive upper bound for this tier. If omitted, any value greater than or equal to `min` is allowed.
   */
  max?: number;
  /**
   * Introduction text for this tier.
   */
  text: string;
}

interface SlideConfig {
  title: string;
  icon: IconType;
  subtext: string;
  color: string;
  gradient: string;
  /**
   * Tiered introductions for this slide. Typically 3–4 entries per slide.
   */
  introductions: IntroTier[];
  /**
   * Optional introduction to use when the value is "Unknown" or cannot be classified.
   */
  unknownIntroduction?: string;
}

export const SLIDE_CONFIG = {
  streak: {
    title: "longest streak",
    icon: GoZap,
    subtext: "consecutive days coding",
    color: COLORS.orange,
    gradient: GRADIENTS.orangePink,
    introductions: [
      {
        level: "elite",
        min: 30,
        text: "Consistency is the key, and you have the padlock! It's obvious you are a serious person.",
      },
      {
        level: "strong",
        min: 10,
        max: 30,
        text: "You showed up again and again. Your streak in 2024 was nothing to joke with.",
      },
      {
        level: "casual",
        min: 3,
        max: 10,
        text: "You and consistency had an on-and-off thing in 2024. Not bad, but the streets are watching.",
      },
      {
        level: "ghost",
        max: 3,
        text: "If consistency is the key, then you've lost your key. You weren't very consistent in 2024, but let's see.",
      },
    ],
  },
  starsReceived: {
    title: "stars received",
    icon: FaRegStar,
    subtext: "total stars collected",
    color: COLORS.yellow,
    gradient: GRADIENTS.yellowOrange,
    introductions: [
      {
        level: "elite",
        min: 50,
        text: "You are a star, and you know it! GitHub couldn’t stop shining your way in 2024.",
      },
      {
        level: "strong",
        min: 20,
        max: 50,
        text: "You lit up a good part of GitHub this year. Your repos definitely turned heads.",
      },
      {
        level: "casual",
        min: 5,
        max: 20,
        text: "You dropped some gems in 2024. A few people noticed, the rest will catch up.",
      },
      {
        level: "ghost",
        max: 5,
        text: "Not much stardust this year, but hey, the sky's the limit for 2025!",
      },
    ],
  },
  topLanguage: {
    title: "top language",
    icon: MdCode,
    subtext: "most used language",
    color: COLORS.white,
    gradient: GRADIENTS.rainbow,
    introductions: [
      {
        level: "elite",
        text: "Your coding palette is vibrant and you seem to be enjoying yourself! Here's the language that ruled your 2024.",
      },
    ],
    unknownIntroduction:
      "It's either you couldn't pick a favorite language or your stack is from Mars.",
  },
  commits: {
    title: "commits",
    icon: LuGitCommitVertical,
    subtext: "total commits",
    color: COLORS.green,
    gradient: GRADIENTS.purpleBlue,
    introductions: [
      {
        level: "elite",
        min: 1000,
        text: "If coding is a crime, then you’re serving a life sentence. Your commit game in 2024 was outrageous!",
      },
      {
        level: "strong",
        min: 400,
        max: 1000,
        text: "You showed up and shipped. Solid commit energy all through 2024.",
      },
      {
        level: "casual",
        min: 100,
        max: 400,
        text: "You and GitHub had a situationship in 2024. Not bad, but there’s room to turn up.",
      },
      {
        level: "ghost",
        max: 100,
        text: "If coding is a crime, you might be innocent. You have not committed much.",
      },
    ],
  },
  contributions: {
    title: "contributions",
    icon: LuGitCommitVertical,
    subtext: "total contributions",
    color: COLORS.green,
    gradient: GRADIENTS.greenBlue,
    introductions: [
      {
        level: "elite",
        min: 2000,
        text: "You didn’t just touch grass, you touched every repo. Your 2024 contributions were ridiculous in the best way.",
      },
      {
        level: "strong",
        min: 800,
        max: 2000,
        text: "You showed up all year. Commits, issues, PRs—your contribution graph was busy.",
      },
      {
        level: "casual",
        min: 200,
        max: 800,
        text: "You put in decent work. Your 2024 contributions were low-key, but they counted.",
      },
      {
        level: "ghost",
        max: 200,
        text: "Your contribution graph was giving minimalist. 2025 might be the year you go full dark green.",
      },
    ],
  },
  pullRequests: {
    title: "pull requests",
    icon: MdMergeType,
    subtext: "total pull requests opened",
    color: COLORS.cyan,
    gradient: GRADIENTS.greenBlue,
    introductions: [
      {
        level: "elite",
        min: 100,
        text: "Your pull requests are like olive branches for the codebase—2024 was full of collaboration.",
      },
      {
        level: "strong",
        min: 30,
        max: 100,
        text: "You did more than your fair share of merging and fixing. Collaboration was definitely in your DNA.",
      },
      {
        level: "casual",
        min: 5,
        max: 30,
        text: "You pulled up when it mattered. Not everyday PR, sometimes soft life.",
      },
      {
        level: "ghost",
        max: 5,
        text: "Pull requests? Or did you pull out? Looks like collaboration wasn't your thing in 2024.",
      },
    ],
  },
  forks: {
    title: "forks",
    icon: RiGitForkLine,
    subtext: "total repos forked",
    color: COLORS.blue,
    gradient: GRADIENTS.purpleBlue,
    introductions: [
      {
        level: "elite",
        min: 50,
        text: "You've been the gatekeeper of quality! You forked like a true curator of GitHub gold.",
      },
      {
        level: "strong",
        min: 15,
        max: 50,
        text: "You picked your battles and your repos. Your forks in 2024 were intentional.",
      },
      {
        level: "casual",
        min: 3,
        max: 15,
        text: "You forked when something truly caught your eye. Selective, we see you.",
      },
      {
        level: "ghost",
        max: 3,
        text: "Forking? Looks like you kept your opinions to yourself this year. Share the wisdom next time!",
      },
    ],
  },
  peakPerformance: {
    title: "peak month",
    icon: RiFireLine,
    subtext: "most active month",
    color: COLORS.orange,
    gradient: GRADIENTS.orangePink,
    introductions: [
      {
        level: "elite",
        text: "Every coder has their moment. Here's when you were truly unstoppable!",
      },
      {
        level: "ghost",
        text: "Peak performance? Let's call it a gentle incline. Here's your best month anyway.",
      },
    ],
  },
  slang: {
    title: "befitting slang",
    icon: LiaAwardSolid,
    subtext: "is how we feel about your coding journey this year",
    color: COLORS.white,
    gradient: GRADIENTS.rainbow,
    introductions: [
      {
        level: "elite",
        min: 500,
        text: "Your GitHub aura is unmatched! Let's crown you with the perfect 🇳🇬 Nigerian slang for 2024.",
      },
      {
        level: "strong",
        min: 100,
        max: 500,
        text: "You showed steady vibes on GitHub. Your 2024 deserves a proper Nigerian salute.",
      },
      {
        level: "casual",
        min: 10,
        max: 100,
        text: "You showed face this year. Let's find the slang that matches your 2024 energy.",
      },
      {
        level: "ghost",
        max: 10,
        text: "Well, every kingdom has its jester. Let's see what 🇳🇬 Nigerian slang suits your 2024 vibes.",
      },
    ],
  },
} as const satisfies Record<string, SlideConfig>;

export type SlideKey = keyof typeof SLIDE_CONFIG;
