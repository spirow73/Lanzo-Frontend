import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Projects from "./pages/Projects";
import { ToastContainer } from "react-toastify";
import LanzoHeader from "./components/LanzoHeader";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
