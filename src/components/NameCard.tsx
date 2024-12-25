import FloatedGlass from "./FloatedGlass.tsx";
import {useGitHub} from "../context/GithubContext.tsx";

interface Props {
    title: string;
    value: string;
}

export default function ({title, value}: Props) {
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
                    <img style={{width: "50px", height: "50px", borderRadius: "0.5rem"}} src={data?.profilePicture}
                         alt="github user image"/>
                    <div style={{
                        color: "white",
                        textAlign: "left",
                    }}>
                        <p>{title}</p>
                        <p
                            style={{fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontWeight: "bold"}}>{value}</p>
                    </div>
                </div>
            </div>
        </FloatedGlass>
    );
}