import githubLogo from "../assets/github-logo.png";
import NameCard from "./NameCard.tsx";
import EndNoteCard from "./EndNoteCard.tsx";
import {
    commitsTitle,
    peakPerformanceTitle, prReviewsTitle,
    pullRequestsTitle, slangTitle,
    starsReceivedTitle, streakTitle,
    topLanguageTitle
} from "../constants.ts";
import {useGitHub} from "../context/GithubContext.tsx";
import {getSlang} from "../utils.ts";

const EndNote: React.FC = () => {
    const {data} = useGitHub();
    const slang = getSlang(data?.totalCommits || 0);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                position: "relative",
                background: `
          linear-gradient(90deg, rgba(23, 23, 23, 0.6) 1px, transparent 1px),
          linear-gradient(180deg, rgba(23, 23, 23, 0.6) 1px, transparent 1px)
        `,
                overflow: "hidden",
                backgroundSize: "20px 20px",
                animation: "moveMesh 5s linear infinite",
            }}
        >

            {/* Foreground Content */}
            <div
                style={{
                    textAlign: "center",
                    color: "#08C2F1",
                    width: "100%",
                    height: "100%",
                    maxWidth: "400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem",
                    gap: "1rem",

                }}
            >
                <div style={{width: "100%", marginTop: "3rem",}}>
                    <NameCard title={`@${data?.userId}` || ""} value={"2024 GitHub Year in Code"}/>
                </div>

                <div style={{
                    display: "flex",
                    flex: 1,
                    width: "100%",
                    flexDirection: "column",
                    gap: "1rem",
                }}>
                    <div style={{display: "flex", width: "100%", flex: 1, gap: "1rem"}}>
                        <EndNoteCard title={starsReceivedTitle} data={data?.totalStars.toString() || ""}
                                     glowColor={"240, 187, 120"}/>
                        <EndNoteCard title={topLanguageTitle} data={data?.topLanguage || ""}
                                     glowColor={"255, 135, 135"} delay={0.4}/>
                    </div>
                    <div style={{display: "flex", width: "100%", flex: 1, gap: "1rem"}}>
                        <EndNoteCard title={commitsTitle} data={data?.totalCommits.toString() || ""}
                                     glowColor={"135, 162, 2590"} delay={0.5}/>
                        <EndNoteCard title={pullRequestsTitle} data={data?.totalPRs.toString() || ""}
                                     glowColor={"157, 223, 211"} delay={0.6}/>
                    </div>
                    <div style={{display: "flex", width: "100%", flex: 1, gap: "1rem"}}>
                        <EndNoteCard title={peakPerformanceTitle} data={data?.peakMonth || "We can't figure it out"}
                                     glowColor={"158, 223, 156"} delay={0.7}/>
                        <EndNoteCard title={prReviewsTitle} data={data?.totalReviews.toString() || ""}
                                     glowColor={"218, 73, 141"} delay={0.8}/>
                    </div>
                    <div style={{display: "flex", width: "100%", flex: 1, gap: "1rem"}}>
                        <EndNoteCard title={streakTitle} data={data?.longestStreak.toString() || ""}
                                     glowColor={"251, 158, 198"} delay={0.9}/>
                        <EndNoteCard title={slangTitle} data={`${slang.emoji} ${slang.slang}` || ""}
                                     glowColor={"61, 178, 255"} delay={1}/>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 5,
                        marginBottom: "6rem",
                    }}
                >
                    <img style={{width: "1.5rem"}} src={githubLogo} alt="GitHub Logo"/>
                    <p style={{opacity: 0.8}}>#GitHubOnWrap</p>
                </div>

            </div>


        </div>
    );
};

export default EndNote;