const ProgressBar = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "4px",
        backgroundColor: "black",
        borderRadius: "4px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          height: "100%",
          backgroundColor: "#4caf50",
          position: "absolute",
          left: 0,
          width: "20%",
          borderRadius: "4px",
          animation: "progress-animation 2s infinite ease-in-out",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
