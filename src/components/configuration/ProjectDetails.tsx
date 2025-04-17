"use client";
import { useDeployment } from "../../contexts/useDeployment";

const ProjectDetails = () => {
  const { configuration, handleConfigChange, selectedProvider } = useDeployment();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label htmlFor="name" className="font-medium text-gray-700">
          Project Name
        </label>
        <input
          id="name"
          value={configuration.name}
          onChange={(e) => handleConfigChange("name", e.target.value)}
          placeholder="my-awesome-project"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      {selectedProvider === "azure" && (
        <div className="space-y-2">
          <label htmlFor="region" className="font-medium text-gray-700">
            Region
          </label>
          <select
            id="region"
            value={configuration.region}
            onChange={(e) => handleConfigChange("region", e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Selecciona una región</option>
            <option value="us-east">US East (N. Virginia)</option>
            <option value="us-west">US West (Oregon)</option>
            <option value="eu-west">EU West (Ireland)</option>
            <option value="ap-southeast">Asia Pacific (Singapore)</option>
            <option value="sa-east">South America (São Paulo)</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
