"use client";
import { useDeployment } from "../../contexts/useDeployment";

const ProviderSpecificFields = () => {
  const { selectedProvider, configuration, handleConfigChange } = useDeployment();

  if (selectedProvider === "azure") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <label htmlFor="azureClientId" className="font-medium text-gray-700">
            Azure Client ID
          </label>
          <input
            id="azureClientId"
            type="password"
            value={configuration.azureClientId || ''}
            onChange={(e) => handleConfigChange("azureClientId", e.target.value)}
            placeholder="ARM_CLIENT_ID"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="azureClientSecret" className="font-medium text-gray-700">
            Azure Client Secret
          </label>
          <input
            id="azureClientSecret"
            type="password"
            value={configuration.azureClientSecret || ''}
            onChange={(e) => handleConfigChange("azureClientSecret", e.target.value)}
            placeholder="ARM_CLIENT_SECRET"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="azureSubscriptionId" className="font-medium text-gray-700">
            Azure Subscription ID
          </label>
          <input
            id="azureSubscriptionId"
            type="password"
            value={configuration.azureSubscriptionId || ''}
            onChange={(e) => handleConfigChange("azureSubscriptionId", e.target.value)}
            placeholder="ARM_SUBSCRIPTION_ID"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="azureTenantId" className="font-medium text-gray-700">
            Azure Tenant ID
          </label>
          <input
            id="azureTenantId"
            type="password"
            value={configuration.azureTenantId || ''}
            onChange={(e) => handleConfigChange("azureTenantId", e.target.value)}
            placeholder="ARM_TENANT_ID"
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
