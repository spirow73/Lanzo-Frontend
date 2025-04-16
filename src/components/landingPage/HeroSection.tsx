import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import TextPressure from "@/components/reactbits/TextPressure";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    console.log("Empezar ya clicked");
    navigate("/projects");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full overflow-hidden"
    >
      <div className="relative z-10 py-16 container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-6">
            <TextPressure
              text="Lanzo"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#FFFFFF"
              minFontSize={60}
              className="font-bold"
            />
            <p className="mx-auto max-w-3xl text-white text-xl md:text-2xl leading-relaxed">
              Simplifica la implementación y gestión de servicios en la nube de AWS y añade un toque de magia con Lanzo, inspirado en React Bits y Hostinger.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              onClick={handleStart}
              className="border-white text-white hover:bg-white hover:text-[#2D033B] text-lg px-10 py-7 text-xl"
            >
              Empezar ya
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
