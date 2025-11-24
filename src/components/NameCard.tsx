import FloatedGlass from "./FloatedGlass.tsx";
import {useGitHub} from "../context/GithubContext.tsx";

interface Props {
    title: string;
    value: string;
}

export default function NameCard({title, value}: Props) {
    const {data} = useGitHub();
    return (
        <FloatedGlass
            blur={"5px"}
            borderRadius={"0.5em"}
        >
            <div style={{
                width: "100%",
            }}>
                <div style={{
                    padding: "0.5rem", display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "1rem",
                }}>
                    <img 
                        style={{width: "50px", height: "50px", borderRadius: "0.5rem"}} 
                        src={data?.profilePicture}
                        alt={`${data?.userId || 'GitHub user'} profile picture`}
                        loading="lazy"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                        }}
                    />
                    <div style={{
                        color: "white",
                        textAlign: "left",
                    }}>
                        <p>{title}</p>
                        <p
                            style={{fontSize: "clamp(1.2rem, 2vw, 1.3rem)", fontWeight: "bold"}}>{value}</p>
                    </div>
                </div>
            </div>
        </FloatedGlass>
    );
}