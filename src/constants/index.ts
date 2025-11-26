import { GoCodeReview, GoZap } from "react-icons/go";
import { IconType } from "react-icons/lib";
import { COLORS } from "./colors";
import { GRADIENTS, primaryGradient, primaryColor } from "./colors";
import { PiStarThin } from "react-icons/pi";
import { MdCode, MdMergeType } from "react-icons/md";
import { LuGitCommitVertical } from "react-icons/lu";
import { RiFireLine } from "react-icons/ri";
import { LiaAwardSolid } from "react-icons/lia";

export const YEAR: number = 2025;

interface SlideConfig {
  introduction: string;
  altIntroduction: string;
  title: string;
  icon: IconType;
  subtext: string;
  color: string;
  gradient: string;
}

export const SLIDE_CONFIG = {
  streak: {
    introduction:
      "Consistency is the key, and you have the padlock! It's obvious you are a serious person.",
    altIntroduction:
      "If consistency is the key, then you've lost your key. You weren't very consistent in 2024, but let's see.",
    title: "longest streak",
    icon: GoZap,
    subtext: "consecutive days coding",
    color: COLORS.orange,
    gradient: GRADIENTS.orangePink,
  },
  starsReceived: {
    introduction:
      "You are a star, and you know it! Here's how many times you shone.",
    altIntroduction:
      "Not much stardust this year, but hey, the sky's the limit for 2025!",
    title: "stars received",
    icon: PiStarThin,
    subtext: "total stars collected",
    color: COLORS.yellow,
    gradient: GRADIENTS.yellowOrange,
  },
  topLanguage: {
    introduction:
      "Your coding palette is vibrant and you seem to be enjoying your self! Here's the language that ruled your 2024.",
    altIntroduction:
      "It's either you couldn't pick a favorite language or your stack is from Mars.",
    title: "top language",
    icon: MdCode,
    subtext: "most used language",
    color: COLORS.white,
    gradient: GRADIENTS.rainbow,
  },
  commits: {
    introduction:
      "If coding is a crime, then you have committed so many times - but we don't want to call you a criminal.",
    altIntroduction:
      "If coding is a crime, you might be innocent. You have not committed much.",
    title: "commits",
    icon: LuGitCommitVertical,
    subtext: "total commits",
    color: COLORS.green,
    gradient: GRADIENTS.purpleBlue,
  },
  pullRequests: {
    introduction:
      "Your pull requests are like olive branches for the codebase—let's see how often you extended them in 2024.",
    altIntroduction:
      "Pull requests? Or did you pull out? Looks like collaboration wasn't your thing in 2024.",
    title: "pull requests",
    icon: MdMergeType,
    subtext: "total pull requests opened",
    color: COLORS.cyan,
    gradient: GRADIENTS.greenBlue,
  },
  prReviews: {
    introduction:
      "You've been the gatekeeper of quality! Let's check how many pull requests you reviewed in 2024.",
    altIntroduction:
      "PR reviews? Looks like you kept your opinions to yourself this year. Share the wisdom next time!",
    title: "PR reviews",
    icon: GoCodeReview,
    subtext: "total PRs reviewed",
    color: COLORS.blue,
    gradient: GRADIENTS.purpleBlue,
  },
  peakPerformance: {
    introduction:
      "Every coder has their moment. Here's when you were truly unstoppable!",
    altIntroduction:
      "Peak performance? Let's call it a gentle incline. Here's your best month anyway.",
    title: "peak month",
    icon: RiFireLine,
    subtext: "most active month",
    color: COLORS.orange,
    gradient: GRADIENTS.orangePink,
  },
  slang: {
    introduction:
      "Your GitHub aura is unmatched! Let's crown you with the perfect 🇳🇬Nigerian slang for 2024.",
    altIntroduction:
      "Well, every kingdom has its jester. Let's see what 🇳🇬Nigerian slang suits your 2024 vibes.",
    title: "befitting slang",
    icon: LiaAwardSolid,
    subtext: "is how we feel about your coding journey this year",
    color: COLORS.white,
    gradient: GRADIENTS.rainbow,
  },
} as const satisfies Record<string, SlideConfig>;

export type SlideKey = keyof typeof SLIDE_CONFIG;
