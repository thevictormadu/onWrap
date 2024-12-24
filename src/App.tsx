import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.tsx";
import Wrap from "./components/Wrap.tsx";



const App = () => {


    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/wrap" element={<Wrap />} />
            </Routes>
        </Router>
    );
};

export default App;

