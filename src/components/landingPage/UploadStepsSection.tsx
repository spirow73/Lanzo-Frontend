import SpotlightCard from "@/components/reactbits/SpotlightCard";

const UploadStepsSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Sube tus servicios a la nube
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <SpotlightCard className="p-8 min-h-[300px] flex flex-col justify-center" spotlightColor="rgba(255, 0, 242, 0.2)">
            <h3 className="text-2xl font-bold text-white mb-4">Paso 1: Selecciona tu proveedor</h3>
            <p className="text-white">
              Elige el proveedor de la con el que deseas subir tus servicios.
            </p>
          </SpotlightCard>
          <SpotlightCard className="p-8 min-h-[300px] flex flex-col justify-center" spotlightColor="rgba(255, 0, 242, 0.2)">
            <h3 className="text-2xl font-bold text-white mb-4">Paso 2: Selecciona el tipo de aplicación</h3>
            <p className="text-white">
              Elige el tipo de aplicación que deseas subir. Desde aplicaciones preconfiguradas hasta tus proyectos propios.
            </p>
          </SpotlightCard>
          <SpotlightCard className="p-8 min-h-[300px] flex flex-col justify-center" spotlightColor="rgba(255, 0, 242, 0.2)">
            <h3 className="text-2xl font-bold text-white mb-4">Paso 3: Configura tu aplicación</h3>
            <p className="text-white">
              Configura tus variables de entorno y otros parámetros necesarios para tu aplicación.
            </p>
          </SpotlightCard>
          <SpotlightCard className="p-8 min-h-[300px] flex flex-col justify-center" spotlightColor="rgba(255, 0, 242, 0.2)">
            <h3 className="text-2xl font-bold text-white mb-4">Paso 4: Accede a tu nube</h3>
            <p className="text-white">
              Una vez subidos, podrás acceder y gestionar tus servicios desde cualquier dispositivo.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

export default UploadStepsSection;
