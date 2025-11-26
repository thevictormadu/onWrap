import { ReactNode } from "react";

interface GitHubContributionsBackgroundProps {
  children: ReactNode;
}

// Larger SVG pattern that mimics GitHub contributions grid
// Pattern includes gray inactivity boxes (most frequent) and 5 shades of green
// Gray inactivity: #161b22 (GitHub's inactive color)
// GitHub green colors: #0e4429 (darkest, 1-3), #006d32 (dark, 4-6), #1a7f37 (medium-dark, 5-7), #26a641 (medium, 7-9), #39d353 (brightest, 10+)
// Pattern is designed to tile seamlessly without gaps
const CONTRIB_PATTERN_SVG = `
  <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="contrib-grid" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
        <!-- Grid with gray inactivity boxes (most frequent) and sparse green activity squares -->
        <!-- Row 1 -->
        <rect x="0" y="0" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="20" y="0" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="40" y="0" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="60" y="0" width="12" height="12" fill="#006d32" rx="3"/>
        <rect x="80" y="0" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="100" y="0" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="120" y="0" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="140" y="0" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="160" y="0" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="180" y="0" width="12" height="12" fill="#161b22" rx="3"/>
        
        <!-- Row 2 -->
        <rect x="0" y="20" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="20" y="20" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="40" y="20" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="60" y="20" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="80" y="20" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="100" y="20" width="12" height="12" fill="#0e4429" rx="3"/>
        <rect x="120" y="20" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="140" y="20" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="160" y="20" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="180" y="20" width="12" height="12" fill="#161b22" rx="3"/>
        
        <!-- Row 3 -->
        <rect x="0" y="40" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="20" y="40" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="40" y="40" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="60" y="40" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="80" y="40" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="100" y="40" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="120" y="40" width="12" height="12" fill="#006d32" rx="3"/>
        <rect x="140" y="40" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="160" y="40" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="180" y="40" width="12" height="12" fill="#161b22" rx="3"/>
        
        <!-- Row 4 -->
        <rect x="0" y="60" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="20" y="60" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="40" y="60" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="60" y="60" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="80" y="60" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="100" y="60" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="120" y="60" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="140" y="60" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="160" y="60" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="180" y="60" width="12" height="12" fill="#006d32" rx="3"/>
        
        <!-- Row 5 -->
        <rect x="0" y="80" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="20" y="80" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="40" y="80" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="60" y="80" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="80" y="80" width="12" height="12" fill="#0e4429" rx="3"/>
        <rect x="100" y="80" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="120" y="80" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="140" y="80" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="160" y="80" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="180" y="80" width="12" height="12" fill="#161b22" rx="3"/>
        
        <!-- Row 6 -->
        <rect x="0" y="100" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="20" y="100" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="40" y="100" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="60" y="100" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="80" y="100" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="100" y="100" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="120" y="100" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="140" y="100" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="160" y="100" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="180" y="100" width="12" height="12" fill="#39d353" rx="3"/>
        
        <!-- Row 7 -->
        <rect x="0" y="120" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="20" y="120" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="40" y="120" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="60" y="120" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="80" y="120" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="100" y="120" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="120" y="120" width="12" height="12" fill="#006d32" rx="3"/>
        <rect x="140" y="120" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="160" y="120" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="180" y="120" width="12" height="12" fill="#161b22" rx="3"/>
        
        <!-- Row 8 -->
        <rect x="0" y="140" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="20" y="140" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="40" y="140" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="60" y="140" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="80" y="140" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="100" y="140" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="120" y="140" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="140" y="140" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="160" y="140" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="180" y="140" width="12" height="12" fill="#161b22" rx="3"/>
        
        <!-- Row 9 -->
        <rect x="0" y="160" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="20" y="160" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="40" y="160" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="60" y="160" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="80" y="160" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="100" y="160" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="120" y="160" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="140" y="160" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="160" y="160" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="180" y="160" width="12" height="12" fill="#26a641" rx="3"/>
        
        <!-- Row 10 - wraps around for seamless tiling -->
        <rect x="0" y="180" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="20" y="180" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="40" y="180" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="60" y="180" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="80" y="180" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="100" y="180" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="120" y="180" width="12" height="12" fill="#006d32" rx="3"/>
        <rect x="140" y="180" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="160" y="180" width="12" height="12" fill="#161b22" rx="3"/>
        <rect x="180" y="180" width="12" height="12" fill="#161b22" rx="3"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#contrib-grid)"/>
  </svg>
`;

const PATTERN_URL = `data:image/svg+xml,${encodeURIComponent(
  CONTRIB_PATTERN_SVG
)}`;

export default function GitHubContributionsBackground({
  children,
}: GitHubContributionsBackgroundProps) {
  return (
    <>
      <style>
        {`
          @keyframes scrollContributions {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 200px 0;
            }
          }
          
          .contributions-bg {
            animation: scrollContributions 20s linear infinite;
            will-change: background-position;
            transform: translateZ(0);
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
        `}
      </style>
      <div
        className="contributions-bg"
        style={{
          height: "100svh",
          position: "relative",
          backgroundImage: `url("${PATTERN_URL}")`,
          backgroundSize: "200px 200px",
          backgroundRepeat: "repeat",
          backgroundPosition: "0 0",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </>
  );
}
