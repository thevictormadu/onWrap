import Slide from "./Slide";
import Slider from "./Slider";
import MotionGradientBg from "./MotionGradientBg.tsx";



export default function Wrap() {
    const slides = [
        <Slide
            data="5"
            subText="consecutive days coding!"
            title={"Longest Streak ⚡️"}
            preText={"Dedication at its finest! Let’s uncover how long you kept your coding streak alive."}
            emojis={[
                { content: "🚀", initialY: 20, initialX: 10, size: 3, opacity: 0.8, blur: 0, duration: 5 },
                { content: "💻", initialY: 50, initialX: 60, size: 2, opacity: 0.7, blur: 2, duration: 6 },
                { content: "👨🏻‍💻", initialY: 60, initialX: 10, size: 1, opacity: 0.9, blur: 1, duration: 4 },
            ]}
            keyProp={1}
        />,
        <Slide
            data="2"
            subText="consecutive !"
            title={"Longest Streak ⚡️"}
            preText={"Dedication at its finest! Let’s uncover how long you kept your coding streak alive."}
            emojis={[
                { content: "🚀", initialY: 20, initialX: 10, size: 3, opacity: 0.8, blur: 0, duration: 5 },
                { content: "💻", initialY: 50, initialX: 60, size: 2, opacity: 0.7, blur: 2, duration: 6 },
                { content: "👨🏻‍💻", initialY: 60, initialX: 10, size: 1, opacity: 0.9, blur: 1, duration: 4 },
            ]}
            keyProp={2}
        />,

    ];

    return (
        <div style={{display: "flex", flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100vh"}}>
            <MotionGradientBg opacity={0.1}/>
            <div style={{display: "flex", flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "90%"}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", background:"black", height: "100%", borderRadius: "1rem", border: "1px solid rgba(255, 255, 255, 0.05)", overflow: "hidden", boxShadow: "0 0 5px rgba(131, 59, 219, 0.2), 0 0 50px rgba(30, 140, 208, 0.1)" }}>
                    <Slider slides={slides} />
                </div>
            </div>


        </div>
        );
};
