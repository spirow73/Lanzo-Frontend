import { useContext } from "react";
import { DeploymentContext } from "./DeploymentContext";

export const useDeployment = () => {
  const context = useContext(DeploymentContext);
  if (!context) {
    throw new Error("useDeployment debe usarse dentro de un DeploymentProvider");
  }
  return context;
};
