import { GoZap } from "react-icons/go";
import { IconType } from "react-icons/lib";
import { COLORS } from "./colors";
import { GRADIENTS } from "./colors";
import { MdCode, MdMergeType } from "react-icons/md";
import { LuGitCommitVertical } from "react-icons/lu";
import { RiFireLine, RiUserFollowLine } from "react-icons/ri";
import { LiaAwardSolid } from "react-icons/lia";
import { RiGitForkLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { VscCodeReview } from "react-icons/vsc";

export const YEAR: number = 2025;

export type PerformanceLevel = "elite" | "strong" | "casual" | "ghost" | "zero";

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
        level: "zero",
        min: 0,
        max: 1,
        text: `They say consistency is key, but you've clearly lost the key, the lock, and probably the whole door.`,
      },
      {
        level: "ghost",
        max: 3,
        text: `If consistency is the key, you definitely misplaced it. Your ${YEAR} activity was giving "maybe tomorrow."`,
      },
      {
        level: "casual",
        min: 3,
        max: 10,
        text: `Your consistency this ${YEAR} was like Airtel network - strong on some days, questionable on others.`,
      },
      {
        level: "strong",
        min: 10,
        max: 30,
        text: `You showed up again and again. Your streak in ${YEAR} was nothing to joke with.`,
      },
      {
        level: "elite",
        min: 30,
        text: "if consistency is the key, then you are the padlock! It's obvious you are a serious person.",
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
        level: "zero",
        min: 0,
        max: 1,
        text: `Somehow the stars decided to mind their business. Mtchewww... That's on them.`,
      },
      {
        level: "ghost",
        max: 5,
        text: `Your star count was humble. But no pressure. ${
          YEAR + 1
        } could be the year you finally 'blow'!.`,
      },
      {
        level: "casual",
        min: 5,
        max: 20,
        text: `You've dropped a few shiny things. Some folks noticed - the rest are late to the party.`,
      },
      {
        level: "strong",
        min: 20,
        max: 50,
        text: "You've lit up a good part of GitHub. Your repos were getting attention like they owed people money.",
      },
      {
        level: "elite",
        min: 50,
        text: `You are a star, and you know it! GitHub practically needs sunglasses around you.`,
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
        text: `You flirted with a few languages, but one clearly got all your attention - the real star of your code.`,
      },
    ],
    unknownIntroduction:
      "Should we be worried? Even GitHub is suspecting you are pretending to be a developer.",
  },
  commits: {
    title: "commits",
    icon: LuGitCommitVertical,
    subtext: "total commits",
    color: COLORS.green,
    gradient: GRADIENTS.purpleBlue,
    introductions: [
      {
        level: "zero",
        min: 0,
        max: 1,
        text: `${YEAR} was clearly your year of contemplation, right?`,
      },
      {
        level: "ghost",
        max: 100,
        text: "If coding is a crime, then you are trying so hard to be innocent.",
      },
      {
        level: "casual",
        min: 100,
        max: 400,
        text: `You and GitHub had a situationship in ${YEAR}. Not bad, but there's room to turn up.`,
      },
      {
        level: "strong",
        min: 400,
        max: 1000,
        text: `You showed up and shipped. Solid commit energy in ${YEAR}.`,
      },
      {
        level: "elite",
        min: 1000,
        text: `If coding is a crime, then you're serving a life sentence. Your commit game in ${YEAR} was outrageous!`,
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
        level: "zero",
        min: 0,
        max: 1,
        text: `Tell us the truth - do you even code?`,
      },
      {
        level: "ghost",
        max: 200,
        text: `Your contribution graph was giving minimalist. ${
          YEAR + 1
        } might be the year you go full bright green.`,
      },
      {
        level: "casual",
        min: 200,
        max: 800,
        text: `You put in decent work. Your ${YEAR} contributions were low-key, but they counted.`,
      },
      {
        level: "strong",
        min: 800,
        max: 2000,
        text: "You showed up all year. Commits, issues, PRs. Your contribution graph was busy.",
      },
      {
        level: "elite",
        min: 2000,
        text: `It looks like you were really trying to prove a point. Point noted! Your ${YEAR} contributions were ridiculous in the best way.`,
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
        level: "zero",
        min: 0,
        max: 1,
        text: `PRs? You didn’t pull anything except vibes.`,
      },
      {
        level: "ghost",
        max: 5,
        text: `Pull requests? Or did you pull out? Your ${YEAR} collaboration was giving "I'll sit this one out."`,
      },
      {
        level: "casual",
        min: 5,
        max: 30,
        text: "You pulled up when it mattered. Not everyday superhero. Mostimes you chose Netflix over GitHub.",
      },
      {
        level: "strong",
        min: 30,
        max: 100,
        text: "You did more than your fair share of merging and fixing. Collaboration was definitely in your DNA.",
      },
      {
        level: "elite",
        min: 100,
        text: `Your pull requests were basically peace treaties for the codebase - ${YEAR} was you fixing drama up and down.`,
      },
    ],
  },
  forks: {
    title: "forks",
    icon: RiGitForkLine,
    subtext: "total repos forked",
    color: COLORS.green,
    gradient: GRADIENTS.purpleBlue,
    introductions: [
      {
        level: "zero",
        min: 0,
        max: 1,
        text: `Nothing on GitHub managed to tempt you; the whole place got the silent treatment.`,
      },
      {
        level: "ghost",
        max: 3,
        text: `Forking? Barely. Your ${YEAR} was looking like an empty fridge - nothing inside. Maybe this year's the comeback.`,
      },
      {
        level: "casual",
        min: 3,
        max: 15,
        text: "You only forked when something genuinely slapped. Low volume, high taste. We see you m'forker!",
      },
      {
        level: "strong",
        min: 15,
        max: 50,
        text: `You picked your battles and your repos. Your forks in ${YEAR} were intentional. Respect!`,
      },
      {
        level: "elite",
        min: 50,
        text: `You forked repos like a true curator! Your ${YEAR} was all about discovering and saving the best of GitHub.`,
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
        text: `Peak performance? More like peak nap time. We are having a hard time finding you in ${YEAR}!`,
      },
    ],
  },
  prReviews: {
    title: "PRs reviewed",
    icon: VscCodeReview,
    subtext: "total PRs reviewed",
    color: COLORS.blue,
    gradient: GRADIENTS.greenBlue,
    introductions: [
      {
        level: "zero",
        min: 0,
        max: 1,
        text: `Review duties were dodged with Olympic-level skill. Gold medal behavior. Very strategic.`,
      },
      {
        level: "ghost",
        max: 5,
        text: `Your PR reviews were so rare this year, GitHub might label them an endangered species.`,
      },
      {
        level: "casual",
        min: 5,
        max: 30,
        text: `You dropped in for a few reviews here and there. Not heroic, but helpful enough to pretend you tried.`,
      },
      {
        level: "strong",
        min: 30,
        max: 100,
        text: `You actually took time to review PRs this year. The devs on your team definitely owe you snacks.`,
      },
      {
        level: "elite",
        min: 100,
        text: `You reviewed PRs like it was a full-time job. At this point, the codebase should be paying you rent.`,
      },
    ],
  },
  followers: {
    title: "followers",
    icon: RiUserFollowLine,
    subtext: "total followers",
    color: COLORS.pink,
    gradient: GRADIENTS.pinkPurple,
    introductions: [
      {
        level: "zero",
        min: 0,
        max: 1,
        text: `We’re not judging but… your follower count is giving ‘unfriendly server’ vibes - nobody’s impressed enough to log in.`,
      },
      {
        level: "ghost",
        max: 20,
        text: "Not a huge crowd yet, but every community starts small. One good repo and this number jumps fast.",
      },
      {
        level: "casual",
        min: 20,
        max: 50,
        text: "You're gathering followers at a steady pace. Keep shipping and they'll keep coming.",
      },
      {
        level: "strong",
        min: 50,
        max: 300,
        text: "You've built a solid crew. Folks clearly respect the work you put out there.",
      },
      {
        level: "elite",
        min: 300,
        text: "People don't just follow you — they *rate* you. Your GitHub presence is pulling serious gravity.",
      },
    ],
  },
  slang: {
    title: "aura",
    icon: LiaAwardSolid,
    subtext: "is how we feel about your coding journey this year",
    color: COLORS.blue,
    gradient: GRADIENTS.rainbow,
    introductions: [
      {
        level: "elite",
        min: 500,
        text: `Your GitHub presence was premium this year. Your aura alone deserves a full Naija 🇳🇬 coronation for ${YEAR}.`,
      },
      {
        level: "strong",
        min: 100,
        max: 500,
        text: `You showed up steady-steady this year on GitHub. Your ${YEAR} deserves a proper Nigerian salute.`,
      },
      {
        level: "casual",
        min: 10,
        max: 100,
        text: `Your face is showing, and your shoe is shining. Let's find the slang that matches your ${YEAR} energy.`,
      },
      {
        level: "ghost",
        max: 10,
        text: `Every kingdom has that one silent character. Let’s see which Naija 🇳🇬 slang best captures your ${YEAR} energy.`,
      },
    ],
  },
} as const satisfies Record<string, SlideConfig>;

export type SlideKey = keyof typeof SLIDE_CONFIG;
