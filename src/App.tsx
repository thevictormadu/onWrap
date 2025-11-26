import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home.tsx";
import Wrap from "./components/Wrap.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";


const App = () => {


    return (
        <ErrorBoundary>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/wrap" element={<ProtectedRoute><Wrap/></ProtectedRoute>}/>
                </Routes>
            </Router>
        </ErrorBoundary>
    );
};

export default App;

