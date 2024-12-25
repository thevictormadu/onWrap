import {MouseEventHandler, ReactNode} from "react";

interface Props {
    icon: ReactNode
    text?: string;
    handleClick: MouseEventHandler<HTMLButtonElement> | undefined
}

export default function IconButtonExample({icon, text, handleClick}: Props) {
    return (
        <button
            style={{
                border: "1px solid rgba(0, 117, 147, 0.2)",
                background: "rgba(0, 36, 46, 0.5)",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.3s ease",
                fontSize: "1.6rem",
                color: "rgba(0, 140, 175, 1)",
                gap: "0.7rem",
                outline: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0, 36, 46, 1)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0, 36, 46, 0.5)")}

            onClick={handleClick}
        >
            <div>{icon}</div>
            {text && <div style={{fontSize: "1rem"}}>{text}</div>}
        </button>
    );
}