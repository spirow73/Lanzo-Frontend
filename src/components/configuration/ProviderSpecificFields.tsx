"use client";
import { useDeployment } from "../../contexts/useDeployment";

const ProviderSpecificFields = () => {
  const { selectedProvider, configuration, handleConfigChange } = useDeployment();

  if (selectedProvider === "aws") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <label htmlFor="awsAccessKey" className="font-medium text-gray-700">
            AWS Access Key
          </label>
          <input
            id="awsAccessKey"
            value={configuration.awsAccessKey}
            onChange={(e) => handleConfigChange("awsAccessKey", e.target.value)}
            placeholder="Your AWS Access Key"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="awsSecretKey" className="font-medium text-gray-700">
            AWS Secret Key
          </label>
          <input
            id="awsSecretKey"
            value={configuration.awsSecretKey}
            onChange={(e) => handleConfigChange("awsSecretKey", e.target.value)}
            placeholder="Your AWS Secret Key"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
      </div>
    );
  }

  if (selectedProvider === "docker-server") {
    return (
      <div className="space-y-2 mt-4">
        <label htmlFor="dockerServerIp" className="font-medium text-gray-700">
          Docker Server IP
        </label>
        <input
          id="dockerServerIp"
          value={configuration.dockerServerIp}
          onChange={(e) => handleConfigChange("dockerServerIp", e.target.value)}
          placeholder="Enter the server IP"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
    );
  }

  return null;
};

export default ProviderSpecificFields;
