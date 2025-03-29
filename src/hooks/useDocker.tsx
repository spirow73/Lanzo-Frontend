import { useState } from "react";

const API_BASE = "http://localhost:4000";

export interface DeploymentResponse {
  message: string;
}

export interface PortMappingResponse {
  message: string;
  ports: Record<string, Array<{ HostPort: string }>>;
}

/**
 * Hook para levantar un contenedor de un servicio.
 */
export const useDeployContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deploy = async (service: string): Promise<DeploymentResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/${service}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error al levantar el contenedor");
      }
      const data: DeploymentResponse = await response.json();
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { deploy, loading, error };
};

/**
 * Hook para detener y eliminar un contenedor de un servicio.
 */
export const useStopContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const stop = async (service: string): Promise<DeploymentResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/${service}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error al detener/eliminar el contenedor");
      }
      const data: DeploymentResponse = await response.json();
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { stop, loading, error };
};

/**
 * Hook para obtener el mapeo de puertos de un servicio.
 */
export const useGetPortMapping = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getPortMapping = async (
    service: string
  ): Promise<PortMappingResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/${service}/port`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener el mapeo de puertos");
      }
      const data: PortMappingResponse = await response.json();
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getPortMapping, loading, error };
};
