import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import FeatureCard from "@/components/FeatureCard";
import StepCard from "@/components/StepCard";
import PricingCard from "@/components/PricingCard";

import {
  CloudIcon,
  ServerIcon,
  CloudLightningIcon as LightningBoltIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" to="#">
          <CloudIcon className="h-6 w-6 mr-2" />
          <span className="font-bold">AWS Easy Cloud</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#features"
          >
            Características
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#how-it-works"
          >
            Cómo funciona
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#pricing"
          >
            Precios
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Servicios AWS de forma fácil, accesible y dinámica
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Simplifica la implementación y gestión de servicios en la nube
                  de AWS y añade un toque de magia a tus interfaces, inspirado en React Bits.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Empezar gratis</Button>
                <Button variant="outline">Saber más</Button>
              </div>
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Características principales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<ServerIcon className="h-10 w-10" />}
                title="Despliegue rápido"
                description="Implementa servicios AWS en minutos, no en horas."
              />
              <FeatureCard
                icon={<LightningBoltIcon className="h-10 w-10" />}
                title="Interfaz intuitiva"
                description="Gestiona tus servicios con una interfaz fácil de usar."
              />
              <FeatureCard
                icon={<ShieldCheckIcon className="h-10 w-10" />}
                title="Seguridad integrada"
                description="Configuraciones de seguridad predefinidas para proteger tus recursos."
              />
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Cómo funciona
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard
                number="1"
                title="Selecciona tu servicio"
                description="Elige entre una variedad de servicios AWS pre-configurados."
              />
              <StepCard
                number="2"
                title="Personaliza"
                description="Ajusta los parámetros según tus necesidades específicas."
              />
              <StepCard
                number="3"
                title="Despliega"
                description="Con un solo clic, tu servicio estará en funcionamiento en AWS."
              />
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
              Planes simples y transparentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PricingCard
                title="Básico"
                price="Gratis"
                features={[
                  "Hasta 3 servicios",
                  "Soporte por correo",
                  "Actualizaciones mensuales",
                ]}
              />
              <PricingCard
                title="Pro"
                price="$49/mes"
                features={[
                  "Servicios ilimitados",
                  "Soporte prioritario",
                  "Actualizaciones semanales",
                  "Acceso API",
                ]}
              />
              <PricingCard
                title="Empresa"
                price="Personalizado"
                features={[
                  "Solución a medida",
                  "Soporte 24/7",
                  "Gerente de cuenta dedicado",
                  "Integración personalizada",
                ]}
              />
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full py-12 md:py-24 lg:py-32"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  ¿Listo para simplificar tu experiencia con AWS?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Únete a miles de empresas que ya están ahorrando tiempo y recursos con AWS Easy Cloud.
                </p>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Además, disfruta de interfaces animadas que hacen que cada interacción sea única, ¡inspiradas en React Bits!
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input placeholder="Ingresa tu email" type="email" />
                  <Button type="submit">Registrarse</Button>
                </form>
                <p className="text-xs text-gray-500">
                  Al registrarte, aceptas nuestros términos de servicio y política de privacidad.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 AWS Easy Cloud. Todos los derechos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Términos de servicio
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacidad
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;
