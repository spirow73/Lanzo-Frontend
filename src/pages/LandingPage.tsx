import React from "react";
import Iridescence from "@/components/reactbits/backgrounds/Iridescence";

// Componentes importados
import Header from "../components/landingPage/Header";
import HeroSection from "../components/landingPage/HeroSection";
import FeaturesSection from "../components/landingPage/FeaturesSection";
import UploadStepsSection from "../components/landingPage/UploadStepsSection";
import Footer from "../components/landingPage/Footer";

const LandingPage: React.FC = () => {
  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Fondo de Iridescence ocupando toda la pantalla */}
      <Iridescence mouseReact={false} amplitude={0.1} speed={1.0} />

      <Header />

      <main className="flex-1 relative z-10 pt-20">
        <HeroSection />
        <FeaturesSection />
        <UploadStepsSection />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
