import {Navigate} from "react-router-dom";
import {useGitHub} from "./context/GithubContext.tsx";

const ProtectedRoute = ({children}: { children: JSX.Element }) => {
    const {data} = useGitHub();

    if (!data) {
        return <Navigate to="/" replace/>;
    }
    return children;
};

export default ProtectedRoute;