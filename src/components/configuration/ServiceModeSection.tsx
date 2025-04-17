"use client";
import { useDeployment } from "../../contexts/useDeployment";
import { webServiceOptions, apiServiceOptions } from "../../data/providers";

const ServiceModeSection = () => {
  const {
    serviceMode,
    setServiceMode,
    selectedApplication,
    selectedService,
    setSelectedService,
    customServiceUrl,
    setCustomServiceUrl,
    startupCommands,
    setStartupCommands,
    selectedProvider,
  } = useDeployment();

  // Definir las opciones de servicio según el tipo de aplicación seleccionado
  const serviceOptions =
    selectedApplication === "web"
      ? webServiceOptions
      : selectedApplication === "api"
      ? apiServiceOptions
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
          />
          <div>
            <span className="font-medium text-gray-700">Standard</span>
            <p className="text-sm text-gray-500">Use pre-built templates</p>
          </div>
        </label>
        <label className={`flex items-center gap-2 ${selectedProvider === "azure" ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}>
          <input
            type="radio"
            name="serviceMode"
            className="h-4 w-4"
            value="custom"
            checked={serviceMode === "custom"}
            onChange={() => selectedProvider === "azure" && setServiceMode("custom")}
            disabled={selectedProvider !== "azure"}
          />
          <div>
            <span className="font-medium text-gray-700">Custom</span>
            <p className="text-sm text-gray-500">Use your GitHub repository (Azure only)</p>
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

      {serviceMode === "custom" && (
        <div className="space-y-6 mt-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Step 1: Provide GitHub repository URL</h4>
            <p className="text-sm text-gray-600 mb-2">
              Enter the URL of your GitHub repository containing your service code.
            </p>
            <input
              type="text"
              value={customServiceUrl}
              onChange={(e) => setCustomServiceUrl(e.target.value)}
              placeholder="https://github.com/user/repo"
              className="border border-gray-300 rounded p-2 w-full text-sm"
            />
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Step 2: Add startup commands</h4>
            <p className="text-sm text-gray-600 mb-2">
              Specify the commands needed to start your application. These commands will be executed after deployment.
            </p>
            <textarea
              value={startupCommands}
              onChange={(e) => setStartupCommands(e.target.value)}
              placeholder={`# Example commands:\nnpm install\nnpm run build\nnpm run start`}
              className="border border-gray-300 rounded p-2 w-full min-h-[80px] text-sm"
            />
            <div className="flex items-center justify-end mt-2">
              <button
                type="button"
                className="mr-2 px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => { setStartupCommands(""); setCustomServiceUrl(""); }}
              >
                Clear
              </button>
              <button
                type="button"
                className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
                onClick={() => console.log("Commands saved:", startupCommands)}
              >
                Save Commands
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceModeSection;
