import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm mx-auto flex flex-col items-center text-center space-y-3">
      <div className="text-4xl">{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
      {children && <p className="text-gray-600 text-lg">{children}</p>}
    </div>
  );
};

export default FeatureCard;
