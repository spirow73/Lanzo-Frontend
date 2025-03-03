import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Componentes importados
import { Button } from "@/components/ui/button";
import TextPressure from "@/components/reactbits/TextPressure";

// Importar backgrounds
import Iridescence from "@/components/reactbits/backgrounds/Iridescence";
import GridMotionBackground from "@/components/reactbits/backgrounds/GridMotion";

// Importar el componente SimpleItem
import SimpleItem from "@/components/SimpleItem";

// Importar SpotlightCard para la sección de pasos
import SpotlightCard from "@/components/reactbits/SpotlightCard";

import { CloudIcon } from "lucide-react";

const simpleItems = [
  <SimpleItem key="item1" title="Rápido" description="Implementación en segundos" />,
  <SimpleItem key="item2" title="Seguro" description="Protección de datos garantizada" />,
  <SimpleItem key="item3" title="Escalable" description="Se adapta a tu crecimiento" />,
  <SimpleItem key="item4" title="Flexible" description="Integración con diversas herramientas" />,
  <SimpleItem key="item5" title="Soporte 24/7" description="Atención constante para resolver dudas" />,
  <SimpleItem key="item6" title="Innovador" description="Tecnología de vanguardia" />,
  <SimpleItem key="item7" title="Intuitivo" description="Fácil de usar y configurar" />,
];

const menuItems = [
  { label: "Características", to: "#features" },
  { label: "Cómo funciona", to: "#how-it-works" },
  { label: "Precios", to: "#pricing" },
];

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const LandingPage: React.FC = () => {

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Fondo Iridescence ocupando toda la pantalla */}
      <Iridescence
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
        className="absolute w-full h-full inset-0 z-0"
      />

      {/* HEADER fijo con superposición total */}
      <header className="fixed top-0 left-0 right-0 px-6 py-4 shadow flex items-center z-50 backdrop-blur-md bg-[rgba(0,0,0,0.4)]">
        <Link className="flex items-center space-x-2" to="#">
          <CloudIcon className="h-8 w-8 text-white" />
          <span className="text-2xl font-extrabold text-white tracking-tight">
            Lanzo
          </span>
        </Link>
        <nav className="ml-auto flex space-x-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              variants={navVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Link
                className="text-lg text-white hover:text-gray-300 transition-colors"
                to={item.to}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>
      </header>

      {/* Agregamos un margen superior para compensar el header fijo */}
      <main className="flex-1 relative z-10 pt-20">
        {/* HERO SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full overflow-hidden"
        >
          <div className="relative z-10 py-16 container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="space-y-6">
                <TextPressure
                  text="Lanzo"
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={true}
                  textColor="#FFFFFF"
                  minFontSize={60}
                  className="font-bold"
                />
                <p className="mx-auto max-w-3xl text-white text-xl md:text-2xl leading-relaxed">
                  Simplifica la implementación y gestión de servicios en la nube de AWS y añade un toque de magia a tus interfaces, inspirado en React Bits.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#2D033B] text-lg px-10 py-7 text-xl"
                >
                  Empezar ya
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECCIÓN DE ITEMS CON GRID MOTION */}
        <section id="features">
          <GridMotionBackground items={simpleItems} gradientColor="#2D033B" />
        </section>

        {/* SECCIÓN DE PASOS PARA SUBIR A LA NUBE */}
        <section id="upload-steps" className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Cómo subir tus archivos a la nube en 3 sencillos pasos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <SpotlightCard className="p-8 min-h-[300px] flex flex-col justify-center" spotlightColor="rgba(0, 229, 255, 0.2)">
                <h3 className="text-2xl font-bold text-white mb-4">Paso 1: Selecciona tus archivos</h3>
                <p className="text-white">
                  Elige los archivos que deseas subir, ya sea arrastrándolos o seleccionándolos desde tu dispositivo.
                </p>
              </SpotlightCard>
              <SpotlightCard className="p-8 min-h-[300px] flex flex-col justify-center" spotlightColor="rgba(0, 229, 255, 0.2)">
                <h3 className="text-2xl font-bold text-white mb-4">Paso 2: Inicia la carga</h3>
                <p className="text-white">
                  Haz clic en el botón de "Subir" y espera a que la carga se complete de forma segura.
                </p>
              </SpotlightCard>
              <SpotlightCard className="p-8 min-h-[300px] flex flex-col justify-center" spotlightColor="rgba(0, 229, 255, 0.2)">
                <h3 className="text-2xl font-bold text-white mb-4">Paso 3: Accede a tu nube</h3>
                <p className="text-white">
                  Una vez subidos, podrás acceder y gestionar tus archivos desde cualquier dispositivo.
                </p>
              </SpotlightCard>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-8 relative z-10">
        <p className="text-sm text-white">© 2025 Lanzo. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm text-white hover:text-gray-300" to="#">
            Términos de servicio
          </Link>
          <Link className="text-sm text-white hover:text-gray-300" to="#">
            Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;
