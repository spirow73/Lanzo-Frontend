import React from "react";
import CheckIcon from "./CheckIcon";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, features }) => {
  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-4xl font-bold mb-6">{price}</p>
      <ul className="mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <Button className="mt-auto">Elegir plan</Button>
    </div>
  );
};

export default PricingCard;
