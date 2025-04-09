"use client";
import { DeploymentProvider } from "../contexts/DeploymentProvider";
import Deployment from "../components/Deployment";

export default function HomePage() {
  return (
    <DeploymentProvider>
      <Deployment />
    </DeploymentProvider>
  );
}
