import React from "react";
import GridMotionBackground from "@/components/reactbits/backgrounds/GridMotion";
import { featuresItems } from "../../data/featuresItems";

const FeaturesSection: React.FC = () => {
  return (
    <section id="features">
      <GridMotionBackground items={featuresItems} gradientColor="#2D033B" />
    </section>
  );
};

export default FeaturesSection;
