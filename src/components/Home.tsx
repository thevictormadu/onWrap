import MotionGradientBg from "./MotionGradientBg.tsx";
import githubLogo from "../assets/github-logo.png";
import victorPic from "../assets/victor.png";
import FrostedGlass from "./FrostedGlass.tsx";
import FloatingEmojis from "./FloatingEmojis.tsx";
import {useNavigate} from "react-router-dom";



export default function Home() {
    const navigate = useNavigate();
  return (
      <div style={{display: "flex", flexDirection: "column", gap: "3rem", alignItems: "center", justifyContent: "center", height: "100vh"}} >
          <MotionGradientBg/>
          <FloatingEmojis emojiList={['🍀', '🚀', '⚡️', '🚀', '🚀', '🖥️', '⌨️' , '⚙️' , '📅' , '💻']}/>
          <div style={{padding: "2rem", display: "flex", flexDirection: "column", gap: "3rem", alignItems: "center", justifyContent: "center"}}>
<FrostedGlass blur={"10px"}>


                  <p style={{
                      margin: "0",
                      color: "#fff",
                      fontSize: "2rem",
                      fontWeight: "bold",
                      textAlign: "left",
                  }}>2024: Your GitHub Story <span style={{
                      background: "linear-gradient(45deg, #75FFE8, #7B57FF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                  }}>onWrap</span></p>
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
                          fontSize: "1rem",
                          padding: "1rem",
                          background: "rgba(217, 217, 217, 0.07)",
                      }}
                      type="text"
                      placeholder="your GitHub username"
                  />
    <button
        onClick={() => navigate("/wrap")}
        style={{
            width: "100%",
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            borderRadius: "0.5rem",
            fontWeight: "bold",
            padding: "1rem",
            background: "linear-gradient(45deg, #833BDB, #1E8CD0)",
            marginTop: "2rem",
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
        onWrap(2024)
    </button>
                  <div style={{display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem"}}>
                      <p style={{margin:0, opacity:0.8}}>#GitHubOnWrap</p>
                      <div style={{display: "flex", alignItems: "center", gap:5}}> <img src={githubLogo} alt="GitHub Logo"/> <a style={{margin:0, opacity:0.8}}>source code</a></div>

                  </div>

</FrostedGlass>
<FrostedGlass padding={"0.5rem 1rem 0.5rem 0.5rem"} borderRadius={"2rem"}>

                 <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap:"1rem"}}>
                     <img src={victorPic} alt="Victor Madu"/>
                     <p style={{fontSize: "0.8rem"}}>built with ❤️ by <span style={{fontWeight:"bold"}}>Victor Madu</span></p>
                 </div>

</FrostedGlass>
          </div>
      </div>
  );
}