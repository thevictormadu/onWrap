import MotionGradientBg from "./components/MotionGradientBg";



const App = () => {


    return (
        <div >
            <MotionGradientBg/>
            <div
                style={{
                    position: "relative",
                    width: "300px", // Adjust as needed
                    height: "200px", // Adjust as needed
                    margin: "auto",
                    borderRadius: "16px", // Rounded corners
                    backgroundColor: "rgba(255, 255, 255, 0.05)", // Semi-transparent white
                    backdropFilter: "blur(100px)", // Blur effect
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Subtle shadow
                    border: "1px solid rgba(255, 255, 255, 0.3)", // Frosted glass outline
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                <p
                    style={{
                        color: "#fff",
                        fontSize: "18px",
                        fontWeight: "bold",
                        zIndex: 1,
                    }}
                >
                    Frosted Glass Effect
                </p>
            </div>
        </div>
    );
};

export default App;

