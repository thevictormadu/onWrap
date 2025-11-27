import { IconType } from "react-icons/lib";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiSharp,
  SiGo,
  SiRust,
  SiRuby,
  SiPhp,
  SiSwift,
  SiKotlin,
  SiDart,
  SiHtml5,
  SiCss3,
  SiReact,
  SiV,
  SiAngular,
  SiNodedotjs,
  SiNextdotjs,
  SiTailwindcss,
  SiSvelte,
  SiFlutter,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiGraphql,
  SiElixir,
  SiScala,
  SiClojure,
  SiHaskell,
  SiErlang,
  SiPerl,
  SiR,
  SiShell,
  SiDash,
  SiPowers,
} from "react-icons/si";
import { IoCodeSharp } from "react-icons/io5";
import { SLIDE_CONFIG, type SlideKey, type IntroTier } from "@/constants/index";
import { Slangs } from "@/types";

export const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

export function getIntroduction(
  value: number | string,
  slide: SlideKey
): string {
  const config = SLIDE_CONFIG[slide];

  // Handle string-valued stats like "topLanguage" or unknowns
  if (typeof value === "string") {
    if (
      value === "Unknown" &&
      "unknownIntroduction" in config &&
      config.unknownIntroduction
    ) {
      return config.unknownIntroduction;
    }

    // Fallback to the first tier text if available
    return config.introductions[0]?.text ?? "";
  }

  // Numeric stats – pick the tier whose [min, max) range matches
  const tiers = config.introductions as readonly IntroTier[];

  const tier =
    tiers.find((t) => {
      const minOk = t.min === undefined || value >= t.min;
      const maxOk = t.max === undefined || value < t.max;
      return minOk && maxOk;
    }) ?? tiers[tiers.length - 1];

  return tier.text;
}

export function getLanguageIconAndColor(language: string): {
  icon: IconType;
  color: string;
} {
  const normalizedLang = language.trim();

  switch (normalizedLang) {
    // Web Technologies
    case "JavaScript":
    case "JS":
      return { icon: SiJavascript, color: "#F7DF1E" };
    case "TypeScript":
    case "TS":
      return { icon: SiTypescript, color: "#3178C6" };
    case "HTML":
    case "HTML5":
      return { icon: SiHtml5, color: "#E34F26" };
    case "CSS":
    case "CSS3":
      return { icon: SiCss3, color: "#1572B6" };

    // Frontend Frameworks
    case "React":
    case "React.js":
      return { icon: SiReact, color: "#61DAFB" };
    case "Vue":
    case "Vue.js":
      return { icon: SiV, color: "#4FC08D" };
    case "Angular":
      return { icon: SiAngular, color: "#DD0031" };
    case "Svelte":
      return { icon: SiSvelte, color: "#FF3E00" };
    case "Next.js":
    case "NextJS":
      return { icon: SiNextdotjs, color: "#000000" };
    case "Tailwind CSS":
    case "Tailwind":
      return { icon: SiTailwindcss, color: "#06B6D4" };

    // Backend Languages
    case "Python":
      return { icon: SiPython, color: "#3776AB" };
    case "C++":
    case "CPP":
      return { icon: SiCplusplus, color: "#00599C" };
    case "C#":
    case "CSharp":
      return { icon: SiSharp, color: "#239120" };
    case "Go":
    case "Golang":
      return { icon: SiGo, color: "#00ADD8" };
    case "Rust":
      return { icon: SiRust, color: "#000000" };
    case "Ruby":
      return { icon: SiRuby, color: "#CC342D" };
    case "PHP":
      return { icon: SiPhp, color: "#777BB4" };
    case "Elixir":
      return { icon: SiElixir, color: "#4B275F" };
    case "Scala":
      return { icon: SiScala, color: "#DC322F" };
    case "Clojure":
      return { icon: SiClojure, color: "#5881D8" };
    case "Haskell":
      return { icon: SiHaskell, color: "#5D4F85" };
    case "Erlang":
      return { icon: SiErlang, color: "#A90533" };
    case "Perl":
      return { icon: SiPerl, color: "#39457E" };

    // Mobile Development
    case "Swift":
      return { icon: SiSwift, color: "#FA7343" };
    case "Kotlin":
      return { icon: SiKotlin, color: "#7F52FF" };
    case "Dart":
      return { icon: SiDart, color: "#0175C2" };
    case "Flutter":
      return { icon: SiFlutter, color: "#02569B" };

    // Backend Frameworks & Tools
    case "Node.js":
    case "NodeJS":
    case "Node":
      return { icon: SiNodedotjs, color: "#339933" };
    case "Docker":
      return { icon: SiDocker, color: "#2496ED" };
    case "Kubernetes":
    case "K8s":
      return { icon: SiKubernetes, color: "#326CE5" };

    // Databases
    case "PostgreSQL":
    case "Postgres":
      return { icon: SiPostgresql, color: "#4169E1" };
    case "MongoDB":
    case "Mongo":
      return { icon: SiMongodb, color: "#47A248" };
    case "Redis":
      return { icon: SiRedis, color: "#DC382D" };
    case "GraphQL":
      return { icon: SiGraphql, color: "#E10098" };

    // Data Science & Others
    case "R":
      return { icon: SiR, color: "#276DC3" };
    case "Shell":
    case "sh":
      return { icon: SiShell, color: "#89E051" };
    case "Bash":
      return { icon: SiDash, color: "#4EAA25" };
    case "PowerShell":
      return { icon: SiPowers, color: "#012456" };

    // Default fallback
    default:
      return { icon: IoCodeSharp, color: "#ffffff" };
  }
}

export function getSlang(commits: number): Slangs {
  if (commits > 2000) {
    return { slang: "Idan!", emoji: "👑" };
  } else if (commits > 1500) {
    return { slang: "President General!", emoji: "🎖️" };
  } else if (commits > 1000) {
    return { slang: "Raise am!!", emoji: "🙌️" };
  } else if (commits > 500) {
    return { slang: "Opor!", emoji: "🫡" };
  } else if (commits > 400) {
    return { slang: "Who dey breathe!", emoji: "✌️" };
  } else if (commits > 300) {
    return { slang: "E choke!", emoji: "🫣️" };
  } else if (commits > 200) {
    return { slang: "Omo!", emoji: "🙂" };
  } else if (commits > 100) {
    return { slang: "Odogwu!", emoji: "🤑" };
  } else if (commits > 50) {
    return { slang: "On colos!", emoji: "🤐️" };
  } else if (commits > 10) {
    return { slang: "We mueve!", emoji: "🤐️" };
  } else if (commits > 5) {
    return { slang: "Wahala!", emoji: "🤐️" };
  } else if (commits > 2) {
    return { slang: "God abeg!", emoji: "🤲" };
  } else {
    return { slang: "Dey play!", emoji: "😩" };
  }
}
