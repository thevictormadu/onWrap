import NameCard from "./NameCard.tsx";
import EndNoteCard from "./EndNoteCard.tsx";
import {
    commitsIcon,
    commitsTitle, peakPerformanceIcon,
    peakPerformanceTitle, prReviewsIcon, prReviewsTitle, pullRequestsIcon,
    pullRequestsTitle, slangIcon, slangTitle, starsReceivedIcon,
    starsReceivedTitle, streakIcon, streakTitle, topLanguageIcon,
    topLanguageTitle
} from "../constants.ts";
import {useGitHub} from "../context/GithubContext.tsx";
import {getSlang} from "../utils.ts";
import {LuDownload} from "react-icons/lu";
import IconButton from "./IconButton.tsx";
import React, {useEffect, useRef, useState} from "react";
import {toJpeg} from "html-to-image";

const EndNote: React.FC = () => {
    const {data} = useGitHub();
    const slang = getSlang(data?.totalCommits || 0);
    const [isMobile, setIsMobile] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 400);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (divRef.current) {
            try {

                const signature = divRef.current.querySelector('.signature') as HTMLElement;
                const hiddenBackground = divRef.current.querySelector('.hidden-background') as HTMLElement;
                const downloadButton = divRef.current.querySelector('.download-button') as HTMLElement;
                const bottomMargin = divRef.current.querySelector('.bottom-margin') as HTMLElement;
                const topMargin = divRef.current.querySelector('.top-margin') as HTMLElement;

                // Backup original styles
                const originalHeight = divRef.current.style.height || '';
                const originalWidth = divRef.current.style.width || '100%';
                const originalPadding = divRef.current.style.padding || '';
                const originalSignatureDisplay = signature?.style.display || '';
                const originalBottomMargin = bottomMargin?.style.marginBottom || '';
                const originalTopMargin = topMargin?.style.marginTop || '';
                const originalVisibility = hiddenBackground?.style.visibility || '';
                const originalDisplay = downloadButton?.style.display || '';

                // Apply styles for the image
                divRef.current.style.height = '700px';
                divRef.current.style.width = '400px';
                divRef.current.style.padding = '1.5rem';
                if (signature) signature.style.display = 'block';
                if (hiddenBackground) hiddenBackground.style.visibility = 'visible';
                if (downloadButton) downloadButton.style.display = 'none';
                if (bottomMargin) bottomMargin.style.marginBottom = '0';
                if (topMargin) topMargin.style.marginTop = '0';

                // Generate the image
                const dataUrl = await toJpeg(divRef.current);
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'my-github-onwrap.jpg';
                link.click();

                // Restore original styles
                divRef.current.style.height = originalHeight;
                divRef.current.style.width = originalWidth;
                divRef.current.style.padding = originalPadding;
                if (signature) signature.style.display = originalSignatureDisplay;
                if (hiddenBackground) hiddenBackground.style.visibility = originalVisibility;
                if (downloadButton) downloadButton.style.display = originalDisplay;
                if (bottomMargin) bottomMargin.style.marginBottom = originalBottomMargin;
                if (topMargin) topMargin.style.marginTop = originalTopMargin;

            } catch (error) {
                console.error('Error generating image:', error);
            }
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                background: `
          linear-gradient(90deg, rgba(23, 23, 23, 0.6) 1px, transparent 1px),
          linear-gradient(180deg, rgba(23, 23, 23, 0.6) 1px, transparent 1px)
        `,
                backgroundSize: "20px 20px",
                animation: "moveMesh 5s linear infinite",
                height: "100%",
                overflowY: "auto",
                overflowX: "hidden"
            }}
        >

            {/* Foreground Content */}
            <div
                ref={divRef}
                style={{
                    textAlign: "center",
                    color: "#08C2F1",
                    width: isMobile ? "100%" : "400px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem",
                    gap: "1rem",
                    position: "relative",

                }}
            >
                <div className="hidden-background" style={{
                    display: "flex",
                    inset: 0,
                    position: "absolute",
                    background: `
          linear-gradient(90deg, rgba(23, 23, 23, 0.6) 1px, transparent 1px),
          linear-gradient(180deg, rgba(23, 23, 23, 0.6) 1px, transparent 1px)
        `,
                    visibility: "hidden",
                    overflow: "hidden",
                    backgroundSize: "20px 20px",
                    animation: "moveMesh 5s linear infinite",
                }}>

                </div>
                <div className="top-margin"
                     style={{width: "100%", marginTop: "2rem", position: "sticky", top: 30, zIndex: 50}}>
                    <NameCard title={`@${data?.userId}`} value={"2024 GitHub Year in Code"}/>
                </div>

                <div style={{
                    display: "flex",
                    flex: 1,
                    width: "100%",
                    flexDirection: "column",
                    gap: "1rem",
                }}>
                    <div style={{display: "flex", width: "100%", flex: 1, gap: "1rem"}}>
                        <EndNoteCard icon={starsReceivedIcon} title={starsReceivedTitle}
                                     data={data?.totalStars.toString() || ""}
                                     glowColor={"240, 187, 120"}/>
                        <EndNoteCard icon={topLanguageIcon} title={topLanguageTitle} data={data?.topLanguage || ""}
                                     glowColor={"255, 135, 135"} delay={0.4}/>
                    </div>
                    <div style={{display: "flex", width: "100%", flex: 1, gap: "1rem"}}>
                        <EndNoteCard icon={commitsIcon} title={commitsTitle} data={data?.totalCommits.toString() || ""}
                                     glowColor={"135, 162, 2590"} delay={0.5}/>
                        <EndNoteCard icon={pullRequestsIcon} title={pullRequestsTitle}
                                     data={data?.totalPRs.toString() || ""}
                                     glowColor={"157, 223, 211"} delay={0.6}/>
                    </div>
                    <div style={{display: "flex", width: "100%", flex: 1, gap: "1rem"}}>
                        <EndNoteCard icon={peakPerformanceIcon} title={peakPerformanceTitle}
                                     data={data?.peakMonth || "_"}
                                     glowColor={"158, 223, 156"} delay={0.7}/>
                        <EndNoteCard icon={streakIcon} title={streakTitle} data={data?.longestStreak.toString() || ""}
                                     glowColor={"251, 158, 198"} delay={0.9}/>

                    </div>
                    <div style={{display: "flex", width: "100%", flex: 1, gap: "1rem"}}>
                        <EndNoteCard icon={prReviewsIcon} title={prReviewsTitle}
                                     data={data?.totalReviews.toString() || ""}
                                     glowColor={"252, 245, 150"} delay={0.8}/>

                        <EndNoteCard icon={slangIcon} title={slangTitle} data={slang.slang}
                                     glowColor={"61, 178, 255"} delay={1}/>
                    </div>
                </div>
                <div
                    className="signature"
                    style={{
                        display: "none",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "0.5rem",
                        zIndex: 20,
                        fontSize: "0.7rem"
                    }}
                >
                    🤍 made by <span style={{fontWeight: "bold"}}>Victor madu</span>


                </div>
                <div
                    className="download-button"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 5,
                        marginBottom: "10px",
                        zIndex: 22
                    }}
                >
                    <IconButton text={"download"} icon={<LuDownload/>} handleClick={handleDownload}/>
                </div>

            </div>
        </div>
    );
};

export default EndNote;