import SpotlightCard from "@/components/reactbits/SpotlightCard";

const UploadStepsSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Sube tus servicios a la nube
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SpotlightCard className="p-8 min-h-[300px] flex flex-col justify-center" spotlightColor="rgba(255, 0, 242, 0.2)">
            <h3 className="text-2xl font-bold text-white mb-4">Paso 1: Selecciona tus servicios</h3>
            <p className="text-white">
              Elige los servicios que deseas subir, ya sea arrastrándolos o seleccionándolos desde tu dispositivo.
            </p>
          </SpotlightCard>
          <SpotlightCard className="p-8 min-h-[300px] flex flex-col justify-center" spotlightColor="rgba(255, 0, 242, 0.2)">
            <h3 className="text-2xl font-bold text-white mb-4">Paso 2: Inicia la carga</h3>
            <p className="text-white">
              Haz clic en el botón de "Subir" y espera a que la carga se complete de forma segura.
            </p>
          </SpotlightCard>
          <SpotlightCard className="p-8 min-h-[300px] flex flex-col justify-center" spotlightColor="rgba(255, 0, 242, 0.2)">
            <h3 className="text-2xl font-bold text-white mb-4">Paso 3: Accede a tu nube</h3>
            <p className="text-white">
              Una vez subidos, podrás acceder y utilizar tus servicios desde cualquier dispositivo.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

export default UploadStepsSection;
