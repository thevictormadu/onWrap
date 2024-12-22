//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Slider from "./components/Slider.tsx";

export default function App() {
    const slides: SlideProps[] = [
        {
            background: "linear-gradient(45deg, #0B0E1D, #0B0E1D)",
            text: "30",
            subtext: "Enjoy the experience!",
            icons: [
                { content: "🌟", size: 2, blur: 3, opacity: 0.3, zIndex: 0, initialX: 10, initialY: 60, duration: 50 },
                    { content: "🎉", size: 3, blur: 2, opacity: 0.5, zIndex: 0, initialX: 60, initialY: 10, duration: 30 },
                { content: "✨", size: 1, blur: 1, opacity: 1, zIndex: 10, initialX: 50, initialY: 70, duration: 30 },

            ],
        },
        {
            background: "linear-gradient(45deg, #ff9a9e, #fad0c4)",
            text: "100",
            subtext: "Enjoy the experience!",
            icons: [
                { content: "🎉", size: 3, blur: 2, opacity: 0.5, zIndex: 0, initialX: 10, initialY: 20, duration: 50 },
                { content: "✨", size: 2, blur: 1, opacity: 1, zIndex: 10, initialX: 50, initialY: 30, duration: 30 },
                { content: "🌟", size: 2, blur: 3, opacity: 0.3, zIndex: 0, initialX: 70, initialY: 10, duration: 100 },
            ],
        },
    ];

    return <Slider slides={slides} />;
}





            {/*<div>*/}
            {/*  <a href="https://vite.dev" target="_blank">*/}
            {/*    <img src={viteLogo} className="logo" alt="Vite logo" />*/}
            {/*  </a>*/}
            {/*  <a href="https://react.dev" target="_blank">*/}
            {/*    <img src={reactLogo} className="logo react" alt="React logo" />*/}
            {/*  </a>*/}
            {/*</div>*/}
            {/*<h1>Vite + React</h1>*/}
            {/*<div className="card">*/}
            {/*  <button onClick={() => setCount((count) => count + 1)}>*/}
            {/*    count is {count}*/}
            {/*  </button>*/}
            {/*  <p>*/}
            {/*    Edit <code>src/App.tsx</code> and save to test HMR*/}
            {/*  </p>*/}
            {/*</div>*/}
            {/*<p className="read-the-docs">*/}
            {/*  Click on the Vite and React logos to learn more*/}
            {/*</p>*/}
