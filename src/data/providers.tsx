"use client";
import { Cloud, Code, Database, FileText, Server } from "lucide-react";

// Importación de imágenes (ajusta las rutas según tu estructura)
import awsLogo from "../assets/logos/aws.png";
import canvasLogo from "../assets/logos/canvas.svg";
import ghostLogo from "../assets/logos/ghost-logo.jpg";
import localstackLogo from "../assets/logos/localstack.png";
import ollamaLogo from "../assets/logos/ollama.png";
import wordpressLogo from "../assets/logos/wordpress.svg";
import postgreLogo from "../assets/logos/postgres.png";
import mysqlLogo from "../assets/logos/mysql.png";
import sqliteLogo from "../assets/logos/sqlite.png";

const primaryColor = "#4F46E5"; // Indigo 700

// Proveedores
export interface Provider {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
}

export const providers: Provider[] = [
  {
    id: "azure",
    name: "Microsoft Azure",
    description: "Cloud platform by Microsoft for building, deploying, and managing applications.",
    icon: <Cloud className="h-8 w-8" style={{ color: primaryColor }} />,
  },
  {
    id: "docker-server",
    name: "Servidor Docker Remoto",
    description: "Deploy a remote Docker server",
    icon: <Server className="h-8 w-8" style={{ color: primaryColor }} />,
  },
  {
    id: "docker-local",
    name: "Docker Local (localhost)",
    description: "Deploy using your local Docker setup",
    icon: <Server className="h-8 w-8" style={{ color: primaryColor }} />,
  },
];

// Tipos de aplicación
export interface ApplicationType {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
}

export const applicationTypes: ApplicationType[] = [
  {
    id: "web",
    name: "Web Application",
    description: "Deploy a web application or website",
    icon: <Code className="h-8 w-8" style={{ color: primaryColor }} />,
  },
  {
    id: "api",
    name: "API Service",
    description: "Deploy a backend API or service",
    icon: <Server className="h-8 w-8" style={{ color: primaryColor }} />,
  },
  {
    id: "database",
    name: "Database",
    description: "Set up a managed database instance",
    icon: <Database className="h-8 w-8" style={{ color: primaryColor }} />,
  },
  {
    id: "storage",
    name: "Storage",
    description: "Configure cloud storage for your files",
    icon: <FileText className="h-8 w-8" style={{ color: primaryColor }} />,
  },
];

// Opciones de servicio para "Web Application"
export interface ServiceOption {
  image: string;
  service: string;
  title: string;
  description: string;
  deployOptions: {
    local: boolean;
    cloud: boolean;
  };
  providers: string[];
}

export const webServiceOptions: ServiceOption[] = [
  {
    image: wordpressLogo,
    service: "wordpress",
    title: "WordPress",
    description: "Servicio de WordPress",
    deployOptions: { local: true, cloud: true },
    providers: ["azure", "docker-server", "docker-local"],
  },
  {
    image: localstackLogo,
    service: "localstack",
    title: "LocalStack",
    description: "Servicio de LocalStack",
    deployOptions: { local: true, cloud: true },
    providers: ["azure", "docker-server", "docker-local"],
  },
  {
    image: canvasLogo,
    service: "canvas",
    title: "Canvas",
    description: "Servicio de Canvas",
    deployOptions: { local: true, cloud: true },
    providers: ["azure", "docker-server", "docker-local"],
  },
  {
    image: ollamaLogo,
    service: "ollamaweb",
    title: "Ollama",
    description: "Servicio de Ollama",
    deployOptions: { local: true, cloud: true },
    providers: ["azure", "docker-server", "docker-local"],
  },
  {
    image: ghostLogo,
    service: "ghost",
    title: "Ghost",
    description: "Servicio de Ghost",
    deployOptions: { local: true, cloud: true },
    providers: ["azure", "docker-server", "docker-local"],
  },
];

// Opciones de servicio para "API Service"
export const apiServiceOptions: ServiceOption[] = [
  {
    image: awsLogo,
    service: "bedrockAccessGateway",
    title: "Bedrock Access Gateway",
    description: "API service for conecting to bedrock",
    deployOptions: { local: true, cloud: true },
    providers: ["azure", "docker-server", "docker-local"],
  },
];

// Opciones de servicio para "Database"
export const databaseServiceOptions: ServiceOption[] = [
  {
    image: postgreLogo,
    service: "postgre",
    title: "PostgreSQL",
    description: "Instancia de base de datos PostgreSQL",
    deployOptions: { local: true, cloud: true },
    providers: ["docker-local", "docker-server", "azure"],
  },
  {
    image: mysqlLogo,
    service: "mysql",
    title: "MySQL",
    description: "Instancia de base de datos MySQL",
    deployOptions: { local: true, cloud: true },
    providers: ["docker-local", "docker-server"],
  }
];

// Opciones de servicio para "Storage"
export const storageServiceOptions: ServiceOption[] = [
  {
    image: awsLogo,
    service: "s3",
    title: "Amazon S3",
    description: "Almacenamiento de objetos con S3",
    deployOptions: { local: true, cloud: true },
    providers: ["docker-server", "azure"],
  },
  {
    image: localstackLogo,
    service: "localstack-storage",
    title: "LocalStack Storage",
    description: "Simulación de S3 usando LocalStack",
    deployOptions: { local: true, cloud: true },
    providers: ["docker-local", "docker-server"],
  },
];
