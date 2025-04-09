// Deployment.tsx
import InfiniteMenu from "../components/InfiniteMenu/InfiniteMenu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
      deployOptions:{
        local:true,
        cloud:true
      }
    },
    {
      image: localstackLogo,
      service: "localstack",
      title: "LocalStack",
      description: "Servicio de LocalStack",
      deployOptions:{
        local:true,
        cloud:true
      }
    },
    {
      image: canvasLogo,
      service: "canvas",
      title: "Canvas",
      description: "Servicio de Canvas",
      deployOptions:{
        local:true,
        cloud:true
      }
    },
    {
      image: openwebuiLogo,
      service: "openwebui",
      title: "OpenWebUI",
      description: "Servicio de OpenWebUI",
      deployOptions:{
        local:true,
        cloud:true
      }
    },
    {
      image: ollamaLogo,
      service: "ollama",
      title: "Ollama",
      description: "Servicio de Ollama",
      deployOptions:{
        local:true,
        cloud:true
      }
    },
    {
      image: awsLogo,
      service: "aws",
      title: "AWS",
      description: "Servicio de AWS",
      deployOptions:{
        local:true,
        cloud:true
      }
    },
    {
      image: ghostLogo,
      service: "ghost",
      title: "Ghost",
      description: "Servicio de Ghost",
      deployOptions:{
        local:true,
        cloud:true
      }
    },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <InfiniteMenu items={items} />
      <ToastContainer />
    </div>
  );
};

export default Deployment;
