import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Importamos los componentes actualizados
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import TextPressure from "@/components/reactbits/TextPressure";
import InfiniteScroll from "@/components/reactbits/InfiniteScroll";

import {
  CloudIcon,
  ServerIcon,
  CloudLightningIcon as LightningBoltIcon,
  ShieldCheckIcon,
} from "lucide-react";

const items = [
  {
    content: (
      <FeatureCard
        icon={<ServerIcon className="h-10 w-10 text-teal-600" />}
        title="Despliegue rápido"
      >
        Con solo un par de clics, tu servicio estará funcionando en AWS.
      </FeatureCard>
    ),
  },
  {
    content: (
      <FeatureCard
        icon={<LightningBoltIcon className="h-10 w-10 text-teal-600" />}
        title="Interfaz intuitiva"
      >
        Un panel de control moderno y minimalista para que todo sea fácil de usar.
      </FeatureCard>
    ),
  },
  {
    content: (
      <FeatureCard
        icon={<ShieldCheckIcon className="h-10 w-10 text-teal-600" />}
        title="Seguridad integrada"
      >
        Configuraciones de seguridad preestablecidas para proteger tus datos.
      </FeatureCard>
    ),
  },
];

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* HEADER */}
      <header className="px-6 py-4 bg-white shadow flex items-center">
        <Link className="flex items-center space-x-2" to="#">
          <CloudIcon className="h-8 w-8 text-teal-600" />
          <span className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Lanzo
          </span>
        </Link>
        <nav className="ml-auto flex space-x-6">
          <Link
            className="text-lg text-gray-600 hover:text-gray-900 transition-colors"
            to="#features"
          >
            Características
          </Link>
          <Link
            className="text-lg text-gray-600 hover:text-gray-900 transition-colors"
            to="#how-it-works"
          >
            Cómo funciona
          </Link>
          <Link
            className="text-lg text-gray-600 hover:text-gray-900 transition-colors"
            to="#pricing"
          >
            Precios
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-r from-teal-500 to-cyan-500"
        >
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="space-y-6">
                <TextPressure
                  text="Lanzo!"
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={true}
                  textColor="#FFFFFF"
                  minFontSize={60} // Tamaño mínimo más grande
                  className="font-bold"
                />
                <p className="mx-auto max-w-3xl text-gray-100 text-xl md:text-2xl leading-relaxed">
                  Simplifica la implementación y gestión de servicios en la nube
                  de AWS y añade un toque de magia a tus interfaces, inspirado
                  en React Bits.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-white text-teal-600 hover:bg-gray-100 text-lg px-6 py-3">
                  Empezar gratis
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-teal-600 text-lg px-6 py-3"
                >
                  Saber más
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FEATURES SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          id="features"
          className="w-full py-16 md:py-24 lg:py-32 bg-gray-50"
        >
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            <h2 className="text-4xl font-bold text-gray-800 tracking-tight text-center mb-12">
              Características principales
            </h2>
            <div style={{ height: "500px", position: "relative" }}>
              <InfiniteScroll
                items={items}
                isTilted={true}
                tiltDirection="left"
                autoplay={true}
                autoplaySpeed={0.2}
                autoplayDirection="down"
                pauseOnHover={true}
              />
            </div>
          </div>
        </motion.section>

        
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          © 2025 Lanzo. Todos los derechos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm text-gray-600 hover:text-gray-900" to="#">
            Términos de servicio
          </Link>
          <Link className="text-sm text-gray-600 hover:text-gray-900" to="#">
            Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;
