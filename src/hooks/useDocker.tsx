// src/hooks/useDocker.tsx
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const API_BASE = "/docker";

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

  const deploy = async (service: string): Promise<DeploymentResponse | null> => {
    setLoading(true);
    try {
      const response = await axios.post<DeploymentResponse>(`${API_BASE}/${service}`);
      // toast.success(response.data.message); // Notifica éxito
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorData = axiosError.response?.data as { message?: string }; // Asumimos que data puede tener 'message'
      const errorMessage =
        errorData?.message || axiosError.message || "Error al levantar el contenedor.";
      // toast.error(errorMessage);
      console.error("Error:", errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { deploy, loading };
};

/**
 * Hook para detener y eliminar un contenedor de un servicio.
 */
export const useStopContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const stop = async (service: string): Promise<DeploymentResponse | null> => {
    setLoading(true);
    try {
      const response = await axios.delete<DeploymentResponse>(`${API_BASE}/${service}`);
      // toast.success(response.data.message);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorData = axiosError.response?.data as { message?: string }; // Asumimos que data puede tener 'message'
      const errorMessage =
        errorData?.message || axiosError.message || "Error al levantar el contenedor.";
      // toast.error(errorMessage);
      console.error("Error:", errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { stop, loading };
};

/**
 * Hook para obtener el mapeo de puertos de un servicio.
 */
export const useGetPortMapping = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const getPortMapping = async (
    service: string
  ): Promise<PortMappingResponse | null> => {
    setLoading(true);
    try {
      const response = await axios.get<PortMappingResponse>(`${API_BASE}/${service}/port`);
      // toast.success("Mapeo de puertos obtenido correctamente.");
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorData = axiosError.response?.data as { message?: string }; // Asumimos que data puede tener 'message'
      const errorMessage =
        errorData?.message || axiosError.message || "Error al levantar el contenedor.";
      // toast.error(errorMessage);
      console.error("Error:", errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getPortMapping, loading };
};
