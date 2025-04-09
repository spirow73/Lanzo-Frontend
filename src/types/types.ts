// types.ts

// Interfaz para el proveedor de cloud
export interface Provider {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
}

// Interfaz para el tipo de aplicación
export interface ApplicationType {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
}

export interface ServiceOption {
    image: string;
    service: string;
    title: string;
    description: string;
    deployOptions: {
      local: boolean;
      cloud: boolean;
    };
  }