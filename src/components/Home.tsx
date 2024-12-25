import MotionGradientBg from "./MotionGradientBg.tsx";
import githubLogo from "../assets/github-logo.png";
import victorPic from "../assets/victor.jpg";
import FrostedGlass from "./FrostedGlass.tsx";
import {useNavigate} from "react-router-dom";
import {useGitHub} from "../context/GithubContext.tsx";
import {useEffect, useState} from "react";
import ProgressBar from "./ProgressBar.tsx";


export default function Home() {
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const {fetchGitHubData, loading, error, data} = useGitHub();
    const handleClick = async () => {
        console.info("token");

        if (!userName) {
            alert("Please enter a GitHub username");
            return;
        }

        try {
            await fetchGitHubData(userName.trim());
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    useEffect(() => {
        if (data && !error) {
            navigate("/wrap");
        }
    }, [error, data])


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "3rem",
            alignItems: "center",
            justifyContent: "center",
            height: "100svh",
            width: "100%",
            flex: 1,
            //     background: `
            //   linear-gradient(90deg, rgba(23, 23, 23, 0.6) 1px, transparent 1px),
            //   linear-gradient(180deg, rgba(23, 23, 23, 0.6) 1px, transparent 1px)
            // `,
            //     backgroundSize: "20px 20px",
        }}>
            <MotionGradientBg opacity={0.15}/>
            {/*<FloatingEmojis emojiList={['🍀', '🚀', '⚡️', '🚀', '🚀', '🖥️', '⌨️', '⚙️', '📅', '💻']}/>*/}
            <div style={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "3rem",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <FrostedGlass blur={"10px"}>


                    <div style={{
                        maxWidth: "400px",
                        padding: "2rem",
                    }}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleClick();
                            }}
                        >
                            <p style={{
                                margin: "0",
                                color: "#fff",
                                fontSize: "2rem",
                                fontWeight: "bold",
                                textAlign: "left",
                            }}>
                                2024: Your GitHub Story <span style={{
                                background: "linear-gradient(45deg, #75FFE8, #7B57FF)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}>onWrap</span>
                            </p>
                            <p style={{
                                color: "#fff",
                                margin: "2rem 0",
                            }}>
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
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                type="text"
                                placeholder="your GitHub username"
                            />
                            {error && <p style={{color: "red"}}>Error: {error}</p>}
                            {loading && <ProgressBar/>}
                            <button
                                type="submit"
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
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow =
                                        "0 0 10px rgba(131, 59, 219, 0.6), 0 0 20px rgba(30, 140, 208, 0.6)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                onClick = onWrap(2024)
                            </button>
                        </form>
                        <div style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "1.5rem"
                        }}>
                            <p style={{margin: 0, opacity: 0.8}}>#GitHubOnWrap</p>
                            <div style={{display: "flex", alignItems: "center", gap: 5}}>
                                <img src={githubLogo} alt="GitHub Logo"/>
                                <a
                                    href="https://github.com/thevictormadu/onWrap.git"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        margin: 0,
                                        opacity: 0.8
                                    }}
                                >
                                    <p style={{color: "white"}}>source code</p>
                                </a>
                            </div>
                        </div>
                    </div>

                </FrostedGlass>
                <FrostedGlass borderRadius={"2rem"}>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "0.5rem 1rem 0.5rem 0.5rem",
                    }}>
                        <img style={{width: "30px", borderRadius: "1rem"}} src={victorPic} alt="Victor Madu"/>
                        <p style={{fontSize: "0.8rem"}}>built with ❤️ by <span
                            style={{fontWeight: "bold"}}>Victor Madu</span></p>
                    </div>

                </FrostedGlass>
            </div>
        </div>
    );
}