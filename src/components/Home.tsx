import MotionGradientBg from "./MotionGradientBg.tsx";
import githubLogo from "../assets/github-logo.png";
import victorPic from "../assets/victor.jpg";
import FrostedGlass from "./FrostedGlass.tsx";
import { useNavigate } from "react-router-dom";
import { useGitHub } from "../context/GithubContext.tsx";
import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar.tsx";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { fetchGitHubData, loading, error, data } = useGitHub();

  const validateUsername = (username: string): boolean => {
    // GitHub username: alphanumeric, hyphens, no spaces, 1-39 characters
    const githubUsernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9]|-(?![.-])){0,38}$/;
    return githubUsernameRegex.test(username);
  };

  const handleClick = async () => {
    const trimmedUsername = userName.trim();

    if (!trimmedUsername) {
      setValidationError("Please enter a GitHub username");
      return;
    }

    if (!validateUsername(trimmedUsername)) {
      setValidationError(
        "Invalid GitHub username format. Username must be alphanumeric with hyphens, no spaces."
      );
      return;
    }

    setValidationError(null);

    try {
      await fetchGitHubData(trimmedUsername);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Error fetching data:", err);
      }
    }
  };

  useEffect(() => {
    if (data && !error) {
      navigate("/wrap");
    }
  }, [error, data, navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
        alignItems: "center",
        justifyContent: "center",
        height: "100svh",
        width: "100%",
        flex: 1,
      }}
    >
      <MotionGradientBg opacity={0.15} />
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
        <FrostedGlass blur={"10px"}>
          <div
            style={{
              maxWidth: "400px",
              padding: "2rem",
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleClick();
              }}
            >
              <p
                style={{
                  margin: "0",
                  color: "#fff",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                2024: Your GitHub Story{" "}
                <span
                  style={{
                    background: "linear-gradient(45deg, #75FFE8, #7B57FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  onWrap
                </span>
              </p>
              <p
                style={{
                  color: "#fff",
                  margin: "2rem 0",
                }}
              >
                Relive the highlights of your 2024 coding adventure.
              </p>
              <input
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  width: "100%",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  borderRadius: "0.5rem",
                  fontSize: "16px",
                  padding: "1rem",
                  background: "rgba(217, 217, 217, 0.07)",
                  marginBottom: "1rem",
                  color: "#fff",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline =
                    "2px solid rgba(8, 194, 241, 0.8)";
                  e.currentTarget.style.outlineOffset = "2px";
                  e.currentTarget.style.borderColor = "rgba(8, 194, 241, 0.5)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = "none";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.1)";
                }}
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  if (validationError) {
                    setValidationError(null);
                  }
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
              <button
                type="submit"
                aria-label="Generate GitHub wrap"
                disabled={loading}
                style={{
                  width: "100%",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  borderRadius: "0.5rem",
                  fontWeight: "bold",
                  padding: "1rem",
                  background: "linear-gradient(45deg, #833BDB, #1E8CD0)",
                  marginTop: "1rem",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  outline: "none",
                  fontSize: "1rem",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline =
                    "2px solid rgba(131, 59, 219, 0.8)";
                  e.currentTarget.style.outlineOffset = "2px";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = "none";
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 10px rgba(131, 59, 219, 0.6), 0 0 20px rgba(30, 140, 208, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Generate My Wrap
              </button>
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
                <img
                  src={githubLogo}
                  alt="GitHub Logo"
                  style={{ width: "20px" }}
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
        </FrostedGlass>
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
            <img
              style={{ width: "30px", borderRadius: "1rem" }}
              src={victorPic}
              alt="Victor Madu"
            />
            <p style={{ fontSize: "0.7rem" }}>
              built with ❤️ by{" "}
              <span style={{ fontWeight: "bold" }}>Victor Madu</span>
            </p>
          </div>
        </FrostedGlass>
      </div>
    </div>
  );
}
