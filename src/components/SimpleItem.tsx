// SimpleItem.tsx
import React from "react";

interface SimpleItemProps {
  title: string;
  description: string;
}

const SimpleItem: React.FC<SimpleItemProps> = ({ title, description }) => {
  return (
    <div className="p-4 border border-gray-700 rounded-lg bg-gray-900 text-white text-center">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default SimpleItem;
