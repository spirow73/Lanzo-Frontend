"use client";
import { Cloud, Code, Database, FileText, Server } from "lucide-react";

// Importación de imágenes (ajusta las rutas según tu estructura)
import awsLogo from "../assets/logos/aws.png";
import canvasLogo from "../assets/logos/canvas.svg";
import ghostLogo from "../assets/logos/ghost-logo.jpg";
import localstackLogo from "../assets/logos/localstack.png";
import ollamaLogo from "../assets/logos/ollama.webp";
import wordpressLogo from "../assets/logos/wordpress.svg";

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
}

export const webServiceOptions: ServiceOption[] = [
  {
    image: wordpressLogo,
    service: "wordpress",
    title: "WordPress",
    description: "Servicio de WordPress",
    deployOptions: { local: true, cloud: true },
  },
  {
    image: localstackLogo,
    service: "localstack",
    title: "LocalStack",
    description: "Servicio de LocalStack",
    deployOptions: { local: true, cloud: true },
  },
  {
    image: canvasLogo,
    service: "canvas",
    title: "Canvas",
    description: "Servicio de Canvas",
    deployOptions: { local: true, cloud: true },
  },
  {
    image: ollamaLogo,
    service: "ollamaweb",
    title: "Ollama",
    description: "Servicio de Ollama",
    deployOptions: { local: true, cloud: true },
  },
  {
    image: awsLogo,
    service: "aws",
    title: "AWS",
    description: "Servicio de AWS",
    deployOptions: { local: true, cloud: true },
  },
  {
    image: ghostLogo,
    service: "ghost",
    title: "Ghost",
    description: "Servicio de Ghost",
    deployOptions: { local: true, cloud: true },
  },
];

// Opciones de servicio para "API Service"
export const apiServiceOptions: ServiceOption[] = [
  {
    image: awsLogo,
    service: "express",
    title: "Express",
    description: "API service using Express.js",
    deployOptions: { local: true, cloud: true },
  },
];