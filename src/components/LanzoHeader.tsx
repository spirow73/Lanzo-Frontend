import React from "react";
import LanzoLogo from "../assets/logos/LanzoLogo.png";

const LanzoHeader: React.FC = () => (
  <header style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, background: "#fff", boxShadow: "0 2px 8px #eee" }}>
    <img src={LanzoLogo} alt="Lanzo Logo" style={{ height: 40 }} />
    <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#222" }}>Lanzo</h1>
  </header>
);

export default LanzoHeader;
