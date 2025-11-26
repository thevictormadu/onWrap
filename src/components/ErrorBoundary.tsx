import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
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
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = "/";
            }}
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
            Return to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
