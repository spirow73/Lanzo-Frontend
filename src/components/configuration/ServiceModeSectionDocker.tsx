"use client";
import { useDeployment } from "../../contexts/useDeployment";
import { webServiceOptions, apiServiceOptions, databaseServiceOptions, storageServiceOptions } from "../../data/providers";

const ServiceModeSectionDocker = () => {
  const {
    serviceMode,
    setServiceMode,
    selectedApplication,
    selectedService,
    setSelectedService,
    // selectedProvider,
  } = useDeployment();

  // Solo modo standard para Docker
  const serviceOptions =
    selectedApplication === "web"
      ? webServiceOptions
      : selectedApplication === "api"
      ? apiServiceOptions
      : selectedApplication === "database"
      ? databaseServiceOptions
      : selectedApplication === "storage"
      ? storageServiceOptions
      : [];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">Service Mode</h3>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="serviceMode"
            className="h-4 w-4"
            value="standard"
            checked={serviceMode === "standard"}
            onChange={() => setServiceMode("standard")}
            disabled
          />
          <div>
            <span className="font-medium text-gray-700">Standard</span>
            <p className="text-sm text-gray-500">Use pre-built templates</p>
          </div>
        </label>
      </div>
      {serviceMode === "standard" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {serviceOptions.map((item) => (
            <div
              key={item.service}
              className={`border rounded-lg p-4 cursor-pointer transition-all flex flex-col items-center gap-2 ${
                selectedService === item.service
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
              onClick={() => setSelectedService(item.service)}
            >
              <img src={item.image} alt={item.title} className="w-10 h-10 object-contain" />
              <h4 className="font-medium text-gray-800">{item.title}</h4>
              <p className="text-sm text-gray-600 text-center">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceModeSectionDocker;
