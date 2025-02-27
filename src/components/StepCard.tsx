import React from "react";

interface StepCardProps {
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default StepCard;
