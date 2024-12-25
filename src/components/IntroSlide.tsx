import {motion} from "framer-motion";
import githubLogo from "../assets/github-logo.png";
import NameCard from "./NameCard.tsx";
import {useGitHub} from "../context/GithubContext.tsx";
import {useEffect, useState} from "react";

export default function IntroSlide() {
    const {data} = useGitHub()
    const [showPretext, setShowPretext] = useState(true);
    useEffect(() => {
        setShowPretext(true);
        const timer = setTimeout(() => {
            setShowPretext(false);
        }, 6000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                position: "relative",
                background: `
          linear-gradient(90deg, rgba(23, 23, 23, 0.6) 1px, transparent 1px),
          linear-gradient(180deg, rgba(23, 23, 23, 0.6) 1px, transparent 1px)
        `,
                overflow: "hidden",
                backgroundSize: "20px 20px",
                animation: "moveMesh 5s linear infinite",
                width: "100%",
            }}
        >

            {/* Foreground Content */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    color: "#08C2F1",
                    zIndex: 20,
                    width: "100%",
                    height: "100%",
                    maxWidth: "400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div style={{marginTop: "3rem"}}>
                    <NameCard title={`@${data?.userId}`}
                              value={`${data?.firstName || ""} ${data?.lastName || ""}`}/>
                </div>

                {showPretext ? <div>
                    <motion.h1
                        initial={{opacity: 0, y: 50}}
                        animate={{
                            opacity: 1,
                            y: 0,
                            textShadow: [
                                "0 0 10px rgba(255, 255, 255, 0.8)",
                                "0 0 20px rgba(255, 255, 255, 0.5)",
                                "0 0 30px rgba(255, 255, 255, 0.8)",
                            ],
                            translateY: [0, -10, 0],
                        }}
                        transition={{
                            opacity: {duration: 1},
                            textShadow: {
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "mirror",
                            },
                            translateY: {duration: 4, repeat: Infinity, repeatType: "mirror"},
                        }}
                        style={{
                            fontSize: "5rem",
                            fontWeight: "bold",
                            margin: "1rem",
                            padding: "0 2rem",

                        }}
                    >
                                <span style={{
                                    background: "linear-gradient(45deg, #1E8CD0, #7B57FF)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}>YOUR 2024 IN CODE</span>

                    </motion.h1>
                    <motion.p
                        className="pretext"
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -50}}
                        transition={{duration: 1}}
                        style={{fontSize: "1rem", padding: "2rem",}}
                    >
                        Ready to see your achievements, highlights, and the moments that made you shine based on your
                        public repos?
                    </motion.p>
                </div> : <motion.p
                    className="pretext"
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -50}}
                    transition={{duration: 1}}
                    style={{fontSize: "1.5rem", padding: "2rem",}}
                >
                    Shall we? 🤗
                </motion.p>}


                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 5,
                        marginBottom: "120px",
                    }}
                >
                    <img style={{width: "1.5rem"}} src={githubLogo} alt="GitHub Logo"/>
                    <p style={{opacity: 0.8}}>#GitHubOnWrap</p>
                </div>

            </div>


        </div>
    );
};