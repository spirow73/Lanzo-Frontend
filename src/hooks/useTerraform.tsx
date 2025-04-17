// src/hooks/useTerraform.tsx

import { useState } from 'react';
import axios, { AxiosError } from 'axios';

const API_BASE = '/terraform';

// Ejemplo de interfaz para la respuesta de deploy
// Ajusta estos campos según la respuesta real de tu API
interface DeployResponse {
  message: string;
  outputs?: {
    init: string;
    apply: string;
  };
}

// Ejemplo de interfaz para la respuesta de destroy
// Ajusta estos campos según la respuesta real de tu API
interface DestroyResponse {
  message: string;
  output: string;
}

// Interfaz que describe lo que devolverá nuestro custom hook
interface UseTerraformResult {
  loading: boolean;
  error: AxiosError | null;
  deploy: (service: string, body: Record<string, string>) => Promise<DeployResponse | undefined>;
  destroy: (service: string, body?: Record<string, string>) => Promise<DestroyResponse | undefined>;
}

function useTerraform(): UseTerraformResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const deploy = async (service: string, body: Record<string, string>): Promise<DeployResponse | undefined> => {
    setLoading(true);
    setError(null);
    console.log('useTerraform.deploy called:', service, body);
    try {
      // Si el servicio es 'customvm' (Azure), usa el endpoint correcto
      const endpoint = service === 'customvm' ? `${API_BASE}/customvm` : `${API_BASE}/deploy/${service}`;
      const response = await axios.post<DeployResponse>(endpoint, body);
      console.log('Despliegue exitoso:', response.data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error('Error al desplegar:', axiosError.response?.data || axiosError.message);
      setError(axiosError);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const destroy = async (service: string, body?: Record<string, string>): Promise<DestroyResponse | undefined> => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (service === 'customvm') {
        response = await axios.delete<DestroyResponse>(`${API_BASE}/customvm`, { data: body });
      } else {
        response = await axios.post<DestroyResponse>(`${API_BASE}/destroy/${service}`);
      }
      console.log('Recursos destruidos:', response.data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      console.error('Error al destruir:', axiosError.response?.data || axiosError.message);
      setError(axiosError);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deploy, destroy };
}

export default useTerraform;
