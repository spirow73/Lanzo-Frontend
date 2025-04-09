import { createContext } from "react";

// Tipos
export type Step = "provider" | "application" | "configuration" | "review" | "deploy";
export type ServiceMode = "standard" | "custom";

export interface Configuration {
  name: string;
  region: string;
  tier: string;
  description: string;
  awsAccessKey: string;
  awsSecretKey: string;
  dockerServerIp: string;
}

export interface DeploymentContextProps {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;
  selectedProvider: string | null;
  setSelectedProvider: (provider: string | null) => void;
  selectedApplication: string | null;
  setSelectedApplication: (application: string | null) => void;
  serviceMode: ServiceMode;
  setServiceMode: (mode: ServiceMode) => void;
  selectedService: string | null;
  setSelectedService: (service: string | null) => void;
  customServiceFile: File | null;
  setCustomServiceFile: (file: File | null) => void;
  startupCommands: string;
  setStartupCommands: (cmd: string) => void;
  configuration: Configuration;
  setConfiguration: React.Dispatch<React.SetStateAction<Configuration>>;
  handleConfigChange: (field: keyof Configuration, value: string) => void;
}

// Contexto en sí
export const DeploymentContext = createContext<DeploymentContextProps | undefined>(undefined);
