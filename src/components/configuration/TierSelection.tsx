"use client";
import { useDeployment } from "../../contexts/useDeployment";

const tiers = ["basic", "standard", "premium"];

const TierSelection = () => {
  const { configuration, handleConfigChange } = useDeployment();

  return (
    <div className="space-y-2">
      <span className="font-medium text-gray-700">Tier</span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {tiers.map((tier) => (
          <label
            key={tier}
            className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer ${
              configuration.tier === tier
                ? "border-indigo-500 bg-indigo-50"
                : "hover:border-indigo-300"
            }`}
          >
            <input
              type="radio"
              name="tier"
              value={tier}
              checked={configuration.tier === tier}
              onChange={() => handleConfigChange("tier", tier)}
            />
            <div className="flex flex-col text-gray-700">
              <span className="capitalize">{tier}</span>
              <span className="text-sm text-gray-600">
                {tier === "basic"
                  ? "For small projects and testing"
                  : tier === "standard"
                  ? "For production applications"
                  : "For high-performance needs"}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TierSelection;
