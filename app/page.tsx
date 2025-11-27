"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGitHub } from "@/context/GithubContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Card from "@/components/Card";
import GridBackground from "@/components/GridBackground";
import FrostedGlass from "@/components/FrostedGlass";
import ProgressBar from "@/components/ProgressBar";
import { primaryGradient, primaryColor, COLORS } from "@/constants/colors";
import { YEAR } from "@/constants/index";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const router = useRouter();
  const { fetchGitHubData, loading, error, data } = useGitHub();

  const validateUsername = (username: string): boolean => {
    // GitHub username: alphanumeric, hyphens, no spaces, 1-39 characters
    const githubUsernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9]|-(?![.-])){0,38}$/;
    return githubUsernameRegex.test(username);
  };

  const handleClick = async () => {
    let cleanedUsername = userName.trim();

    // Remove leading @ if present
    if (cleanedUsername.startsWith("@")) {
      cleanedUsername = cleanedUsername.slice(1);
    }

    if (!cleanedUsername) {
      setValidationError("Please enter a GitHub username");
      return;
    }

    // Check for email
    if (cleanedUsername.includes("@")) {
      setValidationError(
        "Please use your GitHub username, not your email address."
      );
      return;
    }

    if (!validateUsername(cleanedUsername)) {
      setValidationError(
        "Invalid GitHub username format. Username must be alphanumeric with hyphens, no spaces."
      );
      return;
    }

    setValidationError(null);

    try {
      await fetchGitHubData(cleanedUsername);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error fetching data:", err);
      }
    }
  };

  useEffect(() => {
    if (data && !error) {
      router.push("/wrap");
    }
  }, [error, data, router]);

  return (
    <GridBackground>
      <div
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <div
              style={{
                maxWidth: "500px",
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleClick();
                }}
              >
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    margin: "0",
                    color: COLORS.white,
                    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                    fontWeight: 800,
                    textAlign: "left",
                    lineHeight: 1.2,
                  }}
                >
                  {`${YEAR}: Your GitHub Story `}
                  <span
                    style={{
                      background: primaryGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    onWrap
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  style={{
                    color: "rgba(255, 255, 255, 0.9)",
                    margin: "1.5rem 0",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                  }}
                >
                  Relive the highlights of your {YEAR} coding adventure.
                </motion.p>
                <motion.input
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    width: "100%",
                    boxSizing: "border-box",
                    transition: "all 0.3s ease",
                    borderRadius: "0.75rem",
                    fontSize: "16px",
                    padding: "1rem 1.25rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    marginBottom: "1rem",
                    color: COLORS.white,
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = `0.3px solid ${primaryColor}`;
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.boxShadow = `0 0 5px ${primaryColor}20`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = "none";
                    e.currentTarget.style.borderColor =
                      "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  value={userName}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Check if it looks like an email (has @ after the first character)
                    const valueWithoutLeadingAt = value.startsWith("@")
                      ? value.slice(1)
                      : value;
                    if (valueWithoutLeadingAt.includes("@")) {
                      setValidationError(
                        "Please use your GitHub username, not your email address."
                      );
                    } else if (validationError) {
                      setValidationError(null);
                    }

                    setUserName(value);
                  }}
                  type="text"
                  placeholder="your GitHub username"
                  aria-label="GitHub username input"
                />
                {validationError && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "0.9rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    {validationError}
                  </p>
                )}
                {error && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "0.9rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    Error: {error}
                  </p>
                )}
                {loading && <ProgressBar />}
                <motion.button
                  type="submit"
                  aria-label="Generate GitHub wrap"
                  disabled={loading}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%",
                    transition: "all 0.3s ease",
                    borderRadius: "0.75rem",
                    fontWeight: 700,
                    padding: "1rem 1.5rem",
                    background: primaryGradient,
                    marginTop: "1rem",
                    border: "none",
                    color: COLORS.white,
                    cursor: loading ? "not-allowed" : "pointer",
                    outline: "none",
                    fontSize: "1rem",
                    opacity: loading ? 0.6 : 1,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = `0.3px solid ${primaryColor}`;
                    e.currentTarget.style.outlineOffset = "1px";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = "none";
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.boxShadow = `0 8px 32px ${primaryColor}60`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Generate My Wrap
                </motion.button>
              </form>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "1.5rem",
                }}
              >
                <p style={{ margin: 0, opacity: 0.8, fontSize: "0.8rem" }}>
                  #GitHubOnWrap
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Image
                    src="/assets/github-logo.png"
                    alt="GitHub Logo"
                    width={20}
                    height={20}
                  />
                  <a
                    href="https://github.com/thevictormadu/onWrap.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      margin: 0,
                      opacity: 0.8,
                    }}
                  >
                    <p style={{ color: "white", fontSize: "0.8rem" }}>
                      source code
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <FrostedGlass borderRadius={"2rem"}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                padding: "0.5rem 1rem 0.5rem 0.5rem",
              }}
            >
              <Image
                style={{ borderRadius: "1rem" }}
                src="/assets/victor.jpg"
                alt="Victor Madu"
                width={30}
                height={30}
              />
              <p style={{ fontSize: "0.7rem" }}>
                with love from{" "}
                <a
                  href="https://www.victormadu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontWeight: "bold",
                    color: "inherit",
                    textDecoration: "underline",
                  }}
                >
                  Victor Madu
                </a>
              </p>
            </div>
          </FrostedGlass>
        </motion.div>
      </div>
    </GridBackground>
  );
}
