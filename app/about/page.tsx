"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import Card from "@/components/Card";
import { primaryGradient, primaryColor, COLORS } from "@/constants/colors";
import { YEAR } from "@/constants/index";
import { GRID_PATTERN_SIZE } from "@/constants/ui";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100svh",
        position: "relative",
        background: COLORS.black,
        backgroundSize: GRID_PATTERN_SIZE,
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: "100%" }}
        >
          <Card>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
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
                Privacy & Info
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                {/* Privacy Section */}
                <section>
                  <h2
                    style={{
                      color: COLORS.white,
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      margin: "0 0 1rem 0",
                    }}
                  >
                    🔒 Privacy & Data
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 0.9)",
                        fontSize: "1rem",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      <strong style={{ color: COLORS.white }}>
                        Zero data persistence.
                      </strong>{" "}
                      This app has no database, no caching infrastructure, and
                      no data storage. Every time you generate a wrap, your data
                      is fetched fresh from GitHub&apos;s GraphQL API using
                      either a public token (for username method) or your OAuth
                      token (for authenticated users).
                    </p>
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 0.9)",
                        fontSize: "1rem",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      The data exists only in memory during the request-response
                      cycle. Once your wrap is generated and sent to your
                      browser, it&apos;s gone from our servers. The app
                      doesn&apos;t log, persist, or analyze your GitHub data. No
                      cookies beyond the OAuth session token (which you can
                      revoke anytime in your GitHub settings), no analytics
                      tracking, no third-party services storing your
                      information.
                    </p>
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 0.9)",
                        fontSize: "1rem",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      <strong style={{ color: COLORS.white }}>
                        No AI, no data sharing.
                      </strong>{" "}
                      All commentaries and messages in your wrap are
                      pre-configured in the app&apos;s codebase. The app
                      doesn&apos;t use any AI services, and your data is never
                      sent to any AI providers or third-party services.
                      Everything runs locally on the server using only the
                      GitHub API and your OAuth token if you choose to
                      authenticate.
                    </p>
                    <p
                      style={{
                        color: "rgba(255, 255, 255, 0.9)",
                        fontSize: "1rem",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      If you&apos;re curious, the{" "}
                      <a
                        href="https://github.com/thevictormadu/onWrap.git"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: primaryColor,
                          textDecoration: "underline",
                          fontWeight: 600,
                        }}
                      >
                        source code is public
                      </a>{" "}
                      - you can check it out, and while you&apos;re at it, if
                      you find this app useful, please consider giving the repo
                      a ⭐ on GitHub! And if you have any suggestions or
                      feedback, please feel free to open an issue or submit a
                      pull request.
                    </p>
                  </div>
                </section>

                {/* How It Works Section */}
                <section>
                  <h2
                    style={{
                      color: COLORS.white,
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      margin: "0 0 1rem 0",
                    }}
                  >
                    ⚙️ How It Works
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.5rem",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          color: COLORS.white,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          margin: "0 0 0.5rem 0",
                        }}
                      >
                        Username Method
                      </h3>
                      <p
                        style={{
                          color: "rgba(255, 255, 255, 0.9)",
                          fontSize: "1rem",
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        When you enter your GitHub username, the app only
                        accesses your
                        <strong style={{ color: COLORS.white }}>
                          {" "}
                          public activities
                        </strong>
                        . This includes public repositories, contributions, and
                        other publicly available information. Your private
                        repositories and activities remain completely private.
                      </p>
                    </div>
                    <div>
                      <h3
                        style={{
                          color: COLORS.white,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          margin: "0 0 0.5rem 0",
                        }}
                      >
                        GitHub Authentication
                      </h3>
                      <p
                        style={{
                          color: "rgba(255, 255, 255, 0.9)",
                          fontSize: "1rem",
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        If you choose to authenticate with GitHub, you can
                        include
                        <strong style={{ color: COLORS.white }}>
                          {" "}
                          private activities
                        </strong>{" "}
                        in your wrap. This gives you a more complete picture of
                        your coding journey in the current year ({YEAR}),
                        including contributions to private repositories. Even
                        with authentication, no data is saved - it&apos;s only
                        used to generate your wrap.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Metrics Section */}
                <section>
                  <h2
                    style={{
                      color: COLORS.white,
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      margin: "0 0 1rem 0",
                    }}
                  >
                    📊 Metrics & Statistics
                  </h2>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.5rem",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          color: COLORS.white,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          margin: "0 0 0.5rem 0",
                        }}
                      >
                        Year-Specific Metrics
                      </h3>
                      <p
                        style={{
                          color: "rgba(255, 255, 255, 0.9)",
                          fontSize: "1rem",
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        Most metrics in your wrap reflect your activity during
                        the current year ({YEAR}) only. These include commits,
                        contributions, pull requests, PR reviews, longest
                        streak, peak performance month, and forked repositories
                        created in the current year ({YEAR}).
                      </p>
                    </div>
                    <div>
                      <h3
                        style={{
                          color: COLORS.white,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          margin: "0 0 0.5rem 0",
                        }}
                      >
                        All-Time Metrics
                      </h3>
                      <p
                        style={{
                          color: "rgba(255, 255, 255, 0.9)",
                          fontSize: "1rem",
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        Some metrics are calculated as all-time totals, not just
                        for the current year ({YEAR}). These include{" "}
                        <strong style={{ color: COLORS.white }}>
                          stars received
                        </strong>
                        ,{" "}
                        <strong style={{ color: COLORS.white }}>
                          followers
                        </strong>
                        , and{" "}
                        <strong style={{ color: COLORS.white }}>
                          top programming language
                        </strong>
                        . This is because these metrics represent your overall
                        GitHub presence and repository statistics across all
                        your repositories, rather than year-specific
                        achievements.
                      </p>
                    </div>
                  </div>
                </section>
              </motion.div>

              {/* Back to Home Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{ marginTop: "1rem" }}
              >
                <motion.button
                  type="button"
                  aria-label="Back to home"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/")}
                  style={{
                    width: "100%",
                    transition: "all 0.3s ease",
                    borderRadius: "0.75rem",
                    fontWeight: 700,
                    padding: "1rem 1.5rem",
                    background: primaryGradient,
                    border: "none",
                    color: COLORS.white,
                    cursor: "pointer",
                    outline: "none",
                    fontSize: "1rem",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = `0.3px solid ${primaryColor}`;
                    e.currentTarget.style.outlineOffset = "1px";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = "none";
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 8px 32px ${primaryColor}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Back to onWrap
                </motion.button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
