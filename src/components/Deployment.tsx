"use client";
import { useDeployment } from "../contexts/useDeployment";
import { providers, applicationTypes } from "../data/providers";
import { Check, Upload } from "lucide-react";
import ProjectDetails from "@/components/configuration/ProjectDetails";
import TierSelection from "@/components/configuration/TierSelection";
import ServiceModeSection from "@/components/configuration/ServiceModeSection";
import ProviderSpecificFields from "@/components/configuration/ProviderSpecificFields";
import { useDeployContainer } from "../hooks/useDocker";
import { toast } from "react-toastify";

const primaryColor = "#4F46E5";

const Deployment = () => {
  const {
    currentStep,
    setCurrentStep,
    selectedProvider,
    setSelectedProvider,
    selectedApplication,
    setSelectedApplication,
    configuration,
    serviceMode,
    selectedService,
    customServiceFile,
    startupCommands,
    handleConfigChange,
    setServiceMode,
    setSelectedService,
    setCustomServiceFile,
    setStartupCommands,
  } = useDeployment();

  const { deploy } = useDeployContainer();

  const handleDockerDeploy = async () => {
    if (
      selectedProvider === "docker-local" &&
      (selectedApplication === "web" || selectedApplication === "api") &&
      serviceMode === "standard" &&
      selectedService
    ) {
      console.log("Deploying service:", selectedService);
      const toastId = toast.loading("Desplegando servicio, por favor espere...");
      const result = await deploy(selectedService);
      if (result) {
        console.log("Despliegue exitoso:", result.message);
        toast.update(toastId, {
          render: `Despliegue exitoso: ${result.message}`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setCurrentStep("deploy");
      } else {
        console.error("Error en el despliegue del servicio");
        toast.update(toastId, {
          render: "Error en el despliegue del servicio",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } else {
      console.warn("No se cumplen las condiciones para desplegar con Docker local.");
      toast.warn("No se cumplen las condiciones para desplegar con Docker local.");
    }
  };

  const handleNext = () => {
    if (currentStep === "provider") {
      setCurrentStep("application");
    } else if (currentStep === "application") {
      setSelectedService(null);
      setServiceMode("standard");
      setCurrentStep("configuration");
    } else if (currentStep === "configuration") {
      setCurrentStep("review");
    } else if (currentStep === "review") {
      setCurrentStep("deploy");
      if (selectedProvider === "docker-local") {
        handleDockerDeploy();
      }
    }
  };

  const handleBack = () => {
    if (currentStep === "application") setCurrentStep("provider");
    else if (currentStep === "configuration") setCurrentStep("application");
    else if (currentStep === "review") setCurrentStep("configuration");
    else if (currentStep === "deploy") setCurrentStep("review");
  };

  const getStepNumber = (step: string): number => {
    const steps = ["provider", "application", "configuration", "review", "deploy"];
    return steps.indexOf(step) + 1;
  };

  const isNextDisabled = () => {
    if (currentStep === "provider" && !selectedProvider) return true;
    if (currentStep === "application" && !selectedApplication) return true;
    if (currentStep === "configuration") {
      if (!configuration.name) return true;
      if (selectedProvider === "aws" && !configuration.region) return true;
      if (selectedApplication === "web" || selectedApplication === "api") {
        if (serviceMode === "standard" && !selectedService) return true;
        if (serviceMode === "custom" && (!customServiceFile || !startupCommands)) return true;
      }
      if (selectedProvider === "aws" && (!configuration.awsAccessKey || !configuration.awsSecretKey))
        return true;
      if (selectedProvider === "docker-server" && !configuration.dockerServerIp)
        return true;
    }
    return false;
  };

  const getSelectedProvider = () => providers.find((p) => p.id === selectedProvider);
  const getSelectedApplication = () => applicationTypes.find((a) => a.id === selectedApplication);

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gray-100">
      <div className="w-full max-w-4xl">
        {/* Progress steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {["provider", "application", "configuration", "review", "deploy"].map((step) => (
              <div
                key={step}
                className="flex flex-col items-center"
                style={{
                  color: getStepNumber(step) <= getStepNumber(currentStep) ? primaryColor : "#6b7280",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{
                    backgroundColor:
                      getStepNumber(step) <= getStepNumber(currentStep) ? primaryColor : "#e5e7eb",
                    color: getStepNumber(step) <= getStepNumber(currentStep) ? "#ffffff" : "#000000",
                  }}
                >
                  {getStepNumber(step) < getStepNumber(currentStep) ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    getStepNumber(step)
                  )}
                </div>
                <span className="text-sm hidden md:block font-medium">
                  {step.charAt(0).toUpperCase() + step.slice(1)}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-300" />
            <div
              className="absolute top-0 left-0 h-1 transition-all duration-300"
              style={{
                backgroundColor: primaryColor,
                width: `${((getStepNumber(currentStep) - 1) / 4) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Contenido de cada step */}
        <div className="border bg-white rounded shadow p-6 mb-6">
          {currentStep === "provider" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Step 1: Select Cloud Provider</h2>
              <p className="text-gray-600 mb-4">Choose the cloud provider where you want to deploy your application.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedProvider === provider.id ? "border-indigo-500 bg-indigo-50" : "hover:border-indigo-300"
                    }`}
                    onClick={() => setSelectedProvider(provider.id)}
                  >
                    <div className="flex items-start gap-3">
                      {provider.icon}
                      <div>
                        <h3 className="font-medium text-gray-800">{provider.name}</h3>
                        <p className="text-sm text-gray-600">{provider.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === "application" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Step 2: Select Application Type</h2>
              <p className="text-gray-600 mb-4">Choose the type of application or service you want to deploy.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {applicationTypes.map((appType) => (
                  <div
                    key={appType.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedApplication === appType.id ? "border-indigo-500 bg-indigo-50" : "hover:border-indigo-300"
                    }`}
                    onClick={() => setSelectedApplication(appType.id)}
                  >
                    <div className="flex items-start gap-3">
                      {appType.icon}
                      <div>
                        <h3 className="font-medium text-gray-800">{appType.name}</h3>
                        <p className="text-sm text-gray-600">{appType.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === "configuration" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Step 3: Configure Your Deployment</h2>
              <p className="text-gray-600 mb-4">Provide the necessary configuration details for your deployment.</p>
              <div className="space-y-4">
                <ProjectDetails />
                <TierSelection />
                <ServiceModeSection />
                <ProviderSpecificFields />
                <div className="space-y-2">
                  <label htmlFor="description" className="font-medium text-gray-700">
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    value={configuration.description}
                    onChange={(e) => handleConfigChange("description", e.target.value)}
                    placeholder="Describe your project..."
                    className="border border-gray-300 rounded p-2 w-full min-h-[80px]"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === "review" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Step 4: Review Your Deployment</h2>
              <p className="text-gray-600 mb-4">Review your deployment configuration before proceeding.</p>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-2">Cloud Provider</h3>
                  <div className="flex items-center gap-2 text-gray-700">
                    {getSelectedProvider()?.icon}
                    <span>{getSelectedProvider()?.name}</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-2">Application Type</h3>
                  <div className="flex items-center gap-2 text-gray-700">
                    {getSelectedApplication()?.icon}
                    <span>{getSelectedApplication()?.name}</span>
                  </div>
                </div>
                {(selectedApplication === "web" || selectedApplication === "api") && (
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-2">Service Mode</h3>
                    {serviceMode === "standard" ? (
                      <p className="text-gray-700">
                        Standard (Template): <strong>{selectedService}</strong>
                      </p>
                    ) : (
                      <div className="space-y-2 text-gray-700">
                        <p className="font-medium">Custom Service</p>
                        <p>
                          File: <strong>{customServiceFile?.name || "No file selected"}</strong>
                        </p>
                        <p>Commands:</p>
                        <pre className="bg-gray-100 p-2 rounded text-sm">
                          {startupCommands || "No commands"}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-2">Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <p className="text-sm text-gray-600">Project Name</p>
                      <p>{configuration.name}</p>
                    </div>
                    {selectedProvider === "aws" && (
                      <div>
                        <p className="text-sm text-gray-600">Region</p>
                        <p>{configuration.region}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-600">Tier</p>
                      <p className="capitalize">{configuration.tier}</p>
                    </div>
                    {selectedProvider === "aws" && (
                      <>
                        <div>
                          <p className="text-sm text-gray-600">AWS Access Key</p>
                          <p>{configuration.awsAccessKey}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">AWS Secret Key</p>
                          <p>{configuration.awsSecretKey}</p>
                        </div>
                      </>
                    )}
                    {selectedProvider === "docker-server" && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600">Docker Server IP</p>
                        <p>{configuration.dockerServerIp}</p>
                      </div>
                    )}
                    {configuration.description && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600">Description</p>
                        <p>{configuration.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === "deploy" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Step 5: Deployment Instructions</h2>
              <div className="flex justify-center py-4">
                <div className="rounded-full p-3" style={{ backgroundColor: "#d1fae5" }}>
                  <Upload className="h-8 w-8" style={{ color: "#10b981" }} />
                </div>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-medium text-gray-800">Ready to Deploy!</h3>
                <p className="text-gray-600">
                  Follow the instructions below to complete your deployment.
                </p>
              </div>
              <div>
                <div className="flex mb-4">
                  <button
                    onClick={() => setCurrentStep("deploy")}
                    className="flex-1 py-2 border-b-2 font-medium"
                    style={{ borderColor: primaryColor, color: primaryColor }}
                  >
                    Command Line
                  </button>
                  <button
                    onClick={() => setCurrentStep("deploy")}
                    className="flex-1 py-2 border-b-2 font-medium text-gray-600"
                  >
                    Web Console
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-800 mb-2">1. Install the CLI</h4>
                    <pre className="bg-black text-white p-3 rounded-md text-sm overflow-x-auto">
                      {selectedProvider === "aws"
                        ? "$ pip install awscli"
                        : selectedProvider === "docker-server" || selectedProvider === "docker-local"
                        ? "$ docker --version"
                        : ""}
                    </pre>
                  </div>

                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-800 mb-2">2. Authenticate</h4>
                    <pre className="bg-black text-white p-3 rounded-md text-sm overflow-x-auto">
                      {selectedProvider === "aws"
                        ? "$ aws configure"
                        : selectedProvider === "docker-server" || selectedProvider === "docker-local"
                        ? "# Docker typically uses local daemon authentication"
                        : ""}
                    </pre>
                  </div>

                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-800 mb-2">3. Deploy Your Application</h4>
                    <pre className="bg-black text-white p-3 rounded-md text-sm overflow-x-auto">
                      {selectedProvider === "aws" && selectedApplication === "web"
                        ? `$ aws s3 sync ./build s3://${configuration.name} --region ${configuration.region}`
                        : selectedProvider === "docker-server" || selectedProvider === "docker-local"
                        ? `$ docker ${
                            selectedApplication === "web"
                              ? "app deploy"
                              : selectedApplication === "api"
                              ? "functions deploy"
                              : ""
                          } ${configuration.name} --region=${configuration.region}`
                        : ""}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === "provider"}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 disabled:opacity-50"
            style={{ borderColor: currentStep === "provider" ? "#d1d5db" : primaryColor }}
          >
            Back
          </button>
          {currentStep !== "deploy" ? (
            <button
              onClick={handleNext}
              disabled={isNextDisabled()}
              className="px-4 py-2 rounded text-white disabled:opacity-50"
              style={{ backgroundColor: primaryColor }}
            >
              {currentStep === "review" ? "Deploy" : "Next"}
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep("provider")}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700"
              style={{ borderColor: primaryColor }}
            >
              Start New Deployment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deployment;
