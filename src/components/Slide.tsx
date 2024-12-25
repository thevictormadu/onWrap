import {useState, useEffect} from "react";
import {motion} from "framer-motion";
import githubLogo from "../assets/github-logo.png";
import FloatedGlass from "./FloatedGlass.tsx";

export interface SlideProps {
    data: string;
    suffix?: string;
    subText?: string;
    preText?: string;
    title: string;
    background?: string;
    countDown?: boolean;
    emoji?: string;
    icon: string;
}

export default function Slide({
                                  data,
                                  suffix,
                                  subText,
                                  preText,
                                  title,
                                  background = `
          linear-gradient(90deg, rgba(23, 23, 23, 0.6) 1px, transparent 1px),
          linear-gradient(180deg, rgba(23, 23, 23, 0.6) 1px, transparent 1px)
        `,
                                  countDown,
                                  emoji,
                                  icon,
                              }: SlideProps) {
    const [showPretext, setShowPretext] = useState(true);
    const [count, setCount] = useState(0); // Start count from 0


    useEffect(() => {
        setShowPretext(true);
        const timer = setTimeout(() => {
            setShowPretext(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let startTime: number;
        const duration = 1000;
        const target = Number(data);

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const newCount = Math.min(Math.round((progress / duration) * target), target);
            setCount(newCount);

            if (progress < duration && countDown) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);

    }, [data, showPretext]);


    return (
        <div
            style={{
                height: "100%",
                position: "relative",
                background: background,
                backgroundSize: "20px 20px",
                // animation: "moveMesh 5s linear infinite",
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
                    maxWidth: "400px"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <div style={{marginTop: "3rem"}}>
                        <FloatedGlass
                            blur={"02px"}
                        >
                            <div
                                style={{color: "white", fontSize: "1.3rem", padding: "1rem"}}>{`${icon} ${title}`}</div>
                        </FloatedGlass>
                    </div>

                    {showPretext ? (
                        <motion.p
                            className="pretext"
                            initial={{opacity: 0, y: 50}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -50}}
                            transition={{duration: 1}}
                            style={{fontSize: "1.5rem", padding: "2rem",}}
                        >
                            {preText}
                        </motion.p>
                    ) : (
                        <div
                            className="metric"
                            style={{
                                display: "flex",
                                flex: 1,
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
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
                                    fontSize: "4rem",
                                    fontWeight: "bold",
                                    margin: "1rem",
                                    padding: "0 2rem",

                                }}
                            >
                                {emoji}<br/>
                                <span style={{
                                    background: "linear-gradient(45deg, #75FFE8, #7B57FF)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}>{countDown ? count : data} {suffix}</span>

                            </motion.h1>
                            <motion.p
                                initial={{opacity: 0, y: 50}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 1, delay: 0.5}}
                                style={{fontSize: "1.5rem", padding: "0 2rem"}}
                            >
                                {subText}
                            </motion.p>
                        </div>
                    )}

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
        </div>
    );
};