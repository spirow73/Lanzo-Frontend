// Deployment.tsx
import InfiniteMenu from "../components/InfiniteMenu"; // Ajusta la ruta si tu InfiniteMenu está en otro lugar

// Importa las imágenes locales (Vite/webpack se encargará de resolver las rutas).
import awsLogo from "../assets/logos/aws.png";
import canvasLogo from "../assets/logos/canvas.svg";
import ghostLogo from "../assets/logos/ghost-logo.jpg";
import localstackLogo from "../assets/logos/localstack.png";
import ollamaLogo from "../assets/logos/ollama.webp";
import openwebuiLogo from "../assets/logos/openwebui.svg";
import wordpressLogo from "../assets/logos/wordpress.svg";

const Deployment = () => {
  // Define los items que se mostrarán en el menú infinito
  const items = [
    {
      image: wordpressLogo,
      service: "wordpress",
      title: "WordPress",
      description: "Servicio de WordPress",
    },
    {
      image: localstackLogo,
      service: "localstack",
      title: "LocalStack",
      description: "Servicio de LocalStack",
    },
    {
      image: canvasLogo,
      service: "canvas",
      title: "Canvas",
      description: "Servicio de Canvas",
    },
    {
      image: openwebuiLogo,
      service: "openwebui",
      title: "OpenWebUI",
      description: "Servicio de OpenWebUI",
    },
    {
      image: ollamaLogo,
      service: "ollama",
      title: "Ollama",
      description: "Servicio de Ollama",
    },
    {
      image: awsLogo,
      service: "aws",
      title: "AWS",
      description: "Servicio de AWS",
    },
    {
      image: ghostLogo,
      service: "ghost",
      title: "Ghost",
      description: "Servicio de Ghost",
    },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <InfiniteMenu items={items} />
    </div>
  );
};

export default Deployment;
