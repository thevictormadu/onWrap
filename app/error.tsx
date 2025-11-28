"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100svh",
        width: "100%",
        padding: "2rem",
        boxSizing: "border-box",
        textAlign: "center",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(1.5rem, 5vw, 2rem)",
          marginBottom: "1rem",
          wordBreak: "break-word",
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          marginBottom: "2rem",
          opacity: 0.8,
          maxWidth: "90%",
          wordBreak: "break-word",
        }}
      >
        {error?.message || "An unexpected error occurred"}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: "1rem 2rem",
          borderRadius: "0.5rem",
          background: "linear-gradient(45deg, #833BDB, #1E8CD0)",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        Try again
      </button>
    </div>
  );
}
