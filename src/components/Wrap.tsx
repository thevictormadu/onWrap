import Slide from "./Slide";
import Slider from "./Slider";



const App = () => {
    const slides = [
        <Slide
            heading="Welcome"
            body="Let's start your journey!"
            emojis={[
                { content: "🚀", initialY: 10, initialX: 10, size: 3, opacity: 0.8, blur: 0, duration: 5 },
                { content: "🌟", initialY: 50, initialX: 80, size: 2, opacity: 0.7, blur: 2, duration: 6 },
                { content: "✨", initialY: 30, initialX: 40, size: 1.5, opacity: 0.9, blur: 1, duration: 4 },
            ]}
            background="linear-gradient(45deg, #1a2a6c, #b21f1f, #fdbb2d)"
        />,
        <Slide
            heading="10"
            body="Explore endless possibilities."
            emojis={[
                { content: "💡", initialY: 20, initialX: 70, size: 3, opacity: 0.8, blur: 0, duration: 5 },
                { content: "🌍", initialY: 60, initialX: 20, size: 2.5, opacity: 0.7, blur: 1, duration: 6 },
            ]}
            background="linear-gradient(135deg, #00c6ff, #0072ff)"
        />,
    ];

    return <Slider slides={slides} />;
};

export default App;