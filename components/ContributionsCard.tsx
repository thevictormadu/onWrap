"use client";

import React from "react";
import Card from "./Card";
import {
  MAX_COMMITS_FOR_SCALING,
  MIN_DENSITY,
  MAX_DENSITY,
  SEED_MODULUS,
  CONTRIBUTIONS_GRID_ROWS,
  CONTRIBUTIONS_GRID_COLS,
} from "@/constants/ui";
import { useGitHub } from "@/context/GithubContext";

interface ContributionsCardProps {
  value: string | number;
  delay?: number;
}

export default function ContributionsCard({
  value,
  delay = 0.1,
}: ContributionsCardProps) {
  // Generate a grid of squares
  const totalSquares = CONTRIBUTIONS_GRID_ROWS * CONTRIBUTIONS_GRID_COLS;

  const { data } = useGitHub();

  // Generate random pattern for active/inactive squares
  // Using a seeded approach for consistency based on value
  const generateGrid = React.useMemo(() => {
    // GitHub contribution graph green shades
    const githubGreens = [
      "#161b22", // Darkest (no contributions) - almost black
      "#0e4429", // Very dark green
      "#006d32", // Dark green
      "#26a641", // Medium-dark green
      "#40c463", // Medium green (GitHub's main green)
      "#56d364", // Light green
    ];

    const squares = [];
    const numValue = typeof value === "number" ? value : 500;

    // If value is 0, return all inactive squares
    if (numValue === 0) {
      for (let i = 0; i < totalSquares; i++) {
        squares.push({
          isActive: false,
          intensity: 0,
          color: githubGreens[0],
        });
      }
      return squares;
    }

    // Calculate active squares density relative to commit count
    // Use logarithmic scale to handle wide range of commit values
    // Map commits to a percentage of active squares
    const minCommits = 0;
    const clampedValue = Math.max(
      minCommits,
      Math.min(numValue, MAX_COMMITS_FOR_SCALING)
    );

    // Use logarithmic scale for better distribution
    const logMin = Math.log10(minCommits + 1);
    const logMax = Math.log10(MAX_COMMITS_FOR_SCALING + 1);
    const logValue = Math.log10(clampedValue + 1);

    // Normalize to 0-1 range
    const normalized = (logValue - logMin) / (logMax - logMin);

    // Calculate density percentage
    const density = MIN_DENSITY + (MAX_DENSITY - MIN_DENSITY) * normalized;

    // Calculate active count based on density
    const activeCount = Math.round(totalSquares * density);

    // Use value as seed for consistent pattern
    const seed = numValue % SEED_MODULUS;

    // Create array of indices and shuffle using seeded random
    const indices = Array.from({ length: totalSquares }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const seedValue = (seed + i) * 9301 + 49297;
      const j = seedValue % (i + 1);
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Mark first activeCount as active and assign intensity levels
    const activeIndices = indices.slice(0, activeCount);
    const activeSet = new Set(activeIndices);

    // Create intensity map for active squares (higher intensity = brighter green)
    // Randomly distribute intensities for a more natural look
    const intensityMap = new Map<number, number>();
    activeIndices.forEach((idx) => {
      // Use seeded random based on index for consistent but varied intensities
      const seedValue = (seed + idx) * 9301 + 49297;
      const random = (seedValue % SEED_MODULUS) / SEED_MODULUS;
      // Distribute intensities: 20% get intensity 1-2, 30% get 3, 30% get 4, 20% get 5
      let intensity: number;
      if (random < 0.2) {
        intensity = random < 0.1 ? 1 : 2; // Darker greens
      } else if (random < 0.5) {
        intensity = 3; // Medium green
      } else if (random < 0.8) {
        intensity = 4; // Bright green
      } else {
        intensity = 5; // Brightest green
      }
      intensityMap.set(idx, intensity);
    });

    // Helper function to get green shade based on intensity (0-5)
    const getGreenShade = (intensity: number): string => {
      const index = Math.min(
        Math.max(Math.floor(intensity), 0),
        githubGreens.length - 1
      );
      return githubGreens[index];
    };

    for (let i = 0; i < totalSquares; i++) {
      const isActive = activeSet.has(i);
      const intensity = intensityMap.get(i) || 0;
      squares.push({
        isActive,
        intensity,
        color: isActive ? getGreenShade(intensity) : githubGreens[0], // Use darkest green for inactive
      });
    }

    return squares;
  }, [value, totalSquares]);

  const gridSquares = generateGrid;

  return (
    <Card flex={1} flexDirection="column" gap="0" overflow="hidden" delay={delay}>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${CONTRIBUTIONS_GRID_COLS}, 1fr)`,
            gridTemplateRows: `repeat(${CONTRIBUTIONS_GRID_ROWS}, auto)`,
            gap: "3px",
            width: "100%",
          }}
        >
          {gridSquares.map((square, index) => (
            <div
              key={index}
              style={{
                aspectRatio: 1,
                borderRadius: "2px",
                transition: "opacity 0.2s ease",
                backgroundColor: square.color,
              }}
            />
          ))}
        </div>

        <div
          style={{
            background: "#0F0F0F",
            padding: "0.2rem",
            textAlign: "center",
            position: "absolute",
            bottom: -35,
          }}
        >
          <p
            style={{
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "rgba(255, 255, 255, 0.9)",
              lineHeight: 1,
              marginBottom: "0.2rem",
            }}
          >
            {data?.totalContributions?.toLocaleString() || 0}
          </p>
          <p
            style={{
              fontSize: "0.7rem",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.6)",
              lineHeight: 1,
            }}
          >
            Contributions
          </p>
          <p
            style={{
              fontSize: "0.6rem",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.6)",
              lineHeight: 1,
              marginTop: "0.2rem",
            }}
          >
            ∘ {data?.totalCommits?.toLocaleString() || 0} public commits
          </p>
        </div>
      </div>
    </Card>
  );
}

