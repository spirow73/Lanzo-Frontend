import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Deployment from "./pages/Deployment";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/deployment" element={<Deployment />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
