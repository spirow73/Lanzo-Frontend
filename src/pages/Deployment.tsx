import InfiniteMenu from "../components/InfiniteMenu"; // Ajusta la ruta según corresponda

const Deployment = () => {
  // Define los items que mostrarás en el menú infinito
  const items = [
    {
      image: "https://picsum.photos/900/900?grayscale",
      deploy: "wordpress",  // Nombre del servicio para deploy
      delete: "wordpress",  // Nombre del servicio para detener
      port: "wordpress",    // Nombre del servicio para obtener mapping de puertos
      title: "WordPress",
      description: "Servicio de WordPress",
    },
    {
      image: "https://picsum.photos/900/900?grayscale?1",
      deploy: "localstack",
      delete: "localstack",
      port: "localstack",
      title: "LocalStack",
      description: "Servicio de LocalStack",
    },
    // Puedes agregar más items según lo requieras
  ];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <InfiniteMenu items={items} />
    </div>
  );
};

export default Deployment;
