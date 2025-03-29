import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Deployment from "./pages/Deployment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/deployment" element={<Deployment />} />
      </Routes>
    </Router>
  );
}

export default App;
