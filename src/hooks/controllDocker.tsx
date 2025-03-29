import React from "react";
import {
  useDeployContainer,
  useStopContainer,
  useGetPortMapping,
} from "./useDocker";


const DeploymentControl: React.FC = () => {
  const { deploy, loading: deployLoading, error: deployError } = useDeployContainer();
  const { stop, loading: stopLoading, error: stopError } = useStopContainer();
  const { getPortMapping, loading: portLoading, error: portError } = useGetPortMapping();

  const handleDeploy = async () => {
    const result = await deploy("wordpress"); // Ejemplo para levantar wordpress
    console.log(result);
  };

  const handleStop = async () => {
    const result = await stop("wordpress");
    console.log(result);
  };

  const handleGetPort = async () => {
    const result = await getPortMapping("wordpress");
    console.log(result);
  };

  return (
    <div>
      <button onClick={handleDeploy} disabled={deployLoading}>
        Levantar Contenedor
      </button>
      {deployError && <p>Error: {deployError}</p>}

      <button onClick={handleStop} disabled={stopLoading}>
        Detener Contenedor
      </button>
      {stopError && <p>Error: {stopError}</p>}

      <button onClick={handleGetPort} disabled={portLoading}>
        Obtener Mapeo de Puertos
      </button>
      {portError && <p>Error: {portError}</p>}
    </div>
  );
};

export default DeploymentControl;
