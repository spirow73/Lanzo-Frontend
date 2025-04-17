// src/hooks/useDocker.tsx
import { useState } from "react";
import axios, { AxiosError } from "axios";

const API_BASE = "/docker";

export interface DeploymentResponse {
  message: string;
  containers?: any[]; // Puedes tipar esto mejor si lo necesitas
  project: {
    id: string;
    nombre: string;
    proveedor: string;
    fecha: string;
    estado: string;
    ip: string;
  };
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

  const deploy = async (
    service: string,
    ip?: string
  ): Promise<DeploymentResponse | null> => {
    setLoading(true);
    try {
      const response = await axios.post<DeploymentResponse>(
        `${API_BASE}/${service}`,
        ip ? { ip } : {} // cuerpo de la petición con IP si existe
      );
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorData = axiosError.response?.data as { message?: string };
      const errorMessage =
        errorData?.message || axiosError.message || "Error al levantar el contenedor.";
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

  const stop = async (service: string, ip?: string): Promise<DeploymentResponse | null> => {
    setLoading(true);
    try {
      const response = await axios.delete<DeploymentResponse>(
        `${API_BASE}/${service}`,
        { data: ip ? { ip } : {} }
      );
      // toast.success(response.data.message);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorData = axiosError.response?.data as { message?: string }; // Asumimos que data puede tener 'message'
      const errorMessage =
        errorData?.message || axiosError.message || "Error al detener el contenedor.";
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
/**
 * Hook para pausar un contenedor de un servicio.
 */
export const usePauseContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const pause = async (service: string, ip?: string): Promise<DeploymentResponse | null> => {
    setLoading(true);
    try {
      const response = await axios.patch<DeploymentResponse>(
        `${API_BASE}/${service}/pause`,
        ip ? { ip } : {}
      );
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorData = axiosError.response?.data as { message?: string };
      const errorMessage =
        errorData?.message || axiosError.message || "Error al pausar el contenedor.";
      console.error("Error:", errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { pause, loading };
};

/**
 * Hook para reanudar un contenedor de un servicio.
 */
export const useUnpauseContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const unpause = async (service: string, ip?: string): Promise<DeploymentResponse | null> => {
    setLoading(true);
    try {
      const response = await axios.patch<DeploymentResponse>(
        `${API_BASE}/${service}/unpause`,
        ip ? { ip } : {}
      );
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorData = axiosError.response?.data as { message?: string };
      const errorMessage =
        errorData?.message || axiosError.message || "Error al reanudar el contenedor.";
      console.error("Error:", errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { unpause, loading };
};

export const useGetPortMapping = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const getPortMapping = async (
    service: string,
    ip?: string
  ): Promise<PortMappingResponse | null> => {
    setLoading(true);
    try {
      const response = await axios.get<PortMappingResponse>(
        `${API_BASE}/${service}/port${ip ? `?ip=${encodeURIComponent(ip)}` : ''}`
      );
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const errorData = axiosError.response?.data as { message?: string };
      const errorMessage =
        errorData?.message || axiosError.message || "Error al levantar el contenedor.";
      console.error("Error:", errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }; 

  return { getPortMapping, loading };
};
