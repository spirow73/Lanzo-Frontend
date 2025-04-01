import { FC } from "react";
import { toast } from "react-toastify";

interface DeploymentResponse {
  message: string;
}

interface PortMappingResponse {
  message: string;
  ports: Record<string, Array<{ HostPort: string }>>;
}


interface ActionButtonsProps {
  activeService: string;
  deploy: (service: string) => Promise<DeploymentResponse | null>;
  stop: (service: string) => Promise<DeploymentResponse | null>;
  getPortMapping: (service: string) => Promise<PortMappingResponse | null>;
  deployLoading: boolean;
  stopLoading: boolean;
  portLoading: boolean;
  onPortMapping: (mapping: PortMappingResponse) => void;
}

const ActionButtons: FC<ActionButtonsProps> = ({
  activeService,
  deploy,
  stop,
  getPortMapping,
  deployLoading,
  stopLoading,
  portLoading,
  onPortMapping,
}) => {
  const handleDeployClick = async () => {
    try {
      const result = await deploy(activeService);
      if (result && result.message) {
        toast.success(result.message);
      } else {
        toast.error("No se obtuvo respuesta al desplegar el contenedor.");
      }
      console.log("Deploy result:", result);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error al desplegar el contenedor.";
      toast.error(message);
    }
  };

  const handleStop = async () => {
    try {
      const result = await stop(activeService);
      if (result && result.message) {
        toast.success(result.message);
      } else {
        toast.error("No se obtuvo respuesta al detener el contenedor.");
      }
      console.log("Stop result:", result);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error al detener el contenedor.";
      toast.error(message);
    }
  };

  const handleGetPort = async () => {
    try {
      const result = await getPortMapping(activeService);
      console.log("Port mapping:", result);
      if (result) {
        onPortMapping(result);
        toast.success("Mapeo de puertos obtenido correctamente.");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error al obtener el mapeo de puertos.";
      toast.error(message);
    }
  };

  return (
    <div className="absolute bottom-[3.8em] left-1/2 transform -translate-x-1/2 flex gap-4">
      <button
        onClick={handleDeployClick}
        disabled={deployLoading}
        className="w-[60px] h-[60px] bg-[#00ffff] border-[5px] border-black rounded-full flex items-center justify-center"
      >
        {deployLoading ? "..." : "Deploy"}
      </button>
      <button
        onClick={handleStop}
        disabled={stopLoading}
        className="w-[60px] h-[60px] bg-[#00ffff] border-[5px] border-black rounded-full flex items-center justify-center"
      >
        {stopLoading ? "..." : "Stop"}
      </button>
      <button
        onClick={handleGetPort}
        disabled={portLoading}
        className="w-[60px] h-[60px] bg-[#00ffff] border-[5px] border-black rounded-full flex items-center justify-center"
      >
        {portLoading ? "..." : "Port"}
      </button>
    </div>
  );
};

export default ActionButtons;
