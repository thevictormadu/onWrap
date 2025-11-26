interface MotionGradientBgProps {
  opacity?: number;
}
export default function MotionGradientBg({
  opacity = 0.2,
}: MotionGradientBgProps) {
  return (
    <div
      style={{
        position: "fixed",
        height: "100%",
        width: "100%",
        zIndex: -1,
        inset: 0,
        margin: "auto",
        filter: "blur(100px)",
        opacity: opacity,
      }}
    >
      <div
        style={{
          borderRadius: "99999px",
          position: "absolute",
          inset: 0,
          width: "100vw",
          height: "100vh",
          margin: "auto",
          minWidth: "1000px",
          overflow: "hidden",
          backgroundColor: "white",
          transform: "scale(0.6)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            inset: 0,
            margin: "auto",
            background:
              "conic-gradient(from 0deg, #08f, #f60, #4c00ff, #ab2666)",
            animation: "spinBg 12s linear infinite",
          }}
        ></div>
      </div>
    </div>
  );
}
