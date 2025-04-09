"use client"

import { useState } from "react"
import { Check, Cloud, Code, Database, FileText, Server, Upload } from "lucide-react"

import { useDeployContainer } from "../hooks/useDocker";
import { toast } from "react-toastify"


// Importación de imágenes para servicios
import awsLogo from "../assets/logos/aws.png"
import canvasLogo from "../assets/logos/canvas.svg"
import ghostLogo from "../assets/logos/ghost-logo.jpg"
import localstackLogo from "../assets/logos/localstack.png"
import ollamaLogo from "../assets/logos/ollama.webp"
import openwebuiLogo from "../assets/logos/openwebui.svg"
import wordpressLogo from "../assets/logos/wordpress.svg"

// Color primario
const primaryColor = "#4F46E5" // Indigo 700

type Step = "provider" | "application" | "configuration" | "review" | "deploy"

// Proveedores permitidos
const providers = [
  {
    id: "aws",
    name: "Amazon Web Services",
    description: "Comprehensive cloud platform with a wide range of services",
    icon: <Cloud className="h-8 w-8" style={{ color: primaryColor }} />,
  },
  {
    id: "docker-server",
    name: "Servidor Docker Remoto",
    description: "Deploy a remote Docker server",
    icon: <Server className="h-8 w-8" style={{ color: primaryColor }} />,
  },
  {
    id: "docker-local",
    name: "Docker Local (localhost)",
    description: "Deploy using your local Docker setup",
    icon: <Server className="h-8 w-8" style={{ color: primaryColor }} />,
  },
]

// Tipos de aplicación
const applicationTypes = [
  {
    id: "web",
    name: "Web Application",
    description: "Deploy a web application or website",
    icon: <Code className="h-8 w-8" style={{ color: primaryColor }} />,
  },
  {
    id: "api",
    name: "API Service",
    description: "Deploy a backend API or service",
    icon: <Server className="h-8 w-8" style={{ color: primaryColor }} />,
  },
  {
    id: "database",
    name: "Database",
    description: "Set up a managed database instance",
    icon: <Database className="h-8 w-8" style={{ color: primaryColor }} />,
  },
  {
    id: "storage",
    name: "Storage",
    description: "Configure cloud storage for your files",
    icon: <FileText className="h-8 w-8" style={{ color: primaryColor }} />,
  },
]

// Opciones de servicio para "Web Application"
const webServiceOptions = [
  {
    image: wordpressLogo,
    service: "wordpress",
    title: "WordPress",
    description: "Servicio de WordPress",
    deployOptions: { local: true, cloud: true },
  },
  {
    image: localstackLogo,
    service: "localstack",
    title: "LocalStack",
    description: "Servicio de LocalStack",
    deployOptions: { local: true, cloud: true },
  },
  {
    image: canvasLogo,
    service: "canvas",
    title: "Canvas",
    description: "Servicio de Canvas",
    deployOptions: { local: true, cloud: true },
  },
  {
    image: openwebuiLogo,
    service: "openwebui",
    title: "OpenWebUI",
    description: "Servicio de OpenWebUI",
    deployOptions: { local: true, cloud: true },
  },
  {
    image: ollamaLogo,
    service: "ollama",
    title: "Ollama",
    description: "Servicio de Ollama",
    deployOptions: { local: true, cloud: true },
  },
  {
    image: awsLogo,
    service: "aws",
    title: "AWS",
    description: "Servicio de AWS",
    deployOptions: { local: true, cloud: true },
  },
  {
    image: ghostLogo,
    service: "ghost",
    title: "Ghost",
    description: "Servicio de Ghost",
    deployOptions: { local: true, cloud: true },
  },
]

// Opciones de servicio para "API Service" (ejemplo)
const apiServiceOptions = [
  {
    image: awsLogo,
    service: "express",
    title: "Express",
    description: "API service using Express.js",
    deployOptions: { local: true, cloud: true },
  },
  {
    image: openwebuiLogo,
    service: "fastify",
    title: "Fastify",
    description: "API service using Fastify",
    deployOptions: { local: true, cloud: true },
  },
]

export default function Deployment() {
  const [currentStep, setCurrentStep] = useState<Step>("provider")
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null)
  // Modo de servicio: standard (preconfigurado) o custom
  const [serviceMode, setServiceMode] = useState<"standard" | "custom">("standard")
  // Servicio seleccionado cuando se usa modo standard
  const [selectedService, setSelectedService] = useState<string | null>(null)
  // Para la opción custom: archivo y comandos de inicio
  const [customServiceFile, setCustomServiceFile] = useState<File | null>(null)
  const [startupCommands, setStartupCommands] = useState<string>("")

  const [configuration, setConfiguration] = useState({
    name: "",
    region: "",
    tier: "standard",
    description: "",
    awsAccessKey: "",
    awsSecretKey: "",
    dockerServerIp: "",
  });

  const { deploy, loading: deployLoading } = useDeployContainer();

  const handleDockerDeploy = async () => {
    // Verifica si se cumplen las condiciones necesarias
    if (
      selectedProvider === "docker-local" &&
      (selectedApplication === "web" || selectedApplication === "api") &&
      serviceMode === "standard" &&
      selectedService
    ) {
      console.log("Deploying service:", selectedService);
      
      // Muestra un toast de loading y guarda su id
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
        
        // Cambia automáticamente a la siguiente pestaña (por ejemplo, la de "deploy")
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
      // Si estamos en el step "deploy", podemos hacer la llamada al hook de Docker
      if (selectedProvider === "docker-local") {
        handleDockerDeploy();
      }
    }
  };

  const handleBack = () => {
    if (currentStep === "application") setCurrentStep("provider")
    else if (currentStep === "configuration") setCurrentStep("application")
    else if (currentStep === "review") setCurrentStep("configuration")
    else if (currentStep === "deploy") setCurrentStep("review")
  }

  const handleConfigChange = (field: string, value: string) => {
    setConfiguration((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const getStepNumber = (step: Step): number => {
    const steps: Step[] = ["provider", "application", "configuration", "review", "deploy"]
    return steps.indexOf(step) + 1
  }

  const isNextDisabled = () => {
    if (currentStep === "provider" && !selectedProvider) return true
    if (currentStep === "application" && !selectedApplication) return true
    if (currentStep === "configuration") {
      if (!configuration.name) return true
      if (selectedProvider === "aws" && !configuration.region) return true
      if (selectedApplication === "web" || selectedApplication === "api") {
        if (serviceMode === "standard" && !selectedService) return true
        if (serviceMode === "custom" && (!customServiceFile || !startupCommands))
          return true
      }
      if (selectedProvider === "aws" && (!configuration.awsAccessKey || !configuration.awsSecretKey))
        return true
      if (selectedProvider === "docker-server" && !configuration.dockerServerIp)
        return true
    }
    return false
  }

  const getSelectedProvider = () => providers.find((p) => p.id === selectedProvider)
  const getSelectedApplication = () => applicationTypes.find((a) => a.id === selectedApplication)
  const serviceOptions = selectedApplication === "web"
    ? webServiceOptions
    : selectedApplication === "api"
      ? apiServiceOptions
      : []

  // Referencia al input file oculto
  const fileInputRef = (node: HTMLInputElement | null) => {
    if (node) {
      // Podemos guardar la referencia si la necesitamos más adelante
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gray-100">
      <div className="w-full max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {["provider", "application", "configuration", "review", "deploy"].map((step) => (
              <div
                key={step}
                className="flex flex-col items-center"
                style={{
                  color: getStepNumber(step as Step) <= getStepNumber(currentStep) ? primaryColor : "#6b7280",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                  style={{
                    backgroundColor:
                      getStepNumber(step as Step) <= getStepNumber(currentStep)
                        ? primaryColor
                        : "#e5e7eb",
                    color:
                      getStepNumber(step as Step) <= getStepNumber(currentStep)
                        ? "#ffffff"
                        : "#000000",
                  }}
                >
                  {getStepNumber(step as Step) < getStepNumber(currentStep)
                    ? <Check className="h-5 w-5" />
                    : getStepNumber(step as Step)
                  }
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
              <p className="text-gray-600 mb-4">
                Choose the cloud provider where you want to deploy your application.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {providers.map((provider) => (
                  <div
                    key={provider.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedProvider === provider.id
                        ? "border-indigo-500 bg-indigo-50"
                        : "hover:border-indigo-300"
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
              <p className="text-gray-600 mb-4">
                Choose the type of application or service you want to deploy.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {applicationTypes.map((appType) => (
                  <div
                    key={appType.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedApplication === appType.id
                        ? "border-indigo-500 bg-indigo-50"
                        : "hover:border-indigo-300"
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
              <p className="text-gray-600 mb-4">
                Provide the necessary configuration details for your deployment.
              </p>

              <div className="space-y-4">
                {/* Nombre del proyecto y, para AWS, Región */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="font-medium text-gray-700">Project Name</label>
                    <input
                      id="name"
                      value={configuration.name}
                      onChange={(e) => handleConfigChange("name", e.target.value)}
                      placeholder="my-awesome-project"
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  </div>
                  {selectedProvider === "aws" && (
                    <div className="space-y-2">
                      <label htmlFor="region" className="font-medium text-gray-700">Region</label>
                      <select
                        id="region"
                        value={configuration.region}
                        onChange={(e) => handleConfigChange("region", e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full"
                      >
                        <option value="">Select a region</option>
                        <option value="us-east">US East (N. Virginia)</option>
                        <option value="us-west">US West (Oregon)</option>
                        <option value="eu-west">EU West (Ireland)</option>
                        <option value="ap-southeast">Asia Pacific (Singapore)</option>
                        <option value="sa-east">South America (São Paulo)</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Tier */}
                <div className="space-y-2">
                  <span className="font-medium text-gray-700">Tier</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {["basic", "standard", "premium"].map((tier) => (
                      <label
                        key={tier}
                        className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer ${
                          configuration.tier === tier ? "border-indigo-500 bg-indigo-50" : "hover:border-indigo-300"
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

                {/* Descripción */}
                <div className="space-y-2">
                  <label htmlFor="description" className="font-medium text-gray-700">Description (Optional)</label>
                  <textarea
                    id="description"
                    value={configuration.description}
                    onChange={(e) => handleConfigChange("description", e.target.value)}
                    placeholder="Describe your project..."
                    className="border border-gray-300 rounded p-2 w-full min-h-[80px]"
                  />
                </div>

                {/* Service Mode Section */}
                {(selectedApplication === "web" || selectedApplication === "api") && (
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
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="serviceMode"
                          className="h-4 w-4"
                          value="custom"
                          checked={serviceMode === "custom"}
                          onChange={() => setServiceMode("custom")}
                        />
                        <div>
                          <span className="font-medium text-gray-700">Custom</span>
                          <p className="text-sm text-gray-500">Upload your own service</p>
                        </div>
                      </label>
                    </div>

                    {/* Modo Standard */}
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

                    {/* Modo Custom */}
                    {serviceMode === "custom" && (
                      <div className="space-y-6 mt-4">
                        {/* Step 1 */}
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-800 mb-2">Step 1: Create a ZIP file with your service</h4>
                          <p className="text-sm text-gray-600">
                            Package your application files into a ZIP archive that includes all the necessary assets.
                          </p>
                        </div>

                        {/* Step 2: Custom file input con botón */}
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-800 mb-2">Step 2: Upload the ZIP file</h4>
                          <div className="flex flex-col md:flex-row items-center gap-4">
                            <button
                              type="button"
                              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                              onClick={() => document.getElementById("customFileInput")?.click()}
                            >
                              Browse Files
                            </button>
                            <span className="text-sm text-gray-600">
                              {customServiceFile ? customServiceFile.name : "No file selected"}
                            </span>
                            <input
                              id="customFileInput"
                              type="file"
                              accept=".zip,.tar.gz"
                              className="hidden"
                              onChange={(e) => setCustomServiceFile(e.target.files?.[0] ?? null)}
                            />
                          </div>
                        </div>

                        {/* Step 3 */}
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-800 mb-2">Step 3: Add startup commands</h4>
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
                              onClick={() => {
                                setStartupCommands("")
                                setCustomServiceFile(null)
                              }}
                            >
                              Clear
                            </button>
                            <button
                              type="button"
                              className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
                              onClick={() => {
                                // Aquí podrías realizar alguna acción de guardado
                                console.log("Commands saved:", startupCommands)
                              }}
                            >
                              Save Commands
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Campos para AWS o Docker (dependiendo del proveedor) */}
                {selectedProvider === "aws" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <label htmlFor="awsAccessKey" className="font-medium text-gray-700">AWS Access Key</label>
                      <input
                        id="awsAccessKey"
                        value={configuration.awsAccessKey}
                        onChange={(e) => handleConfigChange("awsAccessKey", e.target.value)}
                        placeholder="Your AWS Access Key"
                        className="border border-gray-300 rounded p-2 w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="awsSecretKey" className="font-medium text-gray-700">AWS Secret Key</label>
                      <input
                        id="awsSecretKey"
                        value={configuration.awsSecretKey}
                        onChange={(e) => handleConfigChange("awsSecretKey", e.target.value)}
                        placeholder="Your AWS Secret Key"
                        className="border border-gray-300 rounded p-2 w-full"
                      />
                    </div>
                  </div>
                )}

                {selectedProvider === "docker-server" && (
                  <div className="space-y-2 mt-4">
                    <label htmlFor="dockerServerIp" className="font-medium text-gray-700">Docker Server IP</label>
                    <input
                      id="dockerServerIp"
                      value={configuration.dockerServerIp}
                      onChange={(e) => handleConfigChange("dockerServerIp", e.target.value)}
                      placeholder="Enter the server IP"
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === "review" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Step 4: Review Your Deployment</h2>
              <p className="text-gray-600 mb-4">
                Review your deployment configuration before proceeding.
              </p>
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
                        : selectedProvider === "docker-server" ||
                          selectedProvider === "docker-local"
                        ? "$ docker --version"
                        : ""}
                    </pre>
                  </div>

                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-800 mb-2">2. Authenticate</h4>
                    <pre className="bg-black text-white p-3 rounded-md text-sm overflow-x-auto">
                      {selectedProvider === "aws"
                        ? "$ aws configure"
                        : selectedProvider === "docker-server" ||
                          selectedProvider === "docker-local"
                        ? "# Docker typically uses local daemon authentication"
                        : ""}
                    </pre>
                  </div>

                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-800 mb-2">3. Deploy Your Application</h4>
                    <pre className="bg-black text-white p-3 rounded-md text-sm overflow-x-auto">
                      {selectedProvider === "aws" && selectedApplication === "web"
                        ? `$ aws s3 sync ./build s3://${configuration.name} --region ${configuration.region}`
                        : selectedProvider === "docker-server" ||
                          selectedProvider === "docker-local"
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
  )
}
