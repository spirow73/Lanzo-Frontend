"use client";
import { useState, ReactNode } from "react";
import { DeploymentContext, Step, ServiceMode, Configuration } from "./DeploymentContext";

export const DeploymentProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<Step>("provider");
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [serviceMode, setServiceMode] = useState<ServiceMode>("standard");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [customServiceFile, setCustomServiceFile] = useState<File | null>(null);
  const [startupCommands, setStartupCommands] = useState<string>("");
  const [configuration, setConfiguration] = useState<Configuration>({
    name: "",
    region: "",
    tier: "standard",
    description: "",
    awsAccessKey: "",
    awsSecretKey: "",
    dockerServerIp: "",
  });

  const handleConfigChange = (field: keyof Configuration, value: string) => {
    setConfiguration((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <DeploymentContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        selectedProvider,
        setSelectedProvider,
        selectedApplication,
        setSelectedApplication,
        serviceMode,
        setServiceMode,
        selectedService,
        setSelectedService,
        customServiceFile,
        setCustomServiceFile,
        startupCommands,
        setStartupCommands,
        configuration,
        setConfiguration,
        handleConfigChange,
      }}
    >
      {children}
    </DeploymentContext.Provider>
  );
};
