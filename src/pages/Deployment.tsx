import { useState } from "react";
import {
  useDeployContainer,
  useStopContainer,
  useGetPortMapping,
  DeploymentResponse,
  PortMappingResponse,
} from "../hooks/useDocker"; // Ajusta la ruta según la ubicación de tu hook

const Deployment = () => {
  const [service, setService] = useState<string>("wordpress");
  const [portMapping, setPortMapping] = useState<PortMappingResponse | null>(null);

  const {
    deploy,
    loading: deployLoading,
    error: deployError,
  } = useDeployContainer();
  const {
    stop,
    loading: stopLoading,
    error: stopError,
  } = useStopContainer();
  const {
    getPortMapping,
    loading: portLoading,
    error: portError,
  } = useGetPortMapping();

  const handleDeploy = async () => {
    const result: DeploymentResponse | null = await deploy(service);
    console.log("Deploy result:", result);
  };

  const handleStop = async () => {
    const result: DeploymentResponse | null = await stop(service);
    console.log("Stop result:", result);
  };

  const handleGetPort = async () => {
    const result: PortMappingResponse | null = await getPortMapping(service);
    console.log("Port mapping:", result);
    if (result) {
      setPortMapping(result);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Deployment Page</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="service-select">Selecciona un servicio:</label>
        <select
          id="service-select"
          value={service}
          onChange={(e) => setService(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        >
          <option value="wordpress">WordPress</option>
          <option value="canvas">Canvas</option>
          <option value="ollama">Ollama</option>
          <option value="openwebui">OpenWebUI</option>
          <option value="localstack">Localstack</option>
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleDeploy} disabled={deployLoading}>
          {deployLoading ? "Deploying..." : "Levantar Contenedor"}
        </button>
        {deployError && <p style={{ color: "red" }}>Error: {deployError}</p>}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleStop} disabled={stopLoading}>
          {stopLoading ? "Stopping..." : "Detener Contenedor"}
        </button>
        {stopError && <p style={{ color: "red" }}>Error: {stopError}</p>}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleGetPort} disabled={portLoading}>
          {portLoading ? "Obteniendo..." : "Obtener Mapeo de Puertos"}
        </button>
        {portError && <p style={{ color: "red" }}>Error: {portError}</p>}
      </div>

      {portMapping && (
        <div>
          <h2>Port Mapping:</h2>
          <pre>{JSON.stringify(portMapping.ports, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Deployment;
