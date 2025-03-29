import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Deployment from "./pages/Deployment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deployment" element={<Deployment />} />
      </Routes>
    </Router>
  );
}

export default App;
